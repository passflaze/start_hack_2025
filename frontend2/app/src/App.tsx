import { useState } from 'react'
import { Card, ChakraProvider, Flex, Heading, HStack } from '@chakra-ui/react'
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
    
    <UserHeader user={demoUser}/>
    <HStack>
      <Charts/>
      <Flex w={"25%"}>
      <Card></Card>
      </Flex>
      </HStack>
     {/* Hello World <DeepgramTranscription/> */}
    </>
    
  )
}

export default App


