import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext"; // ✅ Use unified context
import { AIInsightCard } from "./AIInsightCard";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { CohereClient } from "cohere-ai";
import {
  DollarSign,
  Heart,
  AlertTriangle,
  ShoppingCart,
  Target,
  TrendingUp,
  Calendar,
  FileText,
  Bot,
  Globe,
  ChevronDown,
} from "lucide-react";

// ✅ Initialize Cohere Client
const cohere = new CohereClient({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

// ✅ Language options matching your context
const languages = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'kn' as const, name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'hi' as const, name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ml' as const, name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'te' as const, name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta' as const, name: 'தமிழ்', flag: '🇮🇳' },
];

// ✅ Language Selector Component
const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode: typeof language) => {
    setLanguage(langCode);
    setIsLanguageOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="flex items-center space-x-2">
          <span>{currentLanguage.flag}</span>
          <span className="font-medium text-sm">{currentLanguage.name}</span>
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
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 min-w-[160px] max-h-48 overflow-y-auto">
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
  );
};

// ✅ Main Dashboard Component
export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage(); // ✅ Use unified context
  const [advisorInput, setAdvisorInput] = useState("");
  const [advisorResponse, setAdvisorResponse] = useState("");
  const [loadingAdvisor, setLoadingAdvisor] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docInsights, setDocInsights] = useState("");
  const [loadingDoc, setLoadingDoc] = useState(false);

  const insights = [
    {
      title: t('revenueForcast'),
      value: "$47,250",
      change: 12.5,
      icon: DollarSign,
      color: "green" as const,
    },
    {
      title: t('customerSentiment'),
      value: "4.8/5.0",
      change: 8.2,
      icon: Heart,
      color: "blue" as const,
    },
    {
      title: t('inventoryAlert'),
      value: `3 ${t('items')}`,
      change: -5.1,
      icon: AlertTriangle,
      color: "yellow" as const,
    },
  ];

  const quickActions = [
    { title: t('addProduct'), icon: ShoppingCart, href: "/products/add" },
    { title: t('createCampaign'), icon: Target, href: "/campaigns/create" },
    { title: t('viewAnalytics'), icon: TrendingUp, href: "/analytics" },
    { title: t('scheduleMeeting'), icon: Calendar, href: "/meetings" },
  ];

  // ✅ Business Advisor using Cohere AI
  const handleAdvisor = async () => {
    if (!advisorInput.trim()) return;
    setLoadingAdvisor(true);
    setAdvisorResponse("");

    try {
      const response = await cohere.generate({
        model: "command-r-plus",
        prompt: `You are an experienced business consultant. Give actionable, practical, and concise advice for this query:\n\n"${advisorInput}"\n\nAdvice:`,
        maxTokens: 200,
        temperature: 0.7,
      });

      setAdvisorResponse(response.generations[0].text.trim());
    } catch (error) {
      console.error("Cohere API Error:", error);
      setAdvisorResponse(t('couldNotGenerate'));
    }

    setLoadingAdvisor(false);
  };

  // ✅ Document Insights using Cohere AI
  const handleDocument = async () => {
    if (!selectedFile) return;
    setLoadingDoc(true);
    setDocInsights("");

    try {
      const text = await selectedFile.text();

      const response = await cohere.summarize({
        model: "summarize-xlarge",
        text: text.slice(0, 1000), // Prevents token limit issues
        length: "medium",
        extractiveness: "medium",
      });

      setDocInsights(response.summary ?? "");
    } catch (error) {
      console.error("Cohere Summarization Error:", error);
      setDocInsights(t('couldNotExtract'));
    }

    setLoadingDoc(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('welcomeBack')}, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('happeningToday')} {user?.businessName || t('yourBusiness')} {t('today')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button variant="primary">{t('viewFullReport')}</Button>
        </div>
      </motion.div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AIInsightCard {...insight} />
          </motion.div>
        ))}
      </div>

      {/* Business Advisor + Document Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Advisor */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" /> {t('businessAdvisor')}
          </h2>
          <textarea
            value={advisorInput}
            onChange={(e) => setAdvisorInput(e.target.value)}
            placeholder={t('askAnything')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
          <Button
            onClick={handleAdvisor}
            variant="primary"
            className="mt-3"
            disabled={loadingAdvisor}
          >
            {loadingAdvisor ? t('thinking') : t('getAdvice')}
          </Button>
          {advisorResponse && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              {advisorResponse}
            </p>
          )}
        </Card>

        {/* Document Insights */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> {t('documentInsights')}
          </h2>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full mb-3"
          />
          <Button
            onClick={handleDocument}
            variant="primary"
            disabled={!selectedFile || loadingDoc}
          >
            {loadingDoc ? t('analyzing') : t('extractInsights')}
          </Button>
          {docInsights && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              {docInsights}
            </p>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <action.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{action.title}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};