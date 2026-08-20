import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

import { AuthProvider } from './core/context/auth-context.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './core/routes/routes.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { client } from './core/utils/client.ts'
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
          <Toaster/>
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
