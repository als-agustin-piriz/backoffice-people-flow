export interface SidebarItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  requiredPermissions?: string[];
  children?: SidebarItem[];
}

export type Permission =
  | 'dashboard:view'
  | 'users:manage'
  | 'reports:view'
  | 'settings:edit';


export const navigationItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    requiredPermissions: ['dashboard:view'],
  },
  {
    label: 'Compañias',
    path: '/dashboard/companies',
    requiredPermissions: ['companies:view'],
  },
  {
    label: 'Módulos',
    path: '/dashboard/modules',
    requiredPermissions: ['modules:view'],
  },
  {
    label: 'Usuarios',
    path: '/dashboard/users',
    requiredPermissions: ['users:view'],
  },
  {
    label: 'Configuraciones',
    path: '/dashboard/configurations',
    requiredPermissions: ['configurations:view'],
  },
  {
    label: 'Compañias',
    requiredPermissions: ['users:manage', 'reports:view'],
    children: [
      {
        label: 'Alta compañia',
        path: '/users',
        requiredPermissions: ['companies:manage'],
      },
      {
        label: 'Reportes',
        path: '/reports',
        requiredPermissions: ['companies:view'],
      },
    ],
  },
];
