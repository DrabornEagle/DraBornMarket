# DraBornMarket Demo Mimarisi

## Katmanlar

1. `src/data.ts`: Supabase yerine kullanılan yerel ürün, market, fiyat geçmişi ve collector demo kayıtları.
2. `src/types.ts`: Ürün, teklif, fiyat geçmişi, sepet ve ekran tipleri.
3. `src/components.tsx`: Tekrar kullanılabilir animasyonlu buton, ikon, ürün kartı ve alt menü.
4. `App.tsx`: Ekran akışları, demo kullanıcı durumu ve AsyncStorage kalıcılığı.

## Gerçek veriye geçiş

Gerçek entegrasyonda ekranlar korunacak, yalnızca veri erişim katmanı değiştirilecek:

- `dkd_products` ürün kataloğu
- `dkd_market_offers` güncel fiyatlar
- `dkd_price_history` fiyat geçmişi
- `dkd_market_chains` ve `dkd_market_branches` market/şube bilgileri
- `dkd_collector_runs` ve `dkd_collector_errors` collector durumu

## Demo davranışı

- Favoriler, sepet, hedef fiyatlar ve bildirim seçimi AsyncStorage ile cihazda kalır.
- Market fiyatları yerel demo veri üzerinden karşılaştırılır.
- Barkod ekranı iki örnek barkodu ürün detayına yönlendirir.
- Collector ekranı gerçek görev çalıştırmaz; yönetim panelinin veri görünümünü temsil eder.

## Expo Go sınırı

Bu sürümde APK, kamera barkod taraması, uzak push bildirimi ve gerçek konum/harita bağlantısı yoktur. Bu özellikler gerçek API/Supabase aşamasında geliştirme build’i veya mağaza build’i ile eklenecektir.
