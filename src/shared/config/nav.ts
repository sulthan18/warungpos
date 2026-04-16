export interface NavLink {
  path: string;
  label: string;
  icon: string;
  group?: string;
}

export interface RoleNavigation {
  owner: NavLink[];
  cashier: NavLink[];
}

export const navigation: RoleNavigation = {
  owner: [
    { path: '/owner/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/owner/products', label: 'Products', icon: '☕', group: 'Management' },
    { path: '/owner/stocks', label: 'Inventory', icon: '📦', group: 'Management' },
    { path: '/owner/tables', label: 'Tables', icon: '🪑', group: 'Management' },
    { path: '/owner/users', label: 'Staff', icon: '👥', group: 'Admin' },
    { path: '/owner/promos', label: 'Promos', icon: '🏷️', group: 'Admin' },
    { path: '/owner/reports', label: 'Reports', icon: '📈', group: 'Admin' },
  ],
  cashier: [
    { path: '/cashier/pos', label: 'POS', icon: '🛒' },
    { path: '/cashier/history', label: 'History', icon: '📜' },
    { path: '/cashier/shift', label: 'Shift', icon: '⏳' },
  ],
};
