import { Bell, Search, User, X, Filter, TrendingUp, Target, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ThemeToggle from './ThemeToggle';
import { useSearch } from '../contexts/SearchContext';

const Navbar = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isSearching, 
    searchFilters, 
    updateFilters, 
    clearSearch,
    getSearchSuggestions 
  } = useSearch();

  const getResultIcon = (type) => {
    switch (type) {
      case 'campaign':
        return <Target className="w-4 h-4" />;
      case 'metric':
        return <TrendingUp className="w-4 h-4" />;
      case 'insight':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getResultBadgeColor = (type) => {
    switch (type) {
      case 'campaign':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'metric':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'insight':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md relative">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns, metrics, or insights..."
              className="pl-10 pr-20 bg-muted/50 border-0 focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Clear button */}
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={clearSearch}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            
            {/* Filter button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <Filter className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Search Filters</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="campaigns"
                        checked={searchFilters.campaigns}
                        onCheckedChange={(checked) => 
                          updateFilters({ campaigns: checked })
                        }
                      />
                      <label htmlFor="campaigns" className="text-sm">Campaigns</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="metrics"
                        checked={searchFilters.metrics}
                        onCheckedChange={(checked) => 
                          updateFilters({ metrics: checked })
                        }
                      />
                      <label htmlFor="metrics" className="text-sm">Metrics</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="insights"
                        checked={searchFilters.insights}
                        onCheckedChange={(checked) => 
                          updateFilters({ insights: checked })
                        }
                      />
                      <label htmlFor="insights" className="text-sm">Insights</label>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Search Results Dropdown */}
          {(searchQuery || searchResults.length > 0) && (
            <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
              <CardContent className="p-0">
                {isSearching ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <Search className="w-4 h-4 animate-spin mx-auto mb-2" />
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          // Here you could add navigation logic
                          console.log('Selected:', result);
                        }}
                      >
                        <div className="flex-shrink-0 text-muted-foreground">
                          {getResultIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium truncate">
                              {result.title}
                            </p>
                            <Badge className={`text-xs ${getResultBadgeColor(result.type)}`}>
                              {result.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No results found for "{searchQuery}"</p>
                    <p className="text-xs mt-1">Try searching for campaigns, metrics, or insights</p>
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-sm font-medium mb-3">Popular searches:</p>
                    <div className="space-y-1">
                      {getSearchSuggestions().map((suggestion, index) => (
                        <button
                          key={index}
                          className="block w-full text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded"
                          onClick={() => setSearchQuery(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>

          {/* User Info */}
          <div className="hidden md:block text-sm">
            <div className="font-medium">John Doe</div>
            <div className="text-muted-foreground text-xs">Marketing Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

