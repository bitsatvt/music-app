"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAuthSession } from "@/lib/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginCard() {
  const router = useRouter()
  const apiBaseUrl = "http://localhost:5000"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      const response = await fetch(`${apiBaseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const payload = await response.json()

      if (!response.ok) {
        setErrorMessage(payload.Error ?? "Login failed.")
        return
      }

      if (payload.Token) {
        setAuthSession(payload.Token, payload.User)
      }

      router.push("/dashboard")
    }
    catch {
      setErrorMessage("Unable to reach the login service.")
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="w-full max-w-sm">

        {/* Header */}
        <CardHeader>
          <CardTitle>
            Log in to your account
          </CardTitle>

          <CardDescription>
            Enter your username and password to log in.
          </CardDescription>

          <CardAction>
            <Link href="/signup">
              <Button variant="ghost">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">

              {/* Username Input */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="musiclover123"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              {errorMessage ? (
                <p className="text-sm text-red-500">{errorMessage}</p>
              ) : null}

            </div>

            {/* Footer */}
            <CardFooter className="flex-col gap-2 px-0 pt-6">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <p> or </p>

              <Button variant="outline" className="w-full" type="button">
                Continue as Guest
              </Button>
            </CardFooter>
          </form>
        </CardContent>

      </Card>
    </>
  )
}
