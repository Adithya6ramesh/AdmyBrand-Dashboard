// Mock data for ADmyBRAND Insights Dashboard

export const kpiMetrics = {
  revenue: {
    current: 125420,
    previous: 118350,
    change: 5.97,
    trend: 'up'
  },
  users: {
    current: 8542,
    previous: 7890,
    change: 8.26,
    trend: 'up'
  },
  conversions: {
    current: 3.42,
    previous: 3.18,
    change: 7.55,
    trend: 'up'
  },
  growth: {
    current: 12.8,
    previous: 9.4,
    change: 36.17,
    trend: 'up'
  }
};

export const revenueOverTime = [
  { date: '2024-01-01', revenue: 98000 },
  { date: '2024-01-02', revenue: 102000 },
  { date: '2024-01-03', revenue: 95000 },
  { date: '2024-01-04', revenue: 108000 },
  { date: '2024-01-05', revenue: 112000 },
  { date: '2024-01-06', revenue: 118000 },
  { date: '2024-01-07', revenue: 125420 },
];

export const dailyUsers = [
  { day: 'Mon', users: 7200 },
  { day: 'Tue', users: 8100 },
  { day: 'Wed', users: 7800 },
  { day: 'Thu', users: 8900 },
  { day: 'Fri', users: 9200 },
  { day: 'Sat', users: 6800 },
  { day: 'Sun', users: 8542 },
];

export const trafficSources = [
  { name: 'Organic Search', value: 35, color: '#8884d8' },
  { name: 'Social Media', value: 28, color: '#82ca9d' },
  { name: 'Direct', value: 22, color: '#ffc658' },
  { name: 'Email', value: 10, color: '#ff7300' },
  { name: 'Referral', value: 5, color: '#00ff00' },
];

export const campaignData = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    platform: 'Google Ads',
    status: 'Active',
    budget: 15000,
    spent: 12500,
    impressions: 245000,
    clicks: 8900,
    conversions: 340,
    ctr: 3.63,
    cpc: 1.40,
    roas: 4.2,
    region: 'North America',
    category: 'Seasonal'
  },
  {
    id: 2,
    name: 'Brand Awareness Q1',
    platform: 'Facebook',
    status: 'Active',
    budget: 8000,
    spent: 7200,
    impressions: 180000,
    clicks: 5400,
    conversions: 162,
    ctr: 3.0,
    cpc: 1.33,
    roas: 3.8,
    region: 'Europe',
    category: 'Brand'
  },
  {
    id: 3,
    name: 'Holiday Promotion',
    platform: 'Instagram',
    status: 'Paused',
    budget: 12000,
    spent: 11800,
    impressions: 320000,
    clicks: 12800,
    conversions: 480,
    ctr: 4.0,
    cpc: 0.92,
    roas: 5.1,
    region: 'Global',
    category: 'Seasonal'
  },
  {
    id: 4,
    name: 'Product Launch',
    platform: 'LinkedIn',
    status: 'Active',
    budget: 6000,
    spent: 4200,
    impressions: 95000,
    clicks: 2850,
    conversions: 114,
    ctr: 3.0,
    cpc: 1.47,
    roas: 3.2,
    region: 'North America',
    category: 'Product'
  },
  {
    id: 5,
    name: 'Retargeting Campaign',
    platform: 'Google Ads',
    status: 'Active',
    budget: 4500,
    spent: 3800,
    impressions: 78000,
    clicks: 3120,
    conversions: 187,
    ctr: 4.0,
    cpc: 1.22,
    roas: 4.8,
    region: 'Asia Pacific',
    category: 'Retargeting'
  }
];

export const dateRangeOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Custom Range', value: 'custom' }
];

export const platformOptions = [
  { label: 'All Platforms', value: 'all' },
  { label: 'Google Ads', value: 'google' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' }
];

export const regionOptions = [
  { label: 'All Regions', value: 'all' },
  { label: 'North America', value: 'north-america' },
  { label: 'Europe', value: 'europe' },
  { label: 'Asia Pacific', value: 'asia-pacific' },
  { label: 'Global', value: 'global' }
];

export const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'Brand', value: 'brand' },
  { label: 'Product', value: 'product' },
  { label: 'Seasonal', value: 'seasonal' },
  { label: 'Retargeting', value: 'retargeting' }
];

