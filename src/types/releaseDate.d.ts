import { Release } from './release';

type ReleaseDate = {
  id: string;
  date: string;
  release_id: string;
  release?: Release;
  company_id: string;
  created_at: string;
  updated_at: string;
};

export { ReleaseDate };
