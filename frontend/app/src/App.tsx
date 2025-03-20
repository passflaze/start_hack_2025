import { useState } from 'react'
import { ChakraProvider, Heading } from '@chakra-ui/react'

import HomePage from "@/pages/HomePage";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HomePage />

    {/* <AudioRecorder/> */}
    </>
    
  )
}

export default App


