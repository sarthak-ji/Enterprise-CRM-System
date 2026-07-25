// filepath: src/hooks/useFetch.js
// Generic data-fetching hook wrapping axios with loading/error state.
import { useEffect, useState, useCallback } from 'react';
import { handleApiError } from '@/services/api/errorHandler.js';

export const useFetch = (fetcher, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher();
      setData(res.data);
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { run(); }, [run]);

  return { data, loading, error, refetch: run };
};
