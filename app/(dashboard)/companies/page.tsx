'use client';
import { useEffect, useState } from 'react';
import { SearchInput } from '@/app/(dashboard)/companies/components/SearchInput';
import { NoResults } from '@/app/(dashboard)/companies/components/NoResultsCompanies';
import { CompaniesSkeleton } from '@/app/(dashboard)/companies/components/CompaniesSkeleton';
import { useCompanyManager } from '@/app/hooks/useCompanyManager';
import { Company, ViewStateCompany } from '@/types/companies';
import { BackButton } from '@/app/(dashboard)/companies/components/BackButton';
import { CompaniesList } from '@/app/(dashboard)/companies/components/CompaniesList';
import { useDebouncedEffect } from '@/app/hooks/useDebouncedEffect';
import CreateOrUpdateCompanyForm from '@/app/(dashboard)/companies/components/NewCompanyForm';

export default function CompanyDirectory() {
  const [viewState, setViewState] = useState<ViewStateCompany>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const { companies, onGetCompanies, loadingCompanies, onSearchCompanies } = useCompanyManager();
  const [companySelected, setCompanySelected] = useState<Company | null>(null);

  const resetFilters = () => {
    setSearchTerm('');
  };

  const onSelectCompany = (company: Company) => {
    if (company) {
      setCompanySelected(company);
      setViewState('create-update-company');
    }
  };

  const onBack = () => {
    setCompanySelected(null);
    setViewState('cards');
  };

  useEffect(() => {
    onGetCompanies();
  }, []);

  useDebouncedEffect(() => {
    if (searchTerm.length > 2) {
      onSearchCompanies(searchTerm);
    } else onGetCompanies();
  }, [searchTerm], 500);

  return (
    <div className="mx-auto p-6 min-h-screen">
      <header className="flex justify-between">
        <div className="flex gap-2 items-center">
          {viewState !== 'cards' && <BackButton handleBack={onBack} />}
          <h1 className="text-3xl font-bold text-gray-800">
            {viewState === 'cards' && 'Directorio de Compañías'}
            {viewState === 'create-update-company' && 'Alta de compañia'}
          </h1>
        </div>
        {viewState === 'cards' &&
          <button
            onClick={() => setViewState('create-update-company')}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Alta de compañia
          </button>
        }
      </header>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-8 gap-4">
        <div className="relative w-full md:w-64">
          {viewState === 'cards' &&
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        </div>
      </div>

      {viewState === 'cards' && !loadingCompanies && companies.length > 0 && (
        <CompaniesList companies={companies} itemsPerPage={6} onSelectCompany={onSelectCompany} />
      )}

      {viewState === 'create-update-company' &&
        <CreateOrUpdateCompanyForm
          initialData={companySelected}
          handleBack={onBack}
        />
      }

      {viewState === 'cards' && loadingCompanies && <CompaniesSkeleton />}

      {viewState === 'cards' && !loadingCompanies && companies.length === 0 && (
        <NoResults resetFilters={resetFilters} />
      )}
    </div>
  );
}