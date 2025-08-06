import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="p-6">
            {children({ activeTab, setActiveTab })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

