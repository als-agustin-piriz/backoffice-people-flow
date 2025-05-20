import { CompanyDTO } from '@/types/companies';

export async function searchCompanies(search: string): Promise<CompanyDTO> {
  const params = new URLSearchParams({ search });
  return fetch(`/api/backend/company?${params.toString()}`, {
    method: 'GET',
  }).then(res => {
    if (!res.ok) return null;
    return res.json();
  });
}
