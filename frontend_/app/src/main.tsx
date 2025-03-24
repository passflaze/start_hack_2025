
import "./index.css"
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.tsx'
import { OpenAPI } from './client/index.ts'

const queryClient = new QueryClient();

OpenAPI.BASE = "http://localhost:8000/v1/seven"

const theme = extendTheme({
  config: {
    initialColorMode: "light", 
    useSystemColorMode: false, 
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </ChakraProvider>

)


