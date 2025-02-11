export interface User {
  email: string;
  id: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  icon: string;
  change24h: number;
}

export interface AuthState {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface TradeFormData {
  cryptoAmount: number;
  fiatAmount: number;
  selectedAsset: string;
}