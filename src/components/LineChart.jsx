import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LineChart = ({ 
  data, 
  title, 
  xKey, 
  yKey, 
  color = '#8884d8',
  className = '' 
}) => {
  const formatTooltipValue = (value, name) => {
    if (name === 'revenue') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatXAxisLabel = (value) => {
    if (xKey === 'date') {
      return new Date(value).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
    return value;
  };

  const formatYAxisLabel = (value) => {
    if (yKey === 'revenue') {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return value;
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={xKey} 
              tickFormatter={formatXAxisLabel}
              className="text-xs"
            />
            <YAxis 
              tickFormatter={formatYAxisLabel}
              className="text-xs"
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => formatXAxisLabel(label)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={color} 
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChart;

