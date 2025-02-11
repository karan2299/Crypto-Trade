import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowUpDown } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { Asset } from '../types';

export const TradePage: React.FC = () => {
  const { user } = useAuthStore();
  const [cryptoAmount, setCryptoAmount] = useState<string>('');
  const [fiatAmount, setFiatAmount] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');
  const [isReversed, setIsReversed] = useState(false);

  const { data: assets = [] } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await axios.get('https://data.messari.io/api/v1/assets');
      return response.data.data.map((asset: any) => ({
        symbol: asset.symbol,
        price: asset.metrics.market_data.price_usd,
      }));
    },
  });

  const selectedPrice = assets.find((asset) => asset.symbol === selectedAsset)?.price || 0;

  useEffect(() => {
    if (!isReversed) {
      const amount = parseFloat(cryptoAmount);
      if (!isNaN(amount)) {
        setFiatAmount((amount * selectedPrice).toFixed(2));
      } else {
        setFiatAmount('');
      }
    } else {
      const amount = parseFloat(fiatAmount);
      if (!isNaN(amount)) {
        setCryptoAmount((amount / selectedPrice).toFixed(8));
      } else {
        setCryptoAmount('');
      }
    }
  }, [cryptoAmount, fiatAmount, selectedPrice, isReversed]);

  const handleSwap = () => {
    setIsReversed(!isReversed);
    const tempCrypto = cryptoAmount;
    setCryptoAmount(fiatAmount);
    setFiatAmount(tempCrypto);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <p className="text-gray-600">Please login to access the trading features.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Trade Crypto</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isReversed ? 'USD Amount' : 'Crypto Amount'}
            </label>
            <div className="flex space-x-2">
              <Input
                type="number"
                value={isReversed ? fiatAmount : cryptoAmount}
                onChange={(e) => isReversed ? setFiatAmount(e.target.value) : setCryptoAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="any"
              />
              {!isReversed && (
                <select
                  className="h-10 rounded-md border border-gray-200 bg-white px-3"
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                >
                  {assets.map((asset) => (
                    <option key={asset.symbol} value={asset.symbol}>
                      {asset.symbol}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={handleSwap}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowUpDown className="h-6 w-6" />
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isReversed ? 'Crypto Amount' : 'USD Amount'}
            </label>
            <div className="flex space-x-2">
              <Input
                type="number"
                value={isReversed ? cryptoAmount : fiatAmount}
                onChange={(e) => isReversed ? setCryptoAmount(e.target.value) : setFiatAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="any"
                readOnly
              />
              {isReversed && (
                <select
                  className="h-10 rounded-md border border-gray-200 bg-white px-3"
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                >
                  {assets.map((asset) => (
                    <option key={asset.symbol} value={asset.symbol}>
                      {asset.symbol}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <Button className="w-full">
            Trade Now
          </Button>
        </div>
      </div>
    </div>
  );
};