import { ArrowUpRight, Briefcase, Building2 } from 'lucide-react';
import { IdCell } from '@/app/(dashboard)/modules/components/TableModules/components/TableRow/components/IdCell';
import { Company } from '@/types/companies';

type Props = {
  company: Company
  onSelectCompany: (company: Company) => void,
};

export function CompanyCard({ company, onSelectCompany }: Props) {
  return (
    <div
      className={`rounded-xl p-6 bg-emerald-100 h-[210px] hover:shadow-lg
       transition-all duration-300 transform hover:-translate-y-1
        cursor-pointer relative overflow-hidden group`}
    >
      <div className="flex items-start justify-between">
        <div className="p-2 bg-white rounded-lg inline-flex mb-4">
          <Building2 className="w-6 h-6 text-gray-700" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{company.name}</h3>
      <IdCell moduleId={company.id || ''} as="div" />
      <div className="flex items-center text-gray-500 text-sm">
        <Briefcase className="w-4 h-4 mr-1" />
        <span>{company.legalName} empleados</span>
      </div>
      <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="bg-white p-2 rounded-full shadow hover:shadow-md"
          onClick={()=> onSelectCompany(company)}
        >
          <ArrowUpRight className="w-4 h-4 text-gray-800" />
        </button>
      </div>
    </div>
  );
}