import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    session: { strategy: "jwt" },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if(account) token.accessToken = account.access_token
            return token
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken
            return session
        }
    }
})