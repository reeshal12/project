// contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// ✅ Comprehensive translations for all components
const translations = {
  en: {
    // Dashboard translations
    welcomeBack: "Welcome back",
    happeningToday: "Here's what's happening with",
    today: "today",
    viewFullReport: "View Full Report",
    revenueForcast: "Revenue Forecast",
    customerSentiment: "Customer Sentiment", 
    inventoryAlert: "Inventory Alert",
    items: "Items",
    fromLastMonth: "from last month",
    businessAdvisor: "Business Advisor",
    documentInsights: "Document Insights",
    askAnything: "Ask me anything about your business...",
    getAdvice: "Get Advice",
    thinking: "Thinking...",
    analyzing: "Analyzing...",
    extractInsights: "Extract Insights",
    couldNotGenerate: "⚠️ Could not generate advice. Please try again.",
    couldNotExtract: "⚠️ Could not extract insights. Try again.",
    addProduct: "Add Product",
    createCampaign: "Create Campaign",
    viewAnalytics: "View Analytics",
    scheduleMeeting: "Schedule Meeting",
    chooseLanguage: "Choose Language",
    yourBusiness: "your business",
    
    // Sidebar translations
    sidebar: {
      dashboard: "Dashboard",
      products: "Products",
      campaigns: "Campaigns",
      settings: "Settings",
      aiIncubator: "AI Incubator",
      businessPlatform: "Business Platform",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      signOut: "Sign Out"
    }
  },
  kn: {
    // Dashboard translations
    welcomeBack: "ಮತ್ತೆ ಸ್ವಾಗತ",
    happeningToday: "ಇಂದು ನಿಮ್ಮ ವ್ಯಾಪಾರದಲ್ಲಿ ಏನು ನಡೆಯುತ್ತಿದೆ",
    today: "ಇಂದು",
    viewFullReport: "ಸಂಪೂರ್ಣ ವರದಿ ವೀಕ್ಷಿಸಿ",
    revenueForcast: "ಆದಾಯ ಮುನ್ಸೂಚನೆ",
    customerSentiment: "ಗ್ರಾಹಕರ ಭಾವನೆ",
    inventoryAlert: "ಸಂಗ್ರಹ ಎಚ್ಚರಿಕೆ",
    items: "ವಸ್ತುಗಳು",
    fromLastMonth: "ಕಳೆದ ತಿಂಗಳಿಂದ",
    businessAdvisor: "ವ್ಯಾಪಾರ ಸಲಹೆಗಾರ",
    documentInsights: "ದಾಖಲೆ ಒಳನೋಟಗಳು",
    askAnything: "ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಬಗ್ಗೆ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ...",
    getAdvice: "ಸಲಹೆ ಪಡೆಯಿರಿ",
    thinking: "ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...",
    analyzing: "ವಿಶ್ಲೇಷಿಸುತ್ತಿದ್ದೇನೆ...",
    extractInsights: "ಒಳನೋಟಗಳನ್ನು ಹೊರತೆಗೆಯಿರಿ",
    couldNotGenerate: "⚠️ ಸಲಹೆ ಉತ್ಪಾದಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    couldNotExtract: "⚠️ ಒಳನೋಟಗಳನ್ನು ಹೊರತೆಗೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    addProduct: "ಉತ್ಪಾದನೆ ಸೇರಿಸಿ",
    createCampaign: "ಪ್ರಚಾರ ರಚಿಸಿ",
    viewAnalytics: "ವಿಶ್ಲೇಷಣೆ ವೀಕ್ಷಿಸಿ",
    scheduleMeeting: "ಸಭೆ ನಿಗದಿಪಡಿಸಿ",
    chooseLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
    yourBusiness: "ನಿಮ್ಮ ವ್ಯಾಪಾರ",
    
    // Sidebar translations
    sidebar: {
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      products: "ಉತ್ಪಾದನೆಗಳು",
      campaigns: "ಪ್ರಚಾರಗಳು",
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      aiIncubator: "AI ಇನ್ಕ್ಯುಬೇಟರ್",
      businessPlatform: "ವ್ಯಾಪಾರ ವೇದಿಕೆ",
      darkMode: "ಡಾರ್ಕ್ ಮೋಡ್",
      lightMode: "ಲೈಟ್ ಮೋಡ್",
      signOut: "ಸೈನ್ ಔಟ್"
    }
  },
  hi: {
    // Dashboard translations
    welcomeBack: "वापस स्वागत है",
    happeningToday: "आज आपके व्यापार के साथ क्या हो रहा है",
    today: "आज",
    viewFullReport: "पूर्ण रिपोर्ट देखें",
    revenueForcast: "राजस्व पूर्वानुमान",
    customerSentiment: "ग्राहक भावना",
    inventoryAlert: "इन्वेंटरी अलर्ट",
    items: "वस्तुएं",
    fromLastMonth: "पिछले महीने से",
    businessAdvisor: "व्यापार सलाहकार",
    documentInsights: "दस्तावेज़ अंतर्दृष्टि",
    askAnything: "अपने व्यापार के बारे में कुछ भी पूछें...",
    getAdvice: "सलाह प्राप्त करें",
    thinking: "सोच रहा हूँ...",
    analyzing: "विश्लेषण कर रहा हूँ...",
    extractInsights: "अंतर्दृष्टि निकालें",
    couldNotGenerate: "⚠️ सलाह उत्पन्न नहीं कर सका। कृपया फिर से प्रयास करें।",
    couldNotExtract: "⚠️ अंतर्दृष्टि निकाल नहीं सका। फिर से प्रयास करें।",
    addProduct: "उत्पाद जोड़ें",
    createCampaign: "अभियान बनाएं",
    viewAnalytics: "विश्लेषण देखें",
    scheduleMeeting: "मीटिंग शेड्यूल करें",
    chooseLanguage: "भाषा चुनें",
    yourBusiness: "आपका व्यापार",
    
    // Sidebar translations
    sidebar: {
      dashboard: "डैशबोर्ड",
      products: "उत्पाद",
      campaigns: "अभियान",
      settings: "सेटिंग्स",
      aiIncubator: "AI इनक्यूबेटर",
      businessPlatform: "व्यापार मंच",
      darkMode: "डार्क मोड",
      lightMode: "लाइट मोड",
      signOut: "साइन आउट"
    }
  },
  ml: {
    // Dashboard translations
    welcomeBack: "വീണ്ടും സ്വാഗതം",
    happeningToday: "ഇന്ന് നിങ്ങളുടെ ബിസിനസ്സിൽ എന്താണ് സംഭവിക്കുന്നത്",
    today: "ഇന്ന്",
    viewFullReport: "പൂർണ്ണ റിപ്പോർട്ട് കാണുക",
    revenueForcast: "വരുമാന പ്രവചനം",
    customerSentiment: "ഉപഭോക്തൃ വികാരം",
    inventoryAlert: "ഇൻവെന്ററി അലർട്ട്",
    items: "ഇനങ്ങൾ",
    fromLastMonth: "കഴിഞ്ഞ മാസം മുതൽ",
    businessAdvisor: "ബിസിനസ് ഉപദേശകൻ",
    documentInsights: "ഡോക്യുമെന്റ് ഇൻസൈറ്റുകൾ",
    askAnything: "നിങ്ങളുടെ ബിസിനസ്സിനെ കുറിച്ച് എന്തും ചോദിക്കൂ...",
    getAdvice: "ഉപദേശം നേടുക",
    thinking: "ചിന്തിക്കുന്നു...",
    analyzing: "വിശകലനം ചെയ്യുന്നു...",
    extractInsights: "ഇൻസൈറ്റുകൾ എക്‌സ്ട്രാക്റ്റ് ചെയ്യുക",
    couldNotGenerate: "⚠️ ഉപദേശം സൃഷ്ടിക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കൂ.",
    couldNotExtract: "⚠️ ഇൻസൈറ്റുകൾ എക്‌സ്ട്രാക്റ്റ് ചെയ്യാൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കൂ.",
    addProduct: "ഉൽപ്പന്നം ചേർക്കുക",
    createCampaign: "കാമ്പയിൻ സൃഷ്ടിക്കുക",
    viewAnalytics: "അനലിറ്റിക്സ് കാണുക",
    scheduleMeeting: "മീറ്റിംഗ് ഷെഡ്യൂൾ ചെയ്യുക",
    chooseLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    yourBusiness: "നിങ്ങളുടെ ബിസിനസ്സ്",
    
    // Sidebar translations
    sidebar: {
      dashboard: "ഡാഷ്‌ബോർഡ്",
      products: "ഉൽപ്പന്നങ്ങൾ",
      campaigns: "കാമ്പയിനുകൾ",
      settings: "സെറ്റിംഗ്സ്",
      aiIncubator: "AI ഇൻക്യൂബേറ്റർ",
      businessPlatform: "ബിസിനസ് പ്ലാറ്റ്ഫോം",
      darkMode: "ഡാർക്ക് മോഡ്",
      lightMode: "ലൈറ്റ് മോഡ്",
      signOut: "സൈൻ ഔട്ട്"
    }
  },
  te: {
    // Dashboard translations
    welcomeBack: "మళ్లీ స్వాగతం",
    happeningToday: "ఈరోజు మీ వ్యాపారంలో ఏమి జరుగుతోంది",
    today: "ఈరోజు",
    viewFullReport: "పూర్తి నివేదిక చూడండి",
    revenueForcast: "ఆదాయ అంచనా",
    customerSentiment: "కస్టమర్ సెంటిమెంట్",
    inventoryAlert: "ఇన్వెంటరీ అలర్ట్",
    items: "వస్తువులు",
    fromLastMonth: "గత నెల నుండి",
    businessAdvisor: "వ్యాపార సలహాదారు",
    documentInsights: "డాక్యుమెంట్ ఇన్‌సైట్స్",
    askAnything: "మీ వ్యాపారం గురించి ఏదైనా అడగండి...",
    getAdvice: "సలహా పొందండి",
    thinking: "ఆలోచిస్తున్నాను...",
    analyzing: "విశ్లేషిస్తున్నాను...",
    extractInsights: "ఇన్‌సైట్స్ తీయండి",
    couldNotGenerate: "⚠️ సలహా రూపొందించలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.",
    couldNotExtract: "⚠️ ఇన్‌సైట్స్ తీయలేకపోయాను. మళ్లీ ప్రయత్నించండి.",
    addProduct: "ఉత్పత్తి జోడించండి",
    createCampaign: "ప్రచారం సృష్టించండి",
    viewAnalytics: "అనలిటిక్స్ చూడండి",
    scheduleMeeting: "మీటింగ్ షెడ్యూల్ చేయండి",
    chooseLanguage: "భాష ఎంచుకోండి",
    yourBusiness: "మీ వ్యాపారం",
    
    // Sidebar translations
    sidebar: {
      dashboard: "డ్యాష్‌బోర్డ్",
      products: "ఉత్పత్తులు",
      campaigns: "ప్రచారాలు",
      settings: "సెట్టింగులు",
      aiIncubator: "AI ఇంక్యుబేటర్",
      businessPlatform: "వ్యాపార వేదిక",
      darkMode: "డార్క్ మోడ్",
      lightMode: "లైట్ మోడ్",
      signOut: "సైన్ అవుట్"
    }
  },
  ta: {
    // Dashboard translations
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    happeningToday: "இன்று உங்கள் வணிகத்தில் என்ன நடக்கிறது",
    today: "இன்று",
    viewFullReport: "முழு அறிக்கையைப் பார்க்கவும்",
    revenueForcast: "வருவாய் முன்னறிவிப்பு",
    customerSentiment: "வாடிக்கையாளர் உணர்வு",
    inventoryAlert: "சரக்கு எச்சரிக்கை",
    items: "பொருட்கள்",
    fromLastMonth: "கடந்த மாதத்திலிருந்து",
    businessAdvisor: "வணிக ஆலோசகர்",
    documentInsights: "ஆவண நுண்ணறிவு",
    askAnything: "உங்கள் வணிகத்தைப் பற்றி எதையும் கேளுங்கள்...",
    getAdvice: "ஆலோசனை பெறுங்கள்",
    thinking: "சிந்தித்துக்கொண்டிருக்கிறேன்...",
    analyzing: "பகுப்பாய்வு செய்கிறேன்...",
    extractInsights: "நுண்ணறிவுகளைப் பிரித்தெடுக்கவும்",
    couldNotGenerate: "⚠️ ஆலோசனையை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    couldNotExtract: "⚠️ நுண்ணறிவுகளைப் பிரித்தெடுக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    addProduct: "தயாரிப்பு சேர்க்கவும்",
    createCampaign: "பிரச்சாரத்தை உருவாக்கவும்",
    viewAnalytics: "பகுப்பாய்வைப் பார்க்கவும்",
    scheduleMeeting: "சந்திப்பை திட்டமிடவும்",
    chooseLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    yourBusiness: "உங்கள் வணிகம்",
    
    // Sidebar translations
    sidebar: {
      dashboard: "டாஷ்போர்டு",
      products: "தயாரிப்புகள்",
      campaigns: "பிரச்சாரங்கள்",
      settings: "அமைப்புகள்",
      aiIncubator: "AI இன்க்யூபேட்டர்",
      businessPlatform: "வணிக தளம்",
      darkMode: "இருண்ட பயன்முறை",
      lightMode: "வெளிச்ச பயன்முறை",
      signOut: "வெளியேறு"
    }
  }
};

export type Language = 'en' | 'kn' | 'hi' | 'ml' | 'te' | 'ta';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};