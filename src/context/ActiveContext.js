import { createContext, useContext } from "react";

export const ActiveContext = createContext();

export function useConfig() {
    return useContext(ActiveContext);
}