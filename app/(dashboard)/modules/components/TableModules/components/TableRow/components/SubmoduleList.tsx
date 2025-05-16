import { Submodule } from '@/types/modules';
import {
  SubmoduleItem,
} from './SubmoduleItem';

export const SubmoduleList = (
  {
    submodules,
    onDeleteSubmodule,
    isLoadingDeleteSubmodule = false,
  }: {
    submodules: Submodule[];
    onDeleteSubmodule: (submodule: Submodule) => Promise<boolean>;
    isLoadingDeleteSubmodule?: boolean;
  }) => {
  return (
    <tr className="bg-gray-50">
      <td colSpan={7} className="px-6 py-2">
        <div className="ml-6 rounded-md border border-gray-200 bg-white p-3">
          <h4 className="text-sm font-bold text-gray-700 mb-2">Submódulos</h4>
          <ul className="space-y-1">
            {submodules.map((sub) => (
              <SubmoduleItem
                key={sub.id}
                submodule={sub}
                onDeleteSubmodule={onDeleteSubmodule}
                isLoadingDeleteSubmodule={isLoadingDeleteSubmodule}
              />
            ))}
          </ul>
        </div>
      </td>
    </tr>
  );
};