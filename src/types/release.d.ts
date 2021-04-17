import { Customer } from './customer';
import { ReleaseDate } from './releaseDate';
import { ReleaseGroup } from './releaseGroup';

type Release = {
  id: string;
  name: string;
  customer_id: string;
  customer?: Customer;
  company_id: string;
  paid: boolean;
  dates: ReleaseDate[];
  groups: ReleaseGroup[];
  annotations: string;
  created_at: string;
  updated_at: string;
};

export { Release };
