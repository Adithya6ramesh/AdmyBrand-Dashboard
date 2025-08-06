import { Card, CardContent, CardHeader } from '@/components/ui/card';

const SkeletonLoader = ({ type = 'card', className = '' }) => {
  const baseClass = 'animate-pulse bg-muted rounded';

  if (type === 'card') {
    return (
      <Card className={className}>
        <CardHeader className="space-y-0 pb-2">
          <div className={`${baseClass} h-4 w-24`}></div>
        </CardHeader>
        <CardContent>
          <div className={`${baseClass} h-8 w-32 mb-2`}></div>
          <div className={`${baseClass} h-3 w-20`}></div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'chart') {
    return (
      <Card className={className}>
        <CardHeader>
          <div className={`${baseClass} h-6 w-40`}></div>
        </CardHeader>
        <CardContent>
          <div className={`${baseClass} h-64 w-full`}></div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'table') {
    return (
      <Card className={className}>
        <CardHeader>
          <div className={`${baseClass} h-6 w-32`}></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Table header */}
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`${baseClass} h-4 flex-1`}></div>
              ))}
            </div>
            {/* Table rows */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className={`${baseClass} h-4 flex-1`}></div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className={`${baseClass} h-4 w-full`}></div>
        <div className={`${baseClass} h-4 w-3/4`}></div>
        <div className={`${baseClass} h-4 w-1/2`}></div>
      </div>
    );
  }

  // Default skeleton
  return <div className={`${baseClass} ${className}`}></div>;
};

export default SkeletonLoader;

