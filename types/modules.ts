export type Module = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
};

export type Submodule = {
  id: number;
  name: string;
  moduleId: number;
};

export type NotificationModule = {
  message: string;
  type: 'success' | 'info';
};

export type ViewState = 'list' | 'new-module' | 'add-submodule';
