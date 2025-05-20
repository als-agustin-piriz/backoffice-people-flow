import { useState, useEffect } from 'react';
import { Company } from '@/types/companies';
import { CompanyCard } from '@/app/(dashboard)/companies/components/CompanyCard';

type CompaniesListProps = {
  companies: Array<Company>;
  itemsPerPage?: number;
  onSelectCompany: (company: Company) => void,
}

export const CompaniesList = ({ companies, itemsPerPage = 6, onSelectCompany }: CompaniesListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedCompanies, setPaginatedCompanies] = useState<Company[]>([]);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [companies]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedCompanies(companies.slice(startIndex, endIndex));
  }, [currentPage, companies, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    const createPageButton = (pageNumber: number) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`w-10 h-10 flex items-center justify-center ${
          currentPage === pageNumber
            ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-md font-medium'
            : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 hover:rounded-3xl'
        }`}
      >
        {pageNumber}
      </button>
    );

    pages.push(createPageButton(1));

    if (totalPages > 1) {
      const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(createPageButton(i));
      }

      pages.push(createPageButton(totalPages));
    }

    return pages;
  };


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[450px]">
        {paginatedCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} onSelectCompany={onSelectCompany} />
        ))}
      </div>

      {companies.length > itemsPerPage && (
        <div className="flex items-center justify-between pt-8">
          <div className="text-center text-sm font-medium text-gray-500">
            Mostrando <span
            className="text-indigo-600 font-semibold">{((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, companies.length)}</span> de <span
            className="text-indigo-600 font-semibold">{companies.length}</span> resultados
          </div>

          <div className="inline-flex items-center bg-white rounded-full shadow-lg px-1 py-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              } transition-all duration-200 ease-in-out`}
              aria-label="Página anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center px-2">
              {renderPageNumbers()}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              } transition-all duration-200 ease-in-out`}
              aria-label="Página siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

