type ReleaseGroup = {
  id: string;
  name: string;
  type: 'whatsapp' | 'discord' | 'telegram';
  release_id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
};

export { ReleaseGroup };
