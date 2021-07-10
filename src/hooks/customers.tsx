import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { UpdateMode } from 'realm';

import { api, getRealm } from 'services';

import { Customer } from 'types';

interface UpdateCustomerData {
  customer_id: string;
  name: string;
}

interface CustomersContextData {
  customers: Customer[];
  refresh: () => Promise<void>;
  refreshing: boolean;
  createCustomer: (name: string) => Promise<void>;
  deleteCustomer: (customerId: string) => Promise<void>;
  updateCustomer: (data: UpdateCustomerData) => Promise<void>;
}

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomersContext = createContext<CustomersContextData>(
  {} as CustomersContextData,
);

export function CustomerProvider({
  children,
}: CustomerProviderProps): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const realm = await getRealm();
    try {
      const response = await api.get<Customer[]>('/customers/me');
      setCustomers(response.data);

      realm.write(() => {
        const data = realm.objects('Customer');

        realm.delete(data);
        response.data.forEach(customer => realm.create('Customer', customer));
      });
    } catch {
      const data = realm.objects<Customer>('Customer').sorted('name', true);

      setCustomers(
        data.map(customer => ({
          id: customer.id,
          name: customer.name,
          releases_counter: customer.releases_counter,
          created_at: customer.created_at,
          updated_at: customer.updated_at,
        })),
      );
    } finally {
      realm.close();
    }
    setRefreshing(false);
  }, []);

  const createCustomer = useCallback(async (name: string) => {
    const response = await api.post('/customers', {
      name,
    });

    setCustomers(state => [response.data, ...state]);

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Customer', response.data, UpdateMode.All);
    });

    realm.close();
  }, []);

  const updateCustomer = useCallback(
    async ({ customer_id, name }: UpdateCustomerData) => {
      const realm = await getRealm();

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

      realm.write(() => {
        realm.create('Customer', response.data, UpdateMode.Modified);
      });

      realm.close();
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

    realm.close();
  }, []);

  return (
    <CustomersContext.Provider
      value={{
        customers,
        refresh,
        refreshing,
        createCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
}
