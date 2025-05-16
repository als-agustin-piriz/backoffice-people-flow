export const PriceCell = ({ price }: { price: number }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    <code className="px-2 py-1 rounded text-sm">${price}</code>
  </td>
);