/*
============================================================
AL-MUSFIRAH INSTITUTE - PREMIUM V2.0 UI/UX SCRIPT FILE
============================================================
ORGANIZATION:
1. Sticky Header & Scroll Active Link Highlight (Color Only)
2. Hamburger Mobile Menu Toggle
3. Stats Counter Animation (Intersection Observer)
4. FAQ Accordion Toggle
5. Scroll To Top Button Handler
6. Scroll Reveal Animation Trigger
7. Course Details Modal Dynamic Content System
8. Contact Form Validation & WhatsApp Redirect compiler
============================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY HEADER & SCROLL ACTIVE LINK HIGHLIGHT (COLOR ONLY)
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Sticky navbar toggle on scroll
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    
    // Active navigation item highlight on scroll (Color Only, no underlines)
    const handleActiveLinkHighlight = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // Offset threshold
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}` || (currentSectionId === 'home' && href === '#')) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollHeader();
        handleActiveLinkHighlight();
    });
    
    // Initial triggers
    handleScrollHeader();
    handleActiveLinkHighlight();

    // 2. HAMBURGER MOBILE MENU
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const menuPanel = document.getElementById('mobile-menu-panel');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    const openMobileMenu = () => {
        menuOverlay.classList.add('active');
        menuPanel.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };
    
    const closeMobileMenu = () => {
        menuOverlay.classList.remove('active');
        menuPanel.classList.remove('active');
        document.body.style.overflow = ''; // Unlock background scroll
    };
    
    if (hamburgerBtn && closeBtn && menuOverlay && menuPanel) {
        hamburgerBtn.addEventListener('click', openMobileMenu);
        closeBtn.addEventListener('click', closeMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // 3. STATS COUNTER ANIMATION
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    const startCounters = () => {
        statNumbers.forEach(stat => {
            const targetStr = stat.getAttribute('data-target');
            const target = parseInt(targetStr.replace(/[^0-9]/g, ''));
            const suffix = targetStr.replace(/[0-9]/g, '');
            const duration = 1500; // ms
            const stepTime = 30; // ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    };
    
    // Observer triggers statistics counters
    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    startCounters();
                }
            });
        }, { threshold: 0.25 });
        
        observer.observe(statsSection);
    }

    // 4. FAQ ACCORDION TOGGLE (SMOOTH EXPAND)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question-btn');
        const answerPanel = item.querySelector('.faq-answer-panel');
        const answerContent = item.querySelector('.faq-answer-content');
        
        if (questionBtn && answerPanel) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherPanel = otherItem.querySelector('.faq-answer-panel');
                    if (otherPanel) {
                        otherPanel.style.maxHeight = '0';
                    }
                });
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                    const contentHeight = answerContent.scrollHeight + 24; // Padding offset
                    answerPanel.style.maxHeight = `${contentHeight}px`;
                } else {
                    item.classList.remove('active');
                    answerPanel.style.maxHeight = '0';
                }
            });
        }
    });

    // 5. SCROLL TO TOP BUTTON
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. SCROLL REVEAL ANIMATION TRIGGER
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });
        
        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    }

    // 7. COURSE DETAILS MODAL DYNAMIC CONTENT SYSTEM
    const courseOutlines = {
        "noorani-qaida": {
            title: "Noorani Qaida Course",
            duration: "2-3 Months",
            level: "Beginner",
            syllabus: [
                "Identification of basic Arabic letters (Huroof-e-Mufradat)",
                "Joined letter shapes and compound recognition (Huroof-e-Murakkabat)",
                "Correct points of articulation (Makharij rules)",
                "Short vowels (Harkat: Zabar, Zer, Pesh) practice",
                "Standing vowels (Tanween, Sukoon, and Shaddah symbols)",
                "Basic spelling and lengthening rules (Huroof-e-Maddah)",
                "Practical reading drills to connect letters into complete words"
            ]
        },
        "quran-reading": {
            title: "Quran Reading Course",
            duration: "3-6 Months",
            level: "Beginner",
            syllabus: [
                "Fluency exercises reading complete Quranic words and sentences",
                "Recognizing stop/pausing symbols in Quran text (Waqf rules)",
                "Proper rhythm, tone, and breath control rules in recitation",
                "One-on-one reading guidance covering Juz 30 (Amma) and Juz 1",
                "Correction of common pronunciation mistakes in daily recitations",
                "Practical reading directly from the Mushaf text"
            ]
        },
        "quran-tajweed": {
            title: "Quran with Tajweed Course",
            duration: "Flexible Schedule",
            level: "Intermediate",
            syllabus: [
                "Detailed study of articulation points (Makharij of all 29 letters)",
                "Rules of Nun Sakinah and Tanween (Izhar, Idgham, Iqlab, Ikhfa)",
                "Rules of Meem Sakinah (Ikhfa, Idgham, and Izhar-e-Shafawi)",
                "Rules of Mudood (vowel elongation rules and symbols)",
                "Recitation rules for Raa and Laam (Heavy and light structures)",
                "Practical drills and continuous correction during live class recitations"
            ]
        },
        "hifz": {
            title: "Quran Memorization (Hifz) Course",
            duration: "Flexible Schedule",
            level: "Intermediate to Advanced",
            syllabus: [
                "Personalized memorization targets customized to student memory capacity",
                "Daily recitation and memorization of new verses (Sabaq)",
                "Weekly revision of recently memorized parts (Sabqi)",
                "Systematic revision cycle for older memorized chapters (Manzil)",
                "Strict maintenance of correct Tajweed rules during memorization",
                "Weekly progress tracking reports for parents and adults"
            ]
        },
        "tafseer": {
            title: "Tafseer-ul-Quran Course",
            duration: "Flexible Schedule",
            level: "Advanced",
            syllabus: [
                "Introduction to Surahs (historical context and reasons for revelation)",
                "Word-by-word literal translation of Arabic vocabulary",
                "Detailed thematic explanation (Tafseer) of verses",
                "Deriving practical guidelines and Islamic jurisprudence rulings",
                "Comparative study of classical Tafseer texts (Tafseer Ibn Kathir, etc.)"
            ]
        },
        "arabic": {
            title: "Arabic Language Course",
            duration: "Flexible Schedule",
            level: "All Levels Welcome",
            syllabus: [
                "Conversational Arabic vocabulary development",
                "Core grammatical structures (Nahw/Sarf rules)",
                "Reading comprehension exercises utilizing Quranic text",
                "Arabic sentence construction and vocabulary building",
                "Speaking and writing practice for daily life situations"
            ]
        },
        "studies": {
            title: "Islamic Studies Course",
            duration: "Flexible Schedule",
            level: "Beginner to Intermediate",
            syllabus: [
                "Pillars of Islam and foundational Islamic beliefs (Aqeedah)",
                "Life biography of Prophet Muhammad (Seerah)",
                "Stories of early Prophets (Qisas al-Anbiya)",
                "Etiquettes, daily manners, and character building (Akhlaq)",
                "Fiqh basics (cleanliness, wudu, salah, fasting, zakat)",
                "Islamic history summaries"
            ]
        },
        "duas": {
            title: "Daily Duas Course",
            duration: "Flexible Schedule",
            level: "Beginner",
            syllabus: [
                "Supplications for waking up and sleeping cycles",
                "Masnoon Duas for meals, drinking, and hosting guests",
                "Duas for entering and exiting home, masjid, and washrooms",
                "Supplications for travels, protection from sickness, and difficulties",
                "Memorizing with English/Urdu translations and understanding application"
            ]
        },
        "salah": {
            title: "Salah Course",
            duration: "Flexible Schedule",
            level: "Beginner",
            syllabus: [
                "Detailed rulings of physical purification (Wudu, Ghusl, Tayammum)",
                "Understanding the essential pillars and conditions of prayer (Salah)",
                "Step-by-step physical training of postures (Qiyam, Ruku, Sujud)",
                "Correct pronunciation of all recitations (Sana, Tashahhud, Durood)",
                "Common mistakes that invalidate the prayer (Mufsideen-e-Salah)"
            ]
        }
    };

    const modal = document.getElementById('course-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalLevel = document.getElementById('modal-level');
    const modalDuration = document.getElementById('modal-duration');
    const modalList = document.getElementById('modal-list');
    const modalEnrollBtn = document.getElementById('modal-enroll-btn');

    const openCourseModal = (courseKey) => {
        const data = courseOutlines[courseKey];
        if (!data || !modal) return;

        // Populate Modal Fields
        modalTitle.textContent = data.title;
        modalLevel.textContent = data.level;
        modalDuration.textContent = data.duration;
        
        // Clear old list
        modalList.innerHTML = '';
        
        // Append syllabus points
        data.syllabus.forEach(item => {
            const li = document.createElement('li');
            li.className = 'modal-list-item';
            li.innerHTML = `
                <span class="material-symbols-rounded">check_circle</span>
                <span>${item}</span>
            `;
            modalList.appendChild(li);
        });

        // Setup WhatsApp link for this specific course in modal
        if (modalEnrollBtn) {
            const whatsappNumber = '923021822190';
            const defaultText = `Assalam-o-Alaikum. I would like to book a Free Trial Class for the "${data.title}" at Al-Musfirah Institute.`;
            modalEnrollBtn.setAttribute('href', `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultText)}`);
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeCourseModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Allow scroll
        }
    };

    // Attach click events to all "Learn More" buttons
    const learnMoreButtons = document.querySelectorAll('.open-modal-btn');
    learnMoreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const courseKey = btn.getAttribute('data-course');
            openCourseModal(courseKey);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeCourseModal);
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCourseModal();
            }
        });
    }

    // 8. CONTACT FORM VALIDATION & WHATSAPP REDIRECT COMPILER
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const country = document.getElementById('country').value.trim();
            const courseSelect = document.getElementById('course-select');
            const course = courseSelect ? courseSelect.options[courseSelect.selectedIndex].text : '';
            const timingSelect = document.getElementById('timing-select');
            const timing = timingSelect ? timingSelect.options[timingSelect.selectedIndex].text : '';
            const message = document.getElementById('message').value.trim();
            
            if (!fullName || !phone || !country || !course) {
                alert('Please fill out all required fields (Name, Phone Number, Country, and Course).');
                return;
            }
            
            const whatsappNumber = '923021822190';
            const introMessage = `Assalam-o-Alaikum Al-Musfirah Institute, \nI would like to enroll / request a Free Trial Class. Here are my details:`;
            
            let messageBody = `${introMessage}\n\n`;
            messageBody += `👤 *Name:* ${fullName}\n`;
            if (email) messageBody += `✉ *Email:* ${email}\n`;
            messageBody += `📞 *WhatsApp:* ${phone}\n`;
            messageBody += `🌍 *Country:* ${country}\n`;
            messageBody += `📚 *Selected Course:* ${course}\n`;
            if (timing && timing !== 'Select Preferred Time') messageBody += `⏰ *Preferred Time:* ${timing}\n`;
            if (message) messageBody += `✍ *Message:* ${message}\n`;
            
            const encodedMessage = encodeURIComponent(messageBody);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        });
    }
    
    // Add WhatsApp click tracking/handlers to all buttons
    const ctaButtons = document.querySelectorAll('.whatsapp-cta');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.getAttribute('type') === 'submit') return;
            
            e.preventDefault();
            const whatsappNumber = '923021822190';
            const defaultText = 'Assalam-o-Alaikum. I would like to book a Free Trial Class at Al-Musfirah Institute.';
            const encodedText = encodeURIComponent(defaultText);
            const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            window.open(url, '_blank');
        });
    });
});
