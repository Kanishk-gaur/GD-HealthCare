// components/CostComparison.tsx
'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronDown, ChevronUp, TrendingDown, DollarSign } from 'lucide-react';

interface CostItem {
  id?: string | number;
  name: string;
  usaCost: number;
  indiaCost: number;
  currency?: 'USD' | 'INR';
  category?: string;
}

interface CostComparisonProps {
  data: CostItem[];
  title?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  className?: string;
}

export default function CostComparison({ 
  data, 
  title = 'Cost Comparison: India vs Western Countries',
  showSearch = true,
  showFilters = true,
  className = ''
}: CostComparisonProps) {
  const { translate } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'savings' | 'usaCost' | 'indiaCost'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expanded, setExpanded] = useState(false);

  // Filter and sort data
  const processedData = data
    .filter(item => 
      translate(item.name).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = translate(a.name).localeCompare(translate(b.name));
          break;
        case 'savings':
          const savingsA = ((a.usaCost - a.indiaCost) / a.usaCost);
          const savingsB = ((b.usaCost - b.indiaCost) / b.usaCost);
          comparison = savingsA - savingsB;
          break;
        case 'usaCost':
          comparison = a.usaCost - b.usaCost;
          break;
        case 'indiaCost':
          comparison = a.indiaCost - b.indiaCost;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Get visible data (show all or first 4 based on expanded state)
  const visibleData = expanded ? processedData : processedData.slice(0, 4);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateSavings = (usaCost: number, indiaCost: number) => {
    return ((usaCost - indiaCost) / usaCost * 100).toFixed(0);
  };

  const getSortIcon = (field: typeof sortBy) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className={`py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">{translate(title)}</h2>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          {showSearch && (
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder={translate('Search procedures...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card"
              />
              <DollarSign size={18} className="absolute left-3 top-3 text-muted-foreground" />
            </div>
          )}
          
          {showFilters && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleSort('name')}
                className={`px-3 py-1 rounded-lg text-sm border transition-colors flex items-center gap-1 ${
                  sortBy === 'name' 
                    ? 'bg-primary text-white border-primary' 
                    : 'border-border hover:border-primary'
                }`}
              >
                {translate('Procedure')} {getSortIcon('name')}
              </button>
              <button
                onClick={() => handleSort('savings')}
                className={`px-3 py-1 rounded-lg text-sm border transition-colors flex items-center gap-1 ${
                  sortBy === 'savings' 
                    ? 'bg-primary text-white border-primary' 
                    : 'border-border hover:border-primary'
                }`}
              >
                {translate('Savings')} {getSortIcon('savings')}
              </button>
              <button
                onClick={() => handleSort('usaCost')}
                className={`px-3 py-1 rounded-lg text-sm border transition-colors flex items-center gap-1 ${
                  sortBy === 'usaCost' 
                    ? 'bg-primary text-white border-primary' 
                    : 'border-border hover:border-primary'
                }`}
              >
                {translate('USA Cost')} {getSortIcon('usaCost')}
              </button>
              <button
                onClick={() => handleSort('indiaCost')}
                className={`px-3 py-1 rounded-lg text-sm border transition-colors flex items-center gap-1 ${
                  sortBy === 'indiaCost' 
                    ? 'bg-primary text-white border-primary' 
                    : 'border-border hover:border-primary'
                }`}
              >
                {translate('India Cost')} {getSortIcon('indiaCost')}
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                  {translate('Procedure')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base">
                  {translate('USA Cost')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base">
                  {translate('India Cost')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base">
                  {translate('Savings')}
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    {translate('No procedures found matching your search')}
                  </td>
                </tr>
              ) : (
                visibleData.map((item, idx) => {
                  const savings = calculateSavings(item.usaCost, item.indiaCost);
                  const savingsAmount = item.usaCost - item.indiaCost;
                  const isHighSaving = parseInt(savings) > 70;
                  
                  return (
                    <tr 
                      key={item.id || idx} 
                      className={`${idx % 2 === 0 ? 'bg-white' : 'bg-muted/10'} hover:bg-muted/30 transition-colors`}
                    >
                      <td className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                        {translate(item.name)}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center text-sm sm:text-base text-muted-foreground line-through decoration-red-400 decoration-2">
                        {formatCurrency(item.usaCost)}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center text-primary font-bold text-sm sm:text-base">
                        {formatCurrency(item.indiaCost)}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm ${
                          isHighSaving 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-accent/10 text-accent'
                        }`}>
                          <TrendingDown size={14} className={isHighSaving ? 'text-green-600' : 'text-accent'} />
                          {savings}%
                        </span>
                        <div className="text-xs text-muted-foreground mt-1">
                          {translate('Save')} {formatCurrency(savingsAmount)}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Show More/Less Button */}
        {processedData.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors flex items-center gap-2 mx-auto"
            >
              {expanded ? (
                <>
                  <ChevronUp size={18} />
                  {translate('Show Less')}
                </>
              ) : (
                <>
                  <ChevronDown size={18} />
                  {translate(`Show ${processedData.length - 4} More Procedures`)}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}