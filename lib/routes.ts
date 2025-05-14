export const routes = [
  { path: '/companies', name: 'Companias' },
  { path: '/modules', name: 'Módulos' },
  { path: '/configurations', name: 'Configuraciones' },
  { path: '/users', name: 'Usuarios' },
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const API_BASE = process.env.NEXTAPI_URL;

export const apiRoutes = {
  login: `${API_BASE}/backofficeUsers/login`,
  modules: {
    createModule: `${API_BASE}/modules/create/module`,
    deleteModule: `${API_BASE}/modules/delete/module`,
    updateModule: `${API_BASE}/modules/update/module`,
    getModules: `${API_BASE}/modules/get/modules`,
    createSubModule: `${API_BASE}/modules/create/submodule`,
  },
};

export const bffRoutes = {
  createModuleURL: 'api/backend/module',
  deleteModuleURL: `api/backend/module`,
  updateModuleURL: `api/backend/module`,
  getModulesURL: 'api/backend/module',
  createSubModuleURL: 'api/backend/submodule',
};
