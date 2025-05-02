export type Module = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};

export type Submodule = {
  id: string;
  name: string;
  moduleId: string;
};

export type NotificationModule = {
  message: string;
  type: 'success' | 'info';
};

export type ViewState = 'list' | 'new-module' | 'add-submodule';
