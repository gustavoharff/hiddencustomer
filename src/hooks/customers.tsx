import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import { Alert } from 'react-native';
import { api, getRealm } from 'services';

import { Customer } from 'types';
import { useAuth } from './auth';

type UpdateCustomerData = {
  customer_id: string;
  name: string;
};

type CustomersContextData = {
  customers: Customer[];
  loadLocalCustomers: () => Promise<void>;
  loadApiCustomers: () => Promise<void>;
  createCustomer: (name: string) => Promise<void>;
  deleteCustomer: (customerId: string) => Promise<void>;
  updateCustomer: (data: UpdateCustomerData) => Promise<void>;
};

type CustomerProviderProps = {
  children: ReactNode;
};

const CustomersContext = createContext<CustomersContextData>(
  {} as CustomersContextData,
);

export function CustomerProvider({ children }: CustomerProviderProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const { signOut } = useAuth();

  const loadApiCustomers = useCallback(async () => {
    try {
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
    } catch (err) {
      if (err.response.status === 440) {
        Alert.alert('Sessão expirada', 'Realize o login novamente!');
        signOut();
      }
    }
  }, [setCustomers, signOut]);

  const loadLocalCustomers = useCallback(async () => {
    const realm = await getRealm();

    const data = realm.objects<Customer>('Customer').sorted('name', true);

    const formattedCustomers = data.map(customer => ({
      id: customer.id,
      name: customer.name,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    }));

    setCustomers(formattedCustomers);
  }, [setCustomers]);

  const createCustomer = useCallback(
    async (name: string) => {
      try {
        const response = await api.post('/customers', {
          name,
        });

        setCustomers(state => [response.data, ...state]);

        const realm = await getRealm();

        realm.write(() => {
          realm.create('Customer', response.data);
        });
      } catch (err) {
        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [signOut],
  );

  const updateCustomer = useCallback(
    async ({ customer_id, name }: UpdateCustomerData) => {
      try {
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
      } catch (err) {
        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [customers, signOut],
  );

  const deleteCustomer = useCallback(
    async (customerId: string) => {
      try {
        await api.delete(`/customers/${customerId}`);
        setCustomers(state =>
          state.filter(customer => customer.id !== customerId),
        );

        const realm = await getRealm();

        realm.write(() => {
          realm.delete(realm.objectForPrimaryKey('Customer', customerId));
        });
      } catch (err) {
        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      }
    },
    [signOut],
  );

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
