import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SymbolView } from 'expo-symbols';
import { dkdColors, dkdRadius } from './theme';
import { dkdFormatPrice, dkdGetBestPrice, dkdGetDiscount } from './data';
import type { DkdProduct, DkdTab } from './types';

export function DkdIcon({
  ios,
  android,
  size = 22,
  color = dkdColors.ink,
}: {
  ios: string;
  android: string;
  size?: number;
  color?: string;
}) {
  return (
    <SymbolView
      name={{ ios: ios as never, android: android as never, web: android as never }}
      size={size}
      tintColor={color}
      fallback={<Text style={{ color, fontSize: size * 0.75 }}>●</Text>}
    />
  );
}

export function DkdAnimatedPressable({
  children,
  style,
  onPress,
  disabled,
  ...props
}: PressableProps & { style?: StyleProp<ViewStyle> }) {
  const dkdScale = useRef(new Animated.Value(1)).current;
  const dkdFlatStyle = StyleSheet.flatten(style);
  const dkdHasExplicitWidth = dkdFlatStyle?.width !== undefined;
  const dkdOuterStyle: StyleProp<ViewStyle> = dkdHasExplicitWidth
    ? {
        width: dkdFlatStyle.width,
        minWidth: dkdFlatStyle.minWidth,
        maxWidth: dkdFlatStyle.maxWidth,
        alignSelf: dkdFlatStyle.alignSelf,
        flexShrink: dkdFlatStyle.flexShrink,
      }
    : undefined;

  return (
    <Pressable
      {...props}
      style={dkdOuterStyle}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => Animated.spring(dkdScale, { toValue: 0.96, useNativeDriver: true, speed: 35, bounciness: 3 }).start()}
      onPressOut={() => Animated.spring(dkdScale, { toValue: 1, useNativeDriver: true, speed: 25, bounciness: 8 }).start()}
    >
      <Animated.View
        style={[
          style,
          dkdHasExplicitWidth && dkdComponentStyles.animatedFullWidth,
          { transform: [{ scale: dkdScale }], opacity: disabled ? 0.45 : 1 },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export function DkdEntrance({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: StyleProp<ViewStyle> }) {
  const dkdOpacity = useRef(new Animated.Value(0)).current;
  const dkdTranslate = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(dkdOpacity, { toValue: 1, duration: 430, delay, useNativeDriver: true }),
      Animated.spring(dkdTranslate, { toValue: 0, delay, useNativeDriver: true, speed: 14, bounciness: 5 }),
    ]).start();
  }, [delay, dkdOpacity, dkdTranslate]);

  return <Animated.View style={[style, { opacity: dkdOpacity, transform: [{ translateY: dkdTranslate }] }]}>{children}</Animated.View>;
}

export function DkdSectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={dkdComponentStyles.sectionHeader}>
      <Text numberOfLines={2} style={dkdComponentStyles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text numberOfLines={1} style={dkdComponentStyles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function DkdProductCard({
  product,
  favorite,
  onOpen,
  onFavorite,
  onAdd,
  compact = false,
}: {
  product: DkdProduct;
  favorite: boolean;
  onOpen: () => void;
  onFavorite: () => void;
  onAdd: () => void;
  compact?: boolean;
}) {
  const dkdBest = dkdGetBestPrice(product);
  const dkdDiscount = dkdGetDiscount(product);
  const dkdMarket = useMemo(
    () => [...product.offers].filter((offer) => offer.inStock).sort((first, second) => (first.cardPrice ?? first.currentPrice) - (second.cardPrice ?? second.currentPrice))[0],
    [product.offers],
  );

  return (
    <DkdAnimatedPressable onPress={onOpen} style={[dkdComponentStyles.productCard, compact && dkdComponentStyles.productCardCompact]}>
      <View style={[dkdComponentStyles.productImage, { backgroundColor: product.color }, compact && dkdComponentStyles.productImageCompact]}>
        <Text style={[dkdComponentStyles.productEmoji, compact && { fontSize: 34 }]}>{product.emoji}</Text>
        {dkdDiscount > 0 ? <Text style={dkdComponentStyles.discountBadge}>-%{dkdDiscount}</Text> : null}
        <Pressable style={dkdComponentStyles.favoriteButton} onPress={(event) => { event.stopPropagation(); onFavorite(); }}>
          <DkdIcon ios={favorite ? 'heart.fill' : 'heart'} android={favorite ? 'favorite' : 'favorite_border'} size={19} color={favorite ? dkdColors.coral : dkdColors.ink} />
        </Pressable>
      </View>
      <View style={dkdComponentStyles.productBody}>
        <Text numberOfLines={1} style={dkdComponentStyles.productBrand}>{product.brand}</Text>
        <Text numberOfLines={2} style={dkdComponentStyles.productName}>{product.name}</Text>
        <Text style={dkdComponentStyles.productAmount}>{product.amount}</Text>
        <View style={dkdComponentStyles.productMeta}>
          <View style={dkdComponentStyles.productPriceArea}>
            <Text style={dkdComponentStyles.productPrice}>{dkdFormatPrice(dkdBest)}</Text>
            <Text numberOfLines={1} style={dkdComponentStyles.productMarket}>{dkdMarket?.marketName ?? 'Market'} • {product.offers.length} fiyat</Text>
          </View>
          <Pressable style={dkdComponentStyles.addButton} onPress={(event) => { event.stopPropagation(); onAdd(); }}>
            <DkdIcon ios="plus" android="add" size={22} color={dkdColors.white} />
          </Pressable>
        </View>
      </View>
    </DkdAnimatedPressable>
  );
}

const dkdTabs: Array<{ id: DkdTab; label: string; ios: string; android: string }> = [
  { id: 'home', label: 'Ana Sayfa', ios: 'house.fill', android: 'home' },
  { id: 'search', label: 'Ara', ios: 'magnifyingglass', android: 'search' },
  { id: 'cart', label: 'Sepet', ios: 'cart.fill', android: 'shopping_cart' },
  { id: 'favorites', label: 'Favoriler', ios: 'heart.fill', android: 'favorite' },
  { id: 'profile', label: 'Profil', ios: 'person.crop.circle.fill', android: 'account_circle' },
];

export function DkdBottomNav({ active, cartCount, onChange }: { active: DkdTab; cartCount: number; onChange: (tab: DkdTab) => void }) {
  return (
    <View style={dkdComponentStyles.bottomNav}>
      {dkdTabs.map((tab) => {
        const dkdActive = active === tab.id;
        return (
          <Pressable key={tab.id} onPress={() => onChange(tab.id)} style={dkdComponentStyles.tabButton}>
            <View style={[dkdComponentStyles.tabIconWrap, dkdActive && dkdComponentStyles.tabIconWrapActive]}>
              <DkdIcon ios={tab.ios} android={tab.android} size={22} color={dkdActive ? dkdColors.primary : dkdColors.inkMuted} />
              {tab.id === 'cart' && cartCount > 0 ? <Text style={dkdComponentStyles.cartBadge}>{cartCount > 9 ? '9+' : cartCount}</Text> : null}
            </View>
            <Text numberOfLines={1} style={[dkdComponentStyles.tabLabel, dkdActive && dkdComponentStyles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const dkdComponentStyles = StyleSheet.create({
  animatedFullWidth: { width: '100%' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 },
  sectionTitle: { flex: 1, fontSize: 20, lineHeight: 25, fontWeight: '800', color: dkdColors.ink, letterSpacing: -0.4 },
  sectionAction: { fontSize: 13, fontWeight: '800', color: dkdColors.primary },
  productCard: { width: 174, backgroundColor: dkdColors.surface, borderRadius: dkdRadius.large, overflow: 'hidden', borderWidth: 1, borderColor: dkdColors.line },
  productCardCompact: { width: '100%' },
  productImage: { height: 138, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  productImageCompact: { height: 126 },
  productEmoji: { fontSize: 48 },
  discountBadge: { position: 'absolute', left: 10, top: 10, color: dkdColors.white, backgroundColor: dkdColors.coral, fontSize: 11, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 5, borderRadius: dkdRadius.pill },
  favoriteButton: { position: 'absolute', right: 9, top: 9, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  productBody: { padding: 12 },
  productBrand: { fontSize: 11, fontWeight: '800', color: dkdColors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  productName: { minHeight: 39, marginTop: 3, color: dkdColors.ink, fontSize: 15, lineHeight: 19, fontWeight: '800' },
  productAmount: { color: dkdColors.inkMuted, fontSize: 12, marginTop: 3 },
  productMeta: { marginTop: 11, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 },
  productPriceArea: { flex: 1, minWidth: 0 },
  productPrice: { fontSize: 16, color: dkdColors.ink, fontWeight: '900' },
  productMarket: { marginTop: 2, fontSize: 10, color: dkdColors.inkMuted },
  addButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: dkdColors.primary },
  bottomNav: { flexDirection: 'row', backgroundColor: dkdColors.surface, borderTopWidth: 1, borderTopColor: dkdColors.line, paddingTop: 7, paddingBottom: 8, paddingHorizontal: 6 },
  tabButton: { flex: 1, minWidth: 0, alignItems: 'center', justifyContent: 'center' },
  tabIconWrap: { width: 42, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: dkdRadius.pill },
  tabIconWrapActive: { backgroundColor: dkdColors.primarySoft },
  tabLabel: { marginTop: 2, fontSize: 9.5, fontWeight: '700', color: dkdColors.inkMuted },
  tabLabelActive: { color: dkdColors.primary, fontWeight: '900' },
  cartBadge: { position: 'absolute', right: 0, top: -4, minWidth: 17, height: 17, paddingHorizontal: 4, borderRadius: 9, backgroundColor: dkdColors.coral, color: dkdColors.white, fontWeight: '900', fontSize: 9, textAlign: 'center', lineHeight: 17 },
});