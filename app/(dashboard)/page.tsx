import {
  Users,
  DollarSign,
  ArrowUpRight,
  ShoppingCart,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { ActivityList } from '@/components/dashboard/activity-list';

const recentActivities = [
  {
    id: '1',
    user: { name: 'Alice Smith', initials: 'AS' },
    action: 'created a new product',
    target: 'Wireless Headphones',
    date: new Date('2023-05-15T09:24:00'),
  },
  {
    id: '2',
    user: { name: 'Bob Johnson', initials: 'BJ' },
    action: 'updated order status to',
    target: 'Shipped',
    date: new Date('2023-05-15T11:30:00'),
  },
  {
    id: '3',
    user: { name: 'Carol Davis', initials: 'CD' },
    action: 'responded to',
    target: 'Support Ticket #1234',
    date: new Date('2023-05-14T14:45:00'),
  },
  {
    id: '4',
    user: { name: 'David Wilson', initials: 'DW' },
    action: 'completed the project',
    target: 'Website Redesign',
    date: new Date('2023-05-14T16:12:00'),
  },
  {
    id: '5',
    user: { name: 'Eva Taylor', initials: 'ET' },
    action: 'added a new team member',
    target: 'Marketing Team',
    date: new Date('2023-05-13T13:08:00'),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={<DollarSign className="h-4 w-4" />}
          description="This month"
          trend={+12.5}
        />
        <StatCard
          title="New Customers"
          value="2,350"
          icon={<Users className="h-4 w-4" />}
          description="This month"
          trend={+5.2}
        />
        <StatCard
          title="Sales"
          value="12,234"
          icon={<ShoppingCart className="h-4 w-4" />}
          description="This month"
          trend={-2.5}
        />
        <StatCard
          title="Active Now"
          value="573"
          icon={<ArrowUpRight className="h-4 w-4" />}
          description="Users online"
        />
      </div>

      <div className="grid gap-6 grid-cols-1">
        <ActivityList activities={recentActivities} />
      </div>
    </div>
  );
}