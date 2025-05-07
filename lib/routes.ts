export const routes = [
  { path: '/companies', name: 'Companias' },
  { path: '/modules', name: 'Módulos' },
  { path: '/configurations', name: 'Configuraciones' },
  { path: '/users', name: 'Usuarios' },
];

const API_BASE = process.env.NEXTAPI_URL;

export const apiRoutes = {
  login: `${API_BASE}/backofficeUsers/login`,
  modules: {
    createModule: `${API_BASE}/modules/createModule`,
    getModules: `${API_BASE}/modules/getModules`,
  },
};

export const bffRoutes = {
  createModuleURL: "api/backend/module",
};
