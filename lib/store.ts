import { useLayoutEffect } from "react";
import create, { UseStore } from "zustand";
import createContext from "zustand/context";
import { combine } from "zustand/middleware";

let store: any;

type InitialState = typeof initialState;
type UseStoreState = typeof initializeStore extends (
  ...args: never
) => UseStore<infer T>
  ? T
  : never;

const initialState = {
  token: ''
};

const zustandContext = createContext<UseStoreState>();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create(
    combine({ ...initialState, ...preloadedState }, (set) => ({
      setToken: (token: string) => {
        set({
          token: token,
        })
      }
    }))
  );
};

export const useCreateStore = (initialState: InitialState) => {
  // For SSR & SSG, always use a new store.
  if (typeof window === "undefined") {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  
  
  return () => store;
};
