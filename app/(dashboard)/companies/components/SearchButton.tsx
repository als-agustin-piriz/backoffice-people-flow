import { Search } from 'lucide-react';

export function SearchButton({ setShowSearch }: { setShowSearch: (show: boolean) => void }) {
  return (
    <button
      onClick={() => setShowSearch(true)}
      className="flex items-center
       gap-2 px-4 py-2 bg-white rounded-full shadow hover:shadow-md transition-all"
    >
      <Search className="h-4 w-4" />
      <span>Buscar</span>
    </button>
  );
}