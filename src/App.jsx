import { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import OverviewPage from './components/OverviewPage';
import CampaignsPage from './components/CampaignsPage';
import AnalyticsPage from './components/AnalyticsPage';
import ReportsPage from './components/ReportsPage';
import './App.css';

function App() {
  const renderPageContent = ({ activeTab, setActiveTab }) => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage />;
      case 'campaigns':
        return <CampaignsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'audience':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Audience Insights</h2>
              <p className="text-muted-foreground">Audience analysis features coming soon...</p>
            </div>
          </div>
        );
      case 'reports':
        return <ReportsPage />;
      case 'data':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
              <p className="text-muted-foreground">Data integration features coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground">Configuration options coming soon...</p>
            </div>
          </div>
        );
      default:
        return <OverviewPage />;
    }
  };

  return (
    <DashboardLayout>
      {renderPageContent}
    </DashboardLayout>
  );
}

export default App;
