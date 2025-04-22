import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/lib/supabaseClient"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { user_id, period = "day" } = req.body

    const { data, error } = await supabase
        .from('event_log')
        .select('duration')
        .eq('user_id', user_id)
        .order('day', { ascending: false })
        .limit(30)
    
    if(error) {
        console.error(error)
        return res.status(500).end()
    }

    return res.status(200).json(data)
}