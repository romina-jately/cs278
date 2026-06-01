import { useEffect, useState } from "react";

export function useApi<T>(fn: () => Promise<T>, deps: unknown[] = []): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    let cancelled = false;
    fn().then(v => { if (!cancelled) setData(v); }).catch(() => {});
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return data;
}
