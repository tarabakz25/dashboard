import { useSession, signIn } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Header() {
    const { data: session } = useSession()

    if(!session) {
        signIn()        
    }

    return (
        <header>
            <img src={session?.user?.image || ""} alt="user avatar" height={32} width={32} />
            <p>{session?.user?.name}</p>
            <div>
                <button onClick={() => redirect("/dashboard")}>dashboard</button>
                <button onClick={() => redirect("dashboard/settings")}>設定</button>
            </div>
        </header>
    )
}