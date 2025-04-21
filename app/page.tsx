import { redirect } from "next/navigation"
import { useSession, signIn } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if(session) {
    redirect("/dashboard")
  }

  return (
    <div>
      <h1>Welcome to DASHBOARD!</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}