import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  LayoutDashboard, 
  Package, 
  Megaphone, 
  Settings, 
  LogOut,
  Moon,
  Sun,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

// Language options matching your LanguageContext
const languages = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'kn' as const, name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'hi' as const, name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ml' as const, name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'te' as const, name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta' as const, name: 'தமிழ்', flag: '🇮🇳' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const navigation = [
    { name: t('sidebar.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('sidebar.products'), href: '/products', icon: Package },
    { name: t('sidebar.campaigns'), href: '/campaigns', icon: Megaphone },
    { name: t('sidebar.settings'), href: '/settings', icon: Settings },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode: typeof language) => {
    setLanguage(langCode);
    setIsLanguageOpen(false);
  };

  return (
    <div className="h-full bg-background border-r border-gray-200 dark:border-gray-700 w-64 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{t('sidebar.aiIncubator')}</h1>
            <p className="text-xs text-gray-500">{user?.businessName || t('sidebar.businessPlatform')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link key={item.name} to={item.href}>
              <motion.div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle, Language Selector & User */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="flex items-center space-x-2 flex-1">
              <span>{currentLanguage.flag}</span>
              <span className="font-medium">{currentLanguage.name}</span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
              isLanguageOpen ? 'rotate-180' : ''
            }`} />
          </button>

          {isLanguageOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsLanguageOpen(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      lang.code === language 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.name}</span>
                    {lang.code === language && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <span className="font-medium">{theme === 'light' ? t('sidebar.darkMode') : t('sidebar.lightMode')}</span>
        </button>
        
        {/* Sign Out */}
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t('sidebar.signOut')}</span>
        </button>
      </div>
    </div>
  );
};