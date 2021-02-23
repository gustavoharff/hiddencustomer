import React, { createContext, useState, useContext } from 'react';

import { ReleaseGroup } from 'types';

type GroupsContextData = {
  groups: ReleaseGroup[];
  setGroups: React.Dispatch<React.SetStateAction<ReleaseGroup[]>>;
};

const GroupsContext = createContext<GroupsContextData>({} as GroupsContextData);

const GroupProvider: React.FC = ({ children }) => {
  const [groups, setGroups] = useState<ReleaseGroup[]>([]);

  return (
    <GroupsContext.Provider
      value={{
        groups,
        setGroups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

function useGroups(): GroupsContextData {
  const context = useContext(GroupsContext);

  if (!context) {
    throw new Error('useGroupsmust be used within an CustomerProvider');
  }

  return context;
}

export { GroupProvider, useGroups };
