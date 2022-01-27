import { useCreateStore, Provider } from "../lib/store";
import { QueryClient, QueryClientProvider } from 'react-query'; 
import { AppProps } from "next/app";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  return (
    <Provider createStore={createStore}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}
