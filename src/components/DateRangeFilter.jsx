import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DateRangeFilter = ({ 
  selectedRange, 
  onRangeChange, 
  className = '' 
}) => {
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const dateRangeOptions = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'This Month', value: 'month' },
    { label: 'This Quarter', value: 'quarter' },
    { label: 'Custom Range', value: 'custom' }
  ];

  const handleRangeSelect = (value) => {
    if (value === 'custom') {
      setIsCustomOpen(true);
    } else {
      onRangeChange(value);
    }
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onRangeChange('custom', { start: customStart, end: customEnd });
      setIsCustomOpen(false);
    }
  };

  const getDisplayLabel = () => {
    const option = dateRangeOptions.find(opt => opt.value === selectedRange);
    if (selectedRange === 'custom' && customStart && customEnd) {
      return `${new Date(customStart).toLocaleDateString()} - ${new Date(customEnd).toLocaleDateString()}`;
    }
    return option ? option.label : 'Select Range';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Calendar className="h-4 w-4 text-muted-foreground" />
      
      <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
        <PopoverTrigger asChild>
          <div>
            <Select value={selectedRange} onValueChange={handleRangeSelect}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select date range">
                  {getDisplayLabel()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverTrigger>
        
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Custom Date Range</h4>
              <p className="text-sm text-muted-foreground">
                Select your custom date range
              </p>
            </div>
            
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCustomOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleCustomApply}
                disabled={!customStart || !customEnd}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;

