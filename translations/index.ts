export const supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
    { code: 'bho', name: 'भोजपुरी' },
];

export type Language = typeof supportedLanguages[number]['code'];

const translations: { [key in Language]?: any } = {
  en: {
    header: {
      title: "Kisan Saathi"
    },
    login: {
      title: "Kisan Saathi",
      subtitle: "Your AI Farming Assistant",
      usernamePlaceholder: "Username / Email",
      passwordPlaceholder: "Password",
      loginAsFarmer: "Login as Farmer",
      loginAsAdmin: "Login as Admin",
      createAccountPrompt: "Don't have an account?",
      createAccountLink: "Create New Account",
      signupSuccess: "Account created successfully! Please log in.",
      invalidCredentialsError: "Invalid Username or Password."
    },
    signup: {
        title: "Create Farmer Account",
        subtitle: "Provide your details to get personalized advice.",
        fullName: "Full Name",
        phoneNumber: "Phone Number",
        villageDistrict: "Village / District",
        landSize: "Land Size (in acres)",
        soilType: "Soil Type",
        selectSoilType: "Select Soil Type",
        irrigationSource: "Primary Irrigation Source",
        selectIrrigationSource: "Select Irrigation Source",
        lastSeasonCrops: "Crops Grown Last Season",
        lastSeasonCropsPlaceholder: "e.g., Wheat, Soybean",
        preferredLanguage: "Preferred Language",
        username: "Username",
        password: "Password",
        createAccountButton: "Create Account",
        creatingAccount: "Creating Account...",
        loginPrompt: "Already have an account?",
        loginLink: "Login Here",
        genericError: "An unexpected error occurred. Please try again.",
        usernameExistsError: "This username is already taken."
    },
    dashboard: {
      speakPrompt: "Speak: Crop, fertilizer or pest?",
      cropAdvice: "Crop Advice",
      pestAdvice: "Pest/Fertilizer Advice",
      weatherUpdate: "Weather Update",
      marketPrices: "Market Prices",
      govtSchemes: "Govt. Schemes",
      myAllocations: "My Allocations",
      outbreakAlertTitle: "Pest Outbreak Alert"
    },
    cropRecommender: {
      title: "Crop Recommendation",
      formTitle: "Fill Your Farm's Details",
      soilType: "Soil Type",
      waterAvailability: "Water Availability",
      season: "Season",
      previousCrop: "Previous Crop (Optional)",
      previousCropPlaceholder: "e.g., Wheat, Rice",
      getRecommendations: "Get Recommendations",
      generating: "Generating...",
      topRecommendations: "Top Recommendations",
      iotTitle: "Live Farm Data",
      connectSensor: "Connect Soil Sensor",
      connecting: "Connecting to sensor...",
      sensorConnected: "Sensor Connected",
      ph: "Soil pH",
      moisture: "Moisture",
      temperature: "Temperature",
      fertilizerAdvice: "Fertilizer Advice",
      irrigationAdvice: "Irrigation Alert",
      irrigationFertilizerTitle: "Irrigation & Fertilizer",
      waterPump: "Water Pump",
      moistureLowAdvisory: "Moisture is low. Irrigation needed.",
      moistureOkAdvisory: "Moisture level is adequate.",
      nutrientStatus: "Nutrient Status",
      nitrogenStatus: "Nitrogen (N)",
      phosphorusStatus: "Phosphorus (P)",
      potassiumStatus: "Potassium (K)",
      considerUrea: "Consider applying Urea.",
      considerDAP: "Consider applying DAP.",
      considerMOP: "Consider applying MOP.",
      weatherAdvisoryTitle: "Weather Advisory",
      weatherRainAdvisory: "Rain is forecast for tomorrow. Consider delaying irrigation.",
      weatherHotAdvisory: "High temperatures detected. Ensure crops are adequately irrigated."
    },
    pestAdvisory: {
        title: "Pest & Disease Detection",
        uploadTitle: "Upload Leaf Image",
        uploadPrompt: "Tap to upload image",
        uploadFormats: "PNG, JPG, WEBP",
        analyze: "Analyze Image",
        analyzing: "Analyzing...",
        analysisResult: "Analysis Result",
        confidence: "Confidence",
        description: "Description",
        recommendedAction: "Recommended Action",
        preventiveMeasures: "Preventive Measures",
        healthy: "Healthy"
    },
    weather: {
      title: "Weather Forecast",
      forecastTitle: "3-Day Forecast",
      today: "Today",
      aiAdvisoryTitle: "AI Farming Advisory",
      generatingAdvisory: "Generating advice...",
      fetching: "Fetching your local weather...",
      error: {
        title: "Could not load weather",
        message: "An unexpected error occurred."
      }
    },
    market: {
      title: "Market Prices",
      crop: "Crop",
      region: "Region",
      pricePerQuintal: "per Quintal",
      priceTrend: "Price Trend",
      predictTitle: "Future Price Forecast",
      predictButton: "Predict Future Prices",
      predicting: "Predicting...",
      predictionFor7Days: "Next 7 Days",
      predictionFor30Days: "Next 30 Days",
      analystReasoning: "Analyst's Reasoning",
      fetching: "Fetching market data...",
      regenerate: "Regenerate",
      error: {
        title: "Could not load market data",
        message: "An unexpected error occurred."
      }
    },
    schemes: {
        title: "Government Schemes",
        welfareSchemes: "Farmer Welfare Schemes",
        eligibility: "Eligibility",
        benefits: "Benefits",
        applyHere: "Apply Here",
        loading: "Loading Schemes...",
        error: "Could not load government schemes. Please try again later."
    },
    allocations: {
        title: "My Allocations",
        description: "This section displays your government-assigned allocations for seeds, fertilizers, and other benefits.",
        allocated: "Allocated",
        pending: "Pending",
        delivered: "Delivered",
        fetching: "Fetching your allocations...",
        error: "Could not load allocations."
    },
    profile: {
        title: "Profile & Settings",
        fullName: "Full Name",
        phone: "Phone",
        location: "Location",
        editProfile: "Edit Profile",
        farmInfo: "Farm Information",
        update: "Update",
        soilType: "Soil Type",
        primaryCrops: "Primary Crops",
        language: "Language",
        notifications: "Notifications",
        logout: "Logout",
        smsAlerts: "SMS Alerts",
        smsDescription: "Get important alerts (e.g., pest outbreaks, scheme updates) via SMS on a basic phone.",
        phoneNumberPlaceholder: "Enter 10-digit mobile number",
        subscribe: "Subscribe",
        subscribeSuccess: "Successfully subscribed to SMS alerts!",
        invalidPhoneNumberError: "Please enter a valid 10-digit mobile number.",
        adminPanel: "Admin Panel"
    },
    chatbot: {
        title: "Krishi Mitra AI Assistant",
        greeting: "Hello! I am Krishi Mitra, your AI farming assistant. How can I help you today?",
        placeholder: "Type or press mic to talk...",
        error: "Sorry, I am having trouble connecting. Please try again later.",
        ariaClose: "Close Chat",
        ariaReadAloud: "Read message aloud"
    },
    admin: {
        title: "Admin Panel",
        farmerManagement: "Farmer Management",
        viewAll: "View All",
        schemeControl: "Schemes & Allocations",
        addNewScheme: "Add New Scheme",
        outbreakAlerts: "Pest Outbreak Monitoring",
        noActiveAlerts: "No active outbreaks reported.",
        reportsAndAnalytics: "Reports & Analytics",
        cropPopularity: "Crop Popularity",
        pestReports: "Pest Reports (Last 30 Days)",
        exportCSV: "Export as CSV",
        actionDisabled: "This action is disabled in the demo.",
        iotTitle: "IoT Device Monitoring",
        iotOverride: "Override Irrigation",
        iotTrends: "Sensor Trends (Last 24h)"
    }
  },
  hi: {
    header: {
      title: "किसान साथी"
    },
    login: {
      title: "किसान साथी",
      subtitle: "आपका AI कृषि सहायक",
      usernamePlaceholder: "उपयोगकर्ता नाम / ईमेल",
      passwordPlaceholder: "पासवर्ड",
      loginAsFarmer: "किसान के रूप में लॉगिन करें",
      loginAsAdmin: "एडमिन के रूप में लॉगिन करें",
      createAccountPrompt: "खाता नहीं है?",
      createAccountLink: "नया खाता बनाएं",
      signupSuccess: "खाता सफलतापूर्वक बन गया! कृपया लॉगिन करें।",
      invalidCredentialsError: "अमान्य उपयोगकर्ता नाम या पासवर्ड।"
    },
    signup: {
        title: "किसान खाता बनाएं",
        subtitle: "व्यक्तिगत सलाह पाने के लिए अपना विवरण प्रदान करें।",
        fullName: "पूरा नाम",
        phoneNumber: "फ़ोन नंबर",
        villageDistrict: "गाँव / जिला",
        landSize: "भूमि का आकार (एकड़ में)",
        soilType: "मिट्टी का प्रकार",
        selectSoilType: "मिट्टी का प्रकार चुनें",
        irrigationSource: "प्राथमिक सिंचाई स्रोत",
        selectIrrigationSource: "सिंचाई स्रोत चुनें",
        lastSeasonCrops: "पिछली सीज़न में उगाई गई फसलें",
        lastSeasonCropsPlaceholder: "जैसे, गेहूँ, सोयाबीन",
        preferredLanguage: "पसंदीदा भाषा",
        username: "उपयोगकर्ता नाम",
        password: "पासवर्ड",
        createAccountButton: "खाता बनाएं",
        creatingAccount: "खाता बनाया जा रहा है...",
        loginPrompt: "पहले से ही एक खाता है?",
        loginLink: "यहां लॉगिन करें",
        genericError: "एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।",
        usernameExistsError: "यह उपयोगकर्ता नाम पहले से ही मौजूद है।"
    },
    dashboard: {
      speakPrompt: "बोलें: फसल, खाद या दवा?",
      cropAdvice: "फसल सलाह",
      pestAdvice: "रोग/खाद सलाह",
      weatherUpdate: "मौसम अपडेट",
      marketPrices: "बाजार भाव",
      govtSchemes: "शासकीय योजनाएं",
      myAllocations: "मेरा आवंटन",
      outbreakAlertTitle: "कीट प्रकोप चेतावनी"
    },
    cropRecommender: {
      title: "फसल सुझाव",
      formTitle: "अपने खेत का विवरण भरें",
      soilType: "मिट्टी का प्रकार",
      waterAvailability: "पानी की उपलब्धता",
      season: "मौसम",
      previousCrop: "पिछली फसल (वैकल्पिक)",
      previousCropPlaceholder: "जैसे, गेहूं, चावल",
      getRecommendations: "सुझाव प्राप्त करें",
      generating: "बनाया जा रहा है...",
      topRecommendations: "शीर्ष सुझाव",
      iotTitle: "लाइव फार्म डेटा",
      connectSensor: "मिट्टी सेंसर कनेक्ट करें",
      connecting: "सेंसर से कनेक्ट हो रहा है...",
      sensorConnected: "सेंसर कनेक्टेड",
      ph: "मिट्टी का पीएच",
      moisture: "नमी",
      temperature: "तापमान",
      fertilizerAdvice: "उर्वरक सलाह",
      irrigationAdvice: "सिंचाई चेतावनी",
      irrigationFertilizerTitle: "सिंचाई और उर्वरक",
      waterPump: "पानी का पंप",
      moistureLowAdvisory: "नमी कम है। सिंचाई की आवश्यकता है।",
      moistureOkAdvisory: "नमी का स्तर पर्याप्त है।",
      nutrientStatus: "पोषक तत्व की स्थिति",
      nitrogenStatus: "नाइट्रोजन (एन)",
      phosphorusStatus: "फास्फोरस (पी)",
      potassiumStatus: "पोटेशियम (के)",
      considerUrea: "यूरिया डालने पर विचार करें।",
      considerDAP: "डीएपी डालने पर विचार करें।",
      considerMOP: "एमओपी डालने पर विचार करें।",
      weatherAdvisoryTitle: "मौसम सलाह",
      weatherRainAdvisory: "कल बारिश का अनुमान है। सिंचाई में देरी करने पर विचार करें।",
      weatherHotAdvisory: "उच्च तापमान का पता चला। सुनिश्चित करें कि फसलों की पर्याप्त सिंचाई हो।"
    },
    pestAdvisory: {
        title: "कीट और रोग पहचान",
        uploadTitle: "पत्ती का चित्र अपलोड करें",
        uploadPrompt: "छवि अपलोड करने के लिए टैप करें",
        uploadFormats: "पीएनजी, जेपीजी, वेबपी",
        analyze: "चित्र का विश्लेषण करें",
        analyzing: "विश्लेषण हो रहा है...",
        analysisResult: "विश्लेषण परिणाम",
        confidence: "आत्मविश्वास",
        description: "विवरण",
        recommendedAction: "अनुशंसित कार्रवाई",
        preventiveMeasures: "निवारक उपाय",
        healthy: "स्वस्थ"
    },
    weather: {
      title: "मौसम पूर्वानुमान",
      forecastTitle: "3-दिन का पूर्वानुमान",
      today: "आज",
      aiAdvisoryTitle: "एआई कृषि सलाह",
      generatingAdvisory: "सलाह बनायी जा रही है...",
      fetching: "आपका स्थानीय मौसम प्राप्त हो रहा है...",
      error: {
        title: "मौसम लोड नहीं हो सका",
        message: "एक अप्रत्याशित त्रुटि हुई।"
      }
    },
    market: {
      title: "बाजार मूल्य",
      crop: "फसल",
      region: "क्षेत्र",
      pricePerQuintal: "प्रति क्विंटल",
      priceTrend: "मूल्य की प्रवृत्ति",
      predictTitle: "भविष्य का मूल्य पूर्वानुमान",
      predictButton: "भविष्य के मूल्यों का अनुमान लगाएं",
      predicting: "अनुमान लगाया जा रहा है...",
      predictionFor7Days: "अगले 7 दिन",
      predictionFor30Days: "अगले 30 दिन",
      analystReasoning: "विश्लेषक का तर्क",
      fetching: "बाजार डेटा प्राप्त हो रहा है...",
      regenerate: "पुनः उत्पन्न करें",
      error: {
        title: "बाजार डेटा लोड नहीं हो सका",
        message: "एक अप्रत्याशशित त्रुटि हुई।"
      }
    },
    schemes: {
        title: "सरकारी योजनाएं",
        welfareSchemes: "किसान कल्याण योजनाएं",
        eligibility: "पात्रता",
        benefits: "लाभ",
        applyHere: "यहां आवेदन करें",
        loading: "योजनाएं लोड हो रही हैं...",
        error: "सरकारी योजनाएं लोड नहीं हो सकीं। कृपया बाद में पुनः प्रयास करें।"
    },
    allocations: {
        title: "मेरे आवंटन",
        description: "यह अनुभाग बीज, उर्वरक और अन्य लाभों के लिए आपके सरकार द्वारा सौंपे गए आवंटन को प्रदर्शित करता है।",
        allocated: "आवंटित",
        pending: "लंबित",
        delivered: "पहुंचा दिया गया",
        fetching: "आपके आवंटन प्राप्त हो रहे हैं...",
        error: "आवंटन लोड नहीं हो सका।"
    },
    profile: {
        title: "प्रोफ़ाइल और सेटिंग्स",
        fullName: "पूरा नाम",
        phone: "फ़ोन",
        location: "स्थान",
        editProfile: "प्रोफ़ाइल संपादित करें",
        farmInfo: "खेत की जानकारी",
        update: "अपडेट करें",
        soilType: "मिट्टी का प्रकार",
        primaryCrops: "मुख्य फसलें",
        language: "भाषा",
        notifications: "सूचनाएं",
        logout: "लॉग आउट",
        smsAlerts: "एसएमएस अलर्ट",
        smsDescription: "साधारण फोन पर एसएमएस के माध्यम से महत्वपूर्ण अलर्ट (जैसे, कीट प्रकोप, योजना अपडेट) प्राप्त करें।",
        phoneNumberPlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
        subscribe: "सब्सक्राइब करें",
        subscribeSuccess: "एसएमएस अलर्ट के लिए सफलतापूर्वक सदस्यता ली गई!",
        invalidPhoneNumberError: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें.",
        adminPanel: "एडमिन पैनल"
    },
    chatbot: {
        title: "कृषि मित्र एआई सहायक",
        greeting: "नमस्ते! मैं कृषि मित्र हूं, आपका AI कृषि सहायक। मैं आज आपकी कैसे मदद कर सकता हूं?",
        placeholder: "टाइप करें या बोलने के लिए माइक दबाएं...",
        error: "क्षमा करें, मुझे कनेक्ट होने में समस्या हो रही है। कृपया बाद में पुन: प्रयास करें।",
        ariaClose: "चैट बंद करें",
        ariaReadAloud: "संदेश जोर से पढ़ें"
    },
    admin: {
        title: "एडमिन पैनल",
        farmerManagement: "किसान प्रबंधन",
        viewAll: "सभी देखें",
        schemeControl: "योजनाएं और आवंटन",
        addNewScheme: "नई योजना जोड़ें",
        outbreakAlerts: "कीट प्रकोप की निगरानी",
        noActiveAlerts: "कोई सक्रिय प्रकोप की सूचना नहीं है।",
        reportsAndAnalytics: "रिपोर्ट और विश्लेषण",
        cropPopularity: "फसल लोकप्रियता",
        pestReports: "कीट रिपोर्ट (पिछले 30 दिन)",
        exportCSV: "सीएसवी के रूप में निर्यात करें",
        actionDisabled: "यह कार्रवाई डेमो में अक्षम है।",
        iotTitle: "IoT डिवाइस की निगरानी",
        iotOverride: "सिंचाई ओवरराइड करें",
        iotTrends: "सेंसर ट्रेंड (पिछले 24 घंटे)"
    }
  },
  mr: {
    header: {
      title: "किसान साथी"
    },
    login: {
      title: "किसान साथी",
      subtitle: "तुमचा AI शेती सहाय्यक",
      usernamePlaceholder: "वापरकर्तानाव / ईमेल",
      passwordPlaceholder: "पासवर्ड",
      loginAsFarmer: "शेतकरी म्हणून लॉगिन करा",
      loginAsAdmin: "प्रशासक म्हणून लॉगिन करा",
      createAccountPrompt: "खाते नाही?",
      createAccountLink: "नवीन खाते तयार करा",
      signupSuccess: "खाते यशस्वीरित्या तयार झाले! कृपया लॉगिन करा.",
      invalidCredentialsError: "अवैध वापरकर्तानाव किंवा पासवर्ड."
    },
    dashboard: {
      speakPrompt: "बोला: पीक, खत किंवा कीड?",
      cropAdvice: "पीक सल्ला",
      pestAdvice: "कीड/खत सल्ला",
      weatherUpdate: "हवामान अपडेट",
      marketPrices: "बाजार भाव",
      govtSchemes: "सरकारी योजना",
      myAllocations: "माझे वाटप",
      outbreakAlertTitle: "कीड प्रादुर्भाव सूचना"
    },
    cropRecommender: {
      title: "पीक शिफारस",
      formTitle: "तुमच्या शेताचा तपशील भरा",
      soilType: "मातीचा प्रकार",
      waterAvailability: "पाण्याची उपलब्धता",
      season: "हंगाम",
      previousCrop: "मागील पीक (वैकल्पिक)",
      getRecommendations: "शिफारसी मिळवा",
      generating: "तयार करत आहे...",
      topRecommendations: "शीर्ष शिफारसी",
      iotTitle: "थेट शेत डेटा",
      connecting: "सेन्सरशी कनेक्ट करत आहे...",
      sensorConnected: "सेन्सर कनेक्ट झाला",
      moisture: "ओलावा",
      temperature: "तापमान",
      fertilizerAdvice: "खत सल्ला",
      irrigationAdvice: "सिंचन सूचना"
    },
    weather: {
      title: "हवामान अंदाज",
      forecastTitle: "३-दिवसांचा अंदाज",
      today: "आज",
      aiAdvisoryTitle: "AI शेती सल्ला",
      generatingAdvisory: "सल्ला तयार होत आहे...",
      fetching: "तुमचे स्थानिक हवामान आणत आहे...",
      error: {
        title: "हवामान लोड होऊ शकले नाही",
        message: "एक अनपेक्षित त्रुटी आली."
      }
    },
    market: {
      title: "बाजार भाव",
      crop: "पीक",
      region: "प्रदेश",
      pricePerQuintal: "प्रति क्विंटल",
      priceTrend: "किंमत ट्रेंड",
      predictTitle: "भविष्यातील किंमत अंदाज",
      predictButton: "भविष्यातील किमतींचा अंदाज लावा",
      predicting: "अंदाज लावत आहे...",
      predictionFor7Days: "पुढील ७ दिवस",
      predictionFor30Days: "पुढील ३० दिवस",
      analystReasoning: "विश्लेषकाचे तर्क",
      fetching: "बाजार डेटा आणत आहे...",
      regenerate: "पुन्हा तयार करा",
       error: {
        title: "बाजार डेटा लोड होऊ शकला नाही",
        message: "एक अनपेक्षित त्रੁટી आली."
      }
    },
    schemes: {
        title: "सरकारी योजना",
        welfareSchemes: "शेतकरी कल्याण योजना",
        eligibility: "पात्रता",
        benefits: "फायदे",
        applyHere: "येथे अर्ज करा",
        loading: "योजना लोड होत आहेत...",
        error: "सरकारी योजना लोड होऊ शकल्या नाहीत. कृपया नंतर पुन्हा प्रयत्न करा."
    },
    allocations: {
        title: "माझे वाटप",
        allocated: "वाटप केले",
        pending: "प्रलंबित",
        delivered: "वितरित",
        fetching: "तुमचे वाटप आणत आहे...",
        error: "वाटप लोड होऊ शकले नाही."
    },
    profile: {
        title: "प्रोफाइल आणि सेटिंग्ज",
        farmInfo: "शेतीची माहिती",
        update: "अद्यतनित करा",
        soilType: "मातीचा प्रकार",
        primaryCrops: "मुख्य पिके",
        language: "भाषा",
        notifications: "सूचना",
        logout: "लॉग आउट"
    },
    chatbot: {
        title: "कृषी मित्र एआय सहाय्यक",
        greeting: "नमस्कार! मी कृषी मित्र आहे, तुमचा AI शेती सहाय्यक। मी आज तुमची कशी मदत करू शकेन?",
        placeholder: "टाइप करा किंवा बोलण्यासाठी माइक दाबा...",
        error: "माफ करा, मला कनेक्ट करण्यात समस्या येत आहे। कृपया नंतर पुन्हा प्रयत्न करा."
    },
  },
  gu: {
    chatbot: {
        greeting: "નમસ્કાર! હું કૃષિ મિત્ર છું, તમારો AI ખેતી સહાયક. હું આજે તમારી કેવી રીતે મદદ કરી શકું?"
    }
  },
  ta: {
    chatbot: {
        greeting: "வணக்கம்! நான் கிருஷி மித்ரா, உங்கள் AI விவசாய உதவியாளர். நான் இன்று உங்களுக்கு எப்படி உதவ முடியும்?"
    }
  },
  te: {
    chatbot: {
        greeting: "నమస్కారం! నేను కృషి మిత్ర, మీ AI వ్యవసాయ సహాయకుడిని. నేను ఈ రోజు మీకు ఎలా సహాయపడగలను?"
    }
  },
  bn: {
    chatbot: {
        greeting: "নমস্কার! আমি কৃষি মিত্র, আপনার AI কৃষি সহায়ক। আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি?"
    }
  },
  pa: {
    chatbot: {
        greeting: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਹਾਂ, ਤੁਹਾਡਾ AI ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ। ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
    }
  },
  bho: {
    chatbot: {
        greeting: "नमस्ते! हम कृषि मित्र हईं, रउआ AI खेती के साथी। आज हम रउआ के कइसे मदद कर सकीला?",
    }
  },
  kn: {
    chatbot: {
        greeting: "ನಮಸ್ಕಾರ! ನಾನು ಕೃಷಿ ಮಿತ್ರ, ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ನಾನು ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?"
    }
  },
  ml: {
    chatbot: {
        greeting: "നമസ്കാരം! ഞാൻ കൃഷി മിത്ര, നിങ്ങളുടെ AI കാർഷിക സഹായി. എനിക്ക് ഇന്ന് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?"
    }
  },
  or: {
    chatbot: {
        greeting: "ନମସ୍କାର! ମୁଁ କୃଷି ମିତ୍ର, ଆପଣଙ୍କର AI କୃଷି ସହାୟକ। ମୁଁ ଆଜି ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?"
    }
  }
};

export default translations;