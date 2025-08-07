import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Target, 
  DollarSign, 
  Users, 
  Eye, 
  MousePointer, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from 'lucide-react';
import MetricCard from './MetricCard';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import DateRangeFilter from './DateRangeFilter';
import ExportButton from './ExportButton';
import SkeletonLoader from './SkeletonLoader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDateFilter } from '../contexts/DateFilterContext';
import { 
  campaignData, 
  revenueOverTime, 
  dailyUsers, 
  trafficSources,
  kpiMetrics 
} from '../lib/mockData';

const AnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  
  // Use DateFilterContext for date filtering
  const { filteredData, getFilteredCampaigns, getDateRangeText } = useDateFilter();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter campaigns based on selected platform
  const getFilteredCampaignsByPlatform = () => {
    const baseCampaigns = getFilteredCampaigns();
    if (selectedPlatform === 'all') return baseCampaigns;
    
    const platformMap = {
      'google': 'Google Ads',
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'linkedin': 'LinkedIn'
    };
    
    return baseCampaigns.filter(campaign => 
      campaign.platform === platformMap[selectedPlatform]
    );
  };

  const filteredCampaigns = getFilteredCampaignsByPlatform();

  // Generate advanced analytics data based on filtered campaigns
  const generateAdvancedMetrics = () => {
    const campaigns = filteredCampaigns;
    const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
    const totalRevenue = campaigns.reduce((sum, campaign) => sum + (campaign.conversions * 100), 0);
    const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
    const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
    const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
    const avgROAS = campaigns.length > 0 ? campaigns.reduce((sum, campaign) => sum + campaign.roas, 0) / campaigns.length : 0;
    const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const avgCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    return {
      totalSpend,
      totalRevenue,
      totalImpressions,
      totalClicks,
      totalConversions,
      avgROAS,
      avgCTR,
      avgCPC,
      conversionRate,
      roi: totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend) * 100 : 0
    };
  };

  // Platform performance data based on filtered data
  const generatePlatformData = () => {
    const platforms = ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn'];
    return platforms.map(platform => {
      const platformCampaigns = filteredCampaigns.filter(c => c.platform === platform);
      const revenue = platformCampaigns.reduce((sum, c) => sum + (c.conversions * 100), 0);
      const spend = platformCampaigns.reduce((sum, c) => sum + c.spent, 0);
      const conversions = platformCampaigns.reduce((sum, c) => sum + c.conversions, 0);
      
      return {
        platform,
        revenue,
        spend,
        conversions,
        roas: spend > 0 ? revenue / spend : 0,
        campaigns: platformCampaigns.length
      };
    });
  };

  // Generate dynamic monthly performance based on filtered data and platform
  const generateMonthlyPerformance = () => {
    const baseRevenue = filteredData.revenue || [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // Platform multipliers for dynamic data
    const platformMultipliers = {
      'google': { revenue: 1.0, spend: 1.0 },
      'facebook': { revenue: 0.9, spend: 0.85 },
      'instagram': { revenue: 1.25, spend: 0.9 },
      'linkedin': { revenue: 0.75, spend: 1.1 },
      'all': { revenue: 1.0, spend: 1.0 }
    };
    
    const multiplier = platformMultipliers[selectedPlatform] || platformMultipliers['all'];
    
    return months.map((month, index) => {
      const baseValue = 100000 + (index * 15000) + Math.random() * 20000;
      const revenue = Math.round(baseValue * multiplier.revenue);
      const spend = Math.round(baseValue * 0.25 * multiplier.spend);
      
      return {
        month,
        revenue,
        spend,
        roas: spend > 0 ? revenue / spend : 0,
        conversions: Math.round(revenue / 400)
      };
    });
  };

  // Conversion funnel data based on filtered campaigns
  const generateConversionFunnelData = () => {
    const campaigns = filteredCampaigns;
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const estimatedVisits = Math.round(totalClicks * 0.85);
    const estimatedLeads = Math.round(totalConversions * 4.5);

    return [
      { stage: 'Impressions', value: totalImpressions, percentage: 100, color: '#8884d8' },
      { stage: 'Clicks', value: totalClicks, percentage: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0, color: '#82ca9d' },
      { stage: 'Visits', value: estimatedVisits, percentage: totalImpressions > 0 ? (estimatedVisits / totalImpressions) * 100 : 0, color: '#ffc658' },
      { stage: 'Leads', value: estimatedLeads, percentage: totalImpressions > 0 ? (estimatedLeads / totalImpressions) * 100 : 0, color: '#ff7300' },
      { stage: 'Conversions', value: totalConversions, percentage: totalImpressions > 0 ? (totalConversions / totalImpressions) * 100 : 0, color: '#00ff00' }
    ];
  };

  const monthlyPerformance = generateMonthlyPerformance();
  const conversionFunnelData = generateConversionFunnelData();
  const advancedMetrics = generateAdvancedMetrics();
  const platformData = generatePlatformData();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-muted rounded h-8 w-48 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonLoader type="chart" />
          <SkeletonLoader type="chart" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Deep insights into your marketing performance • {getDateRangeText()}
            {selectedPlatform !== 'all' && (
              <Badge variant="outline" className="ml-2">
                {selectedPlatform === 'google' ? 'Google Ads' :
                 selectedPlatform === 'facebook' ? 'Facebook' :
                 selectedPlatform === 'instagram' ? 'Instagram' :
                 selectedPlatform === 'linkedin' ? 'LinkedIn' : selectedPlatform}
              </Badge>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="google">Google Ads</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          <DateRangeFilter />
          <ExportButton 
            data={monthlyPerformance.map(item => ({
              month: item.month,
              revenue: '$' + item.revenue.toLocaleString(),
              spend: '$' + item.spend.toLocaleString(),
              roas: item.roas.toFixed(2) + 'x',
              platform: selectedPlatform === 'all' ? 'All Platforms' : 
                selectedPlatform === 'google' ? 'Google Ads' :
                selectedPlatform === 'facebook' ? 'Facebook' :
                selectedPlatform === 'instagram' ? 'Instagram' :
                selectedPlatform === 'linkedin' ? 'LinkedIn' : selectedPlatform
            }))}
            filename="analytics-performance"
          />
        </div>
      </div>

      {/* Advanced KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total ROAS"
          value={advancedMetrics.avgROAS}
          previousValue={3.8}
          change={((advancedMetrics.avgROAS - 3.8) / 3.8) * 100}
          trend={advancedMetrics.avgROAS > 3.8 ? 'up' : 'down'}
          icon={TrendingUp}
          format="number"
        />
        <MetricCard
          title="Conversion Rate"
          value={advancedMetrics.conversionRate}
          previousValue={2.8}
          change={((advancedMetrics.conversionRate - 2.8) / 2.8) * 100}
          trend={advancedMetrics.conversionRate > 2.8 ? 'up' : 'down'}
          icon={Target}
          format="percentage"
        />
        <MetricCard
          title="Cost Per Click"
          value={advancedMetrics.avgCPC}
          previousValue={1.45}
          change={((advancedMetrics.avgCPC - 1.45) / 1.45) * 100}
          trend={advancedMetrics.avgCPC < 1.45 ? 'up' : 'down'}
          icon={MousePointer}
          format="currency"
        />
        <MetricCard
          title="Total ROI"
          value={advancedMetrics.roi}
          previousValue={285}
          change={((advancedMetrics.roi - 285) / 285) * 100}
          trend={advancedMetrics.roi > 285 ? 'up' : 'down'}
          icon={DollarSign}
          format="percentage"
        />
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Revenue vs Spend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={monthlyPerformance}
              title=""
              xKey="month"
              yKey="revenue"
              color="#8884d8"
              showSecondLine={true}
              secondYKey="spend"
              secondColor="#82ca9d"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Conversion Funnel Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <div key={stage.stage} className="flex items-center space-x-4">
                  <div className="w-24 text-sm font-medium">{stage.stage}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="h-6 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.max(stage.percentage, 5)}%`,
                          backgroundColor: stage.color 
                        }}
                      />
                      <span className="text-sm font-medium">
                        {new Intl.NumberFormat().format(stage.value)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({stage.percentage.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Platform Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformData.map((platform) => (
              <div key={platform.platform} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{platform.platform}</h4>
                  <Badge variant={platform.roas > 4 ? 'default' : 'secondary'}>
                    {platform.roas.toFixed(1)}x ROAS
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium">
                      ${new Intl.NumberFormat().format(platform.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Spend</span>
                    <span className="font-medium">
                      ${new Intl.NumberFormat().format(platform.spend)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conversions</span>
                    <span className="font-medium">{platform.conversions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Campaigns</span>
                    <span className="font-medium">{platform.campaigns}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <ArrowUpRight className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="font-medium">
                    {selectedPlatform === 'instagram' ? 'Instagram shows highest ROAS' : 
                     selectedPlatform === 'google' ? 'Google Ads driving strong conversions' :
                     selectedPlatform === 'facebook' ? 'Facebook engagement improving' :
                     selectedPlatform === 'linkedin' ? 'LinkedIn B2B performance solid' :
                     'Instagram shows highest ROAS'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {advancedMetrics.avgROAS.toFixed(1)}x return suggests strong audience engagement
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ArrowUpRight className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="font-medium">Conversion rate at {advancedMetrics.conversionRate.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">
                    Current optimization showing positive results
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ArrowDownRight className="w-4 h-4 text-orange-600 mt-1" />
                <div>
                  <p className="font-medium">Average CPC at ${advancedMetrics.avgCPC.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    Consider audience refinement or budget reallocation
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Optimization Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  {selectedPlatform === 'all' ? 'Increase Instagram Budget' :
                   selectedPlatform === 'instagram' ? 'Scale Current Campaigns' :
                   selectedPlatform === 'google' ? 'Expand Keyword Targeting' :
                   selectedPlatform === 'facebook' ? 'Optimize Audience Targeting' :
                   'Enhance B2B Targeting'}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Potential 25% revenue increase with optimization
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="font-medium text-green-900 dark:text-green-100">
                  Optimize Cost Efficiency
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Reduce CPC by 15% with better targeting
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <p className="font-medium text-orange-900 dark:text-orange-100">
                  Retargeting Expansion
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Scale successful strategies across platforms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Campaign</th>
                  <th className="text-left p-2">Platform</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-right p-2">Spend</th>
                  <th className="text-right p-2">Revenue</th>
                  <th className="text-right p-2">ROAS</th>
                  <th className="text-right p-2">Conv. Rate</th>
                  <th className="text-right p-2">CPC</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{campaign.name}</td>
                    <td className="p-2">{campaign.platform}</td>
                    <td className="p-2">
                      <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="p-2 text-right">
                      ${new Intl.NumberFormat().format(campaign.spent)}
                    </td>
                    <td className="p-2 text-right">
                      ${new Intl.NumberFormat().format(campaign.conversions * 100)}
                    </td>
                    <td className="p-2 text-right font-medium">
                      {campaign.roas.toFixed(1)}x
                    </td>
                    <td className="p-2 text-right">
                      {((campaign.conversions / campaign.clicks) * 100).toFixed(2)}%
                    </td>
                    <td className="p-2 text-right">
                      ${campaign.cpc.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage; 