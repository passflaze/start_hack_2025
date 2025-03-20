import { useState } from 'react'
import { ChakraProvider, Heading } from '@chakra-ui/react'
import Charts from './components/Charts'
import { UserHeader } from './components/common/UserHeader'
import { User } from 'lucide-react'

let demoUser = {
  name: "JACK MAGGIORE",
  age: 22,
  netWorth: "$1,000,000"
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Charts/>
     {/* Hello World <DeepgramTranscription/> */}
    </>
    
  )
}

export default App


