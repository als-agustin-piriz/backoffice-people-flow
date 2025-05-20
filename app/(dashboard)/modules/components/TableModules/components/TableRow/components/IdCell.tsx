import { CopyIcon } from 'lucide-react';
import { addToast } from '@heroui/react';

export const IdCell = ({ moduleId, as = 'td' }: { moduleId: string; as?: 'td' | 'div' }) => {
  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(moduleId);
      addToast({
        title: 'Copiado al portapapeles',
        color: 'success',
      });
    } catch (err) {
      console.error('Error al copiar el ID:', err);
    }
  };

  const Component = as;

  return (
    <Component className="py-4 whitespace-nowrap">
      <button
        type="button"
        onClick={handleCopyId}
        className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition"
      >
        <span className="font-mono">{moduleId.slice(0, 4)}...</span>
        <CopyIcon size={14} />
      </button>
    </Component>
  );
};