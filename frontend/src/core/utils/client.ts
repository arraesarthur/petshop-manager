import { QueryClient } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst"
    }
  }
});

export { client };


