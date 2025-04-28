import { ChartCard } from '@/components/dashboard/chart-card';
import { withAuthServer } from '@/lib/with-auth-server';


// Sample data - In a real app, this would come from an API or database
const visitorData = [
  { date: '2023-05-01', visitors: 1200, pageViews: 3400, sessions: 1000 },
  { date: '2023-05-02', visitors: 1300, pageViews: 3600, sessions: 1100 },
  { date: '2023-05-03', visitors: 1400, pageViews: 3900, sessions: 1200 },
  { date: '2023-05-04', visitors: 1500, pageViews: 4100, sessions: 1300 },
  { date: '2023-05-05', visitors: 1600, pageViews: 4400, sessions: 1400 },
  { date: '2023-05-06', visitors: 1700, pageViews: 4600, sessions: 1500 },
  { date: '2023-05-07', visitors: 1800, pageViews: 4900, sessions: 1600 },
  { date: '2023-05-08', visitors: 1900, pageViews: 5100, sessions: 1700 },
  { date: '2023-05-09', visitors: 2000, pageViews: 5400, sessions: 1800 },
  { date: '2023-05-10', visitors: 2100, pageViews: 5600, sessions: 1900 },
  { date: '2023-05-11', visitors: 2200, pageViews: 5900, sessions: 2000 },
  { date: '2023-05-12', visitors: 2300, pageViews: 6100, sessions: 2100 },
  { date: '2023-05-13', visitors: 2400, pageViews: 6400, sessions: 2200 },
  { date: '2023-05-14', visitors: 2500, pageViews: 6600, sessions: 2300 },
];

const conversionData = [
  { source: 'Direct', rate: 3.2, users: 1200 },
  { source: 'Social Media', rate: 4.5, users: 2400 },
  { source: 'Email', rate: 5.7, users: 800 },
  { source: 'Organic Search', rate: 2.9, users: 3600 },
  { source: 'Referral', rate: 4.2, users: 1800 },
  { source: 'Paid Search', rate: 3.8, users: 2200 },
];

const deviceData = [
  { device: 'Desktop', users: 5800, percentage: 48 },
  { device: 'Mobile', users: 4500, percentage: 37 },
  { device: 'Tablet', users: 1800, percentage: 15 },
];

export default function AnalyticsPage() {
  return withAuthServer(['recruitment:reception'], async () => {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 grid-cols-1">
          <ChartCard
            title="Website Traffic"
            description="Daily visitors, pageviews, and sessions"
            chart="area"
            data={visitorData}
            categories={['visitors', 'pageViews', 'sessions']}
            index="date"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <ChartCard
            title="Conversion Rates"
            description="By source"
            chart="bar"
            data={conversionData}
            categories={['rate', 'users']}
            index="source"
          />
          <ChartCard
            title="Device Distribution"
            description="Users by device type"
            chart="bar"
            data={deviceData}
            categories={['users', 'percentage']}
            index="device"
          />
        </div>
      </div>
    );
  });
}