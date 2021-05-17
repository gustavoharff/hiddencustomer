import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from 'react';

import { api, getRealm } from 'services';

import { Customer } from 'types';

interface UpdateCustomerData {
  customer_id: string;
  name: string;
}

interface CustomersContextData {
  customers: Customer[];
  loadLocalCustomers: () => Promise<void>;
  loadApiCustomers: () => Promise<void>;
  createCustomer: (name: string) => Promise<void>;
  deleteCustomer: (customerId: string) => Promise<void>;
  updateCustomer: (data: UpdateCustomerData) => Promise<void>;
}

interface CustomerProviderProps {
  children: ReactNode;
}

const CustomersContext = createContext<CustomersContextData>(
  {} as CustomersContextData,
);

export function CustomerProvider({
  children,
}: CustomerProviderProps): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadApiCustomers = useCallback(async () => {
    const response = await api.get('/customers/me');
    setCustomers(response.data);

    const realm = await getRealm();
    realm.write(() => {
      const data = realm.objects('Customer');

      realm.delete(data);
      response.data.map((customer: Customer) =>
        realm.create('Customer', customer),
      );
    });
  }, [setCustomers]);

  const loadLocalCustomers = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objects<Customer>('Customer').sorted('name', true);

    const formattedCustomers = data.map(customer => ({
      id: customer.id,
      name: customer.name,
      releases_counter: customer.releases_counter,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    }));

    setCustomers(formattedCustomers);
  }, [setCustomers]);

  const createCustomer = useCallback(async (name: string) => {
    const response = await api.post('/customers', {
      name,
    });

    setCustomers(state => [response.data, ...state]);

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Customer', response.data);
    });
  }, []);

  const updateCustomer = useCallback(
    async ({ customer_id, name }: UpdateCustomerData) => {
      const response = await api.put(`/customer/${customer_id}`, {
        name,
      });

      setCustomers(
        customers.map(customer =>
          customer.id === customer_id
            ? {
                ...customer,
                ...response.data,
              }
            : customer,
        ),
      );
    },
    [customers],
  );

  const deleteCustomer = useCallback(async (customerId: string) => {
    await api.delete(`/customer/${customerId}`);
    setCustomers(state => state.filter(customer => customer.id !== customerId));

    const realm = await getRealm();

    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Customer', customerId));
    });
  }, []);

  return (
    <CustomersContext.Provider
      value={{
        customers,
        loadApiCustomers,
        loadLocalCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
}

export function useCustomers(): CustomersContextData {
  const context = useContext(CustomersContext);

  return context;
}
