"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState, ReactNode } from "react"

interface ThemeProviderProps {
  children: ReactNode
  attribute?: "class" | "data-theme"
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Avoid rendering theme-dependent UI before mount
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
