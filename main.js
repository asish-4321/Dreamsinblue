window.onload = () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;

    if (preloader) {
        // Fade out the preloader
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        body.classList.remove('loading');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Navigation ---
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const openNav = () => {
        if(sidebar) sidebar.style.width = "250px";
        if(overlay) { overlay.style.visibility = "visible"; overlay.style.opacity = "1"; }
    };
    const closeNav = () => {
        if(sidebar) sidebar.style.width = "0";
        if(overlay) { overlay.style.visibility = "hidden"; overlay.style.opacity = "0"; }
    };
    // Make functions globally available for inline onclick attributes
    window.openNav = openNav;
    window.closeNav = closeNav;

    // --- Theme Toggling ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
        localStorage.setItem('theme', theme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // --- Language Switching ---
    const langSelect = document.getElementById('lang-select');
    const translations = {
        // Note: It's better to load this from a JSON file, but for now, this works.
        en: { nav_home: "Home", nav_albums: "Albums", nav_events: "Events", nav_faqs: "FAQs", nav_join: "Join", nav_book: "Book Now", nav_chatbox: "Chatbox", welcome_title: "Welcome to Dreams In Blue", welcome_subtitle: "Where the Depth of music Present", welcome_text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  <br>Corrupti molestias possimus nisi error. Inventor", join_us_btn: "Join us", copyright: "copyright disclaimer", albums_title: "Our Albums", listen: "Listen", join_title_fan: "Join the Nation!", join_subtitle_fan: "Sign up to get the latest news, tour dates, and exclusive content straight to your inbox.", birthday_label: "Birthday (Optional)", subscribe_btn: "Subscribe", join_title_band: "Want to Join the Band?", join_subtitle_band: "Think you have what it takes to rock with us? Fill out the form below with your details and a link to your work. We're always looking for new talent!", audition_btn: "Submit Audition" },
        es: { nav_home: "Inicio", nav_albums: "Álbumes", nav_events: "Eventos", nav_faqs: "Preguntas", nav_join: "Unirse", nav_book: "Reservar", nav_chatbox: "Chat", welcome_title: "Bienvenidos a Dreams In Blue", welcome_subtitle: "Donde la profundidad de la música se presenta", welcome_text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>Corrupti molestias possimus nisi error. Inventor", join_us_btn: "Únete a nosotros", copyright: "aviso de copyright", albums_title: "Nuestros Álbumes", listen: "Escuchar", join_title_fan: "¡Únete a la Nación!", join_subtitle_fan: "Regístrate para recibir las últimas noticias, fechas de giras y contenido exclusivo directamente en tu bandeja de entrada.", birthday_label: "Cumpleaños (Opcional)", subscribe_btn: "Suscribir", join_title_band: "¿Quieres Unirte a la Banda?", join_subtitle_band: "¿Crees que tienes lo necesario para rockear con nosotros? Completa el formulario a continuación con tus datos y un enlace a tu trabajo. ¡Siempre estamos buscando nuevos talentos!", audition_btn: "Enviar Audición" },
        te: { nav_home: "హోమ్", nav_albums: "ఆల్బమ్‌లు", nav_events: "ఈవెంట్‌లు", nav_faqs: "ప్రశ్నలు", nav_join: "చేరండి", nav_book: "ఇప్పుడే బుక్ చేయండి", nav_chatbox: "చాట్‌బాక్స్", welcome_title: "డ్రీమ్స్ ఇన్ బ్లూకి స్వాగతం", welcome_subtitle: "సంగీతం యొక్క లోతు ఉన్న చోట", welcome_text: "లోరెమ్ ఇప్సమ్ డోలర్ సిట్ అమెట్ కన్సెక్టెటర్ అడిపిసికింగ్ ఎలిట్. <br>కరప్టి మోలేస్టియాస్ పోసిమస్ నిసి ఎర్రర్. ఇన్వెంటర్", join_us_btn: "మాతో చేరండి", copyright: "కాపీరైట్ నిరాకరణ", albums_title: "మా ఆల్బమ్‌లు", listen: "వినండి", join_title_fan: "నేషన్‌లో చేరండి!", join_subtitle_fan: "తాజా వార్తలు, పర్యటన తేదీలు మరియు ప్రత్యేకమైన కంటెంట్‌ను నేరుగా మీ ఇన్‌బాక్స్‌కు పొందడానికి సైన్ అప్ చేయండి.", birthday_label: "పుట్టినరోజు (ఐచ్ఛికం)", subscribe_btn: "సభ్యత్వం పొందండి", join_title_band: "బ్యాండ్‌లో చేరాలనుకుంటున్నారా?", join_subtitle_band: "మాతో రాక్ చేయడానికి మీకు ఏమి కావాలో ఆలోచిస్తున్నారా? మీ వివరాలు మరియు మీ పనికి సంబంధించిన లింక్‌తో దిగువ ఫారమ్‌ను పూరించండి. మేము ఎల్లప్పుడూ కొత్త ప్రతిభ కోసం చూస్తున్నాము!", audition_btn: "ఆడిషన్‌ను సమర్పించండి" },
        hi: { nav_home: "होम", nav_albums: "एलबम", nav_events: "इवेंट्स", nav_faqs: "अक्सर पूछे जाने वाले प्रश्न", nav_join: "शामिल हों", nav_book: "अभी बुक करें", nav_chatbox: "चैटबॉक्स", welcome_title: "ड्रीम्स इन ब्लू में आपका स्वागत है", welcome_subtitle: "जहां संगीत की गहराई मौजूद है", welcome_text: "लोरेम इप्सम डोलोर सिट अमेट कॉन्सेक्टेटर एडिपिसिसिंग एलीट। <br>करप्टी मोलेस्टियास पोसिमस निसि एरर। इन्वेंटर", join_us_btn: "हमसे जुड़ें", copyright: "कॉपीराइट अस्वीकरण", albums_title: "हमारे एलबम", listen: "सुनो", join_title_fan: "राष्ट्र में शामिल हों!", join_subtitle_fan: "नवीनतम समाचार, दौरे की तारीखें, और विशेष सामग्री सीधे अपने इनबॉक्स में पाने के लिए साइन अप करें।", birthday_label: "जन्मदिन (वैकल्पिक)", subscribe_btn: "सब्सक्राइब करें", join_title_band: "बैंड में शामिल होना चाहते हैं?", join_subtitle_band: "क्या आपको लगता है कि आपके पास हमारे साथ रॉक करने के लिए वह है जो चाहिए? नीचे दिए गए फॉर्म को अपने विवरण और अपने काम के लिंक के साथ भरें। हम हमेशा नई प्रतिभा की तलाश में रहते हैं!", audition_btn: "ऑडिशन सबमिट करें" },
        ml: { nav_home: "ഹോം", nav_albums: "ആൽബങ്ങൾ", nav_events: "ഇവന്റുകൾ", nav_faqs: "പതിവുചോദ്യങ്ങൾ", nav_join: "ചേരുക", nav_book: "ഇപ്പോൾ ബുക്ക് ചെയ്യുക", nav_chatbox: "ചാറ്റ്ബോക്സ്", welcome_title: "ഡ്രീംസ് ഇൻ ബ്ലൂയിലേക്ക് സ്വാഗതം", welcome_subtitle: "സംഗീതത്തിന്റെ ആഴം എവിടെയാണോ", welcome_text: "ലോറം ഇപ്‌സം ഡോളർ സിറ്റ് അമേറ്റ് കോൺസെക്റ്ററ്റർ അഡിപിസിംഗ് എലൈറ്റ്. <br>കറപ്റ്റി മൊളസ്റ്റിയാസ് പോസിമസ് നിസി എറർ. ഇൻവെന്റർ", join_us_btn: "ഞങ്ങളോടൊപ്പം ചേരൂ", copyright: "പകർപ്പവകാശ നിരാകരണം", albums_title: "ഞങ്ങളുടെ ആൽബങ്ങൾ", listen: "കേൾക്കൂ", join_title_fan: "രാഷ്ട്രത്തിൽ ചേരൂ!", join_subtitle_fan: "ഏറ്റവും പുതിയ വാർത്തകൾ, ടൂർ തീയതികൾ, എക്സ്ക്ലൂസീവ് ഉള്ളടക്കം എന്നിവ നിങ്ങളുടെ ഇൻബോക്സിൽ നേരിട്ട് ലഭിക്കാൻ സൈൻ അപ്പ് ചെയ്യുക.", birthday_label: "ജന്മദിനം (ഓപ്ഷണൽ)", subscribe_btn: "സബ്സ്ക്രൈബ് ചെയ്യുക", join_title_band: "ബാൻഡിൽ ചേരാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?", join_subtitle_band: "ഞങ്ങളോടൊപ്പം റോക്ക് ചെയ്യാൻ നിങ്ങൾക്ക് കഴിവുണ്ടെന്ന് കരുതുന്നുണ്ടോ? നിങ്ങളുടെ വിശദാംശങ്ങളും നിങ്ങളുടെ സൃഷ്ടിയുടെ ലിങ്കും സഹിതം താഴെയുള്ള ഫോം പൂരിപ്പിക്കുക. ഞങ്ങൾ എപ്പോഴും പുതിയ പ്രതിഭകളെ തേടുന്നു!", audition_btn: "ഓഡിഷൻ സമർപ്പിക്കുക" },
        ta: { nav_home: "முகப்பு", nav_albums: "ஆல்பங்கள்", nav_events: "நிகழ்வுகள்", nav_faqs: "அடிக்கடி கேட்கப்படும் கேள்விகள்", nav_join: "சேரவும்", nav_book: "இப்போது பதிவுசெய்க", nav_chatbox: "அரட்டை பெட்டி", welcome_title: "ட்ரீம்ஸ் இன் ப்ளூக்கு வரவேற்கிறோம்", welcome_subtitle: "இசையின் ஆழம் இருக்கும் இடத்தில்", welcome_text: "லோரம் இப்சம் டோலர் சிட் அமெட் கான்செக்டெட்டர் அடிபிசிங் எலைட். <br>கரப்டி மொலஸ்டியாஸ் போசிமஸ் நிசி பிழை. கண்டுபிடிப்பாளர்", join_us_btn: "எங்களுடன் சேருங்கள்", copyright: "பதிப்புரிமை மறுப்பு", albums_title: "எங்கள் ஆல்பங்கள்", listen: "கேளுங்கள்", join_title_fan: "தேசத்தில் சேருங்கள்!", join_subtitle_fan: "சமீபத்திய செய்திகள், சுற்றுப்பயண தேதிகள் மற்றும் பிரத்யேக உள்ளடக்கத்தை நேரடியாக உங்கள் இன்பாக்ஸில் பெற பதிவு செய்யவும்.", birthday_label: "பிறந்தநாள் (விருப்பத்தேர்வு)", subscribe_btn: " குழுசேர்", join_title_band: "இசைக்குழுவில் சேர விரும்புகிறீர்களா?", join_subtitle_band: "எங்களுடன் ராக் செய்ய உங்களிடம் என்ன இருக்கிறது என்று நினைக்கிறீர்களா? கீழே உள்ள படிவத்தை உங்கள் விவரங்கள் மற்றும் உங்கள் வேலையின் இணைப்புடன் நிரப்பவும். நாங்கள் எப்போதும் புதிய திறமைகளைத் தேடுகிறோம்!", audition_btn: "சோதனையைச் சமர்ப்பிக்கவும்" }
    };

    const setLanguage = (lang) => {
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                elem.innerHTML = translations[lang][key];
            }
        });
        localStorage.setItem('language', lang);
    };

    if (langSelect) {
        langSelect.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    // --- Voice Commands ---
    const micBtn = document.getElementById('mic-btn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && micBtn) {
        const recognition = new SpeechRecognition();
        const commands = {
            'home': '/Dreamsinblue/index.html',
            'albums': '/Dreamsinblue/albums.html',
            'events': '/Dreamsinblue/events.html',
            'faqs': '/Dreamsinblue/faqs.html',
            'join': '/Dreamsinblue/join.html',
            'book now': '/Dreamsinblue/book.html',
            'chatbox': '/Dreamsinblue/chat.html'
        };

        micBtn.addEventListener('click', () => {
            try {
                recognition.start();
            } catch(e) {
                console.error("Recognition already started.");
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            if (commands[transcript]) {
                window.location.href = commands[transcript];
            } else {
                alert(`Command not recognized: "${transcript}"`);
            }
        };

        recognition.onerror = (event) => {
            alert('Error occurred in recognition: ' + event.error);
        };
    } else if (micBtn) {
        micBtn.style.display = 'none';
    }

    // --- Initial Load ---
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (langSelect) {
        const savedLang = localStorage.getItem('language') || 'en';
        langSelect.value = savedLang;
        setLanguage(savedLang);
    }

    // --- Active Navigation Link ---
    const currentPagePath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a, .sidebar a');

    navLinks.forEach(link => {
        // Create a URL object to easily compare pathnames, ignoring domain
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPagePath) {
            link.classList.add('active-link');
        }
    });

    // --- Shrinking Header & Back to Top Button ---
    const header = document.querySelector('.header');
    const midSection = document.querySelector('.mid'); // For home page parallax
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Header shrink effect
        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }

        // Back to Top button visibility
        if (backToTopBtn) {
            if (scrollPosition > 300) { // Show button after 300px
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Parallax effect for home page content
        if (midSection) {
            midSection.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });

    // Back to Top click event
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});