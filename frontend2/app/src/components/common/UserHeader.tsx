import { Card } from "@/components/ui/card";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { FinalResult, GptService } from '../../client';


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


export interface UserHeaderProps {
  user: {
    name: string;
    age: number;
    netWorth: string;
  };
  setResults: React.Dispatch<React.SetStateAction<FinalResult | null>>,
  className?: string;
}

export function UserHeader({ user, className, setResults }: UserHeaderProps) {
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
  const [transcript, setTranscript] = useState<string>('');
  
  
  
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
    
    


    
    useEffect(() => {  
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


    console.log("send gpt!!!")

   sendGPT();
}, [transcript, setTranscript])




  console.log({transcript})
  return (
    <Card className={`bg-gradient-to-r from-primary/5 to-primary/10 p-6 mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              {user.name}
            </div><div className="text-sm text-gray-500">
            <span className="mr-2">Age: {user.age}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-right ">
            <div className="text-sm text-gray-500">Net Worth</div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              {user.netWorth}
            </div>
          </div>
        <div className="flex items-center ml-4 mr-4 ">
          
        <Button className="ml-4 mr-4 hover:bg-amber-400 " >
          <h2 className="" onClick={() => initializeTranscription()}> REC</h2>
          </Button>
        </div>
        </div>
      </div>
    </Card>
  );
}