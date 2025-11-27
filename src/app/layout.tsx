import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Joshua Ijemba - Front-End Web Developer | Graphics Designer | Data Analyst',
  description: 'Transforming ideas into powerful digital experiences. Expert in front-end web development, eye-catching designs, and actionable data insights for your business growth.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-400 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}