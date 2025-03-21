import { useState } from 'react'
import { Card, ChakraProvider, Flex, Heading, HStack } from '@chakra-ui/react'
import Charts from './components/Charts'
import { UserHeader } from './components/common/UserHeader'
import { User } from 'lucide-react'

let demoUser = {
  name: "MR. RANFONI",
  age: 22,
  netWorth: "$1,000,000"
}

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
    
    <UserHeader user={demoUser}/>
    
      <Charts/>
     
     
    </>
    
  )
}

export default App


