import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/lib/supabaseClient"
import { CodingEvent } from "@/lib/types"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "POST") {
        return res.status(405).end()
    }

    const body : CodingEvent = await req.body
    const { error } = await supabase
        .from('event_log')
        .insert([{
            user_id: body.user_id,
            ts: body.ts,
            event_type: body.event_type,
            language_id: body.language_id,
            project_name: body.project_name,
            file_path: body.file_path,
            os: body.os,
            arch: body.arch,
            git_branch: body.git_branch,
            git_remote: body.git_remote,
        }])
    
    if(error) {
        console.error(error)
        return res.status(500).end()
    }

    return res.status(200).end()
}