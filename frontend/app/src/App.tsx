import { useState } from 'react'
import { ChakraProvider, Heading } from '@chakra-ui/react'

import HomePage from "@/pages/HomePage";
import DeepgramTranscription from './pages/DeepgramTranscription';
import Charts from './pages/Charts';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    //<HomePage />
      
      <Charts/>
     //<DeepgramTranscription/> 
    </>
    
  )
}

export default App


