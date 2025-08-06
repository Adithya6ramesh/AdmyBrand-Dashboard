import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SearchProvider } from './contexts/SearchContext'
import { DateFilterProvider } from './contexts/DateFilterContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DateFilterProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </DateFilterProvider>
  </StrictMode>,
)
