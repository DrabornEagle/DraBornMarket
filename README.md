# DraBornMarket Demo v0.1

DraBornMarket için Expo SDK 57 tabanlı, Supabase veya harici API kullanmadan çalışan mobil demo.

## Özellikler

- Market temalı modern ve renkli arayüz
- Ana sayfa, ürün arama, kategori ve sıralama
- Barkod ile demo ürün arama
- Market bazlı fiyat karşılaştırması
- 7 günlük fiyat geçmişi grafiği
- Hedef fiyat belirleme
- Favoriler ve cihazda kalıcı kayıt
- Sepet miktar yönetimi
- Tek market ve bölünmüş sepet toplamı
- Collector yönetim görünümü
- Çoklu giriş ve dokunma animasyonları
- Supabase entegrasyonuna hazır ayrılmış demo veri katmanı

## Expo Go ile çalıştırma

```bash
npm install
npx expo start --clear
```

Terminalde oluşan QR kodunu Android telefondaki güncel Expo Go ile okutun.

## Demo barkodları

- `3017620422003` — Nutella 750 g
- `5449000131805` — Coca-Cola Zero 1 L

## Teknik temel

- Expo SDK 57
- React Native 0.86.2
- React 19.2.3
- TypeScript
- AsyncStorage
- Expo Symbols

## Gerçek veri aşaması

Demo onayından sonra `src/data.ts` içindeki yerel veri katmanı Supabase sorguları ve Collector API sonuçlarıyla değiştirilecektir. Ekran bileşenleri aynı kalacak şekilde tasarlanmıştır.
