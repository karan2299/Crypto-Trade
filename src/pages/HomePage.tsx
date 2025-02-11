import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Asset } from '../types';
import { formatCurrency, formatNumber } from '../lib/utils';
import { CandlestickChartIcon } from 'lucide-react';
const ITEMS_PER_PAGE = 10;

// Add retry configuration and caching
const fetchAssets = async () => {
  try {
    const response = await axios.get(
      'https://data.messari.io/api/v1/assets'
    );
    return response.data.data.map((asset: any) => ({
      id: asset.id,
      symbol: asset.symbol,
      name: asset.name,
      price: asset.metrics.market_data.price_usd,
      change24h: asset.metrics.market_data.percent_change_usd_last_24_hours,
    }));
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw new Error('Failed to fetch assets. Please try again later.');
  }
};

export const HomePage: React.FC = () => {
  const [sortField, setSortField] = useState<'name' | 'price'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAll, setShowAll] = useState(false);

  const { data: assets = [], isLoading, isError, error } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    staleTime: 30000,
    retry: 2, 
    refetchOnWindowFocus: false, 
  });

  const sortedAssets = [...assets].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'name') {
      return modifier * a.name.localeCompare(b.name);
    }
    return modifier * (a.price - b.price);
  });

  const displayedAssets = showAll ? sortedAssets : sortedAssets.slice(0, ITEMS_PER_PAGE);

  const handleSort = (field: 'name' | 'price') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error instanceof Error ? error.message : 'An error occurred while loading the data.'}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                  <div className="flex items-center space-x-1">
                    <span>Price</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                   <CandlestickChartIcon/>
                      <span className="ml-2 font-medium">{asset.symbol}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{asset.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(asset.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center text-green-600`}>
                      {asset.change24h >= 0 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      {formatNumber(Math.abs(asset.change24h))}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative group inline-block">
                      <Button variant="secondary" size="sm">
                        Trade
                      </Button>
                      <div className="hidden group-hover:block absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Buy
                          </button>
                          <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Sell
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {assets.length > ITEMS_PER_PAGE && (
          <div className="px-6 py-4 border-t">
            <Button
              variant="secondary"
              onClick={() => setShowAll(!showAll)}
              className="w-full"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};