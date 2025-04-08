import { createContext, useEffect, useState } from 'react';

export const mainContext = createContext<{} | undefined>(undefined);

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <mainContext.Provider value={{}}>{children}</mainContext.Provider>
    </>
  );
};

export default MainProvider;
