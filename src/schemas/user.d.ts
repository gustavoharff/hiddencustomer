interface User {
  id: string;
  name: string;
  email: string;
  permission: 'admin' | 'client' | 'user';
  avatar_url: string;
}

export default User;
