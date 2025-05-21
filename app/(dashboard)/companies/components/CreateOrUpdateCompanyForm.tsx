'use client';

import React, { useState, useEffect } from 'react';
import { Company, ViewStateCompany } from '@/types/companies';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';

interface CreateOrUpdateCompanyFormProps {
  handleBack: () => void;
  initialData?: Company | null;
  setViewState: (viewState: ViewStateCompany) => void;
  saveCompany: (companyData: Company) => Promise<void>;
  updateCompany: (companyData: Company) => Promise<void>;
  loading: boolean;
}

const CreateOrUpdateCompanyForm: React.FC<CreateOrUpdateCompanyFormProps> = (
  {
    handleBack,
    initialData,
    saveCompany,
    updateCompany,
    loading,
  }) => {
  const [companyData, setCompanyData] = useState<Company>({
    name: '',
    legalName: '',
    rut: '',
    email: '',
    phone: '',
    logo: '',
    address: '',
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setCompanyData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setCompanyData({
          ...companyData,
          logo: reader.result as string,
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (initialData) await updateCompany(companyData);
    else await saveCompany(companyData);
  };

  return (
    <div className="bg-white rounded-lg mx-auto">
      <div>
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nombre de la Compañía
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              size="lg"
              value={companyData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="legalName">
              Nombre legal
            </label>
            <Input
              type="text"
              id="legalName"
              size="lg"
              name="legalName"
              value={companyData.legalName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
              Rut
            </label>
            <Input
              type="text"
              id="rut"
              size="lg"
              name="rut"
              value={companyData.rut}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              size="lg"
              name="email"
              value={companyData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Teléfono
            </label>
            <Input
              type="text"
              id="phone"
              size="lg"
              name="phone"
              value={companyData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Dirección
            </label>
            <Input
              type="text"
              id="address"
              size="lg"
              name="address"
              value={companyData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">
            Logo
          </label>
          <Input
            type="file"
            id="logo"
            name="logo"
            size="lg"
            onChange={handleFileChange}
          />
          {companyData.logo && (
            <img src={companyData.logo} alt="Logo Preview" className="mt-2 h-16 w-16 object-contain" />
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onPress={handleBack}
            className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onPress={handleSubmit}
            isLoading={loading}
            className="px-4 py-2 bg-gray-700  text-white rounded-lg hover:bg-gray-500  transition-colors"
          >
            {initialData ? 'Actualizar Compañía' : 'Crear Compañía'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateCompanyForm;