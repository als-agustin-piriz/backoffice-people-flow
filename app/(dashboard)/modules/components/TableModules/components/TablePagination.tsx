import { Button } from '@heroui/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
};

export function TablePagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: Props) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-t">
      <div className="text-sm text-gray-500">
        Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} módulos
      </div>

      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="flat"
          isDisabled={currentPage === 1}
          onPress={() => onPageChange(currentPage - 1)}
          startContent={<ChevronLeftIcon size={16} />}
        >
          Anterior
        </Button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? 'solid' : 'flat'}
              color={page === currentPage ? 'primary' : 'default'}
              onPress={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          size="sm"
          variant="flat"
          isDisabled={currentPage === totalPages}
          onPress={() => onPageChange(currentPage + 1)}
          endContent={<ChevronRightIcon size={16} />}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}