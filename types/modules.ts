export type Module = {
  id?: number;
  name: string;
  description?: string;
  created?: string;
  basePrice: number;
  items?: Submodule[]
};

export type Submodule = {
  id?: number;
  name: string;
  moduleId?: number;
};

export type ModuleDTO = {
  items: Module[],
  pageNumber: number,
  totalPages: number,
  totalCount: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean
};

export type ViewState = 'list' | 'new-module' | 'add-submodule' | 'loading';
