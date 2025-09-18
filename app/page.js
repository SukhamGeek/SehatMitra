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
  Edit
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
  navProfile: { en: 'Profile', hi: 'प्रोफ़ाइल', pa: 'ਪ੍ਰੋਫਾਈਲ' },
  chatbotInitialGreeting: { en: 'Sat Sri Akaal! I\'m SehatMitra, your personal health friend, here to help you feel your best. What\'s on your mind today?', hi: 'नमस्ते! मैं सेहतमित्र हूँ, आपका व्यक्तिगत स्वास्थ्य मित्र, जो आपको सर्वश्रेष्ठ महसूस कराने में मदद करने के लिए यहाँ है। आज आपके मन में क्या है?', pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਸਿਹਤਮਿੱਤਰ ਹਾਂ, ਤੁਹਾਡਾ ਨਿੱਜੀ ਸਿਹਤ ਮਿੱਤਰ, ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਮਹਿਸੂਸ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ। ਅੱਜ ਤੁਹਾਡੇ ਮਨ ਵਿੱਚ ਕੀ ਹੈ?' },
  chatbotHeaderTitle: { en: 'Health Assistant', hi: 'स्वास्थ्य सहायक', pa: 'ਸਿਹਤ ਸਹਾਇਕ' },
  chatbotHeaderSubtitle: { en: 'Your friendly health companion', hi: 'आपका मैत्रीपूर्ण स्वास्थ्य साथी', pa: 'ਤੁਹਾਡਾ ਦੋਸਤਾਨਾ ਸਿਹਤ ਸਾਥੀ' },
  chatbotDisclaimer: { en: '<strong>A friendly reminder:</strong> I provide general health information only. Please always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.', hi: '<strong>एक महत्वपूर्ण अनुस्मारक:</strong> मैं केवल सामान्य स्वास्थ्य जानकारी प्रदान करता हूँ। कृपया चिकित्सा सलाह, निदान या उपचार के लिए हमेशा एक योग्य स्वास्थ्य पेशेवर से परामर्श करें।', pa: '<strong>ਇੱਕ ਦੋਸਤਾਨਾ ਯਾਦ-ਦਹਾਨੀ:</strong> ਮੈਂ ਸਿਰਫ ਆਮ ਸਿਹਤ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰੀ ਸਲਾਹ, ਨਿਦਾਨ, ਜਾਂ ਇਲਾਜ ਲਈ ਹਮੇਸ਼ਾਂ ਇੱਕ ਯੋਗ ਸਿਹਤ ਸੰਭਾਲ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।' },
  chatbotInputPlaceholder: { en: 'Ask me anything about your health...', hi: 'अपने स्वास्थ्य के बारे में कुछ भी पूछें...', pa: 'ਆਪਣੀ ਸਿਹਤ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...' },
  empathyFever: { en: "Oh no, dealing with a fever is no fun at all. I'm sorry to hear that. Here are some things that might help you feel a bit more comfortable:", hi: "ओह नहीं, बुखार से निपटना बिल्कुल भी अच्छा नहीं लगता। मुझे यह सुनकर दुख हुआ। यहाँ कुछ चीजें हैं जो आपको थोड़ा और आरामदायक महसूस करने में मदद कर सकती हैं:", pa: "ਓ ਨਹੀਂ, ਬੁਖਾਰ ਨਾਲ ਨਜਿੱਠਣਾ ਬਿਲਕੁਲ ਵੀ ਮਜ਼ੇਦਾਰ ਨਹੀਂ ਹੈ। ਮੈਨੂੰ ਇਹ ਸੁਣ ਕੇ ਅਫ਼ਸੋਸ ਹੋਇਆ। ਇੱਥੇ ਕੁਝ ਚੀਜ਼ਾਂ ਹਨ ਜੋ ਤੁਹਾਨੂੰ ਥੋੜ੍ਹਾ ਹੋਰ ਅਰਾਮਦਾਇਕ ਮਹਿਸੂਸ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੀਆਂ ਹਨ:" },
  empathyCough: { en: "I'm sorry you're dealing with a cough and cold. Let's see what we can do to help you feel better:", hi: "मुझे खेद है कि आप खांसी और जुकाम से जूझ रहे हैं। आइए देखें कि हम आपको बेहतर महसूस कराने के लिए क्या कर सकते हैं:", pa: "ਮੈਨੂੰ ਅਫ਼ਸੋਸ ਹੈ ਕਿ ਤੁਸੀਂ ਖੰਘ ਅਤੇ ਜ਼ੁਕਾਮ ਨਾਲ ਜੂਝ ਰਹੇ ਹੋ। ਆਓ ਦੇਖੀਏ ਕਿ ਅਸੀਂ ਤੁਹਾਨੂੰ ਬਿਹਤਰ ਮਹਿਸੂਸ ਕਰਾਉਣ ਲਈ ਕੀ ਕਰ ਸਕਦੇ ਹਾਂ:" },
  empathyStomach: { en: "Stomach issues are the worst, I'm sorry you're going through that. Taking gentle care of your system is key right now. Here's what's often recommended:", hi: "पेट की समस्याएँ सबसे खराब होती हैं, मुझे खेद है कि आप इससे गुजर रहे हैं। इस समय अपने सिस्टम की कोमल देखभाल करना महत्वपूर्ण है। यहाँ अक्सर यह सलाह दी जाती है:", pa: "ਪੇਟ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਸਭ ਤੋਂ ਭੈੜੀਆਂ ਹੁੰਦੀਆਂ ਹਨ, ਮੈਨੂੰ ਅਫ਼ਸੋਸ ਹੈ ਕਿ ਤੁਸੀਂ ਇਸ ਵਿੱਚੋਂ ਲੰਘ ਰਹੇ ਹੋ। ਇਸ ਸਮੇਂ ਆਪਣੇ ਸਿਸਟਮ ਦੀ ਕੋਮਲ ਦੇਖਭਾਲ ਕਰਨਾ ਮਹੱਤਵਪੂਰਨ ਹੈ। ਇੱਥੇ ਅਕਸਰ ਇਹ ਸਲਾਹ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ:" },
  defaultResponse: { en: "I'm here to help with general health questions and tips! While I'm not a doctor, I'm a great listener. Tell me your health concern, and I'll do my best to guide you. Remember, you can always find a real doctor in the 'Hospitals' section. Your well-being is what's most important!", hi: "मैं सामान्य स्वास्थ्य प्रश्नों और सुझावों में मदद करने के लिए यहाँ हूँ! हालांकि मैं डॉक्टर नहीं हूँ, पर मैं एक अच्छा श्रोता हूँ। मुझे अपनी स्वास्थ्य चिंता बताएं, और मैं आपका मार्गदर्शन करने की पूरी कोशिश करूंगा। याद रखें, आप 'अस्पताल' अनुभाग में हमेशा एक वास्तविक डॉक्टर ढूंढ सकते हैं। आपका स्वास्थ्य सबसे महत्वपूर्ण है!", pa: "ਮੈਂ ਆਮ ਸਿਹਤ ਸੰਬੰਧੀ ਸਵਾਲਾਂ ਅਤੇ ਸੁਝਾਵਾਂ ਵਿੱਚ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ! ਭਾਵੇਂ ਮੈਂ ਡਾਕਟਰ ਨਹੀਂ ਹਾਂ, ਪਰ ਮੈਂ ਇੱਕ ਵਧੀਆ ਸੁਣਨ ਵਾਲਾ ਹਾਂ। ਮੈਨੂੰ ਆਪਣੀ ਸਿਹਤ ਸੰਬੰਧੀ ਚਿੰਤਾ ਦੱਸੋ, ਅਤੇ ਮੈਂ ਤੁਹਾਡੀ ਅਗਵਾਈ ਕਰਨ ਦੀ ਪੂਰੀ ਕੋਸ਼ਿਸ਼ ਕਰਾਂਗਾ। ਯਾਦ ਰੱਖੋ, ਤੁਸੀਂ 'ਹਸਪਤਾਲ' ਭਾਗ ਵਿੱਚ ਹਮੇਸ਼ਾਂ ਇੱਕ ਅਸਲ ਡਾਕਟਰ ਲੱਭ ਸਕਦੇ ਹੋ। ਤੁਹਾਡੀ ਤੰਦਰੁਸਤੀ ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਹੈ!" },
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

// SehatMitra Logo Component
const SehatMitraLogo = ({ className }) => (
  <img 
    src="data:image/jpeg;base64,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"
    alt="SehatMitra Logo" 
    className={className} 
  />
);

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

  // User Profile State - RESTORED
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    allergies: '',
    conditions: ''
  });

  // Load profile from localStorage on initial render
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('sehatMitraProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    } catch (e) {
      console.error("Failed to parse user profile from localStorage", e);
    }
  }, []);

  // Save profile to localStorage whenever it changes
  const saveUserProfile = (profile) => {
    try {
      localStorage.setItem('sehatMitraProfile', JSON.stringify(profile));
      setUserProfile(profile);
    } catch (e) {
      console.error("Failed to save user profile to localStorage", e);
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
    t,
    userProfile,
    saveUserProfile
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
          {currentView === 'profile' && <Profile />}
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
            <SehatMitraLogo className="h-8 w-8 rounded-full mr-2" />
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
    }, [language]);

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
        return ${t('empathyFever')} ${mockFAQs.find(f => f.category === 'fever').answer};
      }
      
      if (lowerMessage.includes('cough') || lowerMessage.includes('cold')) {
        return ${t('empathyCough')} For cough and cold: Stay hydrated, get adequate rest, use steam inhalation, consume warm liquids like herbal tea. Avoid cold foods. If symptoms worsen or persist beyond a week, seek medical attention.;
      }
      
      if (lowerMessage.includes('stomach') || lowerMessage.includes('diarrhea')) {
        return ${t('empathyStomach')} For stomach issues: Stay hydrated with ORS solution, eat light foods like rice and bananas, avoid spicy and oily foods. If symptoms include severe dehydration, blood in stool, or persist for more than 2 days, consult a doctor.;
      }
      
      return t('defaultResponse');
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

  // Profile Component - RESTORED
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
      setTempProfile(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSave = () => {
      saveUserProfile(tempProfile);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    };
  
    const ProfileInfoRow = ({ label, value, placeholder }) => (
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{value || <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>}</dd>
      </div>
    );
  
    const EditInfoRow = ({ label, name, value, placeholder }) => (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    );
  
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <User className="mr-3 h-6 w-6"/> {t('profileTitle')}
          </h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium">
              <Edit className="h-4 w-4 mr-1" /> {t('editProfile')}
            </button>
          )}
        </div>
  
        {showSuccess && (
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-sm text-green-700 dark:text-green-200">{t('profileSaved')}</p>
          </div>
        )}
  
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('personalInfo')}</h3>
                <div className="space-y-4">
                  <EditInfoRow label={t('fullName')} name="name" value={tempProfile.name} placeholder={t('fullName')} />
                  <EditInfoRow label={t('age')} name="age" value={tempProfile.age} placeholder={t('age')} />
                  <EditInfoRow label={t('bloodGroup')} name="bloodGroup" value={tempProfile.bloodGroup} placeholder="e.g., A+, O-" />
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('healthInfo')}</h3>
                <div className="space-y-4">
                  <EditInfoRow label={t('allergies')} name="allergies" value={tempProfile.allergies} placeholder={t('none')} />
                  <EditInfoRow label={t('chronicConditions')} name="conditions" value={tempProfile.conditions} placeholder={t('egConditions')} />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => { setIsEditing(false); setTempProfile(userProfile); }} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  {t('saveProfile')}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
               <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('personalInfo')}</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <ProfileInfoRow label={t('fullName')} value={userProfile.name} placeholder={t('fullName')} />
                  <ProfileInfoRow label={t('age')} value={userProfile.age} placeholder={t('age')} />
                  <ProfileInfoRow label={t('bloodGroup')} value={userProfile.bloodGroup} placeholder="A+, O-, ..." />
                </dl>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('healthInfo')}</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <ProfileInfoRow label={t('allergies')} value={userProfile.allergies} placeholder={t('none')} />
                  <ProfileInfoRow label={t('chronicConditions')} value={userProfile.conditions} placeholder={t('none')} />
                </dl>
              </div>
            </div>
          )}
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
      { id: 'alerts', icon: Bell, label: t('navAlerts') },
      { id: 'profile', icon: User, label: t('navProfile') }
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
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors w-16 ${
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