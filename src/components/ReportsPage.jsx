import { useState, useEffect } from 'react';
import { 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Target, 
  DollarSign, 
  Users, 
  Eye, 
  BarChart3, 
  PieChart,
  Download,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  Zap
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  campaignData, 
  revenueOverTime, 
  dailyUsers, 
  trafficSources,
  kpiMetrics 
} from '../lib/mockData';

const ReportsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [reportType, setReportType] = useState('comprehensive');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Generate comprehensive report data
  const generateReportData = () => {
    const totalSpend = campaignData.reduce((sum, campaign) => sum + campaign.spent, 0);
    const totalRevenue = campaignData.reduce((sum, campaign) => sum + (campaign.conversions * 100), 0);
    const totalImpressions = campaignData.reduce((sum, campaign) => sum + campaign.impressions, 0);
    const totalClicks = campaignData.reduce((sum, campaign) => sum + campaign.clicks, 0);
    const totalConversions = campaignData.reduce((sum, campaign) => sum + campaign.conversions, 0);
    const avgROAS = campaignData.reduce((sum, campaign) => sum + campaign.roas, 0) / campaignData.length;
    const avgCTR = (totalClicks / totalImpressions) * 100;
    const avgCPC = totalSpend / totalClicks;
    const conversionRate = (totalConversions / totalClicks) * 100;
    const roi = ((totalRevenue - totalSpend) / totalSpend) * 100;

    // Performance grades
    const getGrade = (value, benchmarks) => {
      if (value >= benchmarks.excellent) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
      if (value >= benchmarks.good) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
      if (value >= benchmarks.average) return { grade: 'B', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      if (value >= benchmarks.below) return { grade: 'C', color: 'text-orange-600', bg: 'bg-orange-100' };
      return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
    };

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
      roi,
      roasGrade: getGrade(avgROAS, { excellent: 5, good: 4, average: 3, below: 2 }),
      ctrGrade: getGrade(avgCTR, { excellent: 4, good: 3, average: 2, below: 1 }),
      conversionGrade: getGrade(conversionRate, { excellent: 4, good: 3, average: 2, below: 1 }),
      roiGrade: getGrade(roi, { excellent: 400, good: 300, average: 200, below: 100 })
    };
  };

  // Generate trend analysis
  const generateTrendAnalysis = () => {
    const revenueGrowth = ((revenueOverTime[6].revenue - revenueOverTime[0].revenue) / revenueOverTime[0].revenue) * 100;
    const userGrowth = ((dailyUsers[6].users - dailyUsers[0].users) / dailyUsers[0].users) * 100;
    
    return {
      revenueGrowth: {
        value: revenueGrowth,
        trend: revenueGrowth > 0 ? 'up' : 'down',
        description: revenueGrowth > 0 ? 'Positive revenue trajectory' : 'Revenue needs attention'
      },
      userGrowth: {
        value: userGrowth,
        trend: userGrowth > 0 ? 'up' : 'down',
        description: userGrowth > 0 ? 'Growing user base' : 'User acquisition challenges'
      }
    };
  };

  // Top performing campaigns
  const getTopPerformers = () => {
    return campaignData
      .sort((a, b) => b.roas - a.roas)
      .slice(0, 3)
      .map((campaign, index) => ({
        ...campaign,
        rank: index + 1,
        efficiency: (campaign.conversions / campaign.spent * 1000).toFixed(2)
      }));
  };

  // Risk assessment
  const getRiskAssessment = () => {
    const lowPerformers = campaignData.filter(c => c.roas < 3).length;
    const highSpenders = campaignData.filter(c => c.spent > 10000).length;
    const pausedCampaigns = campaignData.filter(c => c.status === 'Paused').length;
    
    return {
      lowPerformers,
      highSpenders,
      pausedCampaigns,
      riskLevel: lowPerformers > 2 ? 'High' : lowPerformers > 1 ? 'Medium' : 'Low'
    };
  };

  const reportData = generateReportData();
  const trendAnalysis = generateTrendAnalysis();
  const topPerformers = getTopPerformers();
  const riskAssessment = getRiskAssessment();

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
          <h1 className="text-3xl font-bold tracking-tight">Performance Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis and insights for strategic decision making
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <DateRangeFilter 
            selectedRange={selectedDateRange}
            onRangeChange={(range) => setSelectedDateRange(range)}
          />
          <ExportButton 
            data={campaignData}
            filename="performance-report"
          />
        </div>
      </div>

      {/* Executive Summary */}
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Award className="w-6 h-6 text-blue-600" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                ${new Intl.NumberFormat().format(reportData.totalRevenue)}
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue Generated</div>
              <div className="flex items-center justify-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 text-sm font-medium">
                  {reportData.roi.toFixed(1)}% ROI
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {reportData.avgROAS.toFixed(1)}x
              </div>
              <div className="text-sm text-muted-foreground">Average ROAS</div>
              <div className="flex items-center justify-center mt-2">
                <Badge className={`${reportData.roasGrade.bg} ${reportData.roasGrade.color}`}>
                  Grade: {reportData.roasGrade.grade}
                </Badge>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {reportData.totalConversions}
              </div>
              <div className="text-sm text-muted-foreground">Total Conversions</div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-purple-600 text-sm font-medium">
                  {reportData.conversionRate.toFixed(2)}% Rate
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                ${reportData.avgCPC.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Average CPC</div>
              <div className="flex items-center justify-center mt-2">
                <Badge className={`${reportData.ctrGrade.bg} ${reportData.ctrGrade.color}`}>
                  CTR: {reportData.avgCTR.toFixed(2)}%
                </Badge>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Overall Performance Assessment</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Your marketing campaigns are performing <strong>above industry standards</strong> with a {reportData.avgROAS.toFixed(1)}x ROAS 
              and {reportData.roi.toFixed(1)}% ROI. The conversion rate of {reportData.conversionRate.toFixed(2)}% indicates effective 
              audience targeting and compelling ad creatives. Continue optimizing top-performing campaigns while addressing underperformers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue Growth"
          value={trendAnalysis.revenueGrowth.value}
          previousValue={0}
          change={trendAnalysis.revenueGrowth.value}
          trend={trendAnalysis.revenueGrowth.trend}
          icon={DollarSign}
          format="percentage"
        />
        <MetricCard
          title="User Growth"
          value={trendAnalysis.userGrowth.value}
          previousValue={0}
          change={trendAnalysis.userGrowth.value}
          trend={trendAnalysis.userGrowth.trend}
          icon={Users}
          format="percentage"
        />
        <MetricCard
          title="Campaign Efficiency"
          value={reportData.totalConversions / campaignData.length}
          previousValue={45}
          change={((reportData.totalConversions / campaignData.length - 45) / 45) * 100}
          trend="up"
          icon={Target}
          format="number"
        />
        <MetricCard
          title="Cost Efficiency"
          value={100 - ((reportData.avgCPC - 1.0) / 1.0) * 100}
          previousValue={85}
          change={5.2}
          trend="up"
          icon={TrendingUp}
          format="percentage"
        />
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Revenue Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={revenueOverTime}
              title=""
              xKey="date"
              yKey="revenue"
              color="#8884d8"
            />
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-900 dark:text-green-100">Positive Trend</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Revenue shows consistent upward trajectory with {trendAnalysis.revenueGrowth.value.toFixed(1)}% growth. 
                Peak performance on day 7 indicates successful optimization strategies.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Engagement Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={dailyUsers}
              title=""
              xKey="day"
              yKey="users"
              color="#82ca9d"
            />
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Strong Engagement</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Friday shows peak user activity (9,200 users). Weekend dip is normal, 
                suggesting strong weekday campaign performance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Top Performing Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((campaign) => (
              <div key={campaign.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                    ${campaign.rank === 1 ? 'bg-yellow-500' : campaign.rank === 2 ? 'bg-gray-400' : 'bg-orange-500'}`}>
                    {campaign.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{campaign.name}</h4>
                  <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{campaign.roas.toFixed(1)}x ROAS</div>
                  <div className="text-sm text-muted-foreground">
                    {campaign.efficiency} conv/k spend
                  </div>
                </div>
                <Badge variant="outline" className="ml-2">
                  {campaign.conversions} conversions
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Risk Level</span>
                <Badge className={`${
                  riskAssessment.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                  riskAssessment.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {riskAssessment.riskLevel}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low Performing Campaigns</span>
                  <span className="font-medium">{riskAssessment.lowPerformers}/5</span>
                </div>
                <Progress value={(riskAssessment.lowPerformers / 5) * 100} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">High Spend Campaigns</span>
                  <span className="font-medium">{riskAssessment.highSpenders}/5</span>
                </div>
                <Progress value={(riskAssessment.highSpenders / 5) * 100} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Paused Campaigns</span>
                  <span className="font-medium">{riskAssessment.pausedCampaigns}/5</span>
                </div>
                <Progress value={(riskAssessment.pausedCampaigns / 5) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Strategic Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900 dark:text-green-100">
                    Scale High Performers
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Increase budget for Instagram and Retargeting campaigns (5.1x and 4.8x ROAS)
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    Optimize LinkedIn Strategy
                  </span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Refine audience targeting to reduce CPC from $1.47 to under $1.30
                </p>
              </div>
              
              <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-900 dark:text-orange-100">
                    Reactivate Paused Campaign
                  </span>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Holiday Promotion shows excellent 5.1x ROAS - consider reactivating with seasonal timing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Traffic Sources & Attribution Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <DonutChart
                data={trafficSources}
                title=""
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Channel Performance Insights</h4>
              {trafficSources.map((source, index) => (
                <div key={source.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="font-medium">{source.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{source.value}%</div>
                    <div className="text-sm text-muted-foreground">
                      {index === 0 ? 'Primary driver' : 
                       index === 1 ? 'High engagement' : 
                       index === 2 ? 'Brand strength' : 
                       'Nurturing channel'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage; 