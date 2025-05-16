export const ModuleInfoCell = ({ name, description }: { name: string; description?: string }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    <div className="font-medium text-sm">{name}</div>
    {description && <div className="text-sm text-gray-500">{description}</div>}
  </td>
);