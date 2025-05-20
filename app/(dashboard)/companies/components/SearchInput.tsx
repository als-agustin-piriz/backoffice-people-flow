import { Search } from 'lucide-react';

type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export function SearchInput({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="relative animate-fadeIn">
      <input
        id="search-input"
        type="text"
        placeholder="Buscar compañía..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
    </div>
  );
}