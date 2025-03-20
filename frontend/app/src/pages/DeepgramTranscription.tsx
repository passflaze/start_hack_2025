import { GptService } from '@/client';
import React, { useEffect, useState } from 'react';


interface DeepgramTranscriptAlternative {
  transcript: string;
  confidence: number;
}

interface DeepgramChannel {
  alternatives: DeepgramTranscriptAlternative[];
}

interface DeepgramResponse {
  channel: DeepgramChannel;
  is_final: boolean;
}

const DeepgramTranscription: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
  const [transcript, setTranscript] = useState<string>('');
  const [results, setResults] = useState<string>('');
  
  useEffect(() => {
    let mediaRecorder: MediaRecorder | undefined;
    let socket: WebSocket | undefined;
    
    const initializeTranscription = async (): Promise<void> => {
      try {
       
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
       
        mediaRecorder = new MediaRecorder(stream);
      
        socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
          'token',
          'cf7588e948486a9a5fabfcc45e8baff9a9c2ff8c'
        ]);
        
        // WebSocket event handlers
        socket.onopen = (): void => {
          console.log({ event: 'onopen' });
          setConnectionStatus('Connected');
          
          if (mediaRecorder) {
            mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
              if (event.data.size > 0 && socket && socket.readyState === WebSocket.OPEN) {
                socket.send(event.data);
              }
            });
            
            mediaRecorder.start(250);
          }
        };
        
        socket.onmessage = (message: MessageEvent): void => {
          console.log({ event: 'onmessage', message });
          const received: DeepgramResponse = JSON.parse(message.data);
          const receivedTranscript = received.channel.alternatives[0].transcript;
          
          if (receivedTranscript && received.is_final) {
            setTranscript(prevTranscript => prevTranscript + receivedTranscript + ' ');
          }
        };
        
        socket.onclose = (): void => {
          console.log({ event: 'onclose' });
          setConnectionStatus('Disconnected');
        };
        
        socket.onerror = (error: Event): void => {
          console.log({ event: 'onerror', error });
          setConnectionStatus('Error connecting');
        };
      } catch (error) {
        console.error('Error initializing transcription:', error);
        setConnectionStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    };
    
    initializeTranscription();


    
    
    // Cleanup function
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    const sendGPT = async () => {
      const res = await GptService.sendGpt({text: transcript})
      setResults(res)
      console.log(res)
    }

   sendGPT();
}, [transcript, setTranscript])
  
  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="mb-4 p-3 border rounded bg-gray-100">
        <h3 className="text-lg font-semibold mb-1">Connection Status:</h3>
        <p className={`font-medium ${connectionStatus === 'Connected' ? 'text-green-600' : 'text-red-600'}`}>
          {connectionStatus}
        </p>
      </div>
      
      <div className="p-3 border rounded">
        <h3 className="text-lg font-semibold mb-1">Transcript:</h3>
        <div className="max-h-48 overflow-y-auto p-2 bg-white border rounded">
          {transcript || "Transcript will appear here once you speak..."}
        </div>
      </div>
    </div>
  );
};

export default DeepgramTranscription;