export type CodingEvent = {
    user_id: string;
    ts?: string;            
    event_type: string;
    language_id?: string;
    project_name?: string;
    file_path?: string;
    os?: string;
    arch?: string;
    git_branch?: string;
    git_remote?: string;
  };
  