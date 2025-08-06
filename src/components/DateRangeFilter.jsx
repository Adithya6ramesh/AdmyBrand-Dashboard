import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
import { useDateFilter } from '../contexts/DateFilterContext';

const DateRangeFilter = ({ 
  className = '' 
}) => {
  const { 
    selectedRange, 
    customDates, 
    dateRangeOptions, 
    handleRangeChange, 
    getDisplayLabel 
  } = useDateFilter();
  
  const [customStart, setCustomStart] = useState(customDates.start);
  const [customEnd, setCustomEnd] = useState(customDates.end);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handleRangeSelect = (value) => {
    if (value === 'custom') {
      setIsCustomOpen(true);
    } else {
      handleRangeChange(value);
    }
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      handleRangeChange('custom', { start: customStart, end: customEnd });
      setIsCustomOpen(false);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
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

