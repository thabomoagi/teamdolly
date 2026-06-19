import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Team Dolly | Official Merch & Bookings',
  description: 'Official merchandise and DJ bookings for Team Dolly. Daflame (PTY) Ltd. Pretoria, South Africa.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased bg-[#0a0a0a] text-[#e8e8e8]`}>
        {children}
      </body>
    </html>
  )
}