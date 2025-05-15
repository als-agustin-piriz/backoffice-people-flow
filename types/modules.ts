export type Module = {
  id?: string;
  name: string;
  description?: string;
  created?: string;
  basePrice: number;
  submodules?: Submodule[];
  isActive?: boolean;
};

export type Submodule = {
  id?: string;
  name: string;
  moduleId?: string;
};

export type ModuleDTO = {
  items: Module[],
  pageNumber: number,
  totalPages: number,
  totalCount: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean
};

export type ViewState = 'list' | 'new-module' | 'add-submodule' | 'edit-module' | 'loading';
