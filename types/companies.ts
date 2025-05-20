export type Company = {
  id?: string;
  name: string;
  legalName: string;
  rut: string;
  email: string;
  phone: string;
  logo: string;
  address: string;
  tenantId?: string;
};

export type CompanyDTO = {
  items: Company[],
  pageNumber: number,
  totalPages: number,
  totalCount: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean
};

export type ViewStateCompany = 'cards' | 'create-update-company' | 'edit-company' | 'loading';

