import React from 'react'
import "./index.css"
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.tsx'
import { OpenAPI } from './client/index.ts'

const queryClient = new QueryClient();

OpenAPI.BASE = "http://127.0.0.1:8000/v1/seven"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </ChakraProvider>

)


