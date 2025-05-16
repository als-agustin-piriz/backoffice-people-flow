import { Switch } from '@heroui/react';

export const StatusCell = (
  {
    isActive,
    onChangeStatus,
    loading,
  }: {
    isActive: boolean;
    onChangeStatus: (status: boolean) => void;
    loading: boolean;
  }) => (
  <td>
    <Switch
      isSelected={isActive}
      onValueChange={onChangeStatus}
      color="success"
      size="sm"
      isDisabled={loading}
    >
      <p className="text-sm">{isActive ? 'Activo' : 'Inactivo'}</p>
    </Switch>
  </td>
);