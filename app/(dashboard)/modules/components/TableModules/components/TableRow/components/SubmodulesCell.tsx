import { Submodule } from '@/types/modules';
import { Button } from '@heroui/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export const SubmodulesCell = (
  {
    submodules,
    showSubmodules,
    toggleSubmodules,
  }: {
    submodules: Submodule[];
    showSubmodules: boolean;
    toggleSubmodules: () => void;
  }) => (
  <td className="px-6 py-4">
    <div className="flex items-center gap-3 whitespace-nowrap">
      {submodules.length > 0 ? (
        <Button
          onPress={toggleSubmodules}
          className="flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
          endContent={showSubmodules ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
        >
          Ver <p className="font-bold">{submodules.length}</p> submódulos
        </Button>
      ) : (
        <span className="text-gray-400 text-sm">Sin submódulos</span>
      )}
    </div>
  </td>
);
