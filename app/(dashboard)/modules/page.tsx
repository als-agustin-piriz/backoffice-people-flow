import { withAuthServer } from '@/lib/with-auth-server';

export default function ModulesPage() {
  return withAuthServer(['modules:read'], async () => {
    return (
      <div className="space-y-6">
        <p>Modules</p>
      </div>
    );
  });
}