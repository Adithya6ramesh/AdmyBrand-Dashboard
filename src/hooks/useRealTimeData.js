import { useState, useEffect, useCallback } from 'react';
import { kpiMetrics } from '../lib/mockData';

export const useRealTimeData = (intervalMs = 10000) => {
  const [metrics, setMetrics] = useState(kpiMetrics);
  const [isLive, setIsLive] = useState(false);

  const generateRandomChange = (baseValue, maxChangePercent = 2) => {
    const changePercent = (Math.random() - 0.5) * 2 * maxChangePercent / 100;
    return Math.max(0, baseValue * (1 + changePercent));
  };

  const updateMetrics = useCallback(() => {
    setMetrics(prevMetrics => {
      const newMetrics = { ...prevMetrics };
      
      // Update revenue with small random changes
      const newRevenue = generateRandomChange(prevMetrics.revenue.current, 1.5);
      newMetrics.revenue = {
        ...prevMetrics.revenue,
        previous: prevMetrics.revenue.current,
        current: Math.round(newRevenue),
        change: ((newRevenue - prevMetrics.revenue.current) / prevMetrics.revenue.current) * 100,
        trend: newRevenue > prevMetrics.revenue.current ? 'up' : 'down'
      };

      // Update users with small random changes
      const newUsers = generateRandomChange(prevMetrics.users.current, 3);
      newMetrics.users = {
        ...prevMetrics.users,
        previous: prevMetrics.users.current,
        current: Math.round(newUsers),
        change: ((newUsers - prevMetrics.users.current) / prevMetrics.users.current) * 100,
        trend: newUsers > prevMetrics.users.current ? 'up' : 'down'
      };

      // Update conversions with smaller changes
      const newConversions = generateRandomChange(prevMetrics.conversions.current, 0.5);
      newMetrics.conversions = {
        ...prevMetrics.conversions,
        previous: prevMetrics.conversions.current,
        current: parseFloat(newConversions.toFixed(2)),
        change: ((newConversions - prevMetrics.conversions.current) / prevMetrics.conversions.current) * 100,
        trend: newConversions > prevMetrics.conversions.current ? 'up' : 'down'
      };

      // Update growth rate
      const newGrowth = generateRandomChange(prevMetrics.growth.current, 5);
      newMetrics.growth = {
        ...prevMetrics.growth,
        previous: prevMetrics.growth.current,
        current: parseFloat(newGrowth.toFixed(1)),
        change: ((newGrowth - prevMetrics.growth.current) / prevMetrics.growth.current) * 100,
        trend: newGrowth > prevMetrics.growth.current ? 'up' : 'down'
      };

      return newMetrics;
    });
  }, []);

  const startLiveUpdates = useCallback(() => {
    setIsLive(true);
  }, []);

  const stopLiveUpdates = useCallback(() => {
    setIsLive(false);
  }, []);

  const resetToOriginal = useCallback(() => {
    setMetrics(kpiMetrics);
    setIsLive(false);
  }, []);

  useEffect(() => {
    let interval;
    
    if (isLive) {
      interval = setInterval(updateMetrics, intervalMs);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLive, intervalMs, updateMetrics]);

  return {
    metrics,
    isLive,
    startLiveUpdates,
    stopLiveUpdates,
    resetToOriginal
  };
};

