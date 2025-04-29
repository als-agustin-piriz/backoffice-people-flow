'use client';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

const rows = [
  {
    id: '1',
    name: 'Module 1',
    description: 'Description of Module 1',
    status: 'active',
    subModules: [
      {
        id: '1.1',
        name: 'Submodule 1.1',
        description: 'Description of Submodule 1.1',
        status: 'active',
      },
      {
        id: '1.2',
        name: 'Submodule 1.2',
        description: 'Description of Submodule 1.2',
        status: 'inactive',
      },
    ],
  },
  {
    id: '2',
    name: 'Module 2',
    description: 'Description of Module 2',
    status: 'inactive',
  },
];

const columns = [
  {
    key: 'name',
    label: 'NAME',
  },
  {
    key: 'role',
    label: 'ROLE',
  },
  {
    key: 'status',
    label: 'STATUS',
  },
];

export default function ModulesPage() {
    return (
      <div className="space-y-6">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
}