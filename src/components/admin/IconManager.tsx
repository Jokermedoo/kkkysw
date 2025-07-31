import React, { useState, useEffect } from 'react';
import { 
  Upload, Save, Trash2, Edit2, Image, Eye, EyeOff, 
  Plus, Search, Filter, Grid, List, Download, Copy,
  Star, Shield, Zap, Clock, Globe, Award, Users, CheckCircle,
  CreditCard, Bitcoin, Smartphone, DollarSign, MessageCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CustomIcon {
  id: string;
  name: string;
  category: string;
  svgContent: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const IconManager: React.FC = () => {
  const { services, updateService } = useData();
  const [icons, setIcons] = useState<CustomIcon[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<CustomIcon | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  // Default icon library
  const defaultIcons = [
    { id: 'paypal', name: 'PayPal', category: 'payment', icon: CreditCard, svgContent: '<svg viewBox="0 0 24 24"><path fill="#00457C" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.28A.641.641 0 0 1 5.57 1.8h6.194c1.744 0 3.303.333 4.499 1.278 1.154.912 1.742 2.283 1.599 3.73-.292 2.934-1.889 4.78-4.916 5.676-.292.087-.584.167-.876.24l-.876.226a14.13 14.13 0 0 1-.876.185l-.867.155-.858.128-.849.094-.84.067-.831.034-.823.008h-2.332l-.314 1.98h3.832c.498 0 .924.348 1.05.854l.626 2.507a.641.641 0 0 1-.633.74z"/></svg>' },
    { id: 'wise', name: 'Wise', category: 'payment', icon: Globe, svgContent: '<svg viewBox="0 0 24 24"><path fill="#9FE870" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
    { id: 'bitcoin', name: 'Bitcoin', category: 'crypto', icon: Bitcoin, svgContent: '<svg viewBox="0 0 24 24"><circle fill="#F7931A" cx="12" cy="12" r="12"/><path fill="white" d="M17.154 10.55c.17-1.15-.705-1.77-1.906-2.183l.39-1.564-0.952-.238-.38 1.523c-.25-.062-.507-.121-.762-.18l.383-1.536-0.952-.238-.39 1.564c-.207-.047-.41-.093-.607-.142l.001-.004-1.313-.328-.253.985s.705.162.69.172c.385.096.454.35.443.553l-.443 1.776c.027.007.062.017.1.033l-.101-.025-.621 2.487c-.047.116-.166.291-.433.225.009.013-.69-.172-.69-.172l-.472 1.056 1.24.309c.23.058.456.118.679.175l-.393 1.58.951.238.39-1.566c.26.07.511.135.758.196l-.389 1.557.952.238.393-1.577c1.62.306 2.839.183 3.354-1.28.416-1.18-.02-1.857-.873-2.299.621-.143 1.088-.551 1.213-1.393z"/></svg>' },
    { id: 'mobile', name: 'Mobile', category: 'mobile', icon: Smartphone, svgContent: '<svg viewBox="0 0 24 24"><rect fill="#4CAF50" width="24" height="24" rx="4"/><path fill="white" d="M16.5 8.5c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5S9.5 4 12 4s4.5 2 4.5 4.5z"/></svg>' },
    { id: 'security', name: 'Security', category: 'features', icon: Shield, svgContent: '<svg viewBox="0 0 24 24"><path fill="#2196F3" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/></svg>' },
    { id: 'speed', name: 'Speed', category: 'features', icon: Zap, svgContent: '<svg viewBox="0 0 24 24"><path fill="#FF9800" d="M13,9V3.5L22,12L13,20.5V15H11L13,9M1,12C1,18.08 5.92,23 12,23C15.54,23 18.58,21.24 20.33,18.5L22,19.5V16H18.5L19.5,17.67C18.24,19.42 15.54,20.5 12,20.5C7.31,20.5 3.5,16.69 3.5,12H1V12Z"/></svg>' }
  ];

  // Load saved icons from localStorage
  useEffect(() => {
    const savedIcons = localStorage.getItem('customIcons');
    if (savedIcons) {
      setIcons(JSON.parse(savedIcons));
    } else {
      // Initialize with default icons
      const initialIcons = defaultIcons.map((icon, index) => ({
        id: icon.id,
        name: icon.name,
        category: icon.category,
        svgContent: icon.svgContent,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setIcons(initialIcons);
      localStorage.setItem('customIcons', JSON.stringify(initialIcons));
    }
  }, []);

  const categories = [
    { id: 'all', name: 'جميع الأيقونات', count: icons.length },
    { id: 'payment', name: 'المدفوعات', count: icons.filter(i => i.category === 'payment').length },
    { id: 'crypto', name: 'العملات الرقمية', count: icons.filter(i => i.category === 'crypto').length },
    { id: 'mobile', name: 'الهاتف المحمول', count: icons.filter(i => i.category === 'mobile').length },
    { id: 'features', name: 'المميزات', count: icons.filter(i => i.category === 'features').length },
    { id: 'custom', name: 'مخصص', count: icons.filter(i => i.category === 'custom').length }
  ];

  const filteredIcons = icons.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const saveIcon = (iconData: Partial<CustomIcon>) => {
    const newIcon: CustomIcon = {
      id: iconData.id || Date.now().toString(),
      name: iconData.name || 'أيقونة جديدة',
      category: iconData.category || 'custom',
      svgContent: iconData.svgContent || '',
      isActive: iconData.isActive !== undefined ? iconData.isActive : true,
      createdAt: iconData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedIcons = isEditing 
      ? icons.map(icon => icon.id === newIcon.id ? newIcon : icon)
      : [...icons, newIcon];

    setIcons(updatedIcons);
    localStorage.setItem('customIcons', JSON.stringify(updatedIcons));
    setShowAddModal(false);
    setIsEditing(false);
    setSelectedIcon(null);
  };

  const deleteIcon = (iconId: string) => {
    const updatedIcons = icons.filter(icon => icon.id !== iconId);
    setIcons(updatedIcons);
    localStorage.setItem('customIcons', JSON.stringify(updatedIcons));
  };

  const toggleIconStatus = (iconId: string) => {
    const updatedIcons = icons.map(icon => 
      icon.id === iconId ? { ...icon, isActive: !icon.isActive, updatedAt: new Date().toISOString() } : icon
    );
    setIcons(updatedIcons);
    localStorage.setItem('customIcons', JSON.stringify(updatedIcons));
  };

  const assignIconToService = (serviceId: string, iconId: string) => {
    const icon = icons.find(i => i.id === iconId);
    if (icon) {
      updateService(serviceId, { customIcon: icon });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الأيقونات</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            إدارة وتخصيص الأيقونات المستخدمة في الموقع والخدمات
          </p>
        </div>
        <Button
          variant="gradient"
          size="lg"
          icon={Plus}
          onClick={() => setShowAddModal(true)}
          glow={true}
        >
          إضافة أيقونة جديدة
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي الأيقونات', value: icons.length, icon: Image, color: 'from-blue-500 to-blue-600' },
          { label: 'الأيقونات النشطة', value: icons.filter(i => i.isActive).length, icon: Eye, color: 'from-green-500 to-green-600' },
          { label: 'الأيقونات المخصصة', value: icons.filter(i => i.category === 'custom').length, icon: Star, color: 'from-purple-500 to-purple-600' },
          { label: 'الفئات', value: categories.length - 1, icon: Filter, color: 'from-orange-500 to-red-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} variant="glass" className="p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Controls */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث عن الأيقونات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center space-x-2 space-x-reverse overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Icons Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {filteredIcons.map((icon) => (
            <Card
              key={icon.id}
              variant="glass"
              className={`p-4 text-center group cursor-pointer transition-all duration-300 hover:scale-105 ${
                !icon.isActive ? 'opacity-50' : ''
              }`}
            >
              {/* Icon Display */}
              <div className="w-12 h-12 mx-auto mb-3 relative">
                <div 
                  dangerouslySetInnerHTML={{ __html: icon.svgContent }}
                  className="w-full h-full"
                />
                {!icon.isActive && (
                  <div className="absolute inset-0 bg-gray-500/50 rounded-lg flex items-center justify-center">
                    <EyeOff className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Icon Info */}
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                {icon.name}
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {icon.category}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center space-x-1 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => toggleIconStatus(icon.id)}
                  className={`p-1 rounded ${icon.isActive ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'}`}
                  title={icon.isActive ? 'إخفاء' : 'إظهار'}
                >
                  {icon.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => {
                    setSelectedIcon(icon);
                    setIsEditing(true);
                    setShowAddModal(true);
                  }}
                  className="p-1 rounded text-blue-600 hover:bg-blue-100"
                  title="تحرير"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteIcon(icon.id)}
                  className="p-1 rounded text-red-600 hover:bg-red-100"
                  title="حذف"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card variant="glass">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredIcons.map((icon) => (
              <div key={icon.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-8 h-8 relative">
                    <div 
                      dangerouslySetInnerHTML={{ __html: icon.svgContent }}
                      className="w-full h-full"
                    />
                    {!icon.isActive && (
                      <div className="absolute inset-0 bg-gray-500/50 rounded flex items-center justify-center">
                        <EyeOff className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{icon.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{icon.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    icon.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {icon.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                  <button
                    onClick={() => toggleIconStatus(icon.id)}
                    className="p-2 rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {icon.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIcon(icon);
                      setIsEditing(true);
                      setShowAddModal(true);
                    }}
                    className="p-2 rounded text-blue-600 hover:bg-blue-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteIcon(icon.id)}
                    className="p-2 rounded text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Service Assignment */}
      <Card variant="glass" className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">ربط الأيقونات بالخدمات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.filter(s => s.active).map((service) => (
            <div key={service.id} className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8">
                  {service.customIcon ? (
                    <div dangerouslySetInnerHTML={{ __html: service.customIcon.svgContent }} className="w-full h-full" />
                  ) : (
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{service.name}</h4>
                  <p className="text-sm text-gray-500">{service.price}</p>
                </div>
              </div>
              <select
                value={service.customIcon?.id || ''}
                onChange={(e) => assignIconToService(service.id, e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
              >
                <option value="">اختر أيقونة</option>
                {icons.filter(i => i.isActive).map((icon) => (
                  <option key={icon.id} value={icon.id}>{icon.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </Card>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <IconEditModal
          icon={selectedIcon}
          isEditing={isEditing}
          onSave={saveIcon}
          onClose={() => {
            setShowAddModal(false);
            setSelectedIcon(null);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

// Icon Edit Modal Component
const IconEditModal: React.FC<{
  icon: CustomIcon | null;
  isEditing: boolean;
  onSave: (icon: Partial<CustomIcon>) => void;
  onClose: () => void;
}> = ({ icon, isEditing, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: icon?.name || '',
    category: icon?.category || 'custom',
    svgContent: icon?.svgContent || '',
    isActive: icon?.isActive !== undefined ? icon.isActive : true
  });

  const categories = [
    { id: 'payment', name: 'المدفوعات' },
    { id: 'crypto', name: 'العملات الرقمية' },
    { id: 'mobile', name: 'الهاتف المحمول' },
    { id: 'features', name: 'المميزات' },
    { id: 'custom', name: 'مخصص' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: icon?.id
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card variant="glass" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'تحرير الأيقونة' : 'إضافة أيقونة جديدة'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم الأيقونة
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الفئة
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* SVG Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                محتوى SVG
              </label>
              <textarea
                value={formData.svgContent}
                onChange={(e) => setFormData({ ...formData, svgContent: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-32 font-mono text-sm"
                placeholder="<svg viewBox='0 0 24 24'>...</svg>"
                required
              />
            </div>

            {/* Preview */}
            {formData.svgContent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  معاينة
                </label>
                <div className="w-16 h-16 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div 
                    dangerouslySetInnerHTML={{ __html: formData.svgContent }}
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                نشط
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="gradient"
                icon={Save}
              >
                {isEditing ? 'حفظ التغييرات' : 'إضافة الأيقونة'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default IconManager;
