import { Search } from 'lucide-react';

type Props = {
  resetFilters: () => void;
};

export function NoResults({ resetFilters }: Props) {
  return (
    <div className="bg-white rounded-xl p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-800">No se encontraron compañías</h3>
      <p className="text-gray-500 mt-2">Intenta con otros términos de búsqueda o filtros</p>
      <button
        onClick={resetFilters}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Reiniciar filtros
      </button>
    </div>
  );
}