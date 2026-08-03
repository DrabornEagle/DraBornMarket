import type { DkdProduct } from './types';

export const dkdCategories = [
  { id: 'all', label: 'Tümü', emoji: '✨' },
  { id: 'İçecek', label: 'İçecek', emoji: '🥤' },
  { id: 'Atıştırmalık', label: 'Atıştırmalık', emoji: '🍫' },
  { id: 'Kahvaltılık', label: 'Kahvaltılık', emoji: '🥣' },
  { id: 'Temizlik', label: 'Temizlik', emoji: '🧼' },
  { id: 'Meyve & Sebze', label: 'Meyve & Sebze', emoji: '🥬' },
  { id: 'Süt Ürünleri', label: 'Süt Ürünleri', emoji: '🥛' },
];

export const dkdProducts: DkdProduct[] = [
  {
    id: 'nutella-750', barcode: '3017620422003', name: 'Nutella Fındık Kreması', brand: 'Nutella', amount: '750 g', category: 'Kahvaltılık', emoji: '🍫', color: '#FFF0D9', rating: 4.9,
    offers: [
      { id: 'o1', marketId: 'a101', marketName: 'A101', branchName: 'Konyaaltı', currentPrice: 249.90, oldPrice: 279.90, inStock: true, updatedAt: '8 dk önce' },
      { id: 'o2', marketId: 'carrefour', marketName: 'CarrefourSA', branchName: '5M Migros yanı', currentPrice: 259.90, cardPrice: 239.90, inStock: true, updatedAt: '12 dk önce' },
      { id: 'o3', marketId: 'migros', marketName: 'Migros', branchName: 'Liman', currentPrice: 265.50, oldPrice: 275.00, inStock: true, updatedAt: '18 dk önce' },
    ],
    history: [{ label: 'Pzt', price: 279.9 }, { label: 'Sal', price: 274.9 }, { label: 'Çar', price: 269.9 }, { label: 'Per', price: 269.9 }, { label: 'Cum', price: 259.9 }, { label: 'Cmt', price: 249.9 }, { label: 'Paz', price: 249.9 }],
  },
  {
    id: 'coca-cola-zero-1l', barcode: '5449000131805', name: 'Coca-Cola Zero', brand: 'Coca-Cola', amount: '1 L', category: 'İçecek', emoji: '🥤', color: '#FFE6E6', rating: 4.7,
    offers: [
      { id: 'o4', marketId: 'sok', marketName: 'ŞOK', branchName: 'Hurma', currentPrice: 39.50, oldPrice: 44.90, inStock: true, updatedAt: '6 dk önce' },
      { id: 'o5', marketId: 'migros', marketName: 'Migros', branchName: 'Liman', currentPrice: 42.90, cardPrice: 38.90, inStock: true, updatedAt: '15 dk önce' },
      { id: 'o6', marketId: 'carrefour', marketName: 'CarrefourSA', branchName: 'Konyaaltı', currentPrice: 43.50, inStock: true, updatedAt: '20 dk önce' },
    ],
    history: [{ label: 'Pzt', price: 44.9 }, { label: 'Sal', price: 44.9 }, { label: 'Çar', price: 42.9 }, { label: 'Per', price: 42.9 }, { label: 'Cum', price: 39.5 }, { label: 'Cmt', price: 39.5 }, { label: 'Paz', price: 39.5 }],
  },
  {
    id: 'sutas-sut-1l', barcode: '8690766111019', name: 'Tam Yağlı Süt', brand: 'Sütaş', amount: '1 L', category: 'Süt Ürünleri', emoji: '🥛', color: '#E7F1FF', rating: 4.8,
    offers: [
      { id: 'o7', marketId: 'bim', marketName: 'BİM', branchName: 'Uncalı', currentPrice: 36.75, inStock: true, updatedAt: '10 dk önce' },
      { id: 'o8', marketId: 'a101', marketName: 'A101', branchName: 'Konyaaltı', currentPrice: 37.50, oldPrice: 39.50, inStock: true, updatedAt: '14 dk önce' },
      { id: 'o9', marketId: 'migros', marketName: 'Migros', branchName: 'Liman', currentPrice: 39.95, cardPrice: 35.95, inStock: true, updatedAt: '22 dk önce' },
    ],
    history: [{ label: 'Pzt', price: 39.5 }, { label: 'Sal', price: 39.5 }, { label: 'Çar', price: 39.5 }, { label: 'Per', price: 38.5 }, { label: 'Cum', price: 37.5 }, { label: 'Cmt', price: 36.75 }, { label: 'Paz', price: 36.75 }],
  },
  {
    id: 'lays-klasik-150', barcode: '8690624204303', name: 'Klasik Patates Cipsi', brand: "Lay's", amount: '150 g', category: 'Atıştırmalık', emoji: '🥔', color: '#FFF6CE', rating: 4.6,
    offers: [
      { id: 'o10', marketId: 'carrefour', marketName: 'CarrefourSA', branchName: 'Konyaaltı', currentPrice: 49.90, oldPrice: 59.90, inStock: true, updatedAt: '9 dk önce' },
      { id: 'o11', marketId: 'sok', marketName: 'ŞOK', branchName: 'Hurma', currentPrice: 52.50, inStock: true, updatedAt: '17 dk önce' },
      { id: 'o12', marketId: 'migros', marketName: 'Migros', branchName: 'Liman', currentPrice: 54.90, cardPrice: 47.90, inStock: true, updatedAt: '24 dk önce' },
    ],
    history: [{ label: 'Pzt', price: 59.9 }, { label: 'Sal', price: 59.9 }, { label: 'Çar', price: 57.5 }, { label: 'Per', price: 54.9 }, { label: 'Cum', price: 54.9 }, { label: 'Cmt', price: 49.9 }, { label: 'Paz', price: 49.9 }],
  },
  {
    id: 'fairy-platinum-50', barcode: '8006540991221', name: 'Platinum Bulaşık Tableti', brand: 'Fairy', amount: '50 adet', category: 'Temizlik', emoji: '🫧', color: '#E6FFF8', rating: 4.9,
    offers: [
      { id: 'o13', marketId: 'migros', marketName: 'Migros', branchName: 'Liman', currentPrice: 329.90, oldPrice: 399.90, cardPrice: 299.90, inStock: true, updatedAt: '11 dk önce' },
      { id: 'o14', marketId: 'carrefour', marketName: 'CarrefourSA', branchName: 'Konyaaltı', currentPrice: 339.90, oldPrice: 379.90, inStock: true, updatedAt: '16 dk önce' },
      { id: 'o15', marketId: 'metro', marketName: 'Metro Türkiye', branchName: 'Kepez', currentPrice: 349.90, inStock: true, updatedAt: '29 dk önce' },
    ],
    history: [{ label: 'Pzt', price: 399.9 }, { label: 'Sal', price: 389.9 }, { label: 'Çar', price: 379.9 }, { label: 'Per', price: 369.9 }, { label: 'Cum', price: 349.9 }, { label: 'Cmt', price: 339.9 }, { label: 'Paz', price: 329.9 }],
  },
  {
    id: 'banana-kg', barcode: '2900000000012', name: 'Yerli Muz', brand: 'Manav', amount: '1 kg', category: 'Meyve & Sebze', emoji: '🍌', color: '#FFF7C2', rating: 4.5,
    offers: [
      { id: 'o16', marketId: 'tarim', marketName: 'Tarım Kredi', branchName: 'Uncalı', currentPrice: 64.90, oldPrice: 74.90, inStock: true, updatedAt: '7 dk önce' },
      { id: 'o17', marketId: 'bim', marketName: 'BİM', branchName: 'Uncalı', currentPrice: 67.50, inStock: true, updatedAt: '13 dk önce' },
      { id: 'o18', marketId: 'migros', marketName: 'Migros', branchName: 'Liman', currentPrice: 72.90, inStock: false, updatedAt: '31 dk önce' },
    ],
    history: [{ label: 'Pzt', price: 74.9 }, { label: 'Sal', price: 74.9 }, { label: 'Çar', price: 72.9 }, { label: 'Per', price: 69.9 }, { label: 'Cum', price: 69.9 }, { label: 'Cmt', price: 64.9 }, { label: 'Paz', price: 64.9 }],
  },
  {
    id: 'nescafe-gold-200', barcode: '7613034381190', name: 'Gold Çözünebilir Kahve', brand: 'Nescafé', amount: '200 g', category: 'Kahvaltılık', emoji: '☕', color: '#F3E7DC', rating: 4.8,
    offers: [
      { id: 'o19', marketId: 'a101', marketName: 'A101', branchName: 'Konyaaltı', currentPrice: 219.90, oldPrice: 259.90, inStock: true, updatedAt: '5 dk önce' },
      { id: 'o20', marketId: 'sok', marketName: 'ŞOK', branchName: 'Hurma', currentPrice: 229.90, inStock: true, updatedAt: '19 dk önce' },
      { id: 'o21', marketId: 'migros', marketName: 'Migros', branchName: 'Liman', currentPrice: 239.90, cardPrice: 214.90, inStock: true, updatedAt: '26 dk önce' },
    ],
    history: [{ label: 'Pzt', price: 259.9 }, { label: 'Sal', price: 259.9 }, { label: 'Çar', price: 249.9 }, { label: 'Per', price: 239.9 }, { label: 'Cum', price: 229.9 }, { label: 'Cmt', price: 219.9 }, { label: 'Paz', price: 219.9 }],
  },
  {
    id: 'persil-6kg', barcode: '8690570541345', name: 'Derin Temizleme Toz Deterjan', brand: 'Persil', amount: '6 kg', category: 'Temizlik', emoji: '🧺', color: '#E9F4FF', rating: 4.7,
    offers: [
      { id: 'o22', marketId: 'carrefour', marketName: 'CarrefourSA', branchName: 'Konyaaltı', currentPrice: 449.90, oldPrice: 549.90, inStock: true, updatedAt: '14 dk önce' },
      { id: 'o23', marketId: 'metro', marketName: 'Metro Türkiye', branchName: 'Kepez', currentPrice: 469.90, inStock: true, updatedAt: '27 dk önce' },
      { id: 'o24', marketId: 'migros', marketName: 'Migros', branchName: 'Liman', currentPrice: 489.90, cardPrice: 439.90, inStock: true, updatedAt: '35 dk önce' },
    ],
    history: [{ label: 'Pzt', price: 549.9 }, { label: 'Sal', price: 529.9 }, { label: 'Çar', price: 519.9 }, { label: 'Per', price: 499.9 }, { label: 'Cum', price: 479.9 }, { label: 'Cmt', price: 459.9 }, { label: 'Paz', price: 449.9 }],
  },
];

export const dkdCollectorMarkets = [
  { name: 'Migros', state: 'Güncel', items: 1248, age: '8 dk', color: '#FF7A00' },
  { name: 'CarrefourSA', state: 'Güncel', items: 986, age: '12 dk', color: '#2D7FF9' },
  { name: 'ŞOK', state: 'Güncel', items: 742, age: '17 dk', color: '#F2C500' },
  { name: 'A101', state: 'Güncel', items: 811, age: '21 dk', color: '#00A0E3' },
  { name: 'BİM', state: 'Demo', items: 534, age: '35 dk', color: '#E21E2B' },
  { name: 'Tarım Kredi', state: 'Demo', items: 422, age: '44 dk', color: '#278443' },
];

export const dkdGetBestPrice = (product: DkdProduct) => Math.min(...product.offers.filter((offer) => offer.inStock).map((offer) => offer.cardPrice ?? offer.currentPrice));
export const dkdGetDiscount = (product: DkdProduct) => {
  const bestOffer = [...product.offers].filter((offer) => offer.inStock).sort((first, second) => (first.cardPrice ?? first.currentPrice) - (second.cardPrice ?? second.currentPrice))[0];
  if (!bestOffer?.oldPrice) return 0;
  const finalPrice = bestOffer.cardPrice ?? bestOffer.currentPrice;
  return Math.round(((bestOffer.oldPrice - finalPrice) / bestOffer.oldPrice) * 100);
};
export const dkdFormatPrice = (value: number) => `${value.toFixed(2).replace('.', ',')} TL`;
