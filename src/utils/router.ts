export type PageId =
  | 'home'
  | 'shop'
  | 'flavours'
  | 'track'
  | 'story'
  | 'wholesale'
  | 'founder'
  | 'account'
  | 'admin';

export interface NavItem {
  id: PageId;
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', path: '#/' },
  { id: 'shop', label: 'Shop Store', path: '#/shop' },
  { id: 'flavours', label: 'Flavours & 3D', path: '#/flavours' },
  { id: 'track', label: 'Track Order', path: '#/track' },
  { id: 'account', label: 'Order History', path: '#/account' },
  { id: 'wholesale', label: 'Wholesale B2B', path: '#/wholesale' },
  { id: 'story', label: 'Why Edible?', path: '#/story' },
  { id: 'founder', label: 'Founder', path: '#/founder' },
];

export function getPageFromHash(hash: string): PageId {
  const clean = hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (clean === 'shop' || clean === 'store' || clean === 'catalogue' || clean === 'products') return 'shop';
  if (clean === 'flavours' || clean === 'flavors' || clean === 'studio') return 'flavours';
  if (clean === 'track' || clean === 'tracking' || clean === 'orders') return 'track';
  if (clean === 'story' || clean === 'sustainability' || clean === 'calculator') return 'story';
  if (clean === 'wholesale' || clean === 'order' || clean === 'pricing') return 'wholesale';
  if (clean === 'founder' || clean === 'awards' || clean === 'about') return 'founder';
  if (clean === 'account' || clean === 'profile' || clean === 'login' || clean === 'my-orders') return 'account';
  if (clean === 'admin' || clean === 'dashboard' || clean === 'inventory') return 'admin';
  return 'home';
}

export function getHashFromPage(page: PageId): string {
  if (page === 'home') return '#/';
  return `#/${page}`;
}
