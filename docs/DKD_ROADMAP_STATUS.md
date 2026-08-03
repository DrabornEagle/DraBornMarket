# DraBornMarket Yol Haritası Durumu

Son güncelleme: 3 Ağustos 2026

## Durum işaretleri

- ✅ Tamamlandı ve demo uygulamasında çalışıyor
- 🟡 Demo veya arayüz düzeyinde kısmen hazır; gerçek veri/backend eksik
- ⬜ Henüz başlanmadı

## Mevcut durum özeti

- ✅ Expo SDK 57 tabanlı mobil demo hazır
- ✅ GitHub reposu ve otomatik TypeScript/Expo Doctor doğrulaması hazır
- ✅ Uygulama demo verilerle Expo Go üzerinde çalışıyor
- ✅ Favoriler, sepet, hedef fiyat ve bildirim tercihi cihazda saklanıyor
- 🟡 Collector durumları yalnızca demo veri olarak gösteriliyor
- ⬜ Supabase bağlantısı yok
- ⬜ Gerçek market API bağlantısı yok
- ⬜ Gerçek Collector çalışmıyor
- ⬜ Gerçek fiyat güncellemesi ve zamanlanmış veri toplama yok

---

# Sürüm 0.1 — Veritabanı Temeli

**Durum: ⬜ Başlanmadı**

Kullanıcının isteği doğrultusunda demo veritabanı kullanılmadan hazırlandığı için bu sürüm gerçek anlamda tamamlanmadı.

- ⬜ `dkd_market_chains`
- ⬜ `dkd_market_branches`
- ⬜ `dkd_products`
- ⬜ `dkd_market_offers`
- ⬜ `dkd_price_history`
- ⬜ `dkd_raw_items`
- ⬜ `dkd_collector_runs`
- ⬜ `dkd_collector_errors`
- ⬜ `dkd_product_match_queue`
- ⬜ Gerekli indeksler
- ⬜ RLS güvenlik kuralları
- ⬜ Mobil uygulama için salt okunur erişim
- ⬜ Collector için güvenli sunucu erişimi

**Eksik sonuç:** Supabase henüz gerçek ürün ve fiyat kabul etmiyor.

---

# Sürüm 0.2 — İlk Market Collector Denemesi

**Durum: ⬜ Başlanmadı**

- ⬜ Pilot market seçimi
- ⬜ Resmî API veya izin verilen veri kaynağı araştırması
- ⬜ Kullanım şartlarının kontrolü
- ⬜ Kategorilerin alınması
- ⬜ Ürün listesinin alınması
- ⬜ Ürün detaylarının alınması
- ⬜ Ad, fiyat, görsel ve bağlantı çıkarımı
- ⬜ Ham verilerin Supabase'e kaydedilmesi
- ⬜ Collector çalışma kaydı
- ⬜ Collector hata kaydı
- ⬜ 50–100 gerçek ürün testi
- ⬜ İkinci çalışma testi
- ⬜ Tekrarlanan ürün kontrolü

**Eksik sonuç:** Henüz hiçbir marketten gerçek ürün alınmıyor.

---

# Sürüm 0.3 — Veri Temizleme ve Standartlaştırma

**Durum: 🟡 Yalnızca hazırlanmış demo veri düzeyi**

- 🟡 Demo ürün adları, markaları, miktarları ve kategorileri düzenli formatta hazırlandı
- ⬜ Ham ürün adını otomatik temizleyen sistem
- ⬜ Marka çıkarma algoritması
- ⬜ Gram/kilogram/litre/mililitre dönüşümü
- ⬜ Paket adedi çıkarımı
- 🟡 Demo veride normal ve indirimli fiyat ayrımı gösteriliyor
- ⬜ Para birimi doğrulaması
- ⬜ Bozuk fiyat reddetme
- ⬜ Görsel doğrulama
- ⬜ Kategori ortaklaştırma motoru
- 🟡 Demo stok durumu alanı bulunuyor
- ⬜ Hatalı ürünü inceleme kuyruğuna gönderme

**Eksik sonuç:** Standartlaştırma gerçek Collector verisine otomatik uygulanmıyor.

---

# Sürüm 0.4 — Ürün Eşleştirme Sistemi

**Durum: 🟡 Sonuç arayüzü hazır, eşleştirme motoru yok**

- 🟡 Aynı demo ürün altında farklı market fiyatları gösteriliyor
- ⬜ Barkodla otomatik eşleştirme
- ⬜ Market ürün koduyla market içi eşleştirme
- ⬜ Marka + ürün adı + gramaj karşılaştırması
- ⬜ Paket adedi karşılaştırması
- ⬜ Benzer isim puanlaması
- ⬜ Güven puanı
- ⬜ Şüpheli eşleşme kuyruğu
- ⬜ Elle ayırma
- ⬜ Elle birleştirme

**Hazır demo sonucu:** Kullanıcı örnek ürünlerin market fiyatlarını tek sayfada karşılaştırabiliyor.

**Eksik gerçek sonuç:** Farklı marketlerden gelen ürünler otomatik eşleştirilmiyor.

---

# Sürüm 0.5 — Güncel Fiyat ve Fiyat Geçmişi

**Durum: 🟡 Demo grafik ve fiyat verisi hazır**

- ✅ Ürün detayında demo fiyat geçmişi grafiği
- ✅ Eski fiyat ve güncel fiyat gösterimi
- ✅ Demo indirim oranı hesaplama
- ✅ En ucuz güncel demo fiyatı bulma
- ⬜ Önceki fiyatla veritabanı karşılaştırması
- ⬜ Fiyat değişmediyse yalnızca kontrol zamanını güncelleme
- ⬜ Fiyat değiştiyse güncel teklifi güncelleme
- ⬜ Değişimi `dkd_price_history` tablosuna yazma
- ⬜ Aşırı fiyat değişimini işaretleme
- ⬜ Kaldırılan ürünü pasifleştirme
- ⬜ Uzun süre görülmeyen ürünü arşivleme
- ⬜ Gerçek son görülme zamanı

**Eksik sonuç:** Grafik gerçek Collector geçmişinden oluşmuyor.

---

# Sürüm 0.6 — Çoklu Market Collector Sistemi

**Durum: 🟡 Demo Collector görünümü var, adaptörler yok**

- 🟡 A101, BİM, ŞOK, Migros, CarrefourSA ve Tarım Kredi isimleri demo sistem ekranında bulunuyor
- 🟡 Collector çalışma durumu ve ürün sayısı demo olarak gösteriliyor
- ⬜ Ortak Collector çekirdeği
- ⬜ A101 Collector
- ⬜ BİM Collector
- ⬜ ŞOK Collector
- ⬜ Migros Collector
- ⬜ CarrefourSA Collector
- ⬜ Tarım Kredi Collector
- ⬜ File Market Collector
- ⬜ Metro Türkiye Collector
- ⬜ Yerel market entegrasyon formatı
- ⬜ Bir adaptör bozulduğunda diğerlerinin devam etmesi

**Eksik sonuç:** Hiçbir Collector gerçek veri çekmiyor.

---

# Sürüm 0.7 — Otomatik Çalıştırma

**Durum: 🟡 Repository ve doğrulama otomasyonu hazır**

- ✅ GitHub repository oluşturuldu
- ✅ Kaynak kodlar repository'ye yüklendi
- ✅ GitHub Actions TypeScript kontrolü
- ✅ GitHub Actions Expo Doctor kontrolü
- ⬜ Collector kodları
- ⬜ Supabase bilgilerinin GitHub Secrets'a eklenmesi
- ⬜ Collector test komutu
- ⬜ Zamanlanmış Collector görevi
- ⬜ Market bazlı çalışma saatleri
- ⬜ Üst üste çalışma kilidi
- ⬜ Otomatik yeniden deneme
- ⬜ Uzun süren görevi durdurma
- ⬜ Günlük Collector raporu

**Hazır sonuç:** Uygulama kodu her GitHub güncellemesinde otomatik kontrol edilebiliyor.

**Eksik sonuç:** Market fiyatları telefon kapalıyken otomatik güncellenmiyor.

---

# Sürüm 0.8 — Şube ve Konum Bazlı Fiyatlar

**Durum: 🟡 Statik demo**

- 🟡 Konyaaltı, Antalya demo konumu gösteriliyor
- 🟡 Ürün tekliflerinde demo şube adı bulunuyor
- 🟡 Yakındaki üç market demo olarak gösteriliyor
- ⬜ Gerçek konum izni
- ⬜ En yakın şube sorgusu
- ⬜ Gerçek market şube kimlikleri
- ⬜ İl/ilçe bazlı fiyat kaydı
- ⬜ Online ve fiziksel mağaza fiyat ayrımı
- ⬜ Teslimat bölgesi kontrolü
- ⬜ Şube bazlı gerçek stok
- ⬜ Fiyatın geçerli olduğu gerçek şube bilgisi

**Eksik sonuç:** Konum ve şube fiyatları gerçek servislerden gelmiyor.

---

# Sürüm 0.9 — Collector Yönetim Paneli

**Durum: 🟡 Mobil sistem ön izlemesi var**

- ✅ Profil ekranında demo Collector durum listesi
- ✅ Demo ürün, kuyruk ve adaptör sayaçları
- ✅ Demo son çalışma yaşı ve durum bilgisi
- ⬜ Marketi aktif/pasif yapma
- ⬜ Gerçek son çalışma saati
- ⬜ Gerçek çekilen/değişen ürün sayısı
- ⬜ Gerçek hata sayısı
- ⬜ Collector'ı elle çalıştırma
- ⬜ Eşleştirilemeyen ürün listesi
- ⬜ Ürün birleştirme/ayırma
- ⬜ Şüpheli fiyat onayı
- ⬜ Veri kaynağı bozulma uyarısı
- ⬜ Günlük/haftalık rapor

**Eksik sonuç:** Collector teknik işlem yapmadan yönetilemiyor.

---

# Sürüm 1.0 — DraBornMarket İlk Yayın

**Durum: 🟡 Mobil demo büyük ölçüde hazır; gerçek veri ve yayın altyapısı eksik**

## Tamamlanan demo özellikleri

- ✅ Ürün arama
- 🟡 Barkod numarası girerek arama
- ⬜ Gerçek kamera ile barkod tarama
- ✅ Market fiyatlarını karşılaştırma
- ✅ En ucuz fiyatı gösterme
- ✅ En ucuz marketi gösterme
- ✅ Demo fiyat geçmişi grafiği
- ✅ Favori ürünler
- ✅ Hedef fiyat belirleme ve cihazda saklama
- ✅ Alışveriş sepeti/listesi
- ✅ Demo sepet toplamını marketlere göre karşılaştırma
- ✅ Demo bölünmüş sepet tasarruf hesabı
- 🟡 Yakındaki marketlerin statik gösterimi
- ✅ Demo güncellenme zamanının gösterimi
- ✅ Expo Go üzerinde modern mobil arayüz
- ✅ Dokunma ve giriş animasyonları
- ✅ Cihazda yerel kullanıcı tercihi saklama

## Eksik yayın özellikleri

- ⬜ Gerçek API/Supabase ürün araması
- ⬜ Gerçek kamera barkod taraması
- ⬜ Gerçek hedef fiyat bildirimi
- ⬜ Push bildirim sistemi
- ⬜ Gerçek kullanıcı konumu
- ⬜ Gerçek yakın market ve şube fiyatları
- ⬜ Hatalı fiyat bildirme butonu ve kayıt sistemi
- ⬜ Collector testleri
- ⬜ Supabase/RLS güvenlik testleri
- ⬜ Gerçek veri doğrulaması
- ⬜ Yayın öncesi performans testleri
- ⬜ APK/AAB ve mağaza yayını

---

# Sürüm 1.1 — Kampanyalar

**Durum: 🟡 Basit demo indirim görünümü var**

- 🟡 Eski fiyat, yeni fiyat ve indirim yüzdesi gösteriliyor
- 🟡 Bazı tekliflerde demo kart fiyatı alanı var
- ⬜ Çok al az öde kampanyası
- ⬜ Kartlı/kartsız fiyat sistemi
- ⬜ Haftalık kataloglar
- ⬜ Kuponlar
- ⬜ Kampanya başlangıç ve bitiş tarihleri

---

# Sürüm 1.2 — Akıllı Sepet

**Durum: 🟡 İlk demo mantığı hazır**

- 🟡 Sepeti tek marketten hesaplama; şu anda örnek olarak Migros kullanılıyor
- ✅ Her ürünü demo teklifler içindeki en ucuz markete bölerek toplam hesaplama
- ✅ Demo tasarruf farkı gösterme
- ⬜ Bütün marketler için tek-market karşılaştırması
- ⬜ Gerçek şube stoklarını hesaba katma
- ⬜ Yol maliyetini hesaba katma
- ⬜ Alternatif ürün önerme
- ⬜ Gerçek rota ve mesafe optimizasyonu

---

# Sürüm 1.3 — Yerel Marketler

**Durum: ⬜ Başlanmadı**

- ⬜ Market yönetim paneli
- ⬜ Excel/CSV ürün yükleme
- ⬜ POS entegrasyonu
- ⬜ Yerel market API standardı
- ⬜ Marketlerin kendi fiyatlarını güncellemesi

---

# Sürüm 1.4 — Fiş Toplama

**Durum: ⬜ Başlanmadı**

- ⬜ Fiş fotoğrafı yükleme
- ⬜ Fişten ürün ve fiyat okuma
- ⬜ Şube fiyatı doğrulama
- ⬜ Yanlış veriyi incelemeye gönderme
- ⬜ Katkı puanı sistemi

---

# Arayüz düzeltmeleri

- ✅ Ana sayfadaki hızlı işlem kartlarının daralıp yazıları dikey bölmesi düzeltildi
- ✅ Animasyonlu kartların dış kapsayıcı genişliği korundu
- ✅ Ürün kartlarında fiyat/market alanının taşması azaltıldı
- ✅ Alt menü etiketleri tek satırla sınırlandı
- ✅ `react-native-safe-area-context` eklendi
- ✅ Safe area sağlayıcısı uygulama köküne eklendi
- ✅ Expo Go geliştirme ekranındaki eski `SafeAreaView` uyarı penceresi engellendi

# Bir sonraki doğru adım

Demo arayüzü onaylandıktan sonra önce **Sürüm 0.1 Supabase veritabanı temeli**, ardından **Sürüm 0.2 tek pilot market Collector** yapılmalıdır. Gerçek Collector ve veritabanı tamamlanmadan 0.3–0.9 sürümlerini tamamlanmış saymamak gerekir.
