import { useState, useEffect } from 'react';
import { DollarSign, Users, Target, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import DateRangeFilter from './DateRangeFilter';
import ExportButton from './ExportButton';
import LiveDataToggle from './LiveDataToggle';
import SkeletonLoader from './SkeletonLoader';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { 
  revenueOverTime, 
  dailyUsers, 
  trafficSources 
} from '../lib/mockData';

const OverviewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const { 
    metrics, 
    isLive, 
    startLiveUpdates, 
    stopLiveUpdates, 
    resetToOriginal 
  } = useRealTimeData();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDateRangeChange = (range, customDates) => {
    setSelectedDateRange(range);
    // In a real app, you would fetch new data based on the date range
    console.log('Date range changed:', range, customDates);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <div className="animate-pulse bg-muted rounded h-8 w-48 mb-2"></div>
            <div className="animate-pulse bg-muted rounded h-4 w-64"></div>
          </div>
          <div className="animate-pulse bg-muted rounded h-10 w-48"></div>
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonLoader type="chart" />
          <SkeletonLoader type="chart" />
        </div>
        <SkeletonLoader type="chart" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Track your marketing performance and key metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <LiveDataToggle
            isLive={isLive}
            onStart={startLiveUpdates}
            onStop={stopLiveUpdates}
            onReset={resetToOriginal}
          />
          <DateRangeFilter 
            selectedRange={selectedDateRange}
            onRangeChange={handleDateRangeChange}
          />
          <ExportButton 
            data={[...revenueOverTime, ...dailyUsers]}
            filename="dashboard-overview"
          />
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={metrics.revenue.current}
          previousValue={metrics.revenue.previous}
          change={metrics.revenue.change}
          trend={metrics.revenue.trend}
          icon={DollarSign}
          format="currency"
        />
        <MetricCard
          title="Active Users"
          value={metrics.users.current}
          previousValue={metrics.users.previous}
          change={metrics.users.change}
          trend={metrics.users.trend}
          icon={Users}
          format="number"
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversions.current}
          previousValue={metrics.conversions.previous}
          change={metrics.conversions.change}
          trend={metrics.conversions.trend}
          icon={Target}
          format="percentage"
        />
        <MetricCard
          title="Growth Rate"
          value={metrics.growth.current}
          previousValue={metrics.growth.previous}
          change={metrics.growth.change}
          trend={metrics.growth.trend}
          icon={TrendingUp}
          format="percentage"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={revenueOverTime}
          title="Revenue Over Time"
          xKey="date"
          yKey="revenue"
          color="#8884d8"
        />
        <BarChart
          data={dailyUsers}
          title="Daily Active Users"
          xKey="day"
          yKey="users"
          color="#82ca9d"
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DonutChart
            data={trafficSources}
            title="Traffic Sources"
          />
        </div>
        
        {/* Additional metrics cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Campaign Performance</h3>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Campaigns</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg. CTR</span>
                <span className="font-medium">3.42%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Spend</span>
                <span className="font-medium">$45,200</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">ROI Summary</h3>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total ROAS</span>
                <span className="font-medium">4.2x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Best Campaign</span>
                <span className="font-medium">5.1x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Profit Margin</span>
                <span className="font-medium">28.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;

