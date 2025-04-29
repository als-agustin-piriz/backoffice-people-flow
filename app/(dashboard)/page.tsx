import {
  Users,
  DollarSign,
  ArrowUpRight,
  ShoppingCart,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { ChartCard } from '@/components/dashboard/chart-card';
import { ActivityList } from '@/components/dashboard/activity-list';

// Sample data - In a real app, this would come from an API or database
const salesData = [
  { month: 'Jan', revenue: 4800, profit: 2200, expenses: 2600 },
  { month: 'Feb', revenue: 5200, profit: 2400, expenses: 2800 },
  { month: 'Mar', revenue: 6000, profit: 2800, expenses: 3200 },
  { month: 'Apr', revenue: 5800, profit: 2700, expenses: 3100 },
  { month: 'May', revenue: 6600, profit: 3100, expenses: 3500 },
  { month: 'Jun', revenue: 7200, profit: 3400, expenses: 3800 },
  { month: 'Jul', revenue: 7800, profit: 3800, expenses: 4000 },
];

const productData = [
  { category: 'Electronics', sales: 320, revenue: 12800 },
  { category: 'Clothing', sales: 280, revenue: 5600 },
  { category: 'Books', sales: 160, revenue: 2400 },
  { category: 'Home', sales: 190, revenue: 4750 },
  { category: 'Beauty', sales: 120, revenue: 3600 },
];

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

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartCard
          title="Revenue & Expenses"
          description="Monthly financial performance"
          chart="line"
          data={salesData}
          categories={['revenue', 'profit', 'expenses']}
          index="month"
        />
        <ChartCard
          title="Product Sales"
          description="Performance by category"
          chart="bar"
          data={productData}
          categories={['sales', 'revenue']}
          index="category"
        />
      </div>

      <div className="grid gap-6 grid-cols-1">
        <ActivityList activities={recentActivities} />
      </div>
    </div>
  );
}