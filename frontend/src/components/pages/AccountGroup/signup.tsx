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
  return (
    <>
      <Card className="w-full max-w-sm">
          
        {/* Header */}
        <CardHeader>
            
          <CardTitle>
            Create your account
          </CardTitle>
            
          <CardDescription>
            Create your account with your email username and a password.
          </CardDescription>
            
          <CardAction>
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
          </CardAction>

        </CardHeader>

        {/* Content */}
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
                
              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
                
              {/* Password Input */}
              <div className="grid gap-2">
                  
                <div className="flex items-center">
                  <Label htmlFor="password">New Password</Label>
                </div>

                <Input id="password" type="password" placeholder="Create a password" required />
                <Input id="password" type="password" placeholder="Confirm your password" required />

              </div>

            </div>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex-col gap-2">

          <Button type="submit" className="w-full">Create account</Button>
            
            <p> or </p>

          <Button variant="outline" className="w-full">Continue as Guest</Button>

        </CardFooter>

      </Card>
    </>
  )
}
