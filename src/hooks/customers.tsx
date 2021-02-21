import React, { createContext, useState, useContext } from 'react';

import { Customer } from '../schemas/customer';

interface CustomersContextData {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const CustomersContext = createContext<CustomersContextData>(
  {} as CustomersContextData,
);

const CustomerProvider: React.FC = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  return (
    <CustomersContext.Provider
      value={{
        customers,
        setCustomers,
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
