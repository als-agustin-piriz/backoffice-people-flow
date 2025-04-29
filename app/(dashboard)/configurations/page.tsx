import { withAuthServer } from '@/lib/with-auth-server';

export default function ConfigurationsPage() {
  return withAuthServer(['configurations:read'], async () => {
    return (

      <div className="space-y-6">
        <p>Configurations</p>
      </div>
    );
  });
}