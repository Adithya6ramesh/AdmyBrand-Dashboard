import { createContext, useContext, useState, useEffect } from 'react';
import { campaignData, kpiMetrics } from '../lib/mockData';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    campaigns: true,
    metrics: true,
    insights: true,
  });

  // All searchable data
  const searchableData = {
    campaigns: campaignData.map(campaign => ({
      id: `campaign-${campaign.id}`,
      type: 'campaign',
      title: campaign.name,
      subtitle: campaign.platform,
      description: `${campaign.category} campaign with ${campaign.roas.toFixed(1)}x ROAS`,
      data: campaign,
      tags: [campaign.platform, campaign.status, campaign.category, campaign.region],
      searchableText: `${campaign.name} ${campaign.platform} ${campaign.category} ${campaign.region} ${campaign.status}`.toLowerCase()
    })),
    metrics: [
      {
        id: 'metric-revenue',
        type: 'metric',
        title: 'Total Revenue',
        subtitle: 'KPI Metric',
        description: `Current: $${kpiMetrics.revenue.current.toLocaleString()}`,
        data: kpiMetrics.revenue,
        tags: ['revenue', 'money', 'income', 'sales'],
        searchableText: 'total revenue money income sales earnings'
      },
      {
        id: 'metric-users',
        type: 'metric',
        title: 'Active Users',
        subtitle: 'KPI Metric',
        description: `Current: ${kpiMetrics.users.current.toLocaleString()}`,
        data: kpiMetrics.users,
        tags: ['users', 'audience', 'visitors', 'traffic'],
        searchableText: 'active users audience visitors traffic engagement'
      },
      {
        id: 'metric-conversions',
        type: 'metric',
        title: 'Conversion Rate',
        subtitle: 'KPI Metric',
        description: `Current: ${kpiMetrics.conversions.current}%`,
        data: kpiMetrics.conversions,
        tags: ['conversion', 'rate', 'percentage', 'performance'],
        searchableText: 'conversion rate percentage performance optimization'
      },
      {
        id: 'metric-growth',
        type: 'metric',
        title: 'Growth Rate',
        subtitle: 'KPI Metric',
        description: `Current: ${kpiMetrics.growth.current}%`,
        data: kpiMetrics.growth,
        tags: ['growth', 'increase', 'expansion', 'trend'],
        searchableText: 'growth rate increase expansion trend development'
      }
    ],
    insights: [
      {
        id: 'insight-1',
        type: 'insight',
        title: 'Instagram shows highest ROAS',
        subtitle: 'Performance Insight',
        description: '5.1x return suggests strong audience engagement',
        tags: ['instagram', 'roas', 'performance', 'engagement'],
        searchableText: 'instagram highest roas performance engagement social media'
      },
      {
        id: 'insight-2',
        type: 'insight',
        title: 'Conversion rate improved 15%',
        subtitle: 'Optimization Insight',
        description: 'Month-over-month optimization showing results',
        tags: ['conversion', 'improvement', 'optimization', 'monthly'],
        searchableText: 'conversion rate improved optimization monthly results'
      },
      {
        id: 'insight-3',
        type: 'insight',
        title: 'LinkedIn CPC is highest',
        subtitle: 'Cost Analysis',
        description: 'Consider audience refinement or budget reallocation',
        tags: ['linkedin', 'cpc', 'cost', 'budget'],
        searchableText: 'linkedin cpc cost highest budget audience refinement'
      }
    ]
  };

  // Search function
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const lowercaseQuery = query.toLowerCase();
    const results = [];

    // Search through all data types
    Object.entries(searchableData).forEach(([dataType, items]) => {
      if (searchFilters[dataType]) {
        items.forEach(item => {
          let score = 0;
          
          // Exact title match gets highest score
          if (item.title.toLowerCase().includes(lowercaseQuery)) {
            score += 100;
          }
          
          // Subtitle match
          if (item.subtitle && item.subtitle.toLowerCase().includes(lowercaseQuery)) {
            score += 50;
          }
          
          // Tag matches
          item.tags.forEach(tag => {
            if (tag.toLowerCase().includes(lowercaseQuery)) {
              score += 30;
            }
          });
          
          // General searchable text match
          if (item.searchableText.includes(lowercaseQuery)) {
            score += 20;
          }
          
          // Description match
          if (item.description && item.description.toLowerCase().includes(lowercaseQuery)) {
            score += 10;
          }
          
          if (score > 0) {
            results.push({ ...item, score });
          }
        });
      }
    });

    // Sort by score (highest first) and limit results
    const sortedResults = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setSearchResults(sortedResults);
    setIsSearching(false);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchFilters]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const updateFilters = (newFilters) => {
    setSearchFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getSearchSuggestions = () => {
    const suggestions = [
      'Instagram campaigns',
      'Revenue metrics',
      'Conversion rate',
      'ROAS performance',
      'LinkedIn costs',
      'Growth trends',
      'Campaign optimization',
      'Budget allocation'
    ];
    return suggestions;
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    searchFilters,
    updateFilters,
    clearSearch,
    getSearchSuggestions,
    performSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 