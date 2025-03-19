import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChakraProvider, Heading } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Heading>SEVEN</Heading>
  )
}

export default App
