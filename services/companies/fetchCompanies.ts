import { CompanyDTO } from '@/types/companies';

export async function fetchCompanies(): Promise<CompanyDTO> {
  return fetch('/api/backend/company', {
    method: 'GET',
  }).then(res => {
    if (!res.ok) return null;
    return res.json();
  });
}
