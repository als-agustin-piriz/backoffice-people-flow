export const CreatedDateCell = ({ created }: { created?: string }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm">
    {created &&
      new Date(created).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
  </td>
);