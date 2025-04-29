import { withAuthServer } from '@/lib/with-auth-server';

export default function UsersPage() {
  return withAuthServer(['users:read'], async () => {
    return (
      <div className="space-y-6">
        <p>Users</p>
      </div>
    );
  });
}