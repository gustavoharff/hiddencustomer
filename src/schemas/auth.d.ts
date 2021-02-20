interface Auth {
  id: string;
  name: string;
  email: string;
  permission: 'admin' | 'client' | 'user';
  token: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export default Auth;
