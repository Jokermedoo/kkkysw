import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react';
import { Service } from '../context/DataContext';

interface SearchAndFilterProps {
  services: Service[];
  onFilteredServices: (filtered: Service[]) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  services,
  onFilteredServices,
  viewMode,
  onViewModeChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'order'>('order');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  useEffect(() => {
    let filtered = services.filter(service =>
      service.active && service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // فلترة حسب السعر
    if (priceFilter !== 'all') {
      filtered = filtered.filter(service => {
        const price = service.price.toLowerCase();
        switch (priceFilter) {
          case 'low':
            return price.includes('15') || price.includes('10') || price.includes('5');
          case 'medium':
            return price.includes('20') || price.includes('25');
          case 'high':
            return price.includes('30') || price.includes('40') || price.includes('50');
          default:
            return true;
        }
      });
    }

    // ترتيب النتائج
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name, 'ar');
          break;
        case 'price':
          const aPrice = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
          const bPrice = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
          comparison = aPrice - bPrice;
          break;
        case 'order':
          comparison = a.order - b.order;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    onFilteredServices(filtered);
  }, [services, searchTerm, sortBy, sortOrder, priceFilter, onFilteredServices]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* البحث */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="ابحث عن خدمة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* فلتر السعر */}
        <div className="lg:w-48">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value as any)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="all">جميع الأسعار</option>
            <option value="low">منخفض (أقل من 20$)</option>
            <option value="medium">متوسط (20-25$)</option>
            <option value="high">مرتفع (أكثر من 30$)</option>
          </select>
        </div>

        {/* الترتيب */}
        <div className="lg:w-48">
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split('-');
              setSortBy(sort as any);
              setSortOrder(order as any);
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="order-asc">الترتيب الافتراضي</option>
            <option value="name-asc">اسم الخدمة (أ-ي)</option>
            <option value="name-desc">اسم الخدمة (ي-أ)</option>
            <option value="price-asc">السعر (منخفض لمرتفع)</option>
            <option value="price-desc">السعر (مرتفع لمنخفض)</option>
          </select>
        </div>

        {/* طريقة العرض */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
