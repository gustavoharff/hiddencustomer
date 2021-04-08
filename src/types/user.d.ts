type User = {
  id: string;
  name: string;
  email: string;
  permission: 'admin' | 'client' | 'user';
  active: boolean;
  company_id: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export { User };
