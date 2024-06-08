'use client';

import React, { createContext, useContext } from "react";

export interface ServiceItem { id: number, name: string, tags: string[] }
interface ServicesContextType {
  services: ServiceItem[]
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ services: ServiceItem[]; children: React.ReactNode }> = ({ services, children }) => {
  return <ServicesContext.Provider value={{ services }}>{children}</ServicesContext.Provider>;
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
