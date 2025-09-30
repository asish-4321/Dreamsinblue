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
    let translations = {};

    // Fetches translations and then applies the selected language
    const loadAndSetLanguage = async (lang) => {
        // Fetch translations only if they haven't been loaded yet
        if (Object.keys(translations).length === 0) {
            try {
                const response = await fetch('translations.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                translations = await response.json();
            } catch (error) {
                console.error("Could not load translations:", error);
                return; // Stop if translations can't be loaded
            }
        }
        
        // Apply the translations
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
            loadAndSetLanguage(event.target.value);
        });
    }

    // --- Voice Commands ---
    const micBtn = document.getElementById('mic-btn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && micBtn) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep listening until stopped
        let isListening = false; // Add a state variable
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
            if (isListening) {
                recognition.stop();
                // The onend event will handle isListening = false
                return;
            }
            try {
                recognition.start();
            } catch(e) {
                console.error("Could not start recognition:", e);
                alert("Could not start voice recognition. It might already be active.");
            }
        });

        recognition.onstart = () => {
            isListening = true;
            micBtn.textContent = '🎙️'; // Change icon to indicate listening
            micBtn.style.animation = 'pulse 0.5s infinite alternate'; // Faster pulse when listening
        };

        recognition.onend = () => {
            isListening = false;
            micBtn.textContent = '🎸'; // Revert to original icon
            micBtn.style.animation = 'pulse 1.5s infinite alternate'; // Restore original animation
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            if (commands[transcript]) {
                window.location.href = commands[transcript];
            } else {
                alert(`Command not recognized: "${transcript}".\n\nAvailable commands are: home, albums, events, faqs, join, book now, chatbox.`);
            }
        };

        recognition.onerror = (event) => {
            if (event.error === 'not-allowed') {
                alert('Voice commands require microphone access. Please allow microphone permissions in your browser settings.');
            } else {
                alert('An error occurred during voice recognition: ' + event.error);
            }
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
        loadAndSetLanguage(savedLang);
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