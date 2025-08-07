# AdmyBrand Insights Dashboard

A comprehensive marketing analytics dashboard built with React, providing real-time insights into campaign performance, revenue tracking, and business intelligence.

## 🎯 Overview

AdmyBrand Insights is a modern, responsive dashboard designed for marketing teams to monitor, analyze, and optimize their advertising campaigns across multiple platforms. The application delivers actionable insights through intuitive visualizations and comprehensive reporting capabilities.

Deployed link - https://admy-brand-dashboard.vercel.app/
DEMO-https://www.loom.com/share/75e6aefffb5f4041b46e7401f98af45b?sid=33a38130-7fb2-4f0b-a69e-7f30383d64a9
## ✨ Key Features

### 📊 **Analytics & Reporting**
- **Real-time Performance Metrics** - Track revenue, users, conversions, and growth rates
- **Advanced Analytics Engine** - ROAS analysis, conversion funnel tracking, and platform comparisons
- **Executive Reporting** - Professional reports with performance grades and strategic recommendations
- **Interactive Visualizations** - Dynamic charts with dual-line support and responsive design

### 🔍 **Intelligent Search**
- **Global Search Functionality** - Search across campaigns, metrics, and insights
- **Smart Filtering System** - Filter results by content type (campaigns, metrics, insights)
- **Autocomplete & Suggestions** - Intelligent search suggestions and popular queries
- **Real-time Results** - Instant search with debounced performance optimization

### 📅 **Dynamic Date Filtering**
- **Flexible Date Ranges** - Last 7/30/90 days, monthly, quarterly, and custom ranges
- **Real-time Data Updates** - All components respond instantly to date filter changes
- **Smart Data Generation** - Contextual data generation based on selected time periods
- **Cross-component Synchronization** - Unified date filtering across all dashboard sections

### 🎯 **Campaign Management**
- **Multi-platform Support** - Google Ads, Facebook, Instagram, LinkedIn integration
- **Performance Tracking** - CTR, CPC, ROAS, and conversion metrics
- **Campaign Optimization** - Automated insights and improvement recommendations
- **Risk Assessment** - Performance monitoring with alert systems

### 🎨 **User Experience**
- **Modern UI Design** - Clean, professional interface with dark/light mode support
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation** - Streamlined sidebar with essential features
- **Loading States** - Smooth user experience with skeleton loaders

## 🏗️ Architecture

### **Technology Stack**
- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **UI Components**: Radix UI with shadcn/ui
- **Styling**: Tailwind CSS 4.1.7
- **Charts**: Recharts 2.15.3
- **State Management**: React Context API
- **Icons**: Lucide React

### **Project Structure**
```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── AnalyticsPage.jsx    # Advanced analytics dashboard
│   ├── OverviewPage.jsx     # Main dashboard overview
│   ├── ReportsPage.jsx      # Professional reporting
│   ├── CampaignsPage.jsx    # Campaign management
│   └── ...
├── contexts/            # Global state management
│   ├── SearchContext.jsx   # Search functionality
│   └── DateFilterContext.jsx # Date filtering
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and mock data
└── main.jsx            # Application entry point
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16.0 or higher
- npm or pnpm package manager
- Modern web browser

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adithya6ramesh/AdmyBrand-Dashboard.git
   cd AdmyBrand-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open application**
   Navigate to `http://localhost:5173` in your browser

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build application for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code quality checks |

## 📈 Dashboard Sections

### **Overview Dashboard**
- Key Performance Indicators (KPIs)
- Revenue and user growth tracking
- Campaign performance summaries
- Traffic source analysis

### **Advanced Analytics**
- ROAS and ROI calculations
- Conversion funnel analysis
- Platform performance comparisons
- Optimization recommendations

### **Professional Reports**
- Executive summary dashboards
- Performance grade assessments
- Risk analysis and monitoring
- Strategic improvement insights

### **Campaign Management**
- Multi-platform campaign overview
- Performance metrics and trends
- Budget allocation analysis
- Campaign optimization tools

### **Data Sources**
- Integration management interface
- Data connectivity status
- Export functionality
- Custom reporting options

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=AdmyBrand Insights
VITE_API_URL=your_api_endpoint
```

### **Customization**
- **Theme Configuration**: Modify `tailwind.config.js` for custom styling
- **Component Library**: Extend UI components in `src/components/ui/`
- **Data Sources**: Update mock data in `src/lib/mockData.js`

## 📊 Performance Features

### **Optimization Techniques**
- **Lazy Loading**: Components load on demand for faster initial load
- **Debounced Search**: Optimized search with 300ms delay
- **Context-based State**: Efficient global state management
- **Responsive Charts**: Adaptive visualizations for all screen sizes

### **Performance Metrics**
- **Bundle Size**: Optimized with Vite's tree-shaking
- **Load Time**: Sub-second initial page load
- **Responsiveness**: Smooth interactions across all devices

## 🛠️ Development

### **Code Standards**
- ESLint configuration for code quality
- Consistent component structure
- Modern React patterns (hooks, context)
- TypeScript-ready architecture

### **Contributing Guidelines**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## 📝 License

This project is proprietary software developed for AdmyBrand. All rights reserved.

## 🔗 Links

- **Repository**: [GitHub](https://github.com/Adithya6ramesh/AdmyBrand-Dashboard)
- **Documentation**: Available in `/docs` directory
- **Support**: Contact development team for technical assistance



