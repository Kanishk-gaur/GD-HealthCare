// components/CostComparison.tsx
'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronDown, ChevronUp, TrendingDown, DollarSign, Search } from 'lucide-react';

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

  // Calculate average savings for the stat
  const averageSavings = data.reduce((acc, item) => {
    return acc + ((item.usaCost - item.indiaCost) / item.usaCost * 100);
  }, 0) / data.length;

  return (
    <div className={`py-16 ${className} bg-gradient-to-b from-[#ffa649]/5 via-white to-[#ff4c88]/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
            {translate(title)}
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          {translate('Save up to 80% on medical procedures with world-class quality')}
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border border-[#ffa649]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {averageSavings.toFixed(0)}%
            </div>
            <div className="text-sm text-muted-foreground">{translate('Average Savings')}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-[#ffa649]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-[#ff4c88]">
              ${Math.max(...data.map(item => item.usaCost - item.indiaCost)).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">{translate('Maximum Savings')}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-[#ffa649]/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-[#ffa649]">
              {data.length}
            </div>
            <div className="text-sm text-muted-foreground">{translate('Procedures Compared')}</div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          {showSearch && (
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder={translate('Search procedures...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-[#ffa649]" />
            </div>
          )}
          
          {showFilters && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleSort('name')}
                className={`px-3 py-1 rounded-lg text-sm border transition-all duration-300 flex items-center gap-1 ${
                  sortBy === 'name' 
                    ? 'bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-transparent shadow-md' 
                    : 'border-border hover:border-[#ffa649] hover:bg-[#ffa649]/5'
                }`}
              >
                {translate('Procedure')} {getSortIcon('name')}
              </button>
              <button
                onClick={() => handleSort('savings')}
                className={`px-3 py-1 rounded-lg text-sm border transition-all duration-300 flex items-center gap-1 ${
                  sortBy === 'savings' 
                    ? 'bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-transparent shadow-md' 
                    : 'border-border hover:border-[#ffa649] hover:bg-[#ffa649]/5'
                }`}
              >
                {translate('Savings')} {getSortIcon('savings')}
              </button>
              <button
                onClick={() => handleSort('usaCost')}
                className={`px-3 py-1 rounded-lg text-sm border transition-all duration-300 flex items-center gap-1 ${
                  sortBy === 'usaCost' 
                    ? 'bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-transparent shadow-md' 
                    : 'border-border hover:border-[#ffa649] hover:bg-[#ffa649]/5'
                }`}
              >
                {translate('USA Cost')} {getSortIcon('usaCost')}
              </button>
              <button
                onClick={() => handleSort('indiaCost')}
                className={`px-3 py-1 rounded-lg text-sm border transition-all duration-300 flex items-center gap-1 ${
                  sortBy === 'indiaCost' 
                    ? 'bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-transparent shadow-md' 
                    : 'border-border hover:border-[#ffa649] hover:bg-[#ffa649]/5'
                }`}
              >
                {translate('India Cost')} {getSortIcon('indiaCost')}
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          <span className="font-semibold text-[#ff4c88]">{processedData.length}</span> {translate('procedures found')}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white">
                <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base rounded-tl-xl">
                  {translate('Procedure')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base">
                  {translate('USA Cost')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base">
                  {translate('India Cost')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base rounded-tr-xl">
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
                      className={`${
                        idx % 2 === 0 ? 'bg-white' : 'bg-[#ffa649]/5'
                      } hover:bg-[#ff4c88]/5 transition-colors duration-200`}
                    >
                      <td className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base hover:text-[#ff4c88] transition-colors">
                        {translate(item.name)}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center text-sm sm:text-base">
                        <span className="text-muted-foreground line-through decoration-red-400 decoration-2">
                          {formatCurrency(item.usaCost)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        <span className="font-bold text-sm sm:text-base bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                          {formatCurrency(item.indiaCost)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm ${
                            isHighSaving 
                              ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700' 
                              : 'bg-gradient-to-r from-[#ffa649]/20 to-[#ff4c88]/20 text-[#ff4c88]'
                          }`}>
                            <TrendingDown size={14} className={isHighSaving ? 'text-green-600' : 'text-[#ff4c88]'} />
                            {savings}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {translate('Save')} {formatCurrency(savingsAmount)}
                          </span>
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
              className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white hover:shadow-lg hover:shadow-[#ff4c88]/30 hover:scale-105"
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

        {/* Savings Note */}
        <div className="mt-6 p-4 bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 rounded-xl border border-[#ffa649]/20 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ffa649]/20 to-[#ff4c88]/20 flex items-center justify-center flex-shrink-0 mt-1">
              <DollarSign size={20} className="text-[#ff4c88]" />
            </div>
            <div>
              <h4 className="font-semibold text-sm bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                {translate('Why Choose India for Medical Treatment?')}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {translate('India offers world-class medical facilities with JCI-accredited hospitals, highly skilled doctors, and significant cost savings compared to Western countries. All procedures include top-quality care, modern technology, and comprehensive patient support.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}