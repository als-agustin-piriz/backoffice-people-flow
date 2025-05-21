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
import CreateOrUpdateCompanyForm from '@/app/(dashboard)/companies/components/CreateOrUpdateCompanyForm';
import { ModalComponent } from '@/components/ModalComponent/ModalComponent';
import { useModal } from '@/hooks/useModal';
import CompanyView from '@/app/(dashboard)/companies/components/CompanyView';

export default function CompanyDirectory() {
  const [viewState, setViewState] = useState<ViewStateCompany>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const {
    companies,
    onGetCompanies,
    loadingCompanies,
    onSearchCompanies,
    saveCompany,
    onUpdateCompany,
    loading,
  } = useCompanyManager();
  const [companySelected, setCompanySelected] = useState<Company | null>(null);
  const { isOpen, onOpenModal, onClose, backdrop } = useModal();
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  const resetFilters = () => {
    setSearchTerm('');
  };

  const handleDelete = (company: Company) => {
    setCompanyToDelete(company);
    onOpenModal();
  };

  const onSelectCompany = (company: Company) => {
    if (company) {
      setCompanySelected(company);
      setViewState('view-company');
    }
  };

  const onEditCompany = (company: Company) => {
    if (company) {
      setCompanySelected(company);
      setViewState('create-update-company');
    }
  };

  const onSaveCompany = async (companyData: Company) => {
    if (companyData) {
      const companySaved: Company | null = await saveCompany(companyData);
      if (companySaved) setViewState('cards');
      setCompanySelected(null);
    }
  };

  const updateCompany = async (companyData: Company) => {
    if (companyData?.id) {
      const companyUpdated = await onUpdateCompany({ companyId: companyData.id, newDataCompany: companyData });
      if (companyUpdated) {
        setViewState('cards');
      }
      setCompanySelected(null);
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
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {viewState !== 'cards' && <BackButton handleBack={onBack} />}
          {viewState === 'cards' &&
            <h1 className="text-3xl font-bold text-gray-800">
              Directorio de Compañías
            </h1>
          }
          {viewState === 'create-update-company' &&
            <h1 className="text-3xl font-bold text-gray-800">
              {companySelected ? 'Actualizar compañia' : 'Alta de compañia'}
            </h1>
          }
          {viewState === 'view-company'
            &&
            <h1 className="text-3xl font-bold text-gray-800">
              Ver compañia
            </h1>
          }
        </div>
        {viewState === 'cards' &&
          <button
            onClick={() => setViewState('create-update-company')}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Alta de compañia
          </button>
        }
      </div>

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
        <CompaniesList
          companies={companies}
          itemsPerPage={6}
          onSelectCompany={onSelectCompany}
          onEditCompany={onEditCompany}
          handleDelete={handleDelete}
        />
      )}

      {viewState === 'create-update-company' &&
        <CreateOrUpdateCompanyForm
          initialData={companySelected}
          handleBack={onBack}
          setViewState={setViewState}
          saveCompany={onSaveCompany}
          updateCompany={updateCompany}
          loading={loading}
        />
      }

      {
        viewState === 'view-company' &&
        <CompanyView companyData={companySelected} onEditCompany={onEditCompany} />
      }

      {viewState === 'cards' && loadingCompanies && <CompaniesSkeleton />}

      {viewState === 'cards' && !loadingCompanies && companies.length === 0 && (
        <NoResults resetFilters={resetFilters} />
      )}

      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        backdrop={backdrop}
        title="Eliminar compañia"
        description={
          <div className="flex gap-1 w-full">
            <p>¿Eliminar</p>
            <p className="font-bold">{companyToDelete?.name}</p>
            <p>?</p>
          </div>
        }
        // onAction={confirmDelete}
        actionLabel="Confirmar"
        actionColor="danger"
        isLoading={loading}
      />
    </div>
  );
}