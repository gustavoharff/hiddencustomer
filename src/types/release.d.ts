import { Customer } from './customer';

type Release = {
  id: string;
  name: string;
  customer_id: string;
  customer?: Customer;
  company_id: string;
  paid: boolean;
  annotations: string;
  created_at: string;
  updated_at: string;
};

export { Release };
