import { bffRoutes } from '@/lib/routes';
import { Company } from '@/types/companies';

export async function updateCompany({ companyId, newDataCompany }: {
  companyId: string,
  newDataCompany: Company
}): Promise<Company> {
  const deleteURL = `${bffRoutes.companiesURL}/${companyId}`;
  return fetch(deleteURL, {
    method: 'PUT',
    body: JSON.stringify(newDataCompany),
  }).then(res => {
    if (!res.ok) throw new Error('Error al editar la compañia');
    return res.json();
  });
}
