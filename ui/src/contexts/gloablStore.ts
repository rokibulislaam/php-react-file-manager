import { createContext } from 'react';
export const GlobalStoreContext = createContext({
  currentPath: '',
  setCurrentPath: (currentPath: string) => {},
});
