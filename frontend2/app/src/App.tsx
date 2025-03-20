import { useState } from 'react'
import { ChakraProvider, Heading } from '@chakra-ui/react'
import Charts from './components/Charts'
import DeepgramTranscription from './components/common/DeepgramTranscription'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Charts/>
     <DeepgramTranscription/> 
    </>
    
  )
}

export default App


