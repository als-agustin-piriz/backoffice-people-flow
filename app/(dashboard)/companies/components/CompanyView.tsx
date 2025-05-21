import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Company } from '@/types/companies';

interface CompanyViewProps {
  companyData: Company | null;
  onEditCompany: (company: Company) => void;
}

export default function CompanyView({ companyData, onEditCompany }: CompanyViewProps) {
  const [showFullLogo, setShowFullLogo] = useState(false);

  if (!companyData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No hay información disponible para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md mx-auto p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-6 pb-4 border-b border-gray-200">
        {companyData.logo ? (
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <img
              src={companyData.logo}
              alt={`${companyData.name} Logo`}
              className="h-20 w-20 object-contain rounded-lg cursor-pointer border border-gray-200 p-1 bg-white shadow-sm"
              onClick={() => setShowFullLogo(true)}
            />
            {showFullLogo && (
              <div
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                onClick={() => setShowFullLogo(false)}
              >
                <div className="bg-white p-2 rounded-lg max-w-2xl max-h-2xl">
                  <img
                    src={companyData.logo}
                    alt={`${companyData.name} Logo`}
                    className="max-h-96 object-contain"
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-full"
                    onClick={() => setShowFullLogo(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-20 w-20 bg-gray-100 rounded-lg mb-4 md:mb-0 md:mr-6">
            <span className="text-gray-400 text-sm">Sin logo</span>
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{companyData.name}</h1>
          <p className="text-gray-600 text-sm">{companyData.legalName}</p>
        </div>

        <div className="mt-4 md:mt-0 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center">
          <Eye size={16} className="mr-1" />
          <span>Modo Vista</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-500 mb-1">RUT</h2>
          <p className="text-gray-800 font-medium">{companyData.rut || 'No disponible'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
          <p className="text-gray-800 font-medium">{companyData.email || 'No disponible'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Teléfono</h2>
          <p className="text-gray-800 font-medium">{companyData.phone || 'No disponible'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Dirección</h2>
          <p className="text-gray-800 font-medium">{companyData.address || 'No disponible'}</p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-end">
          <button
            className="ml-3 px-4 py-2 bg-gray-700  text-white rounded-lg hover:bg-gray-500  transition-colors"
            onClick={() => onEditCompany(companyData)}
          >
            Editar Compañía
          </button>
        </div>
      </div>
    </div>
  );
}