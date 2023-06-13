import { createContext, useContext } from "react";

export const CurrentDateContext = createContext();

export function useConfig() {
    return useContext(CurrentDateContext);
}