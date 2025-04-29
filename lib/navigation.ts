export interface SidebarItem {
  label: string;
  path?: string; // Ahora puede no tener path si es solo un menú contenedor
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
    // icon: <DashboardIcon / >,
    requiredPermissions: ['dashboard:view'],
  },
  {
    label: 'Compañias',
    path: '/dashboard/companies',
    // icon: <SettingsIcon / >,
    requiredPermissions: ['companies:view'],
  },
  {
    label: 'Módulos',
    path: '/dashboard/modules',
    // icon: <SettingsIcon / >,
    requiredPermissions: ['modules:view'],
  },
  {
    label: 'Usuarios',
    path: '/dashboard/users',
    // icon: <SettingsIcon / >,
    requiredPermissions: ['users:view'],
  },
  {
    label: 'Configuraciones',
    path: '/dashboard/configurations',
    // icon: <SettingsIcon / >,
    requiredPermissions: ['configurations:view'],
  },
  {
    label: 'Compañias',
    // icon: <UsersIcon / >,
    requiredPermissions: ['users:manage', 'reports:view'], // Permiso para ver el menú principal
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

// export const navigationItems = [
//   {
//     title: 'Inicio',
//     href: '/dashboard',
//     requiredModules: ['home'],
//   },
//   {
//     title: 'Compañias',
//     href: '/dashboard/companies',
//     requiredModules: ['recruitment:companies:write'],
//   },
//   {
//     title: 'Customers',
//     href: '/dashboard/customers',
//     requiredModules: ['admin'],
//   },
// ];