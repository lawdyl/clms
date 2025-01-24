import { createContext } from 'react';

export type OrganisationDetails = {
  id: number;
  displayName: string;
} | null;

export const OrganisationContext = createContext<OrganisationDetails>(null);
