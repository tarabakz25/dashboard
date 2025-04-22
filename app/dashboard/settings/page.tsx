import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

type ApiKey = { api_key: string }

export default function Settings() {
    const [apiKey, setApiKey] = useState<ApiKey | null>(null)

    useEffect(() => {
        
    })
}