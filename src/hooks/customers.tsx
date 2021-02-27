import React, { createContext, useState, useContext, useCallback } from 'react';
import { api, getRealm } from 'services';

import { Customer } from 'types';

type CustomersContextData = {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  loadLocalCustomers: () => Promise<void>;
  loadApiCustomers: () => Promise<void>;
};

const CustomersContext = createContext<CustomersContextData>(
  {} as CustomersContextData,
);

const CustomerProvider: React.FC = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

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

  return (
    <CustomersContext.Provider
      value={{
        customers,
        setCustomers,
        loadApiCustomers,
        loadLocalCustomers,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

function useCustomers(): CustomersContextData {
  const context = useContext(CustomersContext);

  if (!context) {
    throw new Error('useCustomers must be used within an CustomerProvider');
  }

  return context;
}

export { CustomerProvider, useCustomers };
