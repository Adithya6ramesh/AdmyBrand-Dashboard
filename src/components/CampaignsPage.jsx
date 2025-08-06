import { useState, useEffect } from 'react';
import DataTable from './DataTable';
import ExportButton from './ExportButton';
import DateRangeFilter from './DateRangeFilter';
import SkeletonLoader from './SkeletonLoader';
import { campaignData } from '../lib/mockData';

const CampaignsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('30d');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDateRangeChange = (range, customDates) => {
    setSelectedDateRange(range);
    console.log('Date range changed:', range, customDates);
  };

  const tableColumns = [
    { key: 'name', label: 'Campaign Name' },
    { key: 'platform', label: 'Platform' },
    { key: 'status', label: 'Status' },
    { key: 'budget', label: 'Budget' },
    { key: 'spent', label: 'Spent' },
    { key: 'impressions', label: 'Impressions' },
    { key: 'clicks', label: 'Clicks' },
    { key: 'conversions', label: 'Conversions' },
    { key: 'ctr', label: 'CTR' },
    { key: 'cpc', label: 'CPC' },
    { key: 'roas', label: 'ROAS' }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <div className="animate-pulse bg-muted rounded h-8 w-48 mb-2"></div>
            <div className="animate-pulse bg-muted rounded h-4 w-64"></div>
          </div>
          <div className="flex space-x-4">
            <div className="animate-pulse bg-muted rounded h-10 w-48"></div>
            <div className="animate-pulse bg-muted rounded h-10 w-24"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <SkeletonLoader type="table" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
          <p className="text-muted-foreground">
            Monitor and analyze your advertising campaigns across all platforms
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <DateRangeFilter 
            selectedRange={selectedDateRange}
            onRangeChange={handleDateRangeChange}
          />
          <ExportButton 
            data={campaignData}
            filename="campaign-data"
          />
        </div>
      </div>

      {/* Campaign Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Campaigns</p>
              <p className="text-2xl font-bold">{campaignData.length}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">{campaignData.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
              <p className="text-2xl font-bold">
                {campaignData.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                {campaignData.filter(c => c.status === 'Active').length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">
                ${campaignData.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400 text-xs font-bold">$</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. ROAS</p>
              <p className="text-2xl font-bold">
                {(campaignData.reduce((sum, c) => sum + c.roas, 0) / campaignData.length).toFixed(1)}x
              </p>
            </div>
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <span className="text-orange-600 dark:text-orange-400 text-xs font-bold">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Data Table */}
      <DataTable
        data={campaignData}
        title="Campaign Performance"
        columns={tableColumns}
        pageSize={10}
      />

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Performing Campaigns</h3>
          <div className="space-y-3">
            {campaignData
              .sort((a, b) => b.roas - a.roas)
              .slice(0, 3)
              .map((campaign, index) => (
                <div key={campaign.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{campaign.roas}x ROAS</p>
                    <p className="text-sm text-muted-foreground">{campaign.conversions} conversions</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Platform Distribution</h3>
          <div className="space-y-3">
            {Object.entries(
              campaignData.reduce((acc, campaign) => {
                acc[campaign.platform] = (acc[campaign.platform] || 0) + 1;
                return acc;
              }, {})
            ).map(([platform, count]) => (
              <div key={platform} className="flex items-center justify-between">
                <span className="font-medium">{platform}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(count / campaignData.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;

