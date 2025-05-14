export function TableHeader() {
  return (
    <thead>
    <tr className="bg-gray-50 border-b">
      {['Nombre', 'ID', 'Submódulos', 'Precio', 'Fecha de creación', 'Acciones'].map((col) => (
        <th
          key={col}
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {col}
        </th>
      ))}
    </tr>
    </thead>
  );
}
