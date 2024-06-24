export class UserProfile {
  created_at: string;
  email: string;
  email_verified: boolean;
  identities: Identity[];
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
  last_ip: string;
  last_login: string;
  logins_count: number;
}

export class Identity {
  connection: string;
  provider: string;
  user_id: string;
  isSocial: boolean;
}
