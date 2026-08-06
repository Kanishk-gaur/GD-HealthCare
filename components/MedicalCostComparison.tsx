// components/MedicalCostComparison.tsx
'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  ChevronDown, 
  ChevronUp, 
  TrendingDown, 
  DollarSign, 
  Search,
  Filter,
  Hospital,
  Heart,
  Bone,
  Brain,
  Stethoscope,
  Activity,
  CalendarDays,
  Bed
} from 'lucide-react';

// Types based on the PDF data
interface MedicalPackage {
  id: string | number;
  procedure: string;
  // Free-form — new specialties/hospitals can be added from the admin panel.
  // getSpecialtyIcon() falls back to a generic icon for unrecognized values.
  specialty: string;
  los: string; // Length of Stay (e.g., "1+5")
  icuDays: number;
  wardDays: number;
  economyPrice: number;
  doublePrice: number;
  singlePrice: number;
  hospital: string;
  notes?: string;
  includes?: string[];
}

interface MedicalCostComparisonProps {
  packages: MedicalPackage[];
  title?: string;
  hospitalFilter?: string;
  specialtyFilter?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showSpecialtyTabs?: boolean;
  className?: string;
}

// Sample data from the PDFs
export const maxHealthcarePackages: MedicalPackage[] = [
  // General Surgeries
  {
    id: 'max-1',
    procedure: 'Gastric Bypass',
    specialty: 'General Surgery',
    los: '1+3',
    icuDays: 1,
    wardDays: 3,
    economyPrice: 5716,
    doublePrice: 6436,
    singlePrice: 7577,
    hospital: 'Max Healthcare',
  },
  {
    id: 'max-2',
    procedure: 'Sleeve Gastrectomy',
    specialty: 'General Surgery',
    los: '1+3',
    icuDays: 1,
    wardDays: 3,
    economyPrice: 5440,
    doublePrice: 6160,
    singlePrice: 7285,
    hospital: 'Max Healthcare',
  },
  // Neuro-Spine Surgeries
  {
    id: 'max-3',
    procedure: 'Spinal Fusion / Instrumentation - up to 2 levels',
    specialty: 'Neuro-Spine',
    los: '1+4',
    icuDays: 1,
    wardDays: 4,
    economyPrice: 6970,
    doublePrice: 7650,
    singlePrice: 8820,
    hospital: 'Max Healthcare',
    notes: 'With implant - US FDA Approved',
  },
  {
    id: 'max-4',
    procedure: 'Craniotomy',
    specialty: 'Neuro-Spine',
    los: '1+4',
    icuDays: 1,
    wardDays: 4,
    economyPrice: 6630,
    doublePrice: 7310,
    singlePrice: 8460,
    hospital: 'Max Healthcare',
  },
  {
    id: 'max-5',
    procedure: 'VP Shunt',
    specialty: 'Neuro-Spine',
    los: '4+2',
    icuDays: 4,
    wardDays: 2,
    economyPrice: 4250,
    doublePrice: 4675,
    singlePrice: 5400,
    hospital: 'Max Healthcare',
    notes: 'With implant - US FDA Approved',
  },
  {
    id: 'max-6',
    procedure: 'Anterior Cervical Disectomy Fusion (ACDF)',
    specialty: 'Neuro-Spine',
    los: '4+2',
    icuDays: 4,
    wardDays: 2,
    economyPrice: 4250,
    doublePrice: 4675,
    singlePrice: 5400,
    hospital: 'Max Healthcare',
    notes: 'Without implant - US FDA Approved; Implant cost USD 600',
  },
  {
    id: 'max-7',
    procedure: 'Microdiscectomy / Laminectomy',
    specialty: 'Neuro-Spine',
    los: '0+3',
    icuDays: 0,
    wardDays: 3,
    economyPrice: 3825,
    doublePrice: 4250,
    singlePrice: 4950,
    hospital: 'Max Healthcare',
  },
  // Cardiac Procedures
  {
    id: 'max-8',
    procedure: 'Angiography',
    specialty: 'Cardiac',
    los: '0+1',
    icuDays: 0,
    wardDays: 1,
    economyPrice: 350,
    doublePrice: 4047,
    singlePrice: 4473,
    hospital: 'Max Healthcare',
  },
  {
    id: 'max-9',
    procedure: 'Angioplasty with 2 Stents',
    specialty: 'Cardiac',
    los: '1+1',
    icuDays: 1,
    wardDays: 1,
    economyPrice: 4497,
    doublePrice: 5177,
    singlePrice: 6201,
    hospital: 'Max Healthcare',
    notes: 'US FDA American Stents',
  },
  {
    id: 'max-10',
    procedure: 'Angioplasty with 1 Stent',
    specialty: 'Cardiac',
    los: '1+1',
    icuDays: 1,
    wardDays: 1,
    economyPrice: 3740,
    doublePrice: 4420,
    singlePrice: 5400,
    hospital: 'Max Healthcare',
    notes: 'US FDA American Stents',
  },
  {
    id: 'max-11',
    procedure: 'CABG - Low Risk',
    specialty: 'Cardiac',
    los: '3+4',
    icuDays: 3,
    wardDays: 4,
    economyPrice: 4675,
    doublePrice: 5100,
    singlePrice: 5850,
    hospital: 'Max Healthcare',
    notes: 'EVH or IABP if used will be over and above',
  },
  {
    id: 'max-12',
    procedure: 'CABG - High Risk',
    specialty: 'Cardiac',
    los: '5+4',
    icuDays: 5,
    wardDays: 4,
    economyPrice: 5950,
    doublePrice: 6375,
    singlePrice: 7200,
    hospital: 'Max Healthcare',
    notes: 'EVH or IABP inclusive in package',
  },
  {
    id: 'max-13',
    procedure: 'AVR/MVR (Mechanical Implant)',
    specialty: 'Cardiac',
    los: '3+4',
    icuDays: 3,
    wardDays: 4,
    economyPrice: 7225,
    doublePrice: 7650,
    singlePrice: 8550,
    hospital: 'Max Healthcare',
  },
  {
    id: 'max-14',
    procedure: 'AVR/MVR (Tissue Implant)',
    specialty: 'Cardiac',
    los: '3+4',
    icuDays: 3,
    wardDays: 4,
    economyPrice: 8075,
    doublePrice: 8500,
    singlePrice: 9450,
    hospital: 'Max Healthcare',
    notes: 'EVH and IABP if required, will be over and above',
  },
  // Orthopedics
  {
    id: 'max-15',
    procedure: 'THR - Total Hip Replacement U/L',
    specialty: 'Orthopedics',
    los: '1+5',
    icuDays: 1,
    wardDays: 5,
    economyPrice: 5270,
    doublePrice: 5950,
    singlePrice: 7020,
    hospital: 'Max Healthcare',
    notes: 'US FDA Approved',
  },
  {
    id: 'max-16',
    procedure: 'THR - Total Hip Replacement B/L',
    specialty: 'Orthopedics',
    los: '2+6',
    icuDays: 2,
    wardDays: 6,
    economyPrice: 8075,
    doublePrice: 8755,
    singlePrice: 9990,
    hospital: 'Max Healthcare',
    notes: 'US FDA Approved',
  },
  {
    id: 'max-17',
    procedure: 'TKR - Total Knee Replacement U/L',
    specialty: 'Orthopedics',
    los: '1+5',
    icuDays: 1,
    wardDays: 5,
    economyPrice: 4675,
    doublePrice: 5355,
    singlePrice: 6390,
    hospital: 'Max Healthcare',
    notes: 'US FDA Approved',
  },
  {
    id: 'max-18',
    procedure: 'TKR - Total Knee Replacement B/L',
    specialty: 'Orthopedics',
    los: '2+6',
    icuDays: 2,
    wardDays: 6,
    economyPrice: 6500,
    doublePrice: 7480,
    singlePrice: 8640,
    hospital: 'Max Healthcare',
    notes: 'US FDA Approved',
  },
];

export const ipsPackages: MedicalPackage[] = [
  // Neuro-Spine
  {
    id: 'ips-1',
    procedure: 'Anterior Cervical Disectomy Fusion (ACDF)',
    specialty: 'Neuro-Spine',
    los: '0+3',
    icuDays: 0,
    wardDays: 3,
    economyPrice: 5450,
    doublePrice: 4500,
    singlePrice: 6950,
    hospital: 'IPS',
  },
  {
    id: 'ips-2',
    procedure: 'Microdiscectomy / Laminectomy',
    specialty: 'Neuro-Spine',
    los: '0+3',
    icuDays: 0,
    wardDays: 3,
    economyPrice: 4200,
    doublePrice: 4650,
    singlePrice: 5400,
    hospital: 'IPS',
  },
  // Orthopedics
  {
    id: 'ips-3',
    procedure: 'THR - Total Hip Replacement U/L',
    specialty: 'Orthopedics',
    los: '1+5',
    icuDays: 1,
    wardDays: 5,
    economyPrice: 5750,
    doublePrice: 6500,
    singlePrice: 7650,
    hospital: 'IPS',
  },
  {
    id: 'ips-4',
    procedure: 'THR - Total Hip Replacement B/L',
    specialty: 'Orthopedics',
    los: '2+6',
    icuDays: 2,
    wardDays: 6,
    economyPrice: 8800,
    doublePrice: 9550,
    singlePrice: 10900,
    hospital: 'IPS',
  },
  {
    id: 'ips-5',
    procedure: 'TKR - Total Knee Replacement U/L',
    specialty: 'Orthopedics',
    los: '1+5',
    icuDays: 1,
    wardDays: 5,
    economyPrice: 5100,
    doublePrice: 5850,
    singlePrice: 6950,
    hospital: 'IPS',
  },
  {
    id: 'ips-6',
    procedure: 'TKR - Total Knee Replacement B/L',
    specialty: 'Orthopedics',
    los: '2+6',
    icuDays: 2,
    wardDays: 6,
    economyPrice: 7400,
    doublePrice: 8150,
    singlePrice: 9400,
    hospital: 'IPS',
  },
];

// Combine all packages
export const allPackages = [...maxHealthcarePackages, ...ipsPackages];

export default function MedicalCostComparison({
  packages = allPackages,
  title = 'Medical Procedure Packages',
  hospitalFilter = 'all',
  specialtyFilter = 'all',
  showSearch = true,
  showFilters = true,
  showSpecialtyTabs = true,
  className = '',
}: MedicalCostComparisonProps) {
  const { translate } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<string>(hospitalFilter);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(specialtyFilter);
  const [roomType, setRoomType] = useState<'economy' | 'double' | 'single'>('economy');
  const [sortBy, setSortBy] = useState<'procedure' | 'price' | 'savings' | 'los'>('procedure');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expanded, setExpanded] = useState(false);

  // Get unique specialties
  const specialties = useMemo(() => {
    const unique = new Set(packages.map(p => p.specialty));
    return ['all', ...Array.from(unique)];
  }, [packages]);

  // Get unique hospitals
  const hospitalOptions = useMemo(() => {
    const unique = new Set(packages.map(p => p.hospital));
    return ['all', ...Array.from(unique)];
  }, [packages]);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = packages;

    // Filter by hospital
    if (selectedHospital !== 'all') {
      filtered = filtered.filter(p => p.hospital === selectedHospital);
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(p => p.specialty === selectedSpecialty);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        translate(p.procedure).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    return filtered.sort((a, b) => {
      let comparison = 0;
      const priceA = roomType === 'economy' ? a.economyPrice : roomType === 'double' ? a.doublePrice : a.singlePrice;
      const priceB = roomType === 'economy' ? b.economyPrice : roomType === 'double' ? b.doublePrice : b.singlePrice;
      
      switch (sortBy) {
        case 'procedure':
          comparison = translate(a.procedure).localeCompare(translate(b.procedure));
          break;
        case 'price':
          comparison = priceA - priceB;
          break;
        case 'los':
          comparison = (a.icuDays + a.wardDays) - (b.icuDays + b.wardDays);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [packages, selectedHospital, selectedSpecialty, searchTerm, roomType, sortBy, sortOrder]);

  const visibleData = expanded ? processedData : processedData.slice(0, 5);

  const getPrice = (pkg: MedicalPackage) => {
    switch (roomType) {
      case 'economy': return pkg.economyPrice;
      case 'double': return pkg.doublePrice;
      case 'single': return pkg.singlePrice;
      default: return pkg.economyPrice;
    }
  };

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case 'Cardiac': return <Heart className="text-[#ff4c88]" size={18} />;
      case 'Neuro-Spine': return <Brain className="text-[#ffa649]" size={18} />;
      case 'Orthopedics': return <Bone className="text-[#ff4c88]" size={18} />;
      case 'General Surgery': return <Stethoscope className="text-[#ffa649]" size={18} />;
      default: return <Activity className="text-gray-500" size={18} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
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
    <div className={`py-16 ${className} bg-gradient-to-b from-[#ffa649]/5 via-white to-[#ff4c88]/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
            {translate(title)}
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          {translate('Fixed price packages from leading hospitals in India')}
        </p>

        {/* Controls */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center gap-1 bg-card border border-border rounded-lg px-2 py-1 hover:border-[#ffa649] transition-colors">
                  <Bed size={16} className="text-[#ff4c88]" />
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as any)}
                    className="bg-transparent py-1 px-1 text-sm focus:outline-none"
                  >
                    <option value="economy">Economy</option>
                    <option value="double">Double</option>
                    <option value="single">Single</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-card border border-border rounded-lg px-2 py-1 hover:border-[#ffa649] transition-colors">
                  <Hospital size={16} className="text-[#ff4c88]" />
                  <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="bg-transparent py-1 px-1 text-sm focus:outline-none"
                  >
                    {hospitalOptions.map((hospital) => (
                      <option key={hospital} value={hospital}>
                        {hospital === 'all' ? 'All Hospitals' : hospital}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Specialty Tabs */}
          {showSpecialtyTabs && (
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedSpecialty === specialty
                      ? 'bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white shadow-lg shadow-[#ff4c88]/20'
                      : 'bg-card border border-border hover:border-[#ffa649] hover:bg-muted/20'
                  }`}
                >
                  {specialty !== 'all' && getSpecialtyIcon(specialty)}
                  {specialty === 'all' ? 'All Specialties' : translate(specialty)}
                </button>
              ))}
            </div>
          )}

          {/* Sort controls */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSort('procedure')}
              className={`px-3 py-1 rounded-lg text-sm border transition-all duration-300 flex items-center gap-1 ${
                sortBy === 'procedure'
                  ? 'bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-transparent shadow-md'
                  : 'border-border hover:border-[#ffa649] hover:bg-[#ffa649]/5'
              }`}
            >
              {translate('Procedure')} {getSortIcon('procedure')}
            </button>
            <button
              onClick={() => handleSort('price')}
              className={`px-3 py-1 rounded-lg text-sm border transition-all duration-300 flex items-center gap-1 ${
                sortBy === 'price'
                  ? 'bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-transparent shadow-md'
                  : 'border-border hover:border-[#ffa649] hover:bg-[#ffa649]/5'
              }`}
            >
              {translate('Price')} {getSortIcon('price')}
            </button>
            <button
              onClick={() => handleSort('los')}
              className={`px-3 py-1 rounded-lg text-sm border transition-all duration-300 flex items-center gap-1 ${
                sortBy === 'los'
                  ? 'bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-transparent shadow-md'
                  : 'border-border hover:border-[#ffa649] hover:bg-[#ffa649]/5'
              }`}
            >
              {translate('Stay Duration')} {getSortIcon('los')}
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          <span className="font-semibold text-[#ff4c88]">{processedData.length}</span> {translate('packages found')}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white">
                <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                  {translate('Procedure')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base hidden md:table-cell">
                  {translate('Specialty')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base">
                  {translate('Hospital')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base">
                  {translate('Stay (ICU+Ward)')}
                </th>
                <th className="px-4 sm:px-6 py-3 font-semibold text-center text-sm sm:text-base">
                  {translate(`Price (${roomType.charAt(0).toUpperCase() + roomType.slice(1)})`)}
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    {translate('No packages found matching your criteria')}
                  </td>
                </tr>
              ) : (
                visibleData.map((pkg, idx) => {
                  const price = getPrice(pkg);
                  return (
                    <tr
                      key={pkg.id}
                      className={`${
                        idx % 2 === 0 ? 'bg-white' : 'bg-[#ffa649]/5'
                      } hover:bg-[#ff4c88]/5 transition-colors duration-200`}
                    >
                      <td className="px-4 sm:px-6 py-3">
                        <div className="font-semibold text-sm sm:text-base hover:text-[#ff4c88] transition-colors">
                          {translate(pkg.procedure)}
                        </div>
                        {pkg.notes && (
                          <div className="text-xs text-muted-foreground mt-1 border-l-2 border-[#ffa649] pl-2">
                            {pkg.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center hidden md:table-cell">
                        <div className="flex items-center justify-center gap-2">
                          {getSpecialtyIcon(pkg.specialty)}
                          <span className="text-sm">{translate(pkg.specialty)}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          pkg.hospital === 'Max Healthcare'
                            ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
                            : 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700'
                        }`}>
                          {pkg.hospital}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
                            {pkg.icuDays}D ICU
                          </span>
                          <span className="text-muted-foreground">+</span>
                          <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                            {pkg.wardDays}D Ward
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-center">
                        <div className="font-bold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent text-sm sm:text-base">
                          {formatCurrency(price)}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Show More/Less */}
        {processedData.length > 5 && (
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
                  {translate(`Show ${processedData.length - 5} More Packages`)}
                </>
              )}
            </button>
          </div>
        )}

        {/* Package Notes */}
        <div className="mt-6 p-4 bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 rounded-xl border border-[#ffa649]/20 shadow-sm">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <DollarSign size={16} className="text-[#ffa649]" />
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Package Includes')}
            </span>
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li className="hover:text-[#ff4c88] transition-colors">
              {translate('Fixed cost for the specified duration of stay')}
            </li>
            <li className="hover:text-[#ff4c88] transition-colors">
              {translate('3-day buffer included at no additional cost')}
            </li>
            <li className="hover:text-[#ff4c88] transition-colors">
              {translate('US FDA approved implants included where specified')}
            </li>
            <li className="hover:text-[#ff4c88] transition-colors">
              {translate('Excludes: Change in line of treatment, unplanned procedures')}
            </li>
            <li className="hover:text-[#ff4c88] transition-colors">
              {translate('Post-package charges: USD 500 per day for extended stay')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}