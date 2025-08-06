import { Play, Pause, RotateCcw, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const LiveDataToggle = ({ 
  isLive, 
  onStart, 
  onStop, 
  onReset, 
  className = '' 
}) => {
  return (
    <TooltipProvider>
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Live indicator */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Radio className={`h-4 w-4 ${isLive ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`} />
            <Badge variant={isLive ? 'destructive' : 'secondary'} className="text-xs">
              {isLive ? 'LIVE' : 'STATIC'}
            </Badge>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={isLive ? onStop : onStart}
                className="h-8 w-8 p-0"
              >
                {isLive ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isLive ? 'Pause live updates' : 'Start live updates'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="h-8 w-8 p-0"
                disabled={isLive}
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset to original data</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Update frequency info */}
        {isLive && (
          <span className="text-xs text-muted-foreground">
            Updates every 10s
          </span>
        )}
      </div>
    </TooltipProvider>
  );
};

export default LiveDataToggle;

