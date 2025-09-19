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
    Info,
    Edit,
    Trash2,
    Stethoscope,
    Share2,
    BookHeart,
    Activity,
    LifeBuoy, // New Icon
    Users, // New Icon
    Search, // New Icon
    Sparkles // New Icon for AI features
} from 'lucide-react';

// Context for global state management
const AppContext = createContext();

// **ADDED: Custom CSS for animations and new styles**
const AppStyles = () => ( <
    style > { `
    /* Keyframe Animations */
    @keyframes slide-in-left { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slide-in-right { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
    @keyframes dot-pulse { 0%, 100% { transform: scale(0.5); opacity: 0.5; } 50% { transform: scale(1); opacity: 1; } }
    @keyframes card-pop-in { from { transform: translateY(30px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
    @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
    @keyframes icon-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @keyframes alert-glow { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
    @keyframes subtle-glow { 0%, 100% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.2); } 50% { box-shadow: 0 0 35px rgba(74, 222, 128, 0.4); } }
    @keyframes aurora {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }


    /* Animation Utility Classes */
    .animate-slide-in-left { animation: slide-in-left 0.4s ease-out forwards; }
    .animate-slide-in-right { animation: slide-in-right 0.4s ease-out forwards; }
    .animate-fade-in { animation: fade-in 0.5s ease-in-out forwards; }
    .animate-fade-out { animation: fade-out 0.5s ease-in-out forwards; }
    .animate-card-pop-in { animation: card-pop-in 0.5s ease-out forwards; }
    
    /* Loading Indicator Styles */
    .dot { width: 8px; height: 8px; border-radius: 50%; animation: dot-pulse 1.4s infinite ease-in-out; }
    .dot-1 { animation-delay: -0.32s; }
    .dot-2 { animation-delay: -0.16s; }
    .dot-3 { animation-delay: 0s; }
    .shimmer-bg {
        background: linear-gradient(to right, transparent 0%, #ffffff1a 50%, transparent 100%);
        background-size: 2000px 100%;
        animation: shimmer 2s linear infinite;
    }

    /* Aurora Background */
    .aurora-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(45deg, #e0f2fe, #f3e8ff, #dcfce7, #e0f2fe);
      background-size: 400% 400%;
      animation: aurora 15s ease infinite;
    }
    .dark .aurora-background {
      background: linear-gradient(45deg, #0c1421, #1e1b30, #0c1f1f, #0c1421);
      background-size: 400% 400%;
      animation: aurora 20s ease infinite;
    }


    /* Glassmorphism Card Style for Hospitals */
    .hospital-card {
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .dark .hospital-card {
        background: rgba(23, 30, 43, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .hospital-card::before {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        border-radius: 0.75rem; /* 12px */
        background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15), transparent 40%);
        opacity: 0;
        transition: opacity 0.5s;
    }
    
    .hospital-card:hover::before {
        opacity: 1;
    }


    .hospital-card:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    
    /* Alert Card Styles */
    .alert-card {
      background: #ffffff;
      border-radius: 0.75rem;
      overflow: hidden;
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .dark .alert-card {
      background: #1f2937; /* gray-800 */
    }
    .alert-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    .alert-card .severity-glow {
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 6px;
    }
    .alert-card .animated-icon {
      animation: alert-glow 2.5s infinite ease-in-out;
    }

    /* Welcome Screen */
    .welcome-screen {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f9fafb;
    }
    .dark .welcome-screen {
      background: #030712;
    }
    .welcome-screen-logo {
      animation: subtle-glow 3s infinite ease-in-out;
    }
  ` } < /style>
);

// ADDED: Translations for multi-language support
const translations = {
    appName: { en: 'SehatMitra', hi: 'सेहतमित्र', pa: 'ਸਿਹਤਮਿੱਤਰ' },
    welcomeMessage: { en: 'Welcome', hi: 'आपका स्वागत है', pa: 'ਜੀ ਆਇਆਂ ਨੂੰ' },
    appSubtitle: { en: 'Your trusted healthcare companion for the Patiala region', hi: 'पटियाला क्षेत्र के लिए आपका विश्वसनीय स्वास्थ्य साथी', pa: 'ਪਟਿਆਲਾ ਖੇਤਰ ਲਈ ਤੁਹਾਡਾ ਭਰੋਸੇਯੋਗ ਸਿਹਤ ਸਾਥੀ' },
    healthAssistantTitle: { en: 'Health Assistant', hi: 'स्वास्थ्य सहायक', pa: 'ਸਿਹਤ ਸਹਾਇਕ' },
    healthAssistantDesc: { en: 'AI-powered health advice', hi: 'AI-संचालित स्वास्थ्य सलाह', pa: 'AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਸਲਾਹ' },
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
    chatbotInitialGreeting: { en: 'Sat Sri Akaal! I\'m SehatMitra, your personal AI health friend, here to help you feel your best. How can I help today?', hi: 'नमस्ते! मैं सेहतमित्र हूँ, आपका व्यक्तिगत AI स्वास्थ्य मित्र। मैं आपकी मदद कैसे कर सकता हूँ?', pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਸਿਹਤਮਿੱਤਰ ਹਾਂ, ਤੁਹਾਡਾ ਨਿੱਜੀ AI ਸਿਹਤ ਮਿੱਤਰ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?' },
    chatbotHeaderTitle: { en: 'Health Assistant', hi: 'स्वास्थ्य सहायक', pa: 'ਸਿਹਤ ਸਹਾਇਕ' },
    chatbotHeaderSubtitle: { en: 'Your friendly health companion', hi: 'आपका मैत्रीपूर्ण स्वास्थ्य साथी', pa: 'ਤੁਹਾਡਾ ਦੋਸਤਾਨਾ ਸਿਹਤ ਸਾਥੀ' },
    chatbotDisclaimer: { en: '<strong>A friendly reminder:</strong> I provide general health information only. Please always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.', hi: '<strong>एक महत्वपूर्ण अनुस्मारक:</strong> मैं केवल सामान्य स्वास्थ्य जानकारी प्रदान करता हूँ। कृपया चिकित्सा सलाह, निदान या उपचार के लिए हमेशा एक योग्य स्वास्थ्य पेशेवर से परामर्श करें।', pa: '<strong>ਇੱਕ ਦੋਸਤਾਨਾ ਯਾਦ-ਦਹਾਨੀ:</strong> ਮੈਂ ਸਿਰਫ ਆਮ ਸਿਹਤ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰੀ ਸਲਾਹ, ਨਿਦਾਨ, ਜਾਂ ਇਲਾਜ ਲਈ ਹਮੇਸ਼ਾਂ ਇੱਕ ਯੋਗ ਸਿਹਤ ਸੰਭਾਲ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।' },
    chatbotInputPlaceholder: { en: 'Ask me anything about your health...', hi: 'अपने स्वास्थ्य के बारे में कुछ भी पूछें...', pa: 'ਆਪਣੀ ਸਿਹਤ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...' },
    defaultResponse: { en: "I'm sorry, I'm having a little trouble right now. Please try again in a moment.", hi: "मुझे खेद है, मुझे अभी थोड़ी परेशानी हो रही है। कृपया कुछ देर में पुनः प्रयास करें।", pa: "ਮੈਨੂੰ ਮਾਫ ਕਰਨਾ, ਮੈਨੂੰ ਹੁਣੇ ਥੋੜੀ ਮੁਸ਼ਕਲ ਆ ਰਹੀ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਕੁਝ ਦੇਰ ਬਾਅਦ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" },
    hospitalsTitle: { en: 'Nearby Hospitals', hi: 'आस-पास के अस्पताल', pa: 'ਨੇੜਲੇ ਹਸਪਤਾਲ' },
    locationInfo: { en: 'Based on your location', hi: 'आपके स्थान के आधार पर', pa: 'ਤੁਹਾਡੇ ਸਥਾਨ ਦੇ ਅਧਾਰ ਤੇ' },
    alertsTitle: { en: 'Health Alerts', hi: 'स्वास्थ्य अलर्ट', pa: 'ਸਿਹਤ ਸੰਬੰਧੀ ਚਿਤਾਵਨੀਆਂ' },
    vaccinationRemindersTitle: { en: 'Vaccination Reminders', hi: 'टीकाकरण अनुस्मारक', pa: 'ਟੀਕਾਕਰਨ ਰੀਮਾਈਂਡਰ' },
    covidBoosterTitle: { en: 'COVID-19 Booster Due', hi: 'कोविड-19 बूस्टर देय है', pa: 'ਕੋਵਿਡ-19 ਬੂਸਟਰ ਦਾ ਸਮਾਂ' },
    covidBoosterDesc: { en: "It's time for your COVID-19 booster shot. Visit your nearest vaccination center.", hi: 'यह आपके कोविड-19 बूस्टर शॉट का समय है। अपने नजदीकी टीकाकरण केंद्र पर जाएं।', pa: 'ਇਹ ਤੁਹਾਡੇ ਕੋਵਿਡ-19 ਬੂਸਟਰ ਸ਼ਾਟ ਦਾ ਸਮਾਂ ਹੈ। ਆਪਣੇ ਨਜ਼ਦੀਕੀ ਟੀਕਾਕਰਨ ਕੇਂਦਰ \'ਤੇ ਜਾਓ।' },
    bookAppointment: { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें', pa: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ' },
    fluShotTitle: { en: 'Annual Flu Shot Recommended', hi: 'वार्षिक फ्लू शॉट की सिफारिश की जाती है', pa: 'ਸਾਲਾਨਾ ਫਲੂ ਸ਼ਾਟ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ' },
    fluShotDesc: { en: 'The seasonal flu vaccine is now available. Protect yourself and your family this season.', hi: 'मौसमी फ्लू का टीका अब उपलब्ध ਹੈ। इस मौसम में अपनी और अपने परिवार की सुरक्षा करें।', pa: 'ਮੌਸਮੀ ਫਲੂ ਦਾ ਟੀਕਾ ਹੁਣ ਉਪਲਬਧ ਹੈ। ਇਸ ਮੌਸਮ ਵਿੱਚ ਆਪਣੀ ਅਤੇ ਆਪਣੇ ਪਰਿਵਾਰ ਦੀ ਰੱਖਿਆ ਕਰੋ।' },
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
    govtRajindraHospital: { en: 'Govt. Rajindra Hospital', hi: 'सरकारी राजिंदरा अस्पताल', pa: 'ਸਰਕਾਰੀ ਰਾਜਿੰਦਰਾ ਹਸਪਤਾਲ' },
    chcSanaur: { en: 'Community Health Centre, Sanaur', hi: 'सामुदायिक स्वास्थ्य केंद्र, सनौर', pa: 'ਕਮਿਊਨਿਟੀ ਹੈਲਥ ਸੈਂਟਰ, ਸਨੌਰ' },
    drGurpreetSingh: { en: 'Dr. Gurpreet Singh', hi: 'डॉ. गुरप्रीत सिंह', pa: 'ਡਾ. ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ' },
    drHarleenKaur: { en: 'Dr. Harleen Kaur', hi: 'डॉ. हरलीन कौर', pa: 'ਡਾ. ਹਰਲੀਨ ਕੌਰ' },
    drVikramjeetGill: { en: 'Dr. Vikramjeet Gill', hi: 'डॉ. विक्रमजीत गिल', pa: 'ਡਾ. ਵਿਕਰਮਜੀਤ ਗਿੱਲ' },
    drSimranBedi: { en: 'Dr. Simran Bedi', hi: 'डॉ. सिमरन बेदी', pa: 'ਡਾ. ਸਿਮਰਨ ਬੇਦੀ' },
    profileTitle: { en: 'My Health Profile', hi: 'मेरी स्वास्थ्य प्रोफ़ाइल', pa: 'ਮੇਰੀ ਸਿਹਤ ਪ੍ਰੋਫਾਈਲ' },
    personalInfo: { en: 'Personal Information', hi: 'व्यक्तिगत जानकारी', pa: 'ਨਿੱਜੀ ਜਾਣਕਾਰੀ' },
    healthInfo: { en: 'Medical Information', hi: 'चिकित्सा जानकारी', pa: 'ਮੈਡੀਕਲ ਜਾਣਕਾਰੀ' },
    fullName: { en: 'Full Name', hi: 'पूरा नाम', pa: 'ਪੂਰਾ ਨਾਂਮ' },
    age: { en: 'Age', hi: 'आयु', pa: 'ਉਮਰ' },
    bloodGroup: { en: 'Blood Group', hi: 'रक्त समूह', pa: 'ਖੂਨ ਦਾ ਗਰੁੱਪ' },
    allergies: { en: 'Allergies', hi: 'एलर्जी', pa: 'ਐਲਰਜੀਆਂ' },
    chronicConditions: { en: 'Chronic Conditions', hi: 'पुरानी बीमारियाँ', pa: 'ਪੁਰਾਣੀਆਂ ਬਿਮਾਰੀਆਂ' },
    none: { en: 'None', hi: 'कोई नहीं', pa: 'ਕੋਈ ਨਹੀਂ' },
    egConditions: { en: 'e.g., Diabetes, High BP', hi: 'उदा., मधुमेह, उच्च रक्तचाप', pa: 'ਜਿਵੇਂ, ਸ਼ੂਗਰ, ਹਾਈ ਬੀ.ਪੀ' },
    editProfile: { en: 'Edit Profile', hi: 'प्रोफ़ाइल संपादित करें', pa: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ' },
    saveProfile: { en: 'Save Profile', hi: 'प्रोफ़ाइल सहेजें', pa: 'ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ' },
    profileSaved: { en: 'Profile saved successfully!', hi: 'प्रोफ़ाइल सफलतापूर्वक सहेजी गई!', pa: 'ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਸੁਰੱਖਿਅਤ ਕੀਤੀ ਗਈ!' },
    clearChat: { en: 'Clear Chat', hi: 'चैट साफ़ करें', pa: 'ਚੈਟ ਸਾਫ਼ ਕਰੋ' },
    clearChatConfirm: { en: 'Are you sure you want to clear the entire conversation?', hi: 'क्या आप वाकई पूरी बातचीत साफ़ करना चाहते हैं?', pa: 'ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਸਾਰੀ ਗੱਲਬਾਤ ਨੂੰ ਸਾਫ਼ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?' },
    clear: { en: 'Clear', hi: 'साफ़ करें', pa: 'ਸਾਫ਼ ਕਰੋ' },
    cancel: { en: 'Cancel', hi: 'रद्द करें', pa: 'ਰੱਦ ਕਰੋ' },
    // New Translations
    myHealthTitle: { en: 'My Health Resources', hi: 'मेरे स्वास्थ्य संसाधन', pa: 'ਮੇਰੇ ਸਿਹਤ ਸਰੋਤ' },
    firstAidTitle: { en: 'First-Aid Guide', hi: 'प्राथमिक उपचार गाइड', pa: 'ਮੁੱਢਲੀ ਸਹਾਇਤਾ ਗਾਈਡ' },
    firstAidDesc: { en: 'Quick help for emergencies', hi: 'आपात स्थिति के लिए त्वरित मदद', pa: 'ਐਮਰਜੈਂਸੀ ਲਈ ਤੁਰੰਤ ਮਦਦ' },
    ashaDirectoryTitle: { en: 'ASHA Worker Directory', hi: 'आशा कार्यकर्ता निर्देशिका', pa: 'ਆਸ਼ਾ ਵਰਕਰ ਡਾਇਰੈਕਟਰੀ' },
    ashaDirectoryDesc: { en: 'Find your local health worker', hi: 'अपने स्थानीय स्वास्थ्य कार्यकर्ता को खोजें', pa: 'ਆਪਣੇ ਸਥਾਨਕ ਸਿਹਤ ਕਰਮਚਾਰੀ ਨੂੰ ਲੱਭੋ' },
    healthCampTitle: { en: 'Upcoming Health Camp', hi: 'आगामी स्वास्थ्य शिविर', pa: 'ਆਉਣ ਵਾਲਾ ਸਿਹਤ ਕੈਂਪ' },
    healthCampDesc: { en: 'Free check-up & consultation at Lehal village.', hi: 'लेहल गांव में मुफ्त जांच और परामर्श।', pa: 'ਲੇਹਲ ਪਿੰਡ ਵਿਖੇ ਮੁਫਤ ਜਾਂਚ ਅਤੇ ਸਲਾਹ-ਮਸ਼ਵਰਾ।' },
    viewDetails: { en: 'View Details', hi: 'विवरण देखें', pa: 'ਵੇਰਵੇ ਵੇਖੋ' },
    searchByVillage: { en: 'Search by village name...', hi: 'गांव के नाम से खोजें...', pa: 'ਪਿੰਡ ਦੇ ਨਾਮ ਦੁਆਰਾ ਖੋਜ ਕਰੋ...' },
    callNow: { en: 'Call Now', hi: 'अभी कॉल करें', pa: 'ਹੁਣੇ ਕਾਲ ਕਰੋ' },
    burns: { en: 'Burns', hi: 'जलना', pa: 'ਸੜਨਾ' },
    snakeBite: { en: 'Snake Bite', hi: 'सांप का काटना', pa: 'ਸੱਪ ਦਾ ਡੰਗ' },
    fever: { en: 'Fever', hi: 'बुखार', pa: 'ਬੁਖਾਰ' },
    cutsWounds: { en: 'Cuts & Wounds', hi: 'कटना और घाव', pa: 'ਕੱਟ ਅਤੇ ਜ਼ਖ਼ਮ' },
    getPersonalizedTips: { en: 'Get Personalized Tips', hi: 'व्यक्तिगत सुझाव प्राप्त करें', pa: 'ਨਿੱਜੀ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ' },
    personalizedTipsTitle: { en: 'Personalized For You', hi: 'आपके लिए व्यक्तिगत', pa: 'ਤੁਹਾਡੇ ਲਈ ਨਿੱਜੀ' },
};


// Mock data updated for Patiala, Punjab (Sep 2025)
const mockOutbreaks = [{
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

const mockHospitals = [{
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

// ** NEW MOCK DATA **
const mockHealthCamps = [{
    id: 1,
    titleKey: 'healthCampTitle',
    descriptionKey: 'healthCampDesc',
    date: '25 Sep, 2025',
    location: 'Lehal Village, Patiala'
}];

const mockAshaWorkers = [
    { id: 1, name: 'Sunita Devi', village: 'Lehal', phone: '+91-9876543210' },
    { id: 2, name: 'Manjeet Kaur', village: 'Sanaur', phone: '+91-9876543211' },
    { id: 3, name: 'Geeta Rani', village: 'Daun Kalan', phone: '+91-9876543212' },
    { id: 4, name: 'Paramjeet Kaur', village: 'Bahadurgarh', phone: '+91-9876543213' },
];

const mockFirstAidGuides = [{
        id: 'burns',
        titleKey: 'burns',
        steps: {
            en: [
                "Immediately cool the burn with cool or lukewarm running water for 20 minutes.",
                "Remove any clothing or jewellery that's near the burnt area of skin.",
                "Cover the burn by placing a layer of cling film over it.",
                "Do not apply ice, iced water, or any creams or greasy substances like butter."
            ],
            hi: [
                "जले हुए स्थान को तुरंत 20 मिनट के लिए ठंडे या गुनगुने बहते पानी से ठंडा करें।",
                "जले हुए त्वचा के पास के किसी भी कपड़े या गहने को हटा दें।",
                "जले हुए स्थान पर क्लिंग फिल्म की एक परत रखकर उसे ढक दें।",
                "बर्फ, बर्फीला पानी, या कोई क्रीम या मक्खन जैसी चिकनी चीजें न लगाएं।"
            ],
            pa: [
                "ਸੜੇ ਹੋਏ ਹਿੱਸੇ ਨੂੰ ਤੁਰੰਤ 20 ਮਿੰਟ ਲਈ ਠੰਡੇ ਜਾਂ ਕੋਸੇ ਚਲਦੇ ਪਾਣੀ ਨਾਲ ਠੰਡਾ ਕਰੋ।",
                "ਸੜੀ ਹੋਈ ਚਮੜੀ ਦੇ ਨੇੜੇ ਦੇ ਕਿਸੇ ਵੀ ਕੱਪੜੇ ਜਾਂ ਗਹਿਣਿਆਂ ਨੂੰ ਹਟਾ ਦਿਓ।",
                "ਸੜੇ ਹੋਏ ਹਿੱਸੇ ਉੱਤੇ ਕਲਿੰਗ ਫਿਲਮ ਦੀ ਇੱਕ ਪਰਤ ਰੱਖ ਕੇ ਉਸਨੂੰ ਢੱਕ ਦਿਓ।",
                "ਬਰਫ਼, ਬਰਫ਼ ਵਾਲਾ ਪਾਣੀ, ਜਾਂ ਕੋਈ ਕਰੀਮ ਜਾਂ ਮੱਖਣ ਵਰਗੀਆਂ ਚਿਕਨੀਆਂ ਚੀਜ਼ਾਂ ਨਾ ਲਗਾਓ।"
            ]
        }
    },
    {
        id: 'snakeBite',
        titleKey: 'snakeBite',
        steps: {
            en: [
                "Stay calm and keep the bitten area still and lower than the heart.",
                "Remove jewellery and tight clothing before swelling starts.",
                "Wash the bite with soap and water and cover with a clean, dry dressing.",
                "Seek medical help immediately. Do not try to cut the wound or suck out the venom."
            ],
            hi: [
                "शांत रहें और काटे हुए क्षेत्र को स्थिर और हृदय से नीचे रखें।",
                "सूजन शुरू होने से पहले गहने और तंग कपड़े हटा दें।",
                "काटे हुए स्थान को साबुन और पानी से धोएं और साफ, सूखी पट्टी से ढक दें।",
                "तुरंत चिकित्सा सहायता लें। घाव को काटने या जहर चूसने की कोशिश न करें।"
            ],
            pa: [
                "ਸ਼ਾਂਤ ਰਹੋ ਅਤੇ ਡੰਗੇ ਹੋਏ ਖੇਤਰ ਨੂੰ ਸਥਿਰ ਅਤੇ ਦਿਲ ਤੋਂ ਹੇਠਾਂ ਰੱਖੋ।",
                "ਸੋਜ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਗਹਿਣੇ ਅਤੇ ਤੰਗ ਕੱਪੜੇ ਹਟਾ ਦਿਓ।",
                "ਡੰਗੇ ਹੋਏ ਸਥਾਨ ਨੂੰ ਸਾਬਣ ਅਤੇ ਪਾਣੀ ਨਾਲ ਧੋਵੋ ਅਤੇ ਸਾਫ਼, ਸੁੱਕੀ ਪੱਟੀ ਨਾਲ ਢੱਕ ਦਿਓ।",
                "ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਹਾਇਤਾ ਲਵੋ। ਜ਼ਖ਼ਮ ਨੂੰ ਕੱਟਣ ਜਾਂ ਜ਼ਹਿਰ ਚੂਸਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਨਾ ਕਰੋ।"
            ]
        }
    },
];

const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

// Utility functions
const playSound = (text, language = 'en') => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
};

const startVoiceRecognition = (onResult, language = 'en') => {
    if (!('webkitSpeechRecognition' in window)) {
        console.warn('Voice recognition not supported in your browser.');
        return null;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
    };
    recognition.start();
    return recognition;
};

// **CUSTOM SVG ICONS for a softer, more caring feel**
const CustomSehatMitraLogo = ({ className }) => ( <
    svg className = { className }
    viewBox = "0 0 100 100"
    fill = "none"
    xmlns = "http://www.w3.org/2000/svg" >
    <
    g stroke = "#4ade80"
    strokeWidth = "6"
    strokeLinecap = "round" >
    <
    path d = "M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 38.835 85.4925 28.7101 78.2104 21.2132" / >
    <
    path d = "M50 35V65" / >
    <
    path d = "M35 50H65" / >
    <
    path d = "M70 20L80 30" / >
    <
    /g> <
    /svg>
);


// Error boundary component
const ErrorMessage = ({ message, onRetry }) => ( <
    div className = "bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg p-6 m-4 max-w-2xl mx-auto animate-fade-in" >
    <
    div className = "flex flex-col items-center text-center" >
    <
    AlertTriangle className = "h-10 w-10 text-red-500 mb-3" / >
    <
    h3 className = "text-lg font-semibold text-red-800 dark:text-red-200" >
    An Error Occurred <
    /h3> <
    p className = "mt-1 text-red-700 dark:text-red-300" > { message } < /p> {
        onRetry && ( <
            button onClick = { onRetry }
            className = "mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors" >
            Try Again <
            /button>
        )
    } <
    /div> <
    /div>
);

// SUB-COMPONENTS (Defined before main App component to avoid reference errors)
const WelcomeScreen = () => {
    const { darkMode } = useContext(AppContext);
    return ( <
        div className = { `welcome-screen animate-fade-in ${darkMode ? "dark" : ""}` } >
        <
        CustomSehatMitraLogo className = "w-24 h-24 welcome-screen-logo" / >
        <
        p className = "mt-4 text-xl font-bold text-gray-700 dark:text-gray-300" >
        SehatMitra <
        /p> <
        p className = "text-gray-500 dark:text-gray-400" >
        Your health companion <
        /p> <
        /div>
    );
};

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
    const bgColor = isHighSeverity ? 'bg-red-100 dark:bg-red-900/80' : 'bg-yellow-100 dark:bg-yellow-900/80';
    const textColor = isHighSeverity ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200';

    return ( <
        div className = { `${bgColor} ${textColor} px-4 py-2 text-center text-sm` } >
        <
        AlertTriangle className = "inline h-4 w-4 mr-1" / >
        <
        span className = "font-medium" > { t("alert") } < /span>{" "} { alert.cases } { t(alert.diseaseKey) } { t("casesIn") } { alert.area } <
        span className = "ml-2 text-xs" > •{ t(alert.preventionKey) } < /span> <
        /div>
    );
};

const Header = () => {
    const { darkMode, setDarkMode, language, setLanguage, t, setCurrentView } = useContext(AppContext);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return ( <
        header className = "bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50" >
        <
        div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <
        div className = "flex justify-between items-center h-16" > { /* Logo and App Name */ } <
        div className = "flex items-center space-x-2" >
        <
        CustomSehatMitraLogo className = "h-8 w-8 text-green-500" / >
        <
        h1 className = "text-xl font-bold text-gray-900 dark:text-white" > { t("appName") } <
        /h1> <
        /div>

        { /* Controls */ } <
        div className = "flex items-center space-x-2 sm:space-x-4" > { /* Language Selector */ } <
        select value = { language }
        onChange = { handleLanguageChange }
        className = "text-sm border rounded-lg px-2 py-1 bg-white/50 dark:bg-gray-700/50 dark:text-white dark:border-gray-600" >
        {
            languages.map((lang) => ( <
                option key = { lang.code }
                value = { lang.code } > { lang.native } <
                /option>
            ))
        } <
        /select>

        { /* Dark Mode Toggle */ } <
        button onClick = { toggleDarkMode }
        className = "p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria - label = "Toggle theme" >
        { darkMode ? ( < Sun className = "h-5 w-5" / > ) : ( < Moon className = "h-5 w-5" / > ) } <
        /button>

        { /* Profile Button */ } <
        button onClick = {
            () => setCurrentView("profile") }
        className = "p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria - label = "Open Profile" >
        <
        User className = "h-5 w-5" / >
        <
        /button> <
        /div> <
        /div> <
        /div> <
        OutbreakAlertBar / >
        <
        /header>
    );
};

const HealthCampBanner = () => {
    const { t } = useContext(AppContext);
    const camp = mockHealthCamps[0];

    return ( <
        div className = "relative bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-xl p-6 overflow-hidden animate-card-pop-in"
        style = {
            { animationDelay: "300ms" } } >
        <
        div className = "absolute -bottom-4 -right-4 w-24 h-24 text-white/10" >
        <
        Heart size = { 96 }
        strokeWidth = { 1.5 }
        /> <
        /div> <
        div className = "relative z-10" >
        <
        h3 className = "font-bold text-lg flex items-center mb-1" >
        <
        Activity className = "mr-2" / > { t(camp.titleKey) } <
        /h3> <
        p className = "text-sm mb-3" > { t(camp.descriptionKey) } < /p> <
        div className = "text-xs font-semibold bg-white/20 px-3 py-1 rounded-full inline-block" > { camp.date } & bull; { camp.location } <
        /div> <
        /div> <
        /div>
    );
};

const MyHealthResources = () => {
    const { t, setCurrentView } = useContext(AppContext);

    const resources = [
        { titleKey: "firstAidTitle", descKey: "firstAidDesc", icon: LifeBuoy, view: "firstAid" },
        { titleKey: "ashaDirectoryTitle", descKey: "ashaDirectoryDesc", icon: Users, view: "ashaWorkers" },
    ];

    return ( <
        div className = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6" >
        <
        h3 className = "text-lg font-semibold text-gray-900 dark:text-white mb-4" > { t("myHealthTitle") } <
        /h3> <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > {
            resources.map((res) => ( <
                button key = { res.view }
                onClick = {
                    () => setCurrentView(res.view) }
                className = "text-left p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center space-x-4" >
                <
                div className = "flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-500 flex items-center justify-center" >
                <
                res.icon size = { 20 }
                /> <
                /div> <
                div >
                <
                p className = "font-semibold text-gray-800 dark:text-gray-200" > { t(res.titleKey) } <
                /p> <
                p className = "text-xs text-gray-500 dark:text-gray-400" > { t(res.descKey) } <
                /p> <
                /div> <
                /button>
            ))
        } <
        /div> <
        /div>
    );
};

const EmergencyServices = () => {
    const { t } = useContext(AppContext);
    const emergencyNumbers = [
        { name: t("ambulance"), number: "108", color: "bg-red-500", icon: Phone },
        { name: t("police"), number: "112", color: "bg-blue-500", icon: Shield },
        { name: t("healthHelpline"), number: "104", color: "bg-green-500", icon: Heart },
    ];

    const callEmergency = (number) => {
        window.location.href = `tel:${number}`;
    };

    return ( <
        div className = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8" >
        <
        h3 className = "text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center" >
        <
        AlertTriangle className = "h-5 w-5 text-red-500 mr-2" / > { t("emergencyServicesTitle") } <
        /h3> <
        div className = "grid grid-cols-1 sm:grid-cols-3 gap-4" > {
            emergencyNumbers.map((service, index) => {
                const IconComponent = service.icon;
                return ( <
                    button key = { index }
                    onClick = {
                        () => callEmergency(service.number) }
                    className = { `${service.color} hover:shadow-lg hover:${service.color}/50 text-white rounded-lg p-4 flex items-center justify-center space-x-2 transition-all duration-200 font-semibold transform hover:scale-105` } >
                    <
                    IconComponent className = "h-5 w-5" / >
                    <
                    span > { service.name } < /span> <
                    span className = "font-bold" > { service.number } < /span> <
                    /button>
                );
            })
        } <
        /div> <
        /div>
    );
};

const HealthTips = () => {
    const { t, userProfile, setError } = useContext(AppContext);
    const [tips, setTips] = useState(t('healthTips'));
    const [isPersonalized, setIsPersonalized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isPersonalized) {
            setTips(t('healthTips'));
        }
    }, [t, isPersonalized]);

    const getPersonalizedTips = async() => {
        setIsLoading(true);
        setError(null);

        const systemPrompt = `You are a health expert creating personalized tips for a user in rural Punjab, India.
User's Age: ${userProfile.age || 'Not specified'}
User's Chronic Conditions: ${userProfile.conditions || 'None specified'}
Generate 3 simple, actionable, and encouraging health tips tailored to this user. The tips should be easy to follow with limited resources. Focus on diet, light exercise, or lifestyle adjustments. The language must be extremely simple. Output only the tips in a numbered list, like "1. First tip.\\n2. Second tip.\\n3. Third tip.".`;

        const apiKey = ""; // API Key will be injected by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: systemPrompt }] }] };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            const candidate = result ? .candidates ? .[0];
            const text = candidate ? .content ? .parts ? .[0] ? .text;

            if (text) {
                const formattedTips = text
                    .split("\n")
                    .map((tip) => tip.replace(/^\d+\.\s*/, "").trim())
                    .filter(Boolean);

                setTips(formattedTips);
                setIsPersonalized(true);
            } else {
                console.error("Gemini API Error: No content in response", result);
                setError("Sorry, could not generate personalized tips right now.");
            }
        } catch (error) {
            console.error("Error fetching personalized tips:", error);
            setError(
                "There was a network problem. Please check your connection and try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return ( <
        div className = "bg-green-100/50 dark:bg-green-900/50 backdrop-blur-md rounded-xl p-6" >
        <
        div className = "flex justify-between items-start mb-4" >
        <
        div >
        <
        h3 className = "text-lg font-semibold text-green-800 dark:text-green-200 flex items-center" >
        <
        BookHeart className = "h-5 w-5 mr-2" / > { isPersonalized ? t('personalizedTipsTitle') : t('dailyHealthTipsTitle') } <
        /h3> <
        /div> <
        button onClick = { getPersonalizedTips }
        disabled = { isLoading }
        className = "flex-shrink-0 flex items-center text-xs font-semibold bg-white/50 text-green-700 dark:bg-black/20 dark:text-green-200 px-3 py-1.5 rounded-lg hover:bg-white transition-colors disabled:opacity-50" >
        {
            isLoading ? ( <
                Loader2 className = "h-4 w-4 animate-spin mr-2" / >
            ) : ( <
                Sparkles className = "h-4 w-4 text-yellow-500 mr-2" / >
            )
        } { t('getPersonalizedTips') } <
        /button> <
        /div> <
        div className = "grid grid-cols-1 sm:grid-cols-2 gap-3" > {
            tips.map((tip, index) => ( <
                div key = { index }
                className = "flex items-start" >
                <
                div className = "w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" > < /div> <
                p className = "text-green-700 dark:text-green-300 text-sm" > { tip } < /p> <
                /div>
            ))
        } <
        /div> <
        /div>
    );
};

const Dashboard = () => {
    const { setCurrentView, t, userProfile } = useContext(AppContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const colorMap = {
        blue: { bg: 'from-blue-400 to-indigo-500', shadow: 'hover:shadow-indigo-500/30' },
        green: { bg: 'from-green-400 to-emerald-500', shadow: 'hover:shadow-emerald-500/30' },
        orange: { bg: 'from-orange-400 to-amber-500', shadow: 'hover:shadow-amber-500/30' },
    };

    const dashboardCards = [
        { title: t('healthAssistantTitle'), description: t('healthAssistantDesc'), icon: MessageCircle, color: 'blue', view: 'chatbot' },
        { title: t('findHospitalsTitle'), description: t('findHospitalsDesc'), icon: Hospital, color: 'green', view: 'hospitals' },
        { title: t('healthAlertsTitle'), description: t('healthAlertsDesc'), icon: Bell, color: 'orange', view: 'alerts' },
    ];

    const welcomeText = userProfile.name ? `${t('welcomeMessage')}, ${userProfile.name}!` : t('welcomeMessage') + " to " + t('appName');

    return ( <
        div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" >
        <
        div className = { `transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}` } >
        <
        h2 className = "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2" > { welcomeText } <
        /h2> <
        p className = "text-gray-600 dark:text-gray-400" > { t("appSubtitle") } < /p> <
        /div> <
        div className = "my-8" >
        <
        HealthCampBanner / >
        <
        /div> <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" > {
            dashboardCards.map((card, index) => {
                const IconComponent = card.icon;
                const styles = colorMap[card.color];
                return ( <
                    div key = { card.view }
                    onClick = {
                        () => setCurrentView(card.view) }
                    className = { `group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl ${styles.shadow} ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}` }
                    style = {
                        { transitionDelay: `${index * 100}ms` } } >
                    <
                    div className = { `absolute inset-0 bg-gradient-to-br ${styles.bg} rounded-xl opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300` } > < /div> <
                    div className = "p-6 relative" >
                    <
                    div className = { `inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${styles.bg} text-white rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg` } >
                    <
                    IconComponent className = "h-6 w-6" / >
                    <
                    /div> <
                    h3 className = "text-lg font-semibold text-gray-900 dark:text-white mb-2" > { card.title } <
                    /h3> <
                    p className = "text-gray-600 dark:text-gray-400 text-sm" > { card.description } <
                    /p> <
                    /div> <
                    /div>
                );
            })
        } <
        /div> <
        div className = "my-8" >
        <
        MyHealthResources / >
        <
        /div> <
        div className = { `transition-all duration-700 delay-500 mt-8 ${isLoaded ? "opacity-100" : "opacity-0"}` } >
        <
        EmergencyServices / >
        <
        HealthTips / >
        <
        /div> <
        /div>
    );
};

const Chatbot = () => {
    const { language, t, setError } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        try {
            const savedChat = localStorage.getItem('sehatMitraChat');
            if (savedChat) {
                setMessages(JSON.parse(savedChat));
            } else {
                setMessages([{ type: 'bot', content: t('chatbotInitialGreeting'), timestamp: new Date().toISOString() }]);
            }
        } catch (e) {
            setMessages([{ type: 'bot', content: t('chatbotInitialGreeting'), timestamp: new Date().toISOString() }]);
        }
    }, [t]);

    useEffect(() => {
        if (messages.length > 0) {
            try {
                localStorage.setItem('sehatMitraChat', JSON.stringify(messages));
            } catch (e) {
                console.error("Failed to save chat history", e);
                setError("Could not save your chat history.");
            }
        }
    }, [messages, setError]);

    const scrollToBottom = () => {
        messagesEndRef.current ? .scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const API_BASE = "https://alcohol-loan-layers-objects.trycloudflare.com";

    const getBackendResponse = async(userMessage) => {
        try {
            const response = await fetch(`${API_BASE}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userMessage }),
            });
            if (!response.ok) {
                throw new Error("Backend error: " + response.statusText);
            }
            const data = await response.json();
            return data.reply || t('defaultResponse');
        } catch (error) {
            console.error("Error calling backend:", error);
            setError("There was a network problem. Please check your connection.");
            return t('defaultResponse');
        }
    };

    const sendMessage = async() => {
        if (!inputMessage.trim()) return;
        setError(null);
        const userMessage = { type: 'user', content: inputMessage, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsLoading(true);

        const botResponseContent = await getBackendResponse(currentInput);

        const botResponse = { type: 'bot', content: botResponseContent, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
        playSound(botResponseContent, language);
    };

    const handleClearChat = () => {
        localStorage.removeItem('sehatMitraChat');
        setMessages([{ type: 'bot', content: t('chatbotInitialGreeting'), timestamp: new Date().toISOString() }]);
        setShowClearConfirm(false);
    };

    const startVoiceInput = () => {
        setIsListening(true);
        const recognition = startVoiceRecognition((transcript) => {
            setInputMessage(transcript);
            setIsListening(false);
        }, language);
        if (!recognition) {
            setIsListening(false);
        }
    };

    const speakMessage = (content) => { playSound(content, language) };
    const handleKeyPress = (e) => { if (e.key === 'Enter' && !isLoading) sendMessage(); };

    return ( <
        div className = "max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-120px)] flex flex-col animate-fade-in" >
        <
        div className = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-4 mb-4" >
        <
        div className = "flex items-center justify-between" >
        <
        div className = "flex items-center" >
        <
        MessageCircle className = "h-8 w-8 text-blue-500 mr-3" / >
        <
        div >
        <
        h2 className = "text-xl font-semibold text-gray-900 dark:text-white" > { t('chatbotHeaderTitle') } < /h2> <
        p className = "text-sm text-gray-500 dark:text-gray-400" > { t('chatbotHeaderSubtitle') } < /p> <
        /div> <
        /div> <
        div className = "flex items-center space-x-2" >
        <
        button onClick = {
            () => setShowClearConfirm(true) }
        className = "p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title = { t('clearChat') } >
        <
        Trash2 className = "h-5 w-5" / >
        <
        /button> <
        div className = "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium" > { t('online') } <
        /div> <
        /div> <
        /div> <
        /div>

        {
            showClearConfirm && ( <
                div className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" >
                <
                div className = "bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 m-4 max-w-sm w-full" >
                <
                h3 className = "text-lg font-semibold text-gray-900 dark:text-white mb-2" > { t('clearChat') } < /h3> <
                p className = "text-sm text-gray-600 dark:text-gray-400 mb-4" > { t('clearChatConfirm') } < /p> <
                div className = "flex justify-end space-x-2" >
                <
                button onClick = {
                    () => setShowClearConfirm(false) }
                className = "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500" >
                { t('cancel') } <
                /button> <
                button onClick = { handleClearChat }
                className = "px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600" >
                { t('clear') } <
                /button> <
                /div> <
                /div> <
                /div>
            )
        }

        <
        div className = "flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col" >
        <
        div className = "flex-1 overflow-y-auto p-4 space-y-4" > {
            messages.map((message, index) => ( <
                div key = { index }
                className = { `flex items-end ${message.type === 'user' ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'}` } >
                <
                div className = { `max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}` } >
                <
                p className = "text-sm"
                dangerouslySetInnerHTML = {
                    { __html: message.content.replace(/\n/g, '<br />') } }
                /> {
                    message.type === 'bot' && ( <
                        button onClick = {
                            () => speakMessage(message.content) }
                        className = "mt-2 text-xs text-blue-500 dark:text-blue-400 hover:underline flex items-center" >
                        <
                        Volume2 className = "h-3 w-3 mr-1" / > { t('listen') } <
                        /button>
                    )
                } <
                div className = "text-xs opacity-70 mt-1 text-right" > { new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } <
                /div> <
                /div> <
                /div>
            ))
        }

        {
            isLoading && ( <
                div className = "flex justify-start animate-slide-in-left" >
                <
                div className = "bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs shadow-sm" >
                <
                div className = "flex items-center space-x-2" >
                <
                div className = "dot dot-1 bg-gray-400" > < /div> <
                div className = "dot dot-2 bg-gray-400" > < /div> <
                div className = "dot dot-3 bg-gray-400" > < /div> <
                /div> <
                /div> <
                /div>
            )
        } <
        div ref = { messagesEndRef }
        /> <
        /div>

        <
        div className = "px-4 pb-2 text-xs text-gray-500 dark:text-gray-400 text-center"
        dangerouslySetInnerHTML = {
            { __html: t('chatbotDisclaimer') } }
        />

        <
        div className = "border-t border-gray-200 dark:border-gray-600 p-4" >
        <
        div className = "flex items-center space-x-2" >
        <
        div className = "flex-1 relative" >
        <
        input type = "text"
        value = { inputMessage }
        onChange = {
            (e) => setInputMessage(e.target.value) }
        onKeyPress = { handleKeyPress }
        placeholder = { t('chatbotInputPlaceholder') }
        className = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /
        >
        <
        /div> <
        button onClick = { startVoiceInput }
        disabled = { isListening }
        className = { `p-2 rounded-lg ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'} text-gray-700 dark:text-gray-300` } >
        <
        Mic className = "h-5 w-5" / >
        <
        /button> <
        button onClick = { sendMessage }
        disabled = {!inputMessage.trim() || isLoading }
        className = "p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" >
        <
        Send className = "h-5 w-5" / >
        <
        /button> <
        /div> <
        /div> <
        /div> <
        /div>
    );
};

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

    const LoadingCard = () => ( <
        div className = "hospital-card p-6 shimmer-bg rounded-xl" >
        <
        div className = "h-6 w-3/4 bg-white/20 rounded-md mb-3" > < /div> <
        div className = "h-4 w-1/2 bg-white/20 rounded-md mb-4" > < /div> <
        div className = "h-4 w-1/3 bg-white/20 rounded-md" > < /div> <
        div className = "border-t border-white/10 my-4" > < /div> <
        div className = "h-5 w-1/4 bg-white/20 rounded-md mb-3" > < /div> <
        div className = "grid grid-cols-1 sm:grid-cols-2 gap-3" >
        <
        div className = "h-12 bg-white/20 rounded-lg" > < /div> <
        div className = "h-12 bg-white/20 rounded-lg" > < /div> <
        /div> <
        /div>
    );

    const DoctorChip = ({ doctor }) => ( <
        div className = "group flex items-center space-x-3 p-3 bg-white/10 dark:bg-black/20 rounded-lg transition-colors hover:bg-white/20 dark:hover:bg-black/30" >
        <
        div className = { `flex-shrink-0 w-3 h-3 rounded-full transition-all duration-300 ${doctor.available ? 'bg-green-400 group-hover:shadow-lg group-hover:shadow-green-400/50' : 'bg-red-500'}` } >
        < /div> <
        div className = "flex-1" >
        <
        p className = "font-medium text-sm text-gray-900 dark:text-white" > { t(doctor.nameKey) } < /p> <
        p className = "text-xs text-gray-600 dark:text-gray-400" > { t(doctor.specialtyKey) } < /p> <
        /div> <
        Stethoscope className = "h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform group-hover:scale-110" / >
        <
        /div>
    );

    const HospitalCard = ({ hospital, index }) => {
        const cardRef = useRef(null);

        const handleMouseMove = (e) => {
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        };

        return ( <
            div key = { hospital.id }
            ref = { cardRef }
            onMouseMove = { handleMouseMove }
            className = "hospital-card animate-card-pop-in"
            style = {
                { animationDelay: `${index * 150}ms` } } >
            <
            div className = "p-6" >
            <
            div className = "flex justify-between items-start mb-4" >
            <
            div className = "flex-1" >
            <
            h3 className = "text-xl font-semibold text-gray-900 dark:text-white mb-2" > { t(hospital.nameKey) } < /h3> <
            div className = "flex items-center text-gray-600 dark:text-gray-400 mb-2" >
            <
            MapPin className = "h-4 w-4 mr-2 flex-shrink-0" / >
            <
            span > { hospital.address } < /span> <
            /div> <
            div className = "flex items-center text-gray-600 dark:text-gray-400" >
            <
            Clock className = "h-4 w-4 mr-2 flex-shrink-0" / >
            <
            span > { hospital.distance } { t('distanceAway') } < /span> <
            /div> <
            /div> <
            div className = { `flex-shrink-0 ml-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${hospital.isOpen ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}` } > { hospital.isOpen ? t('open') : t('closed') } <
            /div> <
            /div>

            <
            div className = "border-t border-white/10 my-4" > < /div>

            <
            div >
            <
            h4 className = "font-medium text-gray-900 dark:text-white mb-3" > { t('availableDoctors') } < /h4> <
            div className = "grid grid-cols-1 sm:grid-cols-2 gap-3" > {
                hospital.doctors.map((doctor, docIndex) => ( <
                    DoctorChip key = { docIndex }
                    doctor = { doctor }
                    />
                ))
            } <
            /div> <
            /div>

            <
            div className = "flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6" >
            <
            button onClick = {
                () => (window.location.href = `tel:${hospital.phone}`) }
            className = "group flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-300 transform active:scale-95" >
            <
            Phone className = "h-4 w-4 mr-2 transition-transform group-hover:rotate-12" / > { t('callHospital') } <
            /button>

            <
            button className = "group flex-1 bg-transparent text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-lg flex items-center justify-center transition-all duration-300 transform active:scale-95 relative border border-purple-400 hover:text-white overflow-hidden" >
            <
            span className = "absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left" > < /span> <
            span className = "relative flex items-center" >
            <
            MapPin className = "h-4 w-4 mr-2 transition-transform group-hover:animate-[icon-bounce_0.5s_ease-in-out]" / > { t('getDirections') } <
            /span> <
            /button> <
            /div> <
            /div> <
            /div>
        );
    };

    return ( <
        div className = "max-w-7xl mx-auto px-4 py-6" >
        <
        div className = "flex items-center justify-between mb-6" >
        <
        h2 className = "text-2xl font-bold text-gray-900 dark:text-white" > { t('hospitalsTitle') } <
        /h2> <
        div className = "flex items-center text-sm text-gray-500 dark:text-gray-400" >
        <
        MapPin className = "h-4 w-4 mr-1" / >
        <
        span > { t('locationInfo') } < /span> <
        /div> <
        /div> {
            loading ? ( <
                div className = "grid md:grid-cols-1 lg:grid-cols-2 gap-8" >
                <
                LoadingCard / >
                <
                LoadingCard / >
                <
                /div>
            ) : ( <
                div className = "grid md:grid-cols-1 lg:grid-cols-2 gap-8" > {
                    hospitals.map((hospital, index) => ( <
                        HospitalCard hospital = { hospital }
                        index = { index }
                        key = { hospital.id }
                        />
                    ))
                } <
                /div>
            )
        } <
        /div>
    );
};

const Alerts = () => {
    const { t } = useContext(AppContext);

    const AlertCard = ({ outbreak, index }) => {
        const isHigh = outbreak.severity === 'high';
        const severityColor = isHigh ? 'red' : 'yellow';

        return ( <
            div className = "alert-card shadow-lg animate-card-pop-in"
            style = {
                { animationDelay: `${index * 150}ms` } } >
            <
            div className = { `severity-glow bg-${severityColor}-500` } > < /div> <
            div className = "pl-6 p-4 flex items-start space-x-4" >
            <
            div className = { `flex-shrink-0 w-12 h-12 rounded-full bg-${severityColor}-100 dark:bg-${severityColor}-500/20 flex items-center justify-center` } >
            <
            AlertTriangle className = { `h-6 w-6 text-${severityColor}-500 animated-icon` }
            /> <
            /div>

            <
            div className = "flex-1" >
            <
            div className = "flex justify-between items-start" >
            <
            div >
            <
            h3 className = "text-lg font-semibold text-gray-900 dark:text-white" > { t(outbreak.diseaseKey) } { t('outbreakAlertSuffix') } < /h3> <
            p className = "text-sm text-gray-600 dark:text-gray-400 font-medium" > { outbreak.cases } { t('confirmedCasesIn') } { outbreak.area } < /p> <
            /div> <
            span className = { `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${severityColor}-100 text-${severityColor}-800 dark:bg-${severityColor}-900 dark:text-${severityColor}-200` } > { isHigh ? t('severityHigh') : t('severityMedium') } <
            /span> <
            /div> <
            div className = "mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg" >
            <
            h4 className = "font-medium text-sm text-gray-800 dark:text-gray-200 mb-1" > { t('preventionMeasures') } < /h4> <
            p className = "text-sm text-gray-600 dark:text-gray-400" > { t(outbreak.preventionKey) } < /p> <
            /div> <
            div className = "flex space-x-3 mt-4" >
            <
            button className = "group flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline" > { t('learnMore') } < /button> <
            button className = "group flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors" >
            <
            Share2 className = "h-4 w-4 mr-1.5 transition-transform group-hover:scale-110" / > { t('shareAlert') } <
            /button> <
            /div> <
            /div> <
            /div> <
            /div>
        );
    };

    const VaccineCard = ({ titleKey, descKey, color, icon: Icon, index }) => ( <
        div className = "relative p-5 rounded-xl overflow-hidden animate-card-pop-in bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg"
        style = {
            { animationDelay: `${(mockOutbreaks.length + index) * 150}ms` } } >
        <
        div className = { `absolute inset-0 bg-gradient-to-br from-${color}-400 to-${color}-600 opacity-10 dark:opacity-20` } > < /div> <
        div className = "flex items-center relative" >
        <
        div className = { `flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-${color}-400 to-${color}-600 text-white flex items-center justify-center shadow-lg` } >
        <
        Icon className = "h-6 w-6" / >
        <
        /div> <
        div className = "ml-4" >
        <
        h4 className = "font-semibold text-gray-900 dark:text-white" > { t(titleKey) } < /h4> <
        p className = "text-sm text-gray-600 dark:text-gray-400" > { t(descKey) } < /p> <
        /div> <
        /div> <
        /div>
    );

    return ( <
        div className = "max-w-7xl mx-auto px-4 py-6" >
        <
        h2 className = "text-2xl font-bold text-gray-900 dark:text-white mb-6" > { t('alertsTitle') } < /h2> <
        div className = "space-y-6" > {
            mockOutbreaks.map((outbreak, index) => ( <
                AlertCard key = { outbreak.id }
                outbreak = { outbreak }
                index = { index }
                />
            ))
        } <
        /div> <
        div className = "mt-10" >
        <
        h3 className = "text-xl font-semibold text-gray-900 dark:text-white mb-4" > { t('vaccinationRemindersTitle') } < /h3> <
        div className = "space-y-4" >
        <
        VaccineCard titleKey = "covidBoosterTitle"
        descKey = "covidBoosterDesc"
        color = "green"
        icon = { Shield }
        index = { 0 }
        /> <
        VaccineCard titleKey = "fluShotTitle"
        descKey = "fluShotDesc"
        color = "blue"
        icon = { Shield }
        index = { 1 }
        /> <
        /div> <
        /div> <
        /div>
    );
};

const Profile = () => {
        const { t, userProfile, saveUserProfile } = useContext(AppContext);
        const [isEditing, setIsEditing] = useState(false);
        const [tempProfile, setTempProfile] = useState(userProfile);
        const [showSuccess, setShowSuccess] = useState(false);

        useEffect(() => {
            setTempProfile(userProfile);
        }, [userProfile]);

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setTempProfile(prev => ({...prev, [name]: value }));
        };

        const handleSave = () => {
            saveUserProfile(tempProfile);
            setIsEditing(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        };

        const ProfileInfoRow = ({ label, value, placeholder }) => ( <
            div >
            <
            dt className = "text-sm font-medium text-gray-500 dark:text-gray-400" > { label } < /dt> <
            dd className = "mt-1 text-sm text-gray-900 dark:text-white" > {
                value || < span className = "text-gray-400 dark:text-gray-500" > { placeholder } < /span>} <
                /dd> <
                /div>
            );

            const EditInfoRow = ({ label, name, value, placeholder }) => ( <
                div >
                <
                label htmlFor = { name }
                className = "block text-sm font-medium text-gray-700 dark:text-gray-300" > { label } <
                /label> <
                input type = "text"
                id = { name }
                name = { name }
                value = { value }
                onChange = { handleInputChange }
                placeholder = { placeholder }
                className = "mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /
                >
                <
                /div>
            );

            return ( <
                div className = "max-w-4xl mx-auto px-4 py-6" >
                <
                div className = "flex justify-between items-center mb-6" >
                <
                h2 className = "text-2xl font-bold text-gray-900 dark:text-white flex items-center" >
                <
                User className = "mr-3 h-6 w-6" / > { t('profileTitle') } <
                /h2> {
                    !isEditing && ( <
                        button onClick = {
                            () => setIsEditing(true) }
                        className = "flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium" >
                        <
                        Edit className = "h-4 w-4 mr-1" / > { t('editProfile') } <
                        /button>
                    )
                } <
                /div>

                {
                    showSuccess && ( <
                        div className = "bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3 mb-4 flex items-center animate-fade-in" >
                        <
                        CheckCircle className = "h-5 w-5 text-green-500 mr-2" / >
                        <
                        p className = "text-sm text-green-700 dark:text-green-200" > { t('profileSaved') } < /p> <
                        /div>
                    )
                }

                <
                div className = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6" > {
                    isEditing ? ( <
                        div className = "space-y-6" >
                        <
                        div >
                        <
                        h3 className = "text-lg font-semibold text-gray-900 dark:text-white mb-4" > { t('personalInfo') } < /h3> <
                        div className = "space-y-4" >
                        <
                        EditInfoRow label = { t('fullName') }
                        name = "name"
                        value = { tempProfile.name }
                        placeholder = { t('fullName') }
                        /> <
                        EditInfoRow label = { t('age') }
                        name = "age"
                        value = { tempProfile.age }
                        placeholder = { t('age') }
                        /> <
                        EditInfoRow label = { t('bloodGroup') }
                        name = "bloodGroup"
                        value = { tempProfile.bloodGroup }
                        placeholder = "e.g., A+, O-" / >
                        <
                        /div> <
                        /div> <
                        div className = "border-t border-gray-200 dark:border-gray-700 pt-6" >
                        <
                        h3 className = "text-lg font-semibold text-gray-900 dark:text-white mb-4" > { t('healthInfo') } < /h3> <
                        div className = "space-y-4" >
                        <
                        EditInfoRow label = { t('allergies') }
                        name = "allergies"
                        value = { tempProfile.allergies }
                        placeholder = { t('none') }
                        /> <
                        EditInfoRow label = { t('chronicConditions') }
                        name = "conditions"
                        value = { tempProfile.conditions }
                        placeholder = { t('egConditions') }
                        /> <
                        /div> <
                        /div> <
                        div className = "flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700" >
                        <
                        button onClick = {
                            () => { setIsEditing(false);
                                setTempProfile(userProfile); } }
                        className = "px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500" >
                        Cancel <
                        /button> <
                        button onClick = { handleSave }
                        className = "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" > { t('saveProfile') } <
                        /button> <
                        /div> <
                        /div>
                    ) : ( <
                        div className = "space-y-6" >
                        <
                        div >
                        <
                        h3 className = "text-lg font-semibold text-gray-900 dark:text-white mb-4" > { t('personalInfo') } < /h3> <
                        dl className = "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6" >
                        <
                        ProfileInfoRow label = { t('fullName') }
                        value = { userProfile.name }
                        placeholder = { t('fullName') }
                        /> <
                        ProfileInfoRow label = { t('age') }
                        value = { userProfile.age }
                        placeholder = { t('age') }
                        /> <
                        ProfileInfoRow label = { t('bloodGroup') }
                        value = { userProfile.bloodGroup }
                        placeholder = "A+, O-, ..." / >
                        <
                        /dl> <
                        /div> <
                        div className = "border-t border-gray-200 dark:border-gray-700 pt-6" >
                        <
                        h3 className = "text-lg font-semibold text-gray-900 dark:text-white mb-4" > { t('healthInfo') } < /h3> <
                        dl className = "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6" >
                        <
                        ProfileInfoRow label = { t('allergies') }
                        value = { userProfile.allergies }
                        placeholder = { t('none') }
                        /> <
                        ProfileInfoRow label = { t('chronicConditions') }
                        value = { userProfile.conditions }
                        placeholder = { t('none') }
                        /> <
                        /dl> <
                        /div> <
                        /div>
                    )
                } <
                /div> <
                /div>
            );
        };

        const Navigation = () => {
            const { currentView, setCurrentView, t } = useContext(AppContext);
            const navItems = [
                { id: 'dashboard', icon: Home, label: t('navHome') },
                { id: 'chatbot', icon: MessageCircle, label: t('navAssistant') },
                { id: 'hospitals', icon: Hospital, label: t('navHospitals') },
                { id: 'alerts', icon: Bell, label: t('navAlerts') },
            ];

            return ( <
                nav className = "fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 z-50" >
                <
                div className = "max-w-md mx-auto px-4" >
                <
                div className = "flex justify-around py-2" > {
                    navItems.map((item) => {
                        const IconComponent = item.icon;
                        return ( <
                            button key = { item.id }
                            onClick = {
                                () => setCurrentView(item.id) }
                            className = { `flex flex-col items-center justify-center py-2 rounded-lg transition-colors w-20 ${currentView === item.id ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'}` } >
                            <
                            IconComponent className = "h-5 w-5 mb-1" / >
                            <
                            span className = "text-xs font-medium" > { item.label } < /span> <
                            /button>
                        );
                    })
                } <
                /div> <
                /div> <
                /nav>
            );
        };

        const FirstAidGuide = () => {
            const { t, language } = useContext(AppContext);
            const [selectedGuide, setSelectedGuide] = useState(null);

            if (selectedGuide) {
                return ( <
                    div className = "max-w-4xl mx-auto px-4 py-6 animate-fade-in" >
                    <
                    button onClick = {
                        () => setSelectedGuide(null) }
                    className = "flex items-center text-sm text-blue-500 hover:underline mb-4" >
                    &
                    larr; Back to all guides <
                    /button> <
                    h2 className = "text-3xl font-bold text-gray-900 dark:text-white mb-4" > { t(selectedGuide.titleKey) } < /h2> <
                    div className = "space-y-4" > {
                        selectedGuide.steps[language].map((step, index) => ( <
                            div key = { index }
                            className = "flex items-start bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-4 rounded-xl shadow-lg animate-card-pop-in"
                            style = {
                                { animationDelay: `${index * 100}ms` } } >
                            <
                            div className = "flex-shrink-0 w-8 h-8 mr-4 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold" > { index + 1 } <
                            /div> <
                            p className = "text-gray-700 dark:text-gray-300" > { step } < /p> <
                            /div>
                        ))
                    } <
                    /div> <
                    /div>
                );
            }

            return ( <
                div className = "max-w-7xl mx-auto px-4 py-6" >
                <
                h2 className = "text-3xl font-bold text-gray-900 dark:text-white mb-6" > { t('firstAidTitle') } < /h2> <
                div className = "grid grid-cols-1 md:grid-cols-2 gap-6" > {
                    mockFirstAidGuides.map((guide, index) => ( <
                        button key = { guide.id }
                        onClick = {
                            () => setSelectedGuide(guide) }
                        className = "text-left group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl animate-card-pop-in"
                        style = {
                            { transitionDelay: `${index * 150}ms` } } >
                        <
                        div className = "p-6" >
                        <
                        h3 className = "text-xl font-semibold text-gray-900 dark:text-white" > { t(guide.titleKey) } < /h3> <
                        /div> <
                        /button>
                    ))
                } <
                /div> <
                /div>
            );
        };

        const AshaWorkerDirectory = () => {
            const { t } = useContext(AppContext);
            const [searchTerm, setSearchTerm] = useState('');

            const filteredWorkers = mockAshaWorkers.filter(worker =>
                worker.village.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return ( <
                div className = "max-w-7xl mx-auto px-4 py-6" >
                <
                h2 className = "text-3xl font-bold text-gray-900 dark:text-white mb-4" > { t('ashaDirectoryTitle') } < /h2> <
                div className = "relative mb-6" >
                <
                input type = "text"
                placeholder = { t('searchByVillage') }
                value = { searchTerm }
                onChange = {
                    (e) => setSearchTerm(e.target.value) }
                className = "w-full pl-10 pr-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 border-0" /
                >
                <
                Search className = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" / >
                <
                /div> <
                div className = "space-y-4" > {
                    filteredWorkers.map((worker, index) => ( <
                        div key = { worker.id }
                        className = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-4 flex items-center justify-between animate-card-pop-in"
                        style = {
                            { animationDelay: `${index * 100}ms` } } >
                        <
                        div >
                        <
                        p className = "font-semibold text-gray-900 dark:text-white" > { worker.name } < /p> <
                        p className = "text-sm text-gray-600 dark:text-gray-400" > { worker.village } < /p> <
                        /div> <
                        a href = { `tel:${worker.phone}` }
                        className = "group flex-shrink-0 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg" >
                        <
                        Phone className = "h-4 w-4 mr-2 transition-transform group-hover:rotate-12" / > { t('callNow') } <
                        /a> <
                        /div>
                    ))
                } <
                /div> <
                /div>
            );
        };


        // Main App Component
        const HealthcareApp = () => {
            const [currentView, setCurrentView] = useState('dashboard');
            const [darkMode, setDarkMode] = useState(false);
            const [language, setLanguage] = useState('en');
            const [isMenuOpen, setIsMenuOpen] = useState(false);
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState(null);
            const [showWelcome, setShowWelcome] = useState(true);
            const [userProfile, setUserProfile] = useState({ name: '', age: '', bloodGroup: '', allergies: '', conditions: '' });

            useEffect(() => {
                try {
                    const savedProfile = localStorage.getItem('sehatMitraProfile');
                    if (savedProfile) {
                        setUserProfile(JSON.parse(savedProfile));
                    }
                } catch (e) {
                    console.error("Failed to parse user profile from localStorage", e);
                    setError("Could not load your saved profile.");
                }
                const welcomeTimer = setTimeout(() => {
                    setShowWelcome(false);
                }, 2500);

                return () => clearTimeout(welcomeTimer);
            }, []);

            const saveUserProfile = (profile) => {
                try {
                    localStorage.setItem('sehatMitraProfile', JSON.stringify(profile));
                    setUserProfile(profile);
                } catch (e) {
                    console.error("Failed to save user profile to localStorage", e);
                    setError("Your profile could not be saved.");
                }
            };

            useEffect(() => {
                if (darkMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }, [darkMode]);

            const t = (key) => {
                return translations[key] ? .[language] || translations[key] ? .['en'] || key;
            };

            const contextValue = { currentView, setCurrentView, darkMode, setDarkMode, language, setLanguage, isMenuOpen, setIsMenuOpen, loading, setLoading, error, setError, t, userProfile, saveUserProfile };

            const renderContent = () => {
                if (error) {
                    return <ErrorMessage message = { error }
                    onRetry = {
                        () => setError(null) }
                    />;
                }
                switch (currentView) {
                    case 'dashboard':
                        return <Dashboard / > ;
                    case 'chatbot':
                        return <Chatbot / > ;
                    case 'hospitals':
                        return <Hospitals / > ;
                    case 'alerts':
                        return <Alerts / > ;
                    case 'profile':
                        return <Profile / > ;
                    case 'firstAid':
                        return <FirstAidGuide / > ;
                    case 'ashaWorkers':
                        return <AshaWorkerDirectory / > ;
                    default:
                        return <Dashboard / > ;
                }
            };

            return ( <
                AppContext.Provider value = { contextValue } >
                <
                AppStyles / > { showWelcome && < WelcomeScreen / > } <
                div className = { `transition-opacity duration-500 ${showWelcome ? "opacity-0" : "opacity-100"}` } >
                <
                div className = "aurora-background" > < /div> <
                div className = "relative bg-gray-50/50 dark:bg-gray-900/50 min-h-screen" >
                <
                Header / >
                <
                main className = "pb-20" > { renderContent() } < /main> <
                Navigation / >
                <
                /div> <
                /div> <
                /AppContext.Provider>
            );
        };

        export default HealthcareApp;