import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FullStack Discord Clone',
  description: 'created with  next js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        // cn library for conditional classses of tailwind css come from shandcn/ui
        // just tailwind css classes anything else        
        font.className,
        "bg-white dark:bg-[#313338]"
        )}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey='discord-theme'
          >
            {children}
          </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  )
}
