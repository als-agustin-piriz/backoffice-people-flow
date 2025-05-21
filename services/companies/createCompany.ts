import { bffRoutes } from '@/lib/routes';
import { Company } from '@/types/companies';

export async function createCompany(companyData: Company): Promise<Company> {
  return fetch(bffRoutes.companiesURL, {
    method: 'POST',
    body: JSON.stringify(companyData),
  }).then(res => {
    if (!res.ok) throw new Error('Error al crear la compañia');
    return res.json();
  });
}
