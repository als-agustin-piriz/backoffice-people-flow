export default function TableModulesSkeleton() {
  const skeletonRows = Array(5).fill(0);

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full min-h-[500px] w-full justify-between">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
          <tr className="bg-gray-50 border-b">
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submódulos
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de creación
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
          </thead>
          <tbody>
          {skeletonRows.map((_, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-100 rounded w-16"></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="animate-pulse flex flex-wrap gap-2">
                  <div className="h-6 bg-yellow-100 rounded w-20"></div>
                  <div className="h-6 bg-yellow-100 rounded w-16"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-100 rounded w-12"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse">
                  <div className="h-8 bg-blue-100 rounded w-36"></div>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-6 py-4 border-t">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="animate-pulse flex space-x-2">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3].map((page) => (
                <div key={page} className="h-8 w-8 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}