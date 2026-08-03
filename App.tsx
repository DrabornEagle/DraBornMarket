import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  LayoutAnimation,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { DkdAnimatedPressable, DkdBottomNav, DkdEntrance, DkdIcon, DkdProductCard, DkdSectionHeader } from './src/components';
import { dkdCategories, dkdCollectorMarkets, dkdFormatPrice, dkdGetBestPrice, dkdGetDiscount, dkdProducts } from './src/data';
import { dkdColors, dkdRadius } from './src/theme';
import type { DkdCartMap, DkdProduct, DkdScreen, DkdTab } from './src/types';

const DKD_STORAGE_KEY = 'dkd_drabornmarket_demo_v01';

type DkdStoredState = {
  favorites: string[];
  cart: DkdCartMap;
  targets: Record<string, number>;
  notifications: boolean;
};

export default function App() {
  const [dkdScreen, setDkdScreen] = useState<DkdScreen>({ name: 'tabs', tab: 'home' });
  const [dkdFavorites, setDkdFavorites] = useState<string[]>(['nutella-750', 'fairy-platinum-50']);
  const [dkdCart, setDkdCart] = useState<DkdCartMap>({ 'coca-cola-zero-1l': 2, 'sutas-sut-1l': 1 });
  const [dkdTargets, setDkdTargets] = useState<Record<string, number>>({ 'nutella-750': 230 });
  const [dkdNotifications, setDkdNotifications] = useState(true);
  const [dkdHydrated, setDkdHydrated] = useState(false);
  const [dkdScannerVisible, setDkdScannerVisible] = useState(false);
  const [dkdBarcode, setDkdBarcode] = useState('');
  const [dkdToast, setDkdToast] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(DKD_STORAGE_KEY)
      .then((dkdValue) => {
        if (!dkdValue) return;
        const dkdState = JSON.parse(dkdValue) as Partial<DkdStoredState>;
        if (Array.isArray(dkdState.favorites)) setDkdFavorites(dkdState.favorites);
        if (dkdState.cart) setDkdCart(dkdState.cart);
        if (dkdState.targets) setDkdTargets(dkdState.targets);
        if (typeof dkdState.notifications === 'boolean') setDkdNotifications(dkdState.notifications);
      })
      .catch(() => undefined)
      .finally(() => setDkdHydrated(true));
  }, []);

  useEffect(() => {
    if (!dkdHydrated) return;
    const dkdState: DkdStoredState = { favorites: dkdFavorites, cart: dkdCart, targets: dkdTargets, notifications: dkdNotifications };
    AsyncStorage.setItem(DKD_STORAGE_KEY, JSON.stringify(dkdState)).catch(() => undefined);
  }, [dkdCart, dkdFavorites, dkdHydrated, dkdNotifications, dkdTargets]);

  useEffect(() => {
    if (!dkdToast) return;
    const dkdTimer = setTimeout(() => setDkdToast(null), 1700);
    return () => clearTimeout(dkdTimer);
  }, [dkdToast]);

  const dkdOpenTab = (dkdTab: DkdTab) => setDkdScreen({ name: 'tabs', tab: dkdTab });
  const dkdOpenProduct = (dkdProductId: string) => setDkdScreen({ name: 'product', productId: dkdProductId });
  const dkdCartCount = Object.values(dkdCart).reduce((dkdTotal, dkdQuantity) => dkdTotal + dkdQuantity, 0);

  const dkdToggleFavorite = (dkdProductId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDkdFavorites((dkdCurrent) => dkdCurrent.includes(dkdProductId) ? dkdCurrent.filter((dkdId) => dkdId !== dkdProductId) : [...dkdCurrent, dkdProductId]);
  };

  const dkdAdd = (dkdProductId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDkdCart((dkdCurrent) => ({ ...dkdCurrent, [dkdProductId]: (dkdCurrent[dkdProductId] ?? 0) + 1 }));
    setDkdToast(`${dkdProducts.find((dkdProduct) => dkdProduct.id === dkdProductId)?.name ?? 'Ürün'} sepete eklendi`);
  };

  const dkdChangeQuantity = (dkdProductId: string, dkdDelta: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDkdCart((dkdCurrent) => {
      const dkdNextQuantity = (dkdCurrent[dkdProductId] ?? 0) + dkdDelta;
      const dkdNext = { ...dkdCurrent };
      if (dkdNextQuantity <= 0) delete dkdNext[dkdProductId];
      else dkdNext[dkdProductId] = dkdNextQuantity;
      return dkdNext;
    });
  };

  const dkdSearchBarcode = () => {
    const dkdProduct = dkdProducts.find((dkdItem) => dkdItem.barcode === dkdBarcode.trim());
    if (!dkdProduct) {
      Alert.alert('Ürün bulunamadı', 'Demo barkodu deneyin: 3017620422003 veya 5449000131805.');
      return;
    }
    setDkdBarcode('');
    setDkdScannerVisible(false);
    dkdOpenProduct(dkdProduct.id);
  };

  const dkdTab = dkdScreen.name === 'tabs' ? dkdScreen.tab : 'home';
  const dkdProduct = dkdScreen.name === 'product' ? dkdProducts.find((dkdItem) => dkdItem.id === dkdScreen.productId) : undefined;

  return (
    <SafeAreaView style={dkdStyles.safe}>
      <StatusBar style="dark" />
      <View style={dkdStyles.app}>
        <View style={dkdStyles.body}>
          {dkdProduct ? (
            <DkdProductDetail
              product={dkdProduct}
              favorite={dkdFavorites.includes(dkdProduct.id)}
              target={dkdTargets[dkdProduct.id]}
              onBack={() => dkdOpenTab('home')}
              onFavorite={() => dkdToggleFavorite(dkdProduct.id)}
              onAdd={() => dkdAdd(dkdProduct.id)}
              onTarget={(dkdValue) => setDkdTargets((dkdCurrent) => ({ ...dkdCurrent, [dkdProduct.id]: dkdValue }))}
            />
          ) : null}
          {dkdScreen.name === 'tabs' && dkdTab === 'home' ? <DkdHome favorites={dkdFavorites} onProduct={dkdOpenProduct} onFavorite={dkdToggleFavorite} onAdd={dkdAdd} onTab={dkdOpenTab} onScanner={() => setDkdScannerVisible(true)} /> : null}
          {dkdScreen.name === 'tabs' && dkdTab === 'search' ? <DkdSearch favorites={dkdFavorites} onProduct={dkdOpenProduct} onFavorite={dkdToggleFavorite} onAdd={dkdAdd} onScanner={() => setDkdScannerVisible(true)} /> : null}
          {dkdScreen.name === 'tabs' && dkdTab === 'cart' ? <DkdCart cart={dkdCart} onChange={dkdChangeQuantity} onProduct={dkdOpenProduct} /> : null}
          {dkdScreen.name === 'tabs' && dkdTab === 'favorites' ? <DkdFavorites favorites={dkdFavorites} onProduct={dkdOpenProduct} onFavorite={dkdToggleFavorite} onAdd={dkdAdd} onSearch={() => dkdOpenTab('search')} /> : null}
          {dkdScreen.name === 'tabs' && dkdTab === 'profile' ? <DkdProfile notifications={dkdNotifications} onNotifications={setDkdNotifications} onReset={() => { setDkdFavorites([]); setDkdCart({}); setDkdTargets({}); setDkdToast('Demo verileri sıfırlandı'); }} /> : null}
        </View>
        {dkdScreen.name === 'tabs' ? <DkdBottomNav active={dkdTab} cartCount={dkdCartCount} onChange={dkdOpenTab} /> : null}
        {dkdToast ? <View style={dkdStyles.toast}><DkdIcon ios="checkmark.circle.fill" android="check_circle" size={19} color={dkdColors.white} /><Text style={dkdStyles.toastText}>{dkdToast}</Text></View> : null}
      </View>

      <Modal visible={dkdScannerVisible} transparent animationType="fade" onRequestClose={() => setDkdScannerVisible(false)}>
        <View style={dkdStyles.modalBackdrop}>
          <View style={dkdStyles.modalCard}>
            <View style={dkdStyles.rowBetween}>
              <View style={dkdStyles.flex}><Text style={dkdStyles.modalTitle}>Barkod ile ara</Text><Text style={dkdStyles.muted}>Kamera yerine demo barkodunu girin.</Text></View>
              <Pressable onPress={() => setDkdScannerVisible(false)} style={dkdStyles.iconButton}><DkdIcon ios="xmark" android="close" /></Pressable>
            </View>
            <View style={dkdStyles.scannerBox}><DkdIcon ios="barcode.viewfinder" android="barcode_scanner" size={68} color={dkdColors.primary} /><View style={dkdStyles.scanLine} /></View>
            <TextInput value={dkdBarcode} onChangeText={setDkdBarcode} keyboardType="number-pad" placeholder="3017620422003" placeholderTextColor={dkdColors.inkMuted} style={dkdStyles.input} />
            <DkdPrimaryButton label="Ürünü Bul" icon="arrow_forward" onPress={dkdSearchBarcode} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function DkdPageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return <DkdEntrance><Text style={dkdStyles.pageTitle}>{title}</Text><Text style={dkdStyles.pageSubtitle}>{subtitle}</Text></DkdEntrance>;
}

function DkdPrimaryButton({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  return <DkdAnimatedPressable onPress={onPress} style={dkdStyles.primaryButton}><Text style={dkdStyles.primaryButtonText}>{label}</Text><DkdIcon ios="arrow.right" android={icon} size={20} color={dkdColors.white} /></DkdAnimatedPressable>;
}

function DkdHome({ favorites, onProduct, onFavorite, onAdd, onTab, onScanner }: { favorites: string[]; onProduct: (dkdId: string) => void; onFavorite: (dkdId: string) => void; onAdd: (dkdId: string) => void; onTab: (dkdTab: DkdTab) => void; onScanner: () => void }) {
  const dkdDeals = [...dkdProducts].sort((dkdFirst, dkdSecond) => dkdGetDiscount(dkdSecond) - dkdGetDiscount(dkdFirst)).slice(0, 5);
  return (
    <ScrollView contentContainerStyle={dkdStyles.scroll} showsVerticalScrollIndicator={false}>
      <DkdEntrance>
        <View style={dkdStyles.rowBetween}><View><Text style={dkdStyles.brand}>DRABORNMARKET</Text><Text style={dkdStyles.heroHeading}>Market fiyatını değil,{`\n`}en doğru fiyatı bul.</Text></View><View style={dkdStyles.iconButton}><DkdIcon ios="bell.fill" android="notifications" /></View></View>
        <View style={dkdStyles.location}><DkdIcon ios="location.fill" android="location_on" size={17} color={dkdColors.primary} /><Text style={dkdStyles.locationText}>Konyaaltı, Antalya</Text></View>
      </DkdEntrance>
      <Pressable onPress={() => onTab('search')} style={dkdStyles.searchFake}><DkdIcon ios="magnifyingglass" android="search" color={dkdColors.inkMuted} /><Text style={dkdStyles.searchFakeText}>Ürün, marka veya barkod ara</Text><Pressable onPress={(dkdEvent) => { dkdEvent.stopPropagation(); onScanner(); }} style={dkdStyles.scanButton}><DkdIcon ios="barcode.viewfinder" android="barcode_scanner" color={dkdColors.primary} /></Pressable></Pressable>
      <DkdEntrance delay={100}>
        <View style={dkdStyles.heroCard}><View style={dkdStyles.flex}><Text style={dkdStyles.heroKicker}>AKILLI SEPET</Text><Text style={dkdStyles.heroTitle}>Aynı sepet,{`\n`}126,40 TL daha ucuz.</Text><Text style={dkdStyles.heroText}>Ürünleri marketlere bölerek toplamı düşür.</Text><Pressable onPress={() => onTab('cart')} style={dkdStyles.heroAction}><Text style={dkdStyles.heroActionText}>Sepeti İncele</Text></Pressable></View><Text style={dkdStyles.heroEmoji}>🛒</Text></View>
      </DkdEntrance>
      <View style={dkdStyles.quickGrid}>
        <DkdQuick label="Barkod Tara" detail="Anında karşılaştır" emoji="▥" color={dkdColors.primarySoft} onPress={onScanner} />
        <DkdQuick label="Kampanyalar" detail="Gerçek indirimler" emoji="%" color={dkdColors.secondarySoft} onPress={() => onTab('search')} />
        <DkdQuick label="Akıllı Sepet" detail="Toplamı düşür" emoji="✦" color="#ECEBFF" onPress={() => onTab('cart')} />
        <DkdQuick label="Yakındaki" detail="Şube fiyatları" emoji="⌖" color="#FFE9E3" onPress={() => Alert.alert('Yakındaki Marketler', 'Konyaaltı çevresindeki demo şubeler gösteriliyor.')} />
      </View>
      <View style={dkdStyles.section}><DkdSectionHeader title="Kategoriler" action="Tümünü Gör" onAction={() => onTab('search')} /><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={dkdStyles.horizontalGap}>{dkdCategories.slice(1).map((dkdCategory) => <Pressable key={dkdCategory.id} onPress={() => onTab('search')} style={dkdStyles.category}><Text style={dkdStyles.categoryEmoji}>{dkdCategory.emoji}</Text><Text style={dkdStyles.categoryText}>{dkdCategory.label}</Text></Pressable>)}</ScrollView></View>
      <View style={dkdStyles.section}><DkdSectionHeader title="Bugünün Fiyat Düşüşleri" action="Tümünü Gör" onAction={() => onTab('search')} /><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={dkdStyles.horizontalGap}>{dkdDeals.map((dkdProduct) => <DkdProductCard key={dkdProduct.id} product={dkdProduct} favorite={favorites.includes(dkdProduct.id)} onOpen={() => onProduct(dkdProduct.id)} onFavorite={() => onFavorite(dkdProduct.id)} onAdd={() => onAdd(dkdProduct.id)} />)}</ScrollView></View>
      <View style={dkdStyles.section}><DkdSectionHeader title="Yakındaki Marketler" action="3 şube" /><View style={dkdStyles.panel}>{['Migros Liman • 750 m', 'A101 Konyaaltı • 1,1 km', 'CarrefourSA • 1,4 km'].map((dkdMarket, dkdIndex) => <View key={dkdMarket} style={[dkdStyles.listRow, dkdIndex > 0 && dkdStyles.topLine]}><View style={[dkdStyles.marketMark, { backgroundColor: [dkdColors.secondary, dkdColors.blue, dkdColors.accent][dkdIndex] }]}><Text style={dkdStyles.marketMarkText}>{dkdMarket[0]}</Text></View><Text style={dkdStyles.listTitle}>{dkdMarket}</Text><DkdIcon ios="chevron.right" android="chevron_right" color={dkdColors.inkMuted} /></View>)}</View></View>
    </ScrollView>
  );
}

function DkdQuick({ label, detail, emoji, color, onPress }: { label: string; detail: string; emoji: string; color: string; onPress: () => void }) {
  return <DkdAnimatedPressable onPress={onPress} style={[dkdStyles.quick, { backgroundColor: color }]}><Text style={dkdStyles.quickEmoji}>{emoji}</Text><Text style={dkdStyles.quickLabel}>{label}</Text><Text style={dkdStyles.muted}>{detail}</Text></DkdAnimatedPressable>;
}

function DkdSearch({ favorites, onProduct, onFavorite, onAdd, onScanner }: { favorites: string[]; onProduct: (dkdId: string) => void; onFavorite: (dkdId: string) => void; onAdd: (dkdId: string) => void; onScanner: () => void }) {
  const [dkdQuery, setDkdQuery] = useState('');
  const [dkdCategory, setDkdCategory] = useState('all');
  const [dkdSort, setDkdSort] = useState<'price' | 'discount'>('price');
  const dkdResults = useMemo(() => {
    const dkdNeedle = dkdQuery.toLocaleLowerCase('tr-TR').trim();
    return [...dkdProducts].filter((dkdProduct) => dkdCategory === 'all' || dkdProduct.category === dkdCategory).filter((dkdProduct) => !dkdNeedle || `${dkdProduct.brand} ${dkdProduct.name} ${dkdProduct.barcode}`.toLocaleLowerCase('tr-TR').includes(dkdNeedle)).sort((dkdFirst, dkdSecond) => dkdSort === 'price' ? dkdGetBestPrice(dkdFirst) - dkdGetBestPrice(dkdSecond) : dkdGetDiscount(dkdSecond) - dkdGetDiscount(dkdFirst));
  }, [dkdCategory, dkdQuery, dkdSort]);
  return (
    <ScrollView contentContainerStyle={dkdStyles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <DkdPageHeader title="Ürün Ara" subtitle="Ürün, marka veya barkod ile marketleri karşılaştır." />
      <View style={dkdStyles.searchInput}><DkdIcon ios="magnifyingglass" android="search" color={dkdColors.inkMuted} /><TextInput value={dkdQuery} onChangeText={setDkdQuery} placeholder="Ne arıyorsunuz?" placeholderTextColor={dkdColors.inkMuted} style={dkdStyles.flexInput} /><Pressable onPress={onScanner}><DkdIcon ios="barcode.viewfinder" android="barcode_scanner" color={dkdColors.primary} /></Pressable></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={dkdStyles.chips}>{dkdCategories.map((dkdItem) => <Pressable key={dkdItem.id} onPress={() => setDkdCategory(dkdItem.id)} style={[dkdStyles.chip, dkdCategory === dkdItem.id && dkdStyles.chipActive]}><Text style={[dkdStyles.chipText, dkdCategory === dkdItem.id && dkdStyles.chipTextActive]}>{dkdItem.emoji} {dkdItem.label}</Text></Pressable>)}</ScrollView>
      <View style={dkdStyles.rowBetween}><Text style={dkdStyles.resultText}>{dkdResults.length} ürün bulundu</Text><View style={dkdStyles.sortWrap}><Pressable onPress={() => setDkdSort('price')} style={[dkdStyles.sort, dkdSort === 'price' && dkdStyles.sortActive]}><Text style={dkdStyles.sortText}>En ucuz</Text></Pressable><Pressable onPress={() => setDkdSort('discount')} style={[dkdStyles.sort, dkdSort === 'discount' && dkdStyles.sortActive]}><Text style={dkdStyles.sortText}>İndirim</Text></Pressable></View></View>
      <View style={dkdStyles.grid}>{dkdResults.map((dkdProduct) => <View key={dkdProduct.id} style={dkdStyles.gridItem}><DkdProductCard compact product={dkdProduct} favorite={favorites.includes(dkdProduct.id)} onOpen={() => onProduct(dkdProduct.id)} onFavorite={() => onFavorite(dkdProduct.id)} onAdd={() => onAdd(dkdProduct.id)} /></View>)}</View>
      {!dkdResults.length ? <DkdEmpty emoji="🔎" title="Ürün bulunamadı" text="Arama kelimesini veya kategoriyi değiştirin." /> : null}
    </ScrollView>
  );
}

function DkdProductDetail({ product, favorite, target, onBack, onFavorite, onAdd, onTarget }: { product: DkdProduct; favorite: boolean; target?: number; onBack: () => void; onFavorite: () => void; onAdd: () => void; onTarget: (dkdValue: number) => void }) {
  const dkdBest = dkdGetBestPrice(product);
  const dkdTarget = target ?? Math.max(5, Math.floor(dkdBest / 5) * 5 - 10);
  const dkdMax = Math.max(...product.history.map((dkdPoint) => dkdPoint.price));
  return (
    <View style={dkdStyles.detailRoot}>
      <ScrollView contentContainerStyle={dkdStyles.detailScroll} showsVerticalScrollIndicator={false}>
        <View style={dkdStyles.detailHeader}><Pressable onPress={onBack} style={dkdStyles.iconButton}><DkdIcon ios="chevron.left" android="arrow_back" /></Pressable><Text style={dkdStyles.detailHeaderText}>Ürün Detayı</Text><Pressable onPress={onFavorite} style={dkdStyles.iconButton}><DkdIcon ios={favorite ? 'heart.fill' : 'heart'} android={favorite ? 'favorite' : 'favorite_border'} color={favorite ? dkdColors.coral : dkdColors.ink} /></Pressable></View>
        <View style={[dkdStyles.productHero, { backgroundColor: product.color }]}><Text style={dkdStyles.productHeroEmoji}>{product.emoji}</Text><Text style={dkdStyles.discountPill}>-%{dkdGetDiscount(product)}</Text></View>
        <View style={dkdStyles.detailSection}><Text style={dkdStyles.brand}>{product.brand.toUpperCase()}</Text><Text style={dkdStyles.detailName}>{product.name}</Text><Text style={dkdStyles.pageSubtitle}>{product.amount} • ★ {product.rating} • {product.category}</Text><View style={dkdStyles.bestCard}><View><Text style={dkdStyles.bestLabel}>En ucuz fiyat</Text><Text style={dkdStyles.bestValue}>{dkdFormatPrice(dkdBest)}</Text></View><View style={dkdStyles.whitePill}><DkdIcon ios="arrow.down.right" android="trending_down" color={dkdColors.primary} /><Text style={dkdStyles.whitePillText}>Fiyat düştü</Text></View></View></View>
        <View style={dkdStyles.detailSection}><DkdSectionHeader title="Market Fiyatları" action={`${product.offers.length} market`} /><View style={dkdStyles.panel}>{[...product.offers].sort((dkdFirst, dkdSecond) => (dkdFirst.cardPrice ?? dkdFirst.currentPrice) - (dkdSecond.cardPrice ?? dkdSecond.currentPrice)).map((dkdOffer, dkdIndex) => <View key={dkdOffer.id} style={[dkdStyles.offerRow, dkdIndex > 0 && dkdStyles.topLine, dkdIndex === 0 && dkdStyles.bestOffer]}><View style={[dkdStyles.rank, dkdIndex === 0 && dkdStyles.rankBest]}><Text style={[dkdStyles.rankText, dkdIndex === 0 && { color: dkdColors.white }]}>{dkdIndex + 1}</Text></View><View style={dkdStyles.flex}><Text style={dkdStyles.listTitle}>{dkdOffer.marketName}</Text><Text style={dkdStyles.muted}>{dkdOffer.branchName} • {dkdOffer.updatedAt}</Text></View><View style={dkdStyles.right}><Text style={dkdStyles.offerPrice}>{dkdFormatPrice(dkdOffer.cardPrice ?? dkdOffer.currentPrice)}</Text>{dkdOffer.oldPrice ? <Text style={dkdStyles.oldPrice}>{dkdFormatPrice(dkdOffer.oldPrice)}</Text> : null}</View></View>)}</View></View>
        <View style={dkdStyles.detailSection}><DkdSectionHeader title="7 Günlük Fiyat Geçmişi" action="Gerçek indirim" /><View style={dkdStyles.chart}>{product.history.map((dkdPoint, dkdIndex) => <View key={`${dkdPoint.label}-${dkdIndex}`} style={dkdStyles.chartColumn}><Text style={dkdStyles.chartPrice}>{Math.round(dkdPoint.price)}</Text><View style={[dkdStyles.chartBar, { height: Math.max(22, (dkdPoint.price / dkdMax) * 100), backgroundColor: dkdIndex === product.history.length - 1 ? dkdColors.primary : dkdColors.primarySoft }]} /><Text style={dkdStyles.muted}>{dkdPoint.label}</Text></View>)}</View></View>
        <View style={dkdStyles.detailSection}><View style={dkdStyles.targetCard}><View><Text style={dkdStyles.listTitle}>Hedef fiyat bildirimi</Text><Text style={dkdStyles.muted}>Fiyat bu seviyeye düşünce haber ver.</Text></View><View style={dkdStyles.stepper}><Pressable onPress={() => onTarget(Math.max(5, dkdTarget - 5))} style={dkdStyles.step}><Text style={dkdStyles.stepText}>−</Text></Pressable><Text style={dkdStyles.targetValue}>{dkdTarget} TL</Text><Pressable onPress={() => onTarget(dkdTarget + 5)} style={dkdStyles.step}><Text style={dkdStyles.stepText}>+</Text></Pressable></View></View></View>
      </ScrollView>
      <View style={dkdStyles.detailFooter}><View><Text style={dkdStyles.muted}>En iyi fiyat</Text><Text style={dkdStyles.footerPrice}>{dkdFormatPrice(dkdBest)}</Text></View><DkdAnimatedPressable onPress={onAdd} style={dkdStyles.addCart}><DkdIcon ios="cart.badge.plus" android="add_shopping_cart" color={dkdColors.white} /><Text style={dkdStyles.addCartText}>Sepete Ekle</Text></DkdAnimatedPressable></View>
    </View>
  );
}

function DkdCart({ cart, onChange, onProduct }: { cart: DkdCartMap; onChange: (dkdId: string, dkdDelta: number) => void; onProduct: (dkdId: string) => void }) {
  const dkdItems = dkdProducts.filter((dkdProduct) => (cart[dkdProduct.id] ?? 0) > 0);
  const dkdSplit = dkdItems.reduce((dkdTotal, dkdProduct) => dkdTotal + dkdGetBestPrice(dkdProduct) * (cart[dkdProduct.id] ?? 0), 0);
  const dkdMigros = dkdItems.reduce((dkdTotal, dkdProduct) => {
    const dkdOffer = dkdProduct.offers.find((dkdItem) => dkdItem.marketName === 'Migros' && dkdItem.inStock);
    return dkdTotal + (dkdOffer ? (dkdOffer.cardPrice ?? dkdOffer.currentPrice) * (cart[dkdProduct.id] ?? 0) : dkdGetBestPrice(dkdProduct) * (cart[dkdProduct.id] ?? 0));
  }, 0);
  return (
    <ScrollView contentContainerStyle={dkdStyles.scroll} showsVerticalScrollIndicator={false}>
      <DkdPageHeader title="Akıllı Sepet" subtitle="Tek market ve bölünmüş sepet toplamlarını karşılaştır." />
      {!dkdItems.length ? <DkdEmpty emoji="🛒" title="Sepetin boş" text="Karşılaştırmak için ürün ekleyin." /> : <>
        <View style={dkdStyles.saving}><Text style={dkdStyles.quickEmoji}>✦</Text><View style={dkdStyles.flex}><Text style={dkdStyles.heroKicker}>EN İYİ SENARYO</Text><Text style={dkdStyles.savingTitle}>{dkdFormatPrice(Math.max(0, dkdMigros - dkdSplit))} tasarruf</Text><Text style={dkdStyles.muted}>Ürünleri en ucuz marketlere bölerek.</Text></View></View>
        <View style={dkdStyles.section}><DkdSectionHeader title={`Sepetim (${dkdItems.length})`} action="Fiyatlar güncel" /><View style={dkdStyles.panel}>{dkdItems.map((dkdProduct, dkdIndex) => <Pressable key={dkdProduct.id} onPress={() => onProduct(dkdProduct.id)} style={[dkdStyles.cartRow, dkdIndex > 0 && dkdStyles.topLine]}><View style={[dkdStyles.cartImage, { backgroundColor: dkdProduct.color }]}><Text style={dkdStyles.cartEmoji}>{dkdProduct.emoji}</Text></View><View style={dkdStyles.flex}><Text style={dkdStyles.brand}>{dkdProduct.brand}</Text><Text numberOfLines={1} style={dkdStyles.listTitle}>{dkdProduct.name}</Text><Text style={dkdStyles.offerPrice}>{dkdFormatPrice(dkdGetBestPrice(dkdProduct))}</Text></View><View style={dkdStyles.quantity}><Pressable onPress={(dkdEvent) => { dkdEvent.stopPropagation(); onChange(dkdProduct.id, -1); }} style={dkdStyles.qtyButton}><Text>−</Text></Pressable><Text style={dkdStyles.qtyText}>{cart[dkdProduct.id]}</Text><Pressable onPress={(dkdEvent) => { dkdEvent.stopPropagation(); onChange(dkdProduct.id, 1); }} style={dkdStyles.qtyButton}><Text>+</Text></Pressable></View></Pressable>)}</View></View>
        <View style={dkdStyles.section}><DkdSectionHeader title="Market Karşılaştırması" action="Teslimat hariç" /><View style={dkdStyles.compare}><View style={dkdStyles.compareBest}><View><Text style={dkdStyles.heroKicker}>MARKETLERE BÖL</Text><Text style={dkdStyles.compareTitle}>En düşük toplam</Text></View><Text style={dkdStyles.comparePrice}>{dkdFormatPrice(dkdSplit)}</Text></View><View style={dkdStyles.compareRow}><Text style={dkdStyles.listTitle}>Migros tek market</Text><Text style={dkdStyles.offerPrice}>{dkdFormatPrice(dkdMigros)}</Text></View><View style={[dkdStyles.compareRow, dkdStyles.topLine]}><Text style={dkdStyles.listTitle}>Tahmini tasarruf</Text><Text style={[dkdStyles.offerPrice, { color: dkdColors.primary }]}>{dkdFormatPrice(Math.max(0, dkdMigros - dkdSplit))}</Text></View></View></View>
        <DkdPrimaryButton label="Alışveriş Planını Oluştur" icon="assignment" onPress={() => Alert.alert('Plan hazır', 'Demo market bazlı alışveriş planı oluşturuldu.')} />
      </>}
    </ScrollView>
  );
}

function DkdFavorites({ favorites, onProduct, onFavorite, onAdd, onSearch }: { favorites: string[]; onProduct: (dkdId: string) => void; onFavorite: (dkdId: string) => void; onAdd: (dkdId: string) => void; onSearch: () => void }) {
  const dkdFavoriteProducts = dkdProducts.filter((dkdProduct) => favorites.includes(dkdProduct.id));
  return <ScrollView contentContainerStyle={dkdStyles.scroll} showsVerticalScrollIndicator={false}><DkdPageHeader title="Favoriler" subtitle="Takip ettiğiniz ürünlerin güncel en ucuz fiyatları." />{!dkdFavoriteProducts.length ? <DkdEmpty emoji="💚" title="Henüz favori yok" text="Takip etmek istediğiniz ürünleri favoriye ekleyin." action="Ürünleri Keşfet" onAction={onSearch} /> : <View style={dkdStyles.grid}>{dkdFavoriteProducts.map((dkdProduct) => <View key={dkdProduct.id} style={dkdStyles.gridItem}><DkdProductCard compact product={dkdProduct} favorite onOpen={() => onProduct(dkdProduct.id)} onFavorite={() => onFavorite(dkdProduct.id)} onAdd={() => onAdd(dkdProduct.id)} /></View>)}</View>}</ScrollView>;
}

function DkdProfile({ notifications, onNotifications, onReset }: { notifications: boolean; onNotifications: (dkdValue: boolean) => void; onReset: () => void }) {
  return (
    <ScrollView contentContainerStyle={dkdStyles.scroll} showsVerticalScrollIndicator={false}>
      <DkdPageHeader title="Profil & Sistem" subtitle="Demo tercihleri ve collector altyapısı ön izlemesi." />
      <View style={dkdStyles.profile}><View style={dkdStyles.avatar}><Text style={dkdStyles.avatarText}>DE</Text></View><View style={dkdStyles.flex}><Text style={dkdStyles.profileName}>DrabornEagle</Text><Text style={dkdStyles.muted}>DraBornMarket Kurucu Demo</Text></View><Text style={dkdStyles.version}>v0.1</Text></View>
      <View style={dkdStyles.section}><DkdSectionHeader title="Collector Durumu" action="Demo veri" /><View style={dkdStyles.collectorStats}><DkdStat value="4.743" label="Ham ürün" /><DkdStat value="96" label="Eşleşme kuyruğu" /><DkdStat value="6" label="Adaptör" /></View><View style={dkdStyles.panel}>{dkdCollectorMarkets.map((dkdMarket, dkdIndex) => <View key={dkdMarket.name} style={[dkdStyles.listRow, dkdIndex > 0 && dkdStyles.topLine]}><View style={[dkdStyles.dot, { backgroundColor: dkdMarket.color }]} /><View style={dkdStyles.flex}><Text style={dkdStyles.listTitle}>{dkdMarket.name}</Text><Text style={dkdStyles.muted}>{dkdMarket.items.toLocaleString('tr-TR')} ürün • {dkdMarket.age}</Text></View><Text style={dkdStyles.state}>{dkdMarket.state}</Text></View>)}</View></View>
      <View style={dkdStyles.section}><DkdSectionHeader title="Ayarlar" /><View style={dkdStyles.panel}><View style={dkdStyles.setting}><DkdIcon ios="bell.fill" android="notifications" color={dkdColors.primary} /><View style={dkdStyles.flex}><Text style={dkdStyles.listTitle}>Fiyat bildirimleri</Text><Text style={dkdStyles.muted}>Hedef fiyat ve kampanya uyarıları</Text></View><Switch value={notifications} onValueChange={onNotifications} trackColor={{ false: dkdColors.line, true: dkdColors.primarySoft }} thumbColor={notifications ? dkdColors.primary : dkdColors.white} /></View><View style={[dkdStyles.setting, dkdStyles.topLine]}><DkdIcon ios="location.fill" android="location_on" color={dkdColors.primary} /><View style={dkdStyles.flex}><Text style={dkdStyles.listTitle}>Konum ve şubeler</Text><Text style={dkdStyles.muted}>Konyaaltı, Antalya</Text></View></View><View style={[dkdStyles.setting, dkdStyles.topLine]}><DkdIcon ios="externaldrive.fill" android="database" color={dkdColors.primary} /><View style={dkdStyles.flex}><Text style={dkdStyles.listTitle}>Veri kaynağı</Text><Text style={dkdStyles.muted}>Yerel demo JSON • Supabase kapalı</Text></View></View></View></View>
      <View style={dkdStyles.roadmap}><Text style={dkdStyles.brand}>SONRAKİ ADIM</Text><Text style={dkdStyles.roadmapTitle}>Sürüm 0.1 Supabase temeli</Text><Text style={dkdStyles.pageSubtitle}>Demo onaylandığında dkd_market_chains, dkd_products, dkd_market_offers ve fiyat geçmişi tabloları bağlanacak.</Text><View style={dkdStyles.progress}><View style={dkdStyles.progressFill} /></View><Text style={dkdStyles.muted}>Demo arayüzü %100 • Gerçek veri bağlantısı %0</Text></View>
      <Pressable onPress={() => Alert.alert('Demo verilerini sıfırla', 'Favoriler, sepet ve hedef fiyatlar temizlenecek.', [{ text: 'Vazgeç', style: 'cancel' }, { text: 'Sıfırla', style: 'destructive', onPress: onReset }])} style={dkdStyles.reset}><DkdIcon ios="arrow.counterclockwise" android="restart_alt" color={dkdColors.danger} /><Text style={dkdStyles.resetText}>Demo Verilerini Sıfırla</Text></Pressable>
    </ScrollView>
  );
}

function DkdStat({ value, label }: { value: string; label: string }) {
  return <View style={dkdStyles.stat}><Text style={dkdStyles.statValue}>{value}</Text><Text style={dkdStyles.statLabel}>{label}</Text></View>;
}

function DkdEmpty({ emoji, title, text, action, onAction }: { emoji: string; title: string; text: string; action?: string; onAction?: () => void }) {
  return <View style={dkdStyles.empty}><Text style={dkdStyles.emptyEmoji}>{emoji}</Text><Text style={dkdStyles.emptyTitle}>{title}</Text><Text style={dkdStyles.pageSubtitle}>{text}</Text>{action ? <DkdAnimatedPressable onPress={onAction} style={dkdStyles.emptyButton}><Text style={dkdStyles.primaryButtonText}>{action}</Text></DkdAnimatedPressable> : null}</View>;
}

const dkdStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: dkdColors.background }, app: { flex: 1 }, body: { flex: 1 }, scroll: { padding: 18, paddingBottom: 30 }, flex: { flex: 1 }, right: { alignItems: 'flex-end' }, rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  brand: { color: dkdColors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 1 }, heroHeading: { marginTop: 5, color: dkdColors.ink, fontSize: 27, lineHeight: 32, fontWeight: '900', letterSpacing: -0.8 }, pageTitle: { color: dkdColors.ink, fontSize: 29, fontWeight: '900', letterSpacing: -0.8 }, pageSubtitle: { marginTop: 6, color: dkdColors.inkMuted, fontSize: 12, lineHeight: 18 }, muted: { color: dkdColors.inkMuted, fontSize: 10, lineHeight: 15 },
  iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, alignItems: 'center', justifyContent: 'center' }, location: { alignSelf: 'flex-start', marginTop: 11, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: dkdColors.primarySoft, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999 }, locationText: { color: dkdColors.primaryDark, fontSize: 11, fontWeight: '800' },
  searchFake: { marginTop: 17, height: 56, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large, paddingLeft: 15, paddingRight: 7 }, searchFakeText: { flex: 1, color: dkdColors.inkMuted, fontSize: 13 }, scanButton: { width: 42, height: 42, borderRadius: 15, backgroundColor: dkdColors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  heroCard: { marginTop: 16, minHeight: 190, flexDirection: 'row', alignItems: 'center', backgroundColor: dkdColors.primary, borderRadius: dkdRadius.xlarge, padding: 20, overflow: 'hidden' }, heroKicker: { color: '#BDEBD3', fontSize: 10, fontWeight: '900', letterSpacing: 1 }, heroTitle: { marginTop: 7, color: dkdColors.white, fontSize: 23, lineHeight: 27, fontWeight: '900' }, heroText: { marginTop: 7, color: '#D9F2E5', fontSize: 11, lineHeight: 16 }, heroAction: { alignSelf: 'flex-start', marginTop: 14, backgroundColor: dkdColors.secondary, paddingHorizontal: 13, paddingVertical: 9, borderRadius: 999 }, heroActionText: { color: dkdColors.primaryDark, fontWeight: '900', fontSize: 11 }, heroEmoji: { fontSize: 68 },
  quickGrid: { marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 }, quick: { width: '48.5%', minHeight: 112, borderRadius: dkdRadius.large, padding: 14 }, quickEmoji: { fontSize: 27, color: dkdColors.primaryDark, fontWeight: '900' }, quickLabel: { marginTop: 10, color: dkdColors.ink, fontSize: 14, fontWeight: '900' }, section: { marginTop: 24 }, horizontalGap: { gap: 11, paddingRight: 15 }, category: { width: 92, padding: 10, alignItems: 'center', backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large }, categoryEmoji: { fontSize: 29, padding: 10, backgroundColor: dkdColors.surfaceMuted, borderRadius: 18 }, categoryText: { marginTop: 7, color: dkdColors.ink, fontSize: 10, fontWeight: '800', textAlign: 'center' },
  panel: { backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large, overflow: 'hidden' }, listRow: { minHeight: 64, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 10 }, topLine: { borderTopWidth: 1, borderTopColor: dkdColors.line }, listTitle: { color: dkdColors.ink, fontSize: 13, fontWeight: '900' }, marketMark: { width: 38, height: 38, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, marketMarkText: { color: dkdColors.white, fontWeight: '900' },
  searchInput: { marginTop: 16, height: 55, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large, paddingHorizontal: 14 }, flexInput: { flex: 1, height: '100%', color: dkdColors.ink }, chips: { gap: 8, paddingVertical: 14 }, chip: { paddingHorizontal: 12, paddingVertical: 9, backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: 999 }, chipActive: { backgroundColor: dkdColors.primary, borderColor: dkdColors.primary }, chipText: { color: dkdColors.ink, fontSize: 11, fontWeight: '800' }, chipTextActive: { color: dkdColors.white }, resultText: { color: dkdColors.ink, fontSize: 12, fontWeight: '800' }, sortWrap: { flexDirection: 'row', backgroundColor: dkdColors.surfaceMuted, borderRadius: 999, padding: 3 }, sort: { paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999 }, sortActive: { backgroundColor: dkdColors.surface }, sortText: { color: dkdColors.inkMuted, fontSize: 9, fontWeight: '800' }, grid: { marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 }, gridItem: { width: '48.5%' },
  detailRoot: { flex: 1 }, detailScroll: { paddingBottom: 100 }, detailHeader: { padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, detailHeaderText: { color: dkdColors.ink, fontSize: 15, fontWeight: '900' }, productHero: { marginHorizontal: 18, height: 235, alignItems: 'center', justifyContent: 'center', borderRadius: dkdRadius.xlarge }, productHeroEmoji: { fontSize: 100 }, discountPill: { position: 'absolute', top: 15, left: 15, color: dkdColors.white, backgroundColor: dkdColors.coral, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, fontSize: 11, fontWeight: '900' }, detailSection: { marginTop: 20, marginHorizontal: 18 }, detailName: { marginTop: 5, color: dkdColors.ink, fontSize: 24, fontWeight: '900' }, bestCard: { marginTop: 15, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: dkdColors.primary, borderRadius: dkdRadius.large }, bestLabel: { color: '#CBECD9', fontSize: 10 }, bestValue: { marginTop: 3, color: dkdColors.white, fontSize: 24, fontWeight: '900' }, whitePill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: dkdColors.white, paddingHorizontal: 9, paddingVertical: 7, borderRadius: 999 }, whitePillText: { color: dkdColors.primary, fontSize: 9, fontWeight: '900' }, offerRow: { minHeight: 75, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 10 }, bestOffer: { backgroundColor: dkdColors.primarySoft }, rank: { width: 30, height: 30, borderRadius: 15, backgroundColor: dkdColors.surfaceMuted, alignItems: 'center', justifyContent: 'center' }, rankBest: { backgroundColor: dkdColors.primary }, rankText: { color: dkdColors.ink, fontSize: 11, fontWeight: '900' }, offerPrice: { color: dkdColors.ink, fontSize: 14, fontWeight: '900' }, oldPrice: { color: dkdColors.inkMuted, fontSize: 9, textDecorationLine: 'line-through' }, chart: { height: 150, padding: 12, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large }, chartColumn: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' }, chartPrice: { color: dkdColors.inkMuted, fontSize: 8, marginBottom: 4 }, chartBar: { width: 20, borderTopLeftRadius: 7, borderTopRightRadius: 7 }, targetCard: { padding: 14, backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large }, stepper: { marginTop: 12, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: dkdColors.surfaceMuted, borderRadius: dkdRadius.medium, paddingHorizontal: 5 }, step: { width: 34, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: dkdColors.surface, borderRadius: 11 }, stepText: { color: dkdColors.primary, fontSize: 20, fontWeight: '900' }, targetValue: { color: dkdColors.ink, fontSize: 14, fontWeight: '900' }, detailFooter: { position: 'absolute', left: 0, right: 0, bottom: 0, minHeight: 84, paddingHorizontal: 18, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: dkdColors.surface, borderTopWidth: 1, borderTopColor: dkdColors.line }, footerPrice: { color: dkdColors.ink, fontSize: 19, fontWeight: '900' }, addCart: { height: 50, flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: dkdColors.primary, borderRadius: dkdRadius.large, paddingHorizontal: 20 }, addCartText: { color: dkdColors.white, fontSize: 13, fontWeight: '900' },
  saving: { marginTop: 18, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: dkdColors.primarySoft, borderRadius: dkdRadius.large }, savingTitle: { color: dkdColors.ink, fontSize: 18, fontWeight: '900' }, cartRow: { minHeight: 88, padding: 9, flexDirection: 'row', alignItems: 'center', gap: 10 }, cartImage: { width: 66, height: 66, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }, cartEmoji: { fontSize: 34 }, quantity: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: dkdColors.surfaceMuted, borderRadius: 999, padding: 4 }, qtyButton: { width: 27, height: 27, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: dkdColors.surface }, qtyText: { minWidth: 14, textAlign: 'center', fontSize: 11, fontWeight: '900' }, compare: { backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large, overflow: 'hidden' }, compareBest: { padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: dkdColors.primary }, compareTitle: { color: dkdColors.white, fontSize: 15, fontWeight: '900' }, comparePrice: { color: dkdColors.white, fontSize: 17, fontWeight: '900' }, compareRow: { minHeight: 58, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  primaryButton: { marginTop: 16, height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: dkdColors.primary, borderRadius: dkdRadius.large }, primaryButtonText: { color: dkdColors.white, fontSize: 13, fontWeight: '900' }, profile: { marginTop: 17, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: dkdColors.surface, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large }, avatar: { width: 52, height: 52, borderRadius: 18, backgroundColor: dkdColors.primary, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: dkdColors.white, fontSize: 17, fontWeight: '900' }, profileName: { color: dkdColors.ink, fontSize: 15, fontWeight: '900' }, version: { color: dkdColors.primary, fontSize: 10, fontWeight: '900', backgroundColor: dkdColors.primarySoft, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999 }, collectorStats: { padding: 14, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: dkdColors.primary, borderRadius: dkdRadius.large, marginBottom: 10 }, stat: { alignItems: 'center' }, statValue: { color: dkdColors.white, fontSize: 16, fontWeight: '900' }, statLabel: { marginTop: 2, color: '#CBECD9', fontSize: 8 }, dot: { width: 11, height: 11, borderRadius: 6 }, state: { color: dkdColors.primary, fontSize: 9, fontWeight: '900', backgroundColor: dkdColors.primarySoft, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 999 }, setting: { minHeight: 68, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 10 }, roadmap: { marginTop: 22, padding: 16, backgroundColor: '#ECEBFF', borderRadius: dkdRadius.large }, roadmapTitle: { marginTop: 5, color: dkdColors.ink, fontSize: 18, fontWeight: '900' }, progress: { marginVertical: 12, height: 8, backgroundColor: 'rgba(91,95,239,0.18)', borderRadius: 4, overflow: 'hidden' }, progressFill: { width: '52%', height: '100%', backgroundColor: dkdColors.accent }, reset: { marginTop: 18, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#FFF2F2', borderWidth: 1, borderColor: '#F2CACA', borderRadius: dkdRadius.large }, resetText: { color: dkdColors.danger, fontSize: 12, fontWeight: '900' },
  empty: { marginTop: 70, alignItems: 'center', paddingHorizontal: 30 }, emptyEmoji: { fontSize: 58 }, emptyTitle: { marginTop: 13, color: dkdColors.ink, fontSize: 19, fontWeight: '900' }, emptyButton: { marginTop: 16, backgroundColor: dkdColors.primary, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 999 }, toast: { position: 'absolute', left: 28, right: 28, bottom: 88, minHeight: 47, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: dkdColors.ink, borderRadius: dkdRadius.large }, toastText: { color: dkdColors.white, fontSize: 11, fontWeight: '800' },
  modalBackdrop: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(21,34,27,0.58)' }, modalCard: { padding: 18, backgroundColor: dkdColors.surface, borderRadius: dkdRadius.xlarge }, modalTitle: { color: dkdColors.ink, fontSize: 21, fontWeight: '900' }, scannerBox: { marginTop: 17, height: 155, alignItems: 'center', justifyContent: 'center', backgroundColor: dkdColors.primarySoft, borderWidth: 2, borderStyle: 'dashed', borderColor: dkdColors.primary, borderRadius: dkdRadius.large, overflow: 'hidden' }, scanLine: { position: 'absolute', left: 24, right: 24, top: '50%', height: 2, backgroundColor: dkdColors.coral }, input: { marginTop: 13, height: 51, paddingHorizontal: 14, color: dkdColors.ink, fontSize: 15, letterSpacing: 1, backgroundColor: dkdColors.background, borderWidth: 1, borderColor: dkdColors.line, borderRadius: dkdRadius.large },
});
