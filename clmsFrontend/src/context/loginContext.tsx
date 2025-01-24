import { createContext } from 'react';

export type LoginDetails = {
  email: string;
  loginToken: string;
} | null;

export const LoginContext = createContext<LoginDetails>(null);
