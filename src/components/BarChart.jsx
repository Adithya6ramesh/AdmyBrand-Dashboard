import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BarChart = ({ 
  data, 
  title, 
  xKey, 
  yKey, 
  color = '#82ca9d',
  className = '' 
}) => {
  const formatTooltipValue = (value, name) => {
    if (name === 'users') {
      return new Intl.NumberFormat('en-US').format(value) + ' users';
    }
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatYAxisLabel = (value) => {
    if (yKey === 'users') {
      return `${(value / 1000).toFixed(1)}k`;
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
          <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={xKey} 
              className="text-xs"
            />
            <YAxis 
              tickFormatter={formatYAxisLabel}
              className="text-xs"
            />
            <Tooltip 
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar 
              dataKey={yKey} 
              fill={color}
              radius={[4, 4, 0, 0]}
              className="transition-all duration-200 hover:opacity-80"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChart;

