import { useState } from 'react';
import { fetchCompanies } from '@/services/companies/fetchCompanies';
import { Company } from '@/types/companies';
import { searchCompanies } from '@/services/companies/searchCompanies';


export const useCompanyManager = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  const onGetCompanies = async () => {
    setLoadingCompanies(true);
    try {
      const companies = await fetchCompanies();
      if (companies)
        setCompanies(companies.items);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
    setLoadingCompanies(false);
  };

  const onSearchCompanies = async (search: string) => {
    setLoadingCompanies(true);
    try {
      const companies = await searchCompanies(search);
      if (companies)
        setCompanies(companies.items);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
    setLoadingCompanies(false);
  };

  return {
    companies,
    loadingCompanies,
    onGetCompanies,
    onSearchCompanies,
  };
};
