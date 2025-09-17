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

// Mock data (unchanged)
const mockOutbreaks = [
  { 
    id: 1, 
    disease: 'Dengue', 
    cases: 45, 
    area: 'Sector 15', 
    severity: 'high', 
    prevention: 'Remove stagnant water, use mosquito nets' 
  },
  { 
    id: 2, 
    disease: 'Typhoid', 
    cases: 12, 
    area: 'Village Kharkhoda', 
    severity: 'medium', 
    prevention: 'Drink boiled water, maintain hygiene' 
  }
];

const mockHospitals = [
  {
    id: 1,
    name: 'Primary Health Centre',
    address: 'Village Road, Kharkhoda',
    phone: '+91-9876543210',
    isOpen: true,
    distance: '2.5 km',
    doctors: [
      { name: 'Dr. Rajesh Kumar', specialty: 'General Physician', available: true },
      { name: 'Dr. Priya Sharma', specialty: 'Pediatrician', available: false }
    ]
  },
  {
    id: 2,
    name: 'District Hospital',
    address: 'Main Market, Sonipat',
    phone: '+91-9876543211',
    isOpen: true,
    distance: '15.2 km',
    doctors: [
      { name: 'Dr. Amit Singh', specialty: 'Emergency Medicine', available: true },
      { name: 'Dr. Sunita Gupta', specialty: 'Gynecologist', available: true }
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

  // **ADDED: This effect handles the dark mode class on the HTML tag**
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
    setError
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
  const { darkMode, setDarkMode, language, setLanguage } = useContext(AppContext);

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
            {/* **CHANGED: Name updated from HealthSeva to SehatMitra** */}
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">SehatMitra</h1>
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
    <div className={`${bgColor} ${textColor} px-4 py-2 text-center text-sm`}>
      <AlertTriangle className="inline h-4 w-4 mr-1" />
      <span className="font-medium">Alert:</span> {alert.cases} {alert.disease} cases in {alert.area}
      <span className="ml-2 text-xs">• {alert.prevention}</span>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { setCurrentView } = useContext(AppContext);

  const dashboardCards = [
    {
      title: 'Health Assistant',
      description: 'Get instant health advice',
      icon: MessageCircle,
      color: 'bg-blue-500',
      view: 'chatbot'
    },
    {
      title: 'Find Hospitals',
      description: 'Locate nearby healthcare',
      icon: Hospital,
      color: 'bg-green-500',
      view: 'hospitals'
    },
    {
      title: 'Health Alerts',
      description: 'Stay updated on outbreaks',
      icon: Bell,
      color: 'bg-orange-500',
      view: 'alerts'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        {/* **CHANGED: Name updated for consistency** */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to SehatMitra
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your trusted healthcare companion for rural India
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
                <div className={`inline-flex items-center justify-center w-12 h-12 ${card.color} text-white rounded-lg mb-4`}>
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

// (The rest of the components: EmergencyServices, HealthTips, Chatbot, Hospitals, Alerts, Navigation remain unchanged)
// ... all other components from your original file go here ...

// Emergency Services Component
const EmergencyServices = () => {
    const emergencyNumbers = [
      { name: 'Ambulance', number: '108', color: 'bg-red-500', icon: Phone },
      { name: 'Police', number: '112', color: 'bg-blue-500', icon: Shield },
      { name: 'Health Helpline', number: '104', color: 'bg-green-500', icon: Heart }
    ];
  
    const callEmergency = (number) => {
      window.location.href = `tel:${number}`;
    };
  
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          Emergency Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {emergencyNumbers.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <button
                key={index}
                onClick={() => callEmergency(service.number)}
                className={`${service.color} hover:opacity-90 text-white rounded-lg p-4 flex items-center justify-center space-x-2 transition-all duration-200 font-semibold`}
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
    const tips = [
      "Drink at least 8 glasses of clean water daily",
      "Wash hands frequently with soap for 20 seconds",
      "Get adequate sleep (7-8 hours) every night",
      "Exercise regularly, even if it's just walking"
    ];
  
    return (
      <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Daily Health Tips
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
    const [messages, setMessages] = useState([
      {
        type: 'bot',
        content: 'Namaste! I am your health assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { language } = useContext(AppContext);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const generateBotResponse = (userMessage) => {
      const lowerMessage = userMessage.toLowerCase();
      
      // Check for FAQ matches
      for (const faq of mockFAQs) {
        if (lowerMessage.includes(faq.category) || 
            lowerMessage.includes(faq.question.toLowerCase().split(' ')[0])) {
          return faq.answer;
        }
      }
  
      // Symptom checker responses
      if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
        return 'For fever symptoms: Rest in a cool place, drink plenty of fluids, use cold compress on forehead. Monitor temperature regularly. If fever exceeds 101°F or persists for more than 3 days, please consult a healthcare professional immediately.';
      }
      
      if (lowerMessage.includes('cough') || lowerMessage.includes('cold')) {
        return 'For cough and cold: Stay hydrated, get adequate rest, use steam inhalation, consume warm liquids like herbal tea. Avoid cold foods. If symptoms worsen or persist beyond a week, seek medical attention.';
      }
  
      if (lowerMessage.includes('stomach') || lowerMessage.includes('diarrhea')) {
        return 'For stomach issues: Stay hydrated with ORS solution, eat light foods like rice and bananas, avoid spicy and oily foods. If symptoms include severe dehydration, blood in stool, or persist for more than 2 days, consult a doctor.';
      }
  
      // Default response
      return 'I understand you need health guidance. For specific symptoms, I can provide preventive care tips. However, for accurate diagnosis and treatment, please consult with a qualified healthcare professional. You can find nearby hospitals using our hospital locator.';
    };
  
    const sendMessage = async () => {
      if (!inputMessage.trim()) return;
  
      const userMessage = {
        type: 'user',
        content: inputMessage,
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, userMessage]);
      const currentInput = inputMessage;
      setInputMessage('');
      setIsLoading(true);
  
      // Simulate API delay
      setTimeout(() => {
        const botResponse = {
          type: 'bot',
          content: generateBotResponse(currentInput),
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
        
        // Play response if supported
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
      if (e.key === 'Enter') {
        sendMessage();
      }
    };
  
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Assistant</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered health guidance</p>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
              Online
            </div>
          </div>
        </div>
  
        {/* Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Medical Disclaimer:</strong> This chatbot provides general health information only. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment.
            </div>
          </div>
        </div>
  
        {/* Messages Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  {message.type === 'bot' && (
                    <button
                      onClick={() => speakMessage(message.content)}
                      className="mt-2 text-xs text-blue-500 hover:text-blue-600 flex items-center"
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      Listen
                    </button>
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
  
          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-600 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your health question..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button
                onClick={startVoiceInput}
                disabled={isListening}
                className={`p-2 rounded-lg ${isListening 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                } text-gray-700 dark:text-gray-300`}
              >
                <Mic className="h-5 w-5" />
              </button>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
    const [loading, setLoading] = useState(true);
    const [hospitals, setHospitals] = useState([]);
  
    useEffect(() => {
      // Simulate API call
      setTimeout(() => {
        setHospitals(mockHospitals);
        setLoading(false);
      }, 1500);
    }, []);
  
    if (loading) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nearby Hospitals</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <SkeletonLoader />
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nearby Hospitals</h2>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Based on your location</span>
          </div>
        </div>
  
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{hospital.distance} away</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      hospital.isOpen 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {hospital.isOpen ? 'Open' : 'Closed'}
                    </div>
                  </div>
                </div>
  
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Available Doctors:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {hospital.doctors.map((doctor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{doctor.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          doctor.available ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div className="flex space-x-3">
                  <button 
                    onClick={() => window.location.href = `tel:${hospital.phone}`}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Hospital
                  </button>
                  <button className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Alerts Component
  const Alerts = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Health Alerts</h2>
        
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
                      {outbreak.disease} Outbreak Alert
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      outbreak.severity === 'high' 
                        ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                        : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                    }`}>
                      {outbreak.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className={`mb-3 ${
                    outbreak.severity === 'high' 
                      ? 'text-red-700 dark:text-red-300' 
                      : 'text-yellow-700 dark:text-yellow-300'
                  }`}>
                    <p className="font-medium">{outbreak.cases} confirmed cases in {outbreak.area}</p>
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
                      Prevention Measures:
                    </h4>
                    <p className={`text-sm ${
                      outbreak.severity === 'high' 
                        ? 'text-red-700 dark:text-red-300' 
                        : 'text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {outbreak.prevention}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                      Learn More
                    </button>
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 text-sm">
                      Share Alert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Vaccination Reminders */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Vaccination Reminders</h3>
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                  COVID-19 Booster Due
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  It&apos;s time for your COVID-19 booster shot. Visit your nearest vaccination center.
                </p>
                <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Navigation Component
  const Navigation = () => {
    const { currentView, setCurrentView } = useContext(AppContext);
  
    const navItems = [
      { id: 'dashboard', icon: Home, label: 'Home' },
      { id: 'chatbot', icon: MessageCircle, label: 'Assistant' },
      { id: 'hospitals', icon: Hospital, label: 'Hospitals' },
      { id: 'alerts', icon: Bell, label: 'Alerts' }
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