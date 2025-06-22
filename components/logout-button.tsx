"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"
import { logout } from "@/app/actions/auth"

export function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </>
      )}
    </Button>
  )
}
