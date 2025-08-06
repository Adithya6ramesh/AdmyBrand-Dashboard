import { createContext, useContext, useState, useEffect } from 'react';
import { revenueOverTime, dailyUsers, campaignData } from '../lib/mockData';

const DateFilterContext = createContext();

export const useDateFilter = () => {
  const context = useContext(DateFilterContext);
  if (!context) {
    throw new Error('useDateFilter must be used within a DateFilterProvider');
  }
  return context;
};

export const DateFilterProvider = ({ children }) => {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [customDates, setCustomDates] = useState({ start: '', end: '' });
  const [filteredData, setFilteredData] = useState({
    revenue: revenueOverTime,
    users: dailyUsers,
    campaigns: campaignData
  });

  // Date range options
  const dateRangeOptions = [
    { label: 'Last 7 days', value: '7d', days: 7 },
    { label: 'Last 30 days', value: '30d', days: 30 },
    { label: 'Last 90 days', value: '90d', days: 90 },
    { label: 'This Month', value: 'month', days: 30 },
    { label: 'This Quarter', value: 'quarter', days: 90 },
    { label: 'Custom Range', value: 'custom', days: null }
  ];

  // Generate date range based on selection
  const getDateRange = (rangeValue, customRange = null) => {
    const now = new Date();
    let startDate, endDate;

    if (rangeValue === 'custom' && customRange) {
      startDate = new Date(customRange.start);
      endDate = new Date(customRange.end);
    } else {
      const option = dateRangeOptions.find(opt => opt.value === rangeValue);
      if (option && option.days) {
        startDate = new Date(now.getTime() - (option.days * 24 * 60 * 60 * 1000));
        endDate = now;
      } else {
        // Default to 30 days
        startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        endDate = now;
      }
    }

    return { startDate, endDate };
  };

  // Generate mock data based on date range
  const generateFilteredData = (rangeValue, customRange = null) => {
    const { startDate, endDate } = getDateRange(rangeValue, customRange);
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Generate revenue data for the selected period
    const filteredRevenue = [];
    for (let i = 0; i < Math.min(daysDiff, 30); i++) {
      const date = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
      const baseRevenue = 95000 + Math.random() * 30000;
      const trendMultiplier = 1 + (i * 0.02); // Slight upward trend
      const revenue = Math.round(baseRevenue * trendMultiplier);
      
      filteredRevenue.push({
        date: date.toISOString().split('T')[0],
        revenue: revenue
      });
    }

    // Generate user data for the selected period
    const filteredUsers = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < Math.min(daysDiff, 7); i++) {
      const baseUsers = 7000 + Math.random() * 2500;
      const weekdayMultiplier = i < 5 ? 1.2 : 0.8; // Higher on weekdays
      const users = Math.round(baseUsers * weekdayMultiplier);
      
      filteredUsers.push({
        day: daysOfWeek[i % 7],
        users: users
      });
    }

    // Filter campaigns based on date range (simulate campaign start dates)
    const filteredCampaigns = campaignData.filter((campaign, index) => {
      // Simulate campaign creation dates
      const campaignDate = new Date(startDate.getTime() + (index * 7 * 24 * 60 * 60 * 1000));
      return campaignDate >= startDate && campaignDate <= endDate;
    });

    return {
      revenue: filteredRevenue,
      users: filteredUsers,
      campaigns: filteredCampaigns.length > 0 ? filteredCampaigns : campaignData // Always show some campaigns
    };
  };

  // Calculate metrics based on filtered data
  const getFilteredMetrics = () => {
    const totalRevenue = filteredData.revenue.reduce((sum, item) => sum + item.revenue, 0);
    const avgRevenue = totalRevenue / filteredData.revenue.length;
    const totalUsers = filteredData.users.reduce((sum, item) => sum + item.users, 0);
    const avgUsers = totalUsers / filteredData.users.length;

    // Calculate growth (comparing first vs last data points)
    const revenueGrowth = filteredData.revenue.length > 1 ? 
      ((filteredData.revenue[filteredData.revenue.length - 1].revenue - filteredData.revenue[0].revenue) / filteredData.revenue[0].revenue) * 100 : 0;
    
    const userGrowth = filteredData.users.length > 1 ? 
      ((filteredData.users[filteredData.users.length - 1].users - filteredData.users[0].users) / filteredData.users[0].users) * 100 : 0;

    return {
      totalRevenue,
      avgRevenue,
      totalUsers,
      avgUsers,
      revenueGrowth,
      userGrowth,
      activeCampaigns: filteredData.campaigns.filter(c => c.status === 'Active').length,
      totalCampaigns: filteredData.campaigns.length
    };
  };

  // Update filtered data when date range changes
  useEffect(() => {
    const newFilteredData = generateFilteredData(
      selectedRange, 
      selectedRange === 'custom' ? customDates : null
    );
    setFilteredData(newFilteredData);
  }, [selectedRange, customDates]);

  // Handle range change
  const handleRangeChange = (range, customRange = null) => {
    setSelectedRange(range);
    if (range === 'custom' && customRange) {
      setCustomDates(customRange);
    }
  };

  // Get display label for current selection
  const getDisplayLabel = () => {
    const option = dateRangeOptions.find(opt => opt.value === selectedRange);
    if (selectedRange === 'custom' && customDates.start && customDates.end) {
      return `${new Date(customDates.start).toLocaleDateString()} - ${new Date(customDates.end).toLocaleDateString()}`;
    }
    return option ? option.label : 'Last 30 days';
  };

  // Get formatted date range text
  const getDateRangeText = () => {
    const { startDate, endDate } = getDateRange(
      selectedRange, 
      selectedRange === 'custom' ? customDates : null
    );
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const value = {
    selectedRange,
    customDates,
    filteredData,
    dateRangeOptions,
    handleRangeChange,
    getDisplayLabel,
    getDateRangeText,
    getFilteredMetrics
  };

  return (
    <DateFilterContext.Provider value={value}>
      {children}
    </DateFilterContext.Provider>
  );
}; 