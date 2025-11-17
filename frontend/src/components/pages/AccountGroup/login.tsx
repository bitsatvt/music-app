"use client"

import React, { useState } from "react"
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
import Link from "next/link"

export default function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // ================================
    // Commented out fetch to backend
    // ================================
    /*
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    const data = await response.json();
    console.log(data);
    */

    // For testing
    console.log("Email:", email)
    console.log("Password:", password)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Log in to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>

        <CardAction>
          <Link href="/signup">
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>

      {/* Content */}
      <CardContent>
        { /* Login Form: receives input and outputs as JSON to backend for auth*/ }
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Move Login button inside form so it triggers onSubmit */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Continue as Guest
        </Button>
      </CardFooter>
    </Card>
  )
}
