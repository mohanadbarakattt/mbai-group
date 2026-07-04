import { useState, useEffect, useCallback } from "react";

export interface CryptoPrices {
  btc: number | null;
  eth: number | null;
  usdt: number;
  sol: number | null;
}

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ripple,solana,ethereum&vs_currencies=usd";

const REFRESH_INTERVAL = 30_000;

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrices>({
    btc: null,
    eth: null,
    usdt: 1,
    sol: null,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchPrices = useCallback(async (isInitial: boolean) => {
    if (isInitial) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setPrices({
        btc: data.bitcoin?.usd ?? null,
        eth: data.ethereum?.usd ?? null,
        usdt: 1,
        sol: data.solana?.usd ?? null,
      });
      setError(false);
      setLastUpdated(Date.now());
    } catch {
      setError(true);
      setPrices({ btc: null, eth: null, usdt: 1, sol: null });
    } finally {
      if (isInitial) setLoading(false);
      else setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices(true);
    const id = setInterval(() => fetchPrices(false), REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [fetchPrices]);

  return { prices, loading, refreshing, error, lastUpdated };
}
