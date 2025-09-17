'use client';
import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Mic, 
  Send, 
  Home, 
  Hospital, 
  Bell, 
  Moon, 
  Sun, 
  Menu, 
  X,
  User,
  Clock,
  Shield,
  Heart,
  Volume2,
  Loader2,
  CheckCircle,
  Info
} from 'lucide-react';

// Context for global state management
const AppContext = createContext();

// ADDED: Translations for multi-language support
const translations = {
  appName: { en: 'SehatMitra', hi: 'सेहतमित्र', pa: 'ਸਿਹਤਮਿੱਤਰ' },
  welcomeMessage: { en: 'Welcome to SehatMitra', hi: 'सेहतमित्र में आपका स्वागत है', pa: 'ਸਿਹਤਮਿੱਤਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ' },
  appSubtitle: { en: 'Your trusted healthcare companion for the Patiala region', hi: 'पटियाला क्षेत्र के लिए आपका विश्वसनीय स्वास्थ्य साथी', pa: 'ਪਟਿਆਲਾ ਖੇਤਰ ਲਈ ਤੁਹਾਡਾ ਭਰੋਸੇਯੋਗ ਸਿਹਤ ਸਾਥੀ' },
  healthAssistantTitle: { en: 'Health Assistant', hi: 'स्वास्थ्य सहायक', pa: 'ਸਿਹਤ ਸਹਾਇਕ' },
  healthAssistantDesc: { en: 'Get instant health advice', hi: 'तुरंत स्वास्थ्य सलाह प्राप्त करें', pa: 'ਤੁਰੰਤ ਸਿਹਤ ਸਲਾਹ ਲਵੋ' },
  findHospitalsTitle: { en: 'Find Hospitals', hi: 'अस्पताल खोजें', pa: 'ਹਸਪਤਾਲ ਲੱਭੋ' },
  findHospitalsDesc: { en: 'Locate nearby healthcare', hi: 'आस-पास की स्वास्थ्य सेवा का पता लगाएँ', pa: 'ਨੇੜਲੇ ਸਿਹਤ ਸੰਭਾਲ ਦਾ ਪਤਾ ਲਗਾਓ' },
  healthAlertsTitle: { en: 'Health Alerts', hi: 'स्वास्थ्य अलर्ट', pa: 'ਸਿਹਤ ਸੰਬੰਧੀ ਚਿਤਾਵਨੀਆਂ' },
  healthAlertsDesc: { en: 'Stay updated on outbreaks', hi: 'प्रकोप पर अपडेट रहें', pa: 'ਬਿਮਾਰੀਆਂ ਦੇ ਪ੍ਰਕੋਪ \'ਤੇ ਅਪਡੇਟ ਰਹੋ' },
  emergencyServicesTitle: { en: 'Emergency Services', hi: 'आपातकालीन सेवाएं', pa: 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ' },
  ambulance: { en: 'Ambulance', hi: 'एम्बुलेंस', pa: 'ਐਂਬੂਲੈਂਸ' },
  police: { en: 'Police', hi: 'पुलिस', pa: 'ਪੁਲਿਸ' },
  healthHelpline: { en: 'Health Helpline', hi: 'स्वास्थ्य हेल्पलाइन', pa: 'ਸਿਹਤ ਹੈਲਪਲਾਈਨ' },
  dailyHealthTipsTitle: { en: 'Daily Health Tips', hi: 'दैनिक स्वास्थ्य सुझाव', pa: 'ਰੋਜ਼ਾਨਾ ਸਿਹਤ ਸੁਝਾਅ' },
  healthTips: {
    en: ["Drink at least 8 glasses of clean water daily", "Wash hands frequently with soap for 20 seconds", "Get adequate sleep (7-8 hours) every night", "Wear full-sleeve clothes to prevent mosquito bites"],
    hi: ["प्रतिदिन कम से कम 8 गिलास स्वच्छ पानी पिएं", "20 सेकंड के लिए साबुन से बार-बार हाथ धोएं", "हर रात पर्याप्त नींद (7-8 घंटे) लें", "मच्छर के काटने से बचने के लिए पूरी बाजू के कपड़े पहनें"],
    pa: ["ਰੋਜ਼ਾਨਾ ਘੱਟੋ-ਘੱਟ 8 ਗਲਾਸ ਸਾਫ਼ ਪਾਣੀ ਪੀਓ", "ਹੱਥਾਂ ਨੂੰ 20 ਸਕਿੰਟਾਂ ਲਈ ਸਾਬਣ ਨਾਲ ਵਾਰ-ਵਾਰ ਧੋਵੋ", "ਹਰ ਰਾਤ ਢੁਕਵੀਂ ਨੀਂਦ (7-8 ਘੰਟੇ) ਲਵੋ", "ਮੱਛਰ ਦੇ ਕੱਟਣ ਤੋਂ ਬਚਣ ਲਈ ਪੂਰੀਆਂ ਬਾਹਾਂ ਵਾਲੇ ਕੱਪੜੇ ਪਾਓ"]
  },
  navHome: { en: 'Home', hi: 'होम', pa: 'ਮੁੱਖ' },
  navAssistant: { en: 'Assistant', hi: 'सहायक', pa: 'ਸਹਾਇਕ' },
  navHospitals: { en: 'Hospitals', hi: 'अस्पताल', pa: 'ਹਸਪਤਾਲ' },
  navAlerts: { en: 'Alerts', hi: 'अलर्ट', pa: 'ਚਿਤਾਵਨੀਆਂ' },
  chatbotInitialGreeting: { en: 'Sat Sri Akaal! I am your health assistant. How can I help you today?', hi: 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?', pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਸਿਹਤ ਸਹਾਇਕ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?' },
  chatbotHeaderTitle: { en: 'Health Assistant', hi: 'स्वास्थ्य सहायक', pa: 'ਸਿਹਤ ਸਹਾਇਕ' },
  chatbotHeaderSubtitle: { en: 'AI-powered health guidance', hi: 'एआई-संचालित स्वास्थ्य मार्गदर्शन', pa: 'ਏਆਈ-ਸੰਚਾਲਿਤ ਸਿਹਤ ਮਾਰਗਦਰਸ਼ਨ' },
  chatbotDisclaimer: { en: '<strong>Medical Disclaimer:</strong> This chatbot provides general health information only. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment.', hi: '<strong>चिकित्सीय अस्वीकरण:</strong> यह चैटबॉट केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है। चिकित्सा सलाह, निदान या उपचार के लिए हमेशा योग्य स्वास्थ्य पेशेवरों से परामर्श करें।', pa: '<strong>ਮੈਡੀਕਲ ਬੇਦਾਅਵਾ:</strong> ਇਹ ਚੈਟਬੋਟ ਸਿਰਫ ਆਮ ਸਿਹਤ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਡਾਕਟਰੀ ਸਲਾਹ, ਨਿਦਾਨ, ਜਾਂ ਇਲਾਜ ਲਈ ਹਮੇਸ਼ਾਂ ਯੋਗ ਸਿਹਤ ਸੰਭਾਲ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਸਲਾਹ ਕਰੋ।' },
  chatbotInputPlaceholder: { en: 'Type your health question...', hi: 'अपना स्वास्थ्य प्रश्न टाइप करें...', pa: 'ਆਪਣਾ ਸਿਹਤ ਸੰਬੰਧੀ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...' },
  hospitalsTitle: { en: 'Nearby Hospitals', hi: 'आस-पास के अस्पताल', pa: 'ਨੇੜਲੇ ਹਸਪਤਾਲ' },
  locationInfo: { en: 'Based on your location', hi: 'आपके स्थान के आधार पर', pa: 'ਤੁਹਾਡੇ ਸਥਾਨ ਦੇ ਅਧਾਰ ਤੇ' },
  alertsTitle: { en: 'Health Alerts', hi: 'स्वास्थ्य अलर्ट', pa: 'ਸਿਹਤ ਸੰਬੰਧੀ ਚਿਤਾਵਨੀਆਂ' },
  vaccinationRemindersTitle: { en: 'Vaccination Reminders', hi: 'टीकाकरण अनुस्मारक', pa: 'ਟੀਕਾਕਰਨ ਰੀਮਾਈਂਡਰ' },
  covidBoosterTitle: { en: 'COVID-19 Booster Due', hi: 'कोविड-19 बूस्टर देय है', pa: 'ਕੋਵਿਡ-19 ਬੂਸਟਰ ਦਾ ਸਮਾਂ' },
  covidBoosterDesc: { en: "It's time for your COVID-19 booster shot. Visit your nearest vaccination center.", hi: 'यह आपके कोविड-19 बूस्टर शॉट का समय है। अपने नजदीकी टीकाकरण केंद्र पर जाएं।', pa: 'ਇਹ ਤੁਹਾਡੇ ਕੋਵਿਡ-19 ਬੂਸਟਰ ਸ਼ਾਟ ਦਾ ਸਮਾਂ ਹੈ। ਆਪਣੇ ਨਜ਼ਦੀਕੀ ਟੀਕਾਕਰਨ ਕੇਂਦਰ \'ਤੇ ਜਾਓ।' },
  bookAppointment: { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें', pa: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ' },
  fluShotTitle: { en: 'Annual Flu Shot Recommended', hi: 'वार्षिक फ्लू शॉट की सिफारिश की जाती है', pa: 'ਸਾਲਾਨਾ ਫਲੂ ਸ਼ਾਟ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ' },
  fluShotDesc: { en: 'The seasonal flu vaccine is now available. Protect yourself and your family this season.', hi: 'मौसमी फ्लू का टीका अब उपलब्ध है। इस मौसम में अपनी और अपने परिवार की सुरक्षा करें।', pa: 'ਮੌਸਮੀ ਫਲੂ ਦਾ ਟੀਕਾ ਹੁਣ ਉਪਲਬਧ ਹੈ। ਇਸ ਮੌਸਮ ਵਿੱਚ ਆਪਣੀ ਅਤੇ ਆਪਣੇ ਪਰਿਵਾਰ ਦੀ ਰੱਖਿਆ ਕਰੋ।' },
  findClinic: { en: 'Find a Clinic', hi: 'क्लिनिक खोजें', pa: 'ਇੱਕ ਕਲੀਨਿਕ ਲੱਭੋ' },
  listen: { en: 'Listen', hi: 'सुनो', pa: 'ਸੁਣੋ' },
  thinking: { en: 'Thinking...', hi: 'सोच रहा है...', pa: 'ਸੋਚ ਰਿਹਾ ਹੈ...' },
  online: { en: 'Online', hi: 'ऑनलाइन', pa: 'ਆਨਲਾਈਨ' },
  alert: { en: 'Alert:', hi: 'चेतावनी:', pa: 'ਚੇਤਾਵਨੀ:' },
  casesIn: { en: 'cases in', hi: 'मामले', pa: 'ਮਾਮਲੇ' },
  outbreakAlertSuffix: { en: 'Outbreak Alert', hi: 'प्रकोप की चेतावनी', pa: 'ਪ੍ਰਕੋਪ ਚੇਤਾਵਨੀ' },
  confirmedCasesIn: { en: 'confirmed cases in', hi: 'पुष्ट मामले', pa: 'ਵਿੱਚ ਪੁਸ਼ਟੀ ਕੀਤੇ ਮਾਮਲੇ' },
  preventionMeasures: { en: 'Prevention Measures:', hi: 'रोकथाम के उपाय:', pa: 'ਰੋਕਥਾਮ ਦੇ ਉਪਾਅ:' },
  learnMore: { en: 'Learn More', hi: 'और जानें', pa: 'ਹੋਰ ਜਾਣੋ' },
  shareAlert: { en: 'Share Alert', hi: 'अलर्ट साझा करें', pa: 'ਚੇਤਾਵਨੀ ਸਾਂਝੀ ਕਰੋ' },
  severityHigh: { en: 'HIGH', hi: 'उच्च', pa: 'ਉੱਚ' },
  severityMedium: { en: 'MEDIUM', hi: 'मध्यम', pa: 'ਦਰਮਿਆਨਾ' },
  dengue: { en: 'Dengue', hi: 'डेंगू', pa: 'ਡੈਂਗੂ' },
  typhoid: { en: 'Typhoid', hi: 'टाइफाइड', pa: 'ਟਾਈਫਾਈਡ' },
  viralFever: { en: 'Viral Fever', hi: 'वायरल बुखार', pa: 'ਵਾਇਰਲ ਬੁਖਾਰ' },
  denguePrevention: { en: 'Remove stagnant water, use mosquito nets', hi: 'ठहरे हुए पानी को हटा दें, मच्छरदानी का प्रयोग करें', pa: 'ਖੜ੍ਹੇ ਪਾਣੀ ਨੂੰ ਹਟਾਓ, ਮੱਛਰਦਾਨੀ ਦੀ ਵਰਤੋਂ ਕਰੋ' },
  typhoidPrevention: { en: 'Drink boiled water, maintain hygiene', hi: 'उबला हुआ पानी पिएं, स्वच्छता बनाए रखें', pa: 'ਉਬਾਲਿਆ ਹੋਇਆ ਪਾਣੀ ਪੀਓ, ਸਫਾਈ ਦਾ ਧਿਆਨ ਰੱਖੋ' },
  viralFeverPrevention: { en: 'Avoid crowds, wear a mask, stay hydrated', hi: 'भीड़ से बचें, मास्क पहनें, हाइड्रेटेड रहें', pa: 'ਭੀੜ ਤੋਂ ਬਚੋ, ਮਾਸਕ ਪਹਿਨੋ, ਹਾਈਡਰੇਟਿਡ ਰਹੋ' },
  distanceAway: { en: 'away', hi: 'दूर', pa: 'ਦੂਰ' },
  open: { en: 'Open', hi: 'खुला है', pa: 'ਖੁੱਲ੍ਹਾ ਹੈ' },
  closed: { en: 'Closed', hi: 'बंद है', pa: 'ਬੰਦ ਹੈ' },
  availableDoctors: { en: 'Available Doctors:', hi: 'उपलब्ध डॉक्टर:', pa: 'ਉਪਲਬਧ ਡਾਕਟਰ:' },
  callHospital: { en: 'Call Hospital', hi: 'अस्पताल को फ़ोन करें', pa: 'ਹਸਪਤਾਲ ਨੂੰ ਕਾਲ ਕਰੋ' },
  getDirections: { en: 'Get Directions', hi: 'दिशा-निर्देश प्राप्त करें', pa: 'ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ' },
  generalPhysician: { en: 'General Physician', hi: 'सामान्य चिकित्सक', pa: 'ਜਨਰਲ ਫਿਜ਼ੀਸ਼ੀਅਨ' },
  pediatrician: { en: 'Pediatrician', hi: 'बाल रोग विशेषज्ञ', pa: 'ਬਾਲ ਰੋਗ ਵਿਸ਼ੇਸ਼ਗ' },
  emergencyMedicine: { en: 'Emergency Medicine', hi: 'आपातकालीन चिकित्सा', pa: 'ਐਮਰਜੈਂਸੀ ਮੈਡੀਸਨ' },
  gynecologist: { en: 'Gynecologist', hi: 'स्त्री रोग विशेषज्ञ', pa: 'ਇਸਤਰੀ ਰੋਗ ਮਾਹਿਰ' },
  // ADDED: Translations for hospital and doctor names
  govtRajindraHospital: { en: 'Govt. Rajindra Hospital', hi: 'सरकारी राजिंदरा अस्पताल', pa: 'ਸਰਕਾਰੀ ਰਾਜਿੰਦਰਾ ਹਸਪਤਾਲ' },
  chcSanaur: { en: 'Community Health Centre, Sanaur', hi: 'सामुदायिक स्वास्थ्य केंद्र, सनौर', pa: 'ਕਮਿਊਨਿਟੀ ਹੈਲਥ ਸੈਂਟਰ, ਸਨੌਰ' },
  drGurpreetSingh: { en: 'Dr. Gurpreet Singh', hi: 'डॉ. गुरप्रीत सिंह', pa: 'ਡਾ. ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ' },
  drHarleenKaur: { en: 'Dr. Harleen Kaur', hi: 'डॉ. हरलीन कौर', pa: 'ਡਾ. ਹਰਲੀਨ ਕੌਰ' },
  drVikramjeetGill: { en: 'Dr. Vikramjeet Gill', hi: 'डॉ. विक्रमजीत गिल', pa: 'ਡਾ. ਵਿਕਰਮਜੀਤ ਗਿੱਲ' },
  drSimranBedi: { en: 'Dr. Simran Bedi', hi: 'डॉ. सिमरन बेदी', pa: 'ਡਾ. ਸਿਮਰਨ ਬੇਦੀ' },
};


// Mock data updated for Patiala, Punjab (Sep 2025)
const mockOutbreaks = [
  { 
    id: 1, 
    diseaseKey: 'dengue', 
    cases: 45, 
    area: 'Model Town, Patiala', 
    severity: 'high', 
    preventionKey: 'denguePrevention' 
  },
  { 
    id: 2, 
    diseaseKey: 'typhoid', 
    cases: 12, 
    area: 'Village Sanaur', 
    severity: 'medium', 
    preventionKey: 'typhoidPrevention' 
  },
  {
    id: 3,
    diseaseKey: 'viralFever', 
    cases: 78,
    area: 'Urban Estate, Patiala',
    severity: 'medium',
    preventionKey: 'viralFeverPrevention' 
  }
];

const mockHospitals = [
  {
    id: 1,
    nameKey: 'govtRajindraHospital', 
    address: 'New Lal Bagh Colony, Patiala',
    phone: '+91-175-2212018',
    isOpen: true,
    distance: '5.8 km',
    doctors: [
      { nameKey: 'drGurpreetSingh', specialtyKey: 'generalPhysician', available: true },
      { nameKey: 'drHarleenKaur', specialtyKey: 'pediatrician', available: true }
    ]
  },
  {
    id: 2,
    nameKey: 'chcSanaur',
    address: 'Sanaur, Patiala District',
    phone: '+91-175-2650234',
    isOpen: true,
    distance: '12.1 km',
    doctors: [
      { nameKey: 'drVikramjeetGill', specialtyKey: 'emergencyMedicine', available: true },
      { nameKey: 'drSimranBedi', specialtyKey: 'gynecologist', available: false }
    ]
  }
];

const mockFAQs = [
  {
    question: 'What to do for fever?',
    answer: 'For fever: Rest, drink plenty of fluids, use cold compress. If fever persists above 101°F for more than 3 days, consult a doctor immediately.',
    category: 'fever'
  },
  {
    question: 'How to prevent dengue?',
    answer: 'Prevent dengue by: 1) Remove stagnant water 2) Use mosquito nets 3) Wear full sleeves 4) Use repellents. Seek medical help if you have high fever with body ache.',
    category: 'prevention'
  },
  {
    question: 'How to protect from seasonal flu?',
    answer: 'Get a yearly flu vaccine, wash hands often, avoid touching your face, and stay home when sick. A healthy diet and good sleep also boost immunity.',
    category: 'prevention'
  }
];

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

// Utility functions (unchanged)
const playSound = (text, language = 'en') => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
};

const startVoiceRecognition = (onResult, language = 'en') => {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.start();
    return recognition;
  }
  return null;
};

// Loading skeleton component
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
  </div>
);

// Error boundary component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
    <div className="flex items-center">
      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
      <p className="text-red-700 dark:text-red-200">{message}</p>
    </div>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
      >
        Try Again
      </button>
    )}
  </div>
);

// Main App Component
const HealthcareApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ADDED: Translation function
  const t = (key) => {
    return translations[key] ? translations[key][language] || translations[key]['en'] : key;
  };

  const contextValue = {
    currentView, 
    setCurrentView,
    darkMode, 
    setDarkMode,
    language, 
    setLanguage,
    isMenuOpen, 
    setIsMenuOpen,
    loading, 
    setLoading,
    error, 
    setError,
    t, // ADDED: Pass t function in context
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Header />
        <main className="pb-20">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'chatbot' && <Chatbot />}
          {currentView === 'hospitals' && <Hospitals />}
          {currentView === 'alerts' && <Alerts />}
        </main>
        <Navigation />
      </div>
    </AppContext.Provider>
  );
};

// Header Component
const Header = () => {
  const { darkMode, setDarkMode, language, setLanguage, t } = useContext(AppContext);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-green-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('appName')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.native}</option>
              ))}
            </select>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      <OutbreakAlertBar />
    </header>
  );
};

// Outbreak Alert Bar
const OutbreakAlertBar = () => {
  const { t } = useContext(AppContext);
  const [currentAlert, setCurrentAlert] = useState(0);

  useEffect(() => {
    if (mockOutbreaks.length > 1) {
      const interval = setInterval(() => {
        setCurrentAlert((prev) => (prev + 1) % mockOutbreaks.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  if (mockOutbreaks.length === 0) return null;

  const alert = mockOutbreaks[currentAlert];
  const isHighSeverity = alert.severity === 'high';
  const bgColor = isHighSeverity ? 'bg-red-100 dark:bg-red-900' : 'bg-yellow-100 dark:bg-yellow-900';
  const textColor = isHighSeverity ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200';

  return (
    <div className={${bgColor} ${textColor} px-4 py-2 text-center text-sm}>
      <AlertTriangle className="inline h-4 w-4 mr-1" />
      <span className="font-medium">{t('alert')}</span> {alert.cases} {t(alert.diseaseKey)} {t('casesIn')} {alert.area}
      <span className="ml-2 text-xs">• {t(alert.preventionKey)}</span>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { setCurrentView, t } = useContext(AppContext);

  const dashboardCards = [
    {
      title: t('healthAssistantTitle'),
      description: t('healthAssistantDesc'),
      icon: MessageCircle,
      color: 'bg-blue-500',
      view: 'chatbot'
    },
    {
      title: t('findHospitalsTitle'),
      description: t('findHospitalsDesc'),
      icon: Hospital,
      color: 'bg-green-500',
      view: 'hospitals'
    },
    {
      title: t('healthAlertsTitle'),
      description: t('healthAlertsDesc'),
      icon: Bell,
      color: 'bg-orange-500',
      view: 'alerts'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('welcomeMessage')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('appSubtitle')}
        </p>
      </div>

      <EmergencyServices />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dashboardCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              onClick={() => setCurrentView(card.view)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="p-6">
                <div className={inline-flex items-center justify-center w-12 h-12 ${card.color} text-white rounded-lg mb-4}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <HealthTips />
    </div>
  );
};

// Emergency Services Component
const EmergencyServices = () => {
    const { t } = useContext(AppContext);
    const emergencyNumbers = [
      { name: t('ambulance'), number: '108', color: 'bg-red-500', icon: Phone },
      { name: t('police'), number: '112', color: 'bg-blue-500', icon: Shield },
      { name: t('healthHelpline'), number: '104', color: 'bg-green-500', icon: Heart }
    ];
  
    const callEmergency = (number) => {
      window.location.href = tel:${number};
    };
  
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          {t('emergencyServicesTitle')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {emergencyNumbers.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <button
                key={index}
                onClick={() => callEmergency(service.number)}
                className={${service.color} hover:opacity-90 text-white rounded-lg p-4 flex items-center justify-center space-x-2 transition-all duration-200 font-semibold}
              >
                <IconComponent className="h-5 w-5" />
                <span>{service.name}</span>
                <span className="font-bold">{service.number}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Health Tips Component
  const HealthTips = () => {
    const { t } = useContext(AppContext);
    const tips = t('healthTips');
  
    return (
      <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {t('dailyHealthTipsTitle')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-green-700 dark:text-green-300 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Chatbot Component
  const Chatbot = () => {
    const { language, t } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
        setMessages([
          {
            type: 'bot',
            content: t('chatbotInitialGreeting'),
            timestamp: new Date()
          }
        ]);
    }, [language]); // This resets and translates the greeting when language changes

    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const generateBotResponse = (userMessage) => {
      const lowerMessage = userMessage.toLowerCase();
      for (const faq of mockFAQs) {
        if (lowerMessage.includes(faq.category) || lowerMessage.includes(faq.question.toLowerCase().split(' ')[0])) {
          return faq.answer;
        }
      }
      if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
        return 'For fever symptoms: Rest in a cool place, drink plenty of fluids, use cold compress on forehead. Monitor temperature regularly. If fever exceeds 101°F or persists for more than 3 days, please consult a healthcare professional immediately.';
      }
      if (lowerMessage.includes('cough') || lowerMessage.includes('cold')) {
        return 'For cough and cold: Stay hydrated, get adequate rest, use steam inhalation, consume warm liquids like herbal tea. Avoid cold foods. If symptoms worsen or persist beyond a week, seek medical attention.';
      }
      if (lowerMessage.includes('stomach') || lowerMessage.includes('diarrhea')) {
        return 'For stomach issues: Stay hydrated with ORS solution, eat light foods like rice and bananas, avoid spicy and oily foods. If symptoms include severe dehydration, blood in stool, or persist for more than 2 days, consult a doctor.';
      }
      return 'I understand you need health guidance. For specific symptoms, I can provide preventive care tips. However, for accurate diagnosis and treatment, please consult with a qualified healthcare professional. You can find nearby hospitals using our hospital locator.';
    };
  
    const sendMessage = async () => {
      if (!inputMessage.trim()) return;
      const userMessage = { type: 'user', content: inputMessage, timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);
      const currentInput = inputMessage;
      setInputMessage('');
      setIsLoading(true);
  
      setTimeout(() => {
        const botResponse = { type: 'bot', content: generateBotResponse(currentInput), timestamp: new Date() };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
        playSound(botResponse.content, language);
      }, 1000);
    };
  
    const startVoiceInput = () => {
      setIsListening(true);
      const recognition = startVoiceRecognition((transcript) => {
        setInputMessage(transcript);
        setIsListening(false);
      }, language);
      if (!recognition) {
        alert('Voice recognition not supported in your browser');
        setIsListening(false);
      }
    };
  
    const speakMessage = (content) => {
      playSound(content, language);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') sendMessage();
    };
  
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 h-screen flex flex-col">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('chatbotHeaderTitle')}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('chatbotHeaderSubtitle')}</p>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
              {t('online')}
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200" dangerouslySetInnerHTML={{ __html: t('chatbotDisclaimer') }} />
          </div>
        </div>
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}}>
                <div className={max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}}>
                  <p className="text-sm">{message.content}</p>
                  {message.type === 'bot' && (
                    <button onClick={() => speakMessage(message.content)} className="mt-2 text-xs text-blue-500 hover:text-blue-600 flex items-center">
                      <Volume2 className="h-3 w-3 mr-1" />
                      {t('listen')}
                    </button>
                  )}
                  <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('thinking')}</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder={t('chatbotInputPlaceholder')} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <button onClick={startVoiceInput} disabled={isListening} className={p-2 rounded-lg ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'} text-gray-700 dark:text-gray-300}>
                <Mic className="h-5 w-5" />
              </button>
              <button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Hospitals Component
  const Hospitals = () => {
    const { t } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [hospitals, setHospitals] = useState([]);
  
    useEffect(() => {
      setTimeout(() => {
        setHospitals(mockHospitals);
        setLoading(false);
      }, 1500);
    }, []);
  
    if (loading) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('hospitalsTitle')}</h2>
          <div className="space-y-4">{[1, 2, 3].map((i) => (<div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6"><SkeletonLoader /></div>))}</div>
        </div>
      );
    }
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('hospitalsTitle')}</h2>
          <div className="flex items-center text-sm text-gray-500"><MapPin className="h-4 w-4 mr-1" /><span>{t('locationInfo')}</span></div>
        </div>
        <div className="space-y-4">{hospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t(hospital.nameKey)}</h3>
                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                                <MapPin className="h-4 w-4 mr-2" /><span>{hospital.address}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Clock className="h-4 w-4 mr-2" /><span>{hospital.distance} {t('distanceAway')}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${hospital.isOpen ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}}>
                                {hospital.isOpen ? t('open') : t('closed')}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t('availableDoctors')}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{hospital.doctors.map((doctor, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{t(doctor.nameKey)}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{t(doctor.specialtyKey)}</div>
                                </div>
                                <div className={w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-red-500'}}></div>
                            </div>
                        ))}</div>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={() => window.location.href = tel:${hospital.phone}} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center">
                            <Phone className="h-4 w-4 mr-2" />{t('callHospital')}
                        </button>
                        <button className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center">
                            <MapPin className="h-4 w-4 mr-2" />{t('getDirections')}
                        </button>
                    </div>
                </div>
            </div>
        ))}</div>
      </div>
    );
  };
  
  // Alerts Component
  const Alerts = () => {
    const { t } = useContext(AppContext);
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('alertsTitle')}</h2>
        
        <div className="space-y-4">
          {mockOutbreaks.map((outbreak) => (
            <div key={outbreak.id} className={`rounded-lg p-6 ${
              outbreak.severity === 'high' 
                ? 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700' 
                : 'bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700'
            }`}>
              <div className="flex items-start">
                <AlertTriangle className={`h-6 w-6 mr-3 mt-1 ${
                  outbreak.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                }`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-semibold ${
                      outbreak.severity === 'high' 
                        ? 'text-red-800 dark:text-red-200' 
                        : 'text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {t(outbreak.diseaseKey)} {t('outbreakAlertSuffix')}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      outbreak.severity === 'high' 
                        ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                        : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                    }`}>
                      {outbreak.severity === 'high' ? t('severityHigh') : t('severityMedium')}
                    </span>
                  </div>
                  
                  <div className={`mb-3 ${
                    outbreak.severity === 'high' 
                      ? 'text-red-700 dark:text-red-300' 
                      : 'text-yellow-700 dark:text-yellow-300'
                  }`}>
                    <p className="font-medium">{outbreak.cases} {t('confirmedCasesIn')} {outbreak.area}</p>
                  </div>
                  
                  <div className={`mb-4 p-3 rounded-lg ${
                    outbreak.severity === 'high' 
                      ? 'bg-red-100 dark:bg-red-800' 
                      : 'bg-yellow-100 dark:bg-yellow-800'
                  }`}>
                    <h4 className={`font-medium mb-2 ${
                      outbreak.severity === 'high' 
                        ? 'text-red-800 dark:text-red-200' 
                        : 'text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {t('preventionMeasures')}
                    </h4>
                    <p className={`text-sm ${
                      outbreak.severity === 'high' 
                        ? 'text-red-700 dark:text-red-300' 
                        : 'text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {t(outbreak.preventionKey)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">{t('learnMore')}</button>
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 text-sm">{t('shareAlert')}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Vaccination Reminders */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('vaccinationRemindersTitle')}</h3>
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6">
            <div className="flex items-center"><Shield className="h-6 w-6 text-green-500 mr-3" /><div><h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">{t('covidBoosterTitle')}</h4><p className="text-sm text-green-700 dark:text-green-300">{t('covidBoosterDesc')}</p><button className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">{t('bookAppointment')}</button></div></div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mt-4">
              <div className="flex items-center"><Shield className="h-6 w-6 text-blue-500 mr-3" /><div><h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">{t('fluShotTitle')}</h4><p className="text-sm text-blue-700 dark:text-blue-300">{t('fluShotDesc')}</p><button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">{t('findClinic')}</button></div></div>
          </div>
        </div>
      </div>
    );
  };
  
  // Navigation Component
  const Navigation = () => {
    const { currentView, setCurrentView, t } = useContext(AppContext);
    const navItems = [
      { id: 'dashboard', icon: Home, label: t('navHome') },
      { id: 'chatbot', icon: MessageCircle, label: t('navAssistant') },
      { id: 'hospitals', icon: Hospital, label: t('navHospitals') },
      { id: 'alerts', icon: Bell, label: t('navAlerts') }
    ];
  
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'text-blue-500 bg-blue-50 dark:bg-blue-900'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    );
  };

export default HealthcareApp;