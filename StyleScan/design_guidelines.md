# DeFi Cryptocurrency Forecasting Dashboard Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from professional financial platforms like TradingView and Coinbase Pro, combined with modern dashboard interfaces like Linear and Notion for optimal data visualization and user experience.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary**:
- Background: `210 11% 4%` (deep dark background)
- Surface: `210 6% 7%` (elevated cards/panels)
- Border: `210 6% 15%` (subtle separators)

**Accent Colors**:
- Primary: `45 93% 47%` (gold/amber for CTAs and highlights)
- Success: `142 69% 58%` (green for positive forecasts)
- Danger: `0 84% 60%` (red for negative forecasts)
- Muted: `210 6% 46%` (secondary text)

### B. Typography
**Font System**: Inter via Google Fonts CDN
- Headers: 600-700 weight, larger scales
- Body: 400-500 weight
- Data/Numbers: 500-600 weight (tabular nums)
- Labels: 500 weight, smaller scales

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: `p-6` or `p-8`
- Section gaps: `gap-6` or `gap-8`
- Card spacing: `space-y-4` or `space-y-6`

### D. Component Library

**Navigation & Controls**:
- Left sidebar with cryptocurrency selection dropdown
- Date range picker with calendar inputs
- Forecast button with loading states
- Icon library: Heroicons for consistent iconography

**Data Displays**:
- Metrics cards with large numbers and trend indicators
- Interactive line charts using Chart.js
- Data tables with sortable columns
- Price movement indicators with color coding

**Forms & Inputs**:
- Dark-themed select dropdowns with crypto icons
- Date inputs with proper validation
- Primary action buttons with gold accent
- Form validation with inline error messages

**Layout Components**:
- Two-column layout: sidebar (25%) + main content (75%)
- Grid-based metrics cards (responsive 1-3 columns)
- Chart container with proper aspect ratios
- Scrollable data tables with fixed headers

### E. Specific Design Elements

**Cryptocurrency Selection**:
- Dropdown with crypto icons and full names
- Visual indicators for available data
- Clear selection state with highlighted option

**Date Range Controls**:
- Side-by-side start/end date inputs
- Calendar popover with date validation
- Clear indication of forecast period length
- Disabled future dates beyond available data

**Chart Visualization**:
- Professional candlestick/line chart styling
- Gold accent for forecast predictions
- Grid lines and axis labels in muted colors
- Responsive chart sizing with proper margins
- Interactive tooltips showing exact values

**Forecast Results**:
- Key metrics cards showing current vs predicted prices
- Percentage change indicators with appropriate colors
- Forecast confidence levels if available
- Data table with daily predictions

## Images
No hero images required. Use cryptocurrency logos/icons from a standard crypto icon library for the selection dropdown. All visual emphasis should be on data visualization and charts rather than decorative imagery.

## Critical Constraints
- Maintain professional financial application aesthetic
- Ensure data readability with high contrast
- Prioritize chart legibility and interaction
- Keep loading states smooth and informative
- Handle data errors gracefully with clear messaging