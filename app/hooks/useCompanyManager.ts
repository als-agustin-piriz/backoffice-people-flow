import { useState } from 'react';
import { fetchCompanies } from '@/services/companies/fetchCompanies';
import { Company } from '@/types/companies';
import { searchCompanies } from '@/services/companies/searchCompanies';
import { addToast } from '@heroui/react';
import { createCompany } from '@/services/companies/createCompany';
import { updateCompany } from '@/services/companies/updateCompany';


export const useCompanyManager = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
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

  const saveCompany = async (companyData: Company) => {
    try {
      setLoading(true);
      const data = await createCompany(companyData);
      if (data) {
        setCompanies((prev) => {
          const newCompanies = [...prev, data];
          console.log('Updated companies:', newCompanies); // Debug the new state
          return newCompanies;
        });
        setLoading(false);
        addToast({
          title: 'Compañia creada',
          color: 'success',
        });
        return data;
      }
      setLoading(false);
      return null;
    } catch (err) {
      addToast({
        title: 'Error al crear la compañia',
        color: 'danger',
      });
      console.log('Error creating module:', err);
      setLoading(false);
      return null;
    }
  };

  const onUpdateCompany = async (
    {
      companyId,
      newDataCompany,
    }: {
      companyId: string;
      newDataCompany: Company;
    }) => {
    try {
      setLoading(true);
      const updated: Company = await updateCompany({ companyId, newDataCompany });
      if (updated) {
        setCompanies((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m)),
        );
        addToast({
          title: 'Compañia actualizada',
          color: 'success',
        });
        setLoading(false);
        return updated;
      }
      setLoading(false);
      return false;
    } catch (err) {
      console.error('Error updating company:', err);
      addToast({
        title: 'Error al actualizar compañia',
        color: 'danger',
      });
      setLoading(false);
      return false;
    }
  };

  return {
    companies,
    loadingCompanies,
    onGetCompanies,
    onSearchCompanies,
    saveCompany,
    onUpdateCompany,
    loading,
  };
};
