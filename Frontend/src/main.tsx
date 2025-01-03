import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './context/authContext.tsx'
import {Toaster} from '@/components/ui/sonner.tsx'
import { UserContextProvider } from './context/userContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
    <AuthContextProvider>
    <App />
    <Toaster />
    </AuthContextProvider>
    </UserContextProvider>
  </StrictMode>,
)