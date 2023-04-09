'use client'

import { AuthContextProvider } from './context/AuthContext'
import { useRouter } from "next/navigation";

import Navbar from './component/navbar'

import './styles/globals.css';

export const metadata = {
  title: 'CurryCoolum',
  description: 'Learn at your own pace',
}

export default function RootLayout({ children }) {
  const router = useRouter()

  return (
    <html lang="en">
      <body className='h-screen'>
      <AuthContextProvider>
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] max-h-full">
          <Navbar/>
          {children}
        </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
