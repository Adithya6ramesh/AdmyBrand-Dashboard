import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, TrendingUpIcon } from 'lucide-react';

const MetricCard = ({ 
  title, 
  value, 
  previousValue, 
  change, 
  trend, 
  icon: Icon = DollarSign, 
  format = 'number',
  className = '' 
}) => {
  const formatValue = (val) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val);
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    return new Intl.NumberFormat('en-US').format(val);
  };

  const getTrendIcon = () => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = () => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg hover:scale-105 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {formatValue(value)}
        </div>
        <div className="flex items-center text-xs">
          <TrendIcon className={`mr-1 h-3 w-3 ${getTrendColor()}`} />
          <span className={getTrendColor()}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
          <span className="text-muted-foreground ml-1">
            from last period
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;

