export type DkdTab = 'home' | 'search' | 'cart' | 'favorites' | 'profile';

export type DkdMarketOffer = {
  id: string;
  marketId: string;
  marketName: string;
  branchName: string;
  currentPrice: number;
  oldPrice?: number;
  cardPrice?: number;
  inStock: boolean;
  updatedAt: string;
};

export type DkdPricePoint = {
  label: string;
  price: number;
};

export type DkdProduct = {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  amount: string;
  category: string;
  emoji: string;
  color: string;
  rating: number;
  offers: DkdMarketOffer[];
  history: DkdPricePoint[];
};

export type DkdCartMap = Record<string, number>;

export type DkdScreen =
  | { name: 'tabs'; tab: DkdTab }
  | { name: 'product'; productId: string };
