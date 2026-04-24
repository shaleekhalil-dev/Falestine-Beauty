const translations = {
    ar: {
        heroName: "فلسطين خبيرة تجميل",
        heroSlogan: "تسعى دائماً لتعلم الجديد والآمن لتكوني أنتِ الأجمل بين نساء مجتمعك",
        heroSafe: "مع فلسطين أنتِ بأيدي أمينة",
        heroBeauty: "فلسطين بيوتي.. هنا نقدر جمالك ونعتني به",
        videosTitle: "اعرفي أكثر عن جمالك من فلسطين",
        galleryTitle: "اعتني بجمالك",
        magicTitle: "لمحة عن بعض اللمسات السحرية",
        servicesTitle: "مجالات التجميل",
        bookingTitle: "احجزي استشارتك الآن",
        langBtn: "English",
        services: ["ليزر إزالة الشعر", "تقشير البشرة", "تفتيح البشرة", "علاج الندب", "علاج التصبغات", "علاج المسام", "تفتيح المناطق الحساسة", "إنبات الشعر", "تنظيف ونضارة", "مكسات النضارة", "علاج تصبغات الجسم"]
    },
    en: {
        heroName: "Falestine Beauty Expert",
        heroSlogan: "Striving for the best version of you",
        heroSafe: "In safe hands with Falestine",
        heroBeauty: "We care for your beauty",
        videosTitle: "Know more about your beauty",
        galleryTitle: "Beauty Gallery",
        magicTitle: "Magic Touches",
        servicesTitle: "Our Services",
        bookingTitle: "Book Now",
        langBtn: "العربية",
        services: ["Laser", "Peeling", "Whitening", "Scars", "Pigmentation", "Pores", "Brightening", "Hair Care", "Freshness", "Mixes", "Body Care"]
    }
};

let currentLang = 'ar';
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzk_FKS9iB8gSr8lZtSV0nAh5WfdQ551WJNeiFV-g2SVbQyoB_2HdNhD1UsFEuReYYU/exec";

function switchLang() {
    currentLang = (currentLang === 'ar') ? 'en' : 'ar';
    updateContent();
}

function updateContent() {
    const data = translations[currentLang];
    
    // تحديث النصوص الأساسية بحماية
    const map = {
        'hero-name': data.heroName,
        'hero-slogan': data.heroSlogan,
        'hero-safe': data.heroSafe,
        'hero-beauty': data.heroBeauty,
        'videos-title': data.videosTitle,
        'gallery-title': data.galleryTitle,
        'magic-title': data.magicTitle,
        'services-title': data.servicesTitle,
        'booking-title': data.bookingTitle,
        'langBtn': data.langBtn
    };

    for (let id in map) {
        const el = document.getElementById(id);
        if (el) el.textContent = map[id];
    }

    document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';

    // بناء شبكة الخدمات
    const grid = document.getElementById('services-grid');
    if (grid) {
        grid.innerHTML = '';
        data.services.forEach(s => {
            const div = document.createElement('div');
            div.className = 'service-card';
            div.textContent = s;
            grid.appendChild(div);
        });
    }
}

// تشغيل عند تحميل المستند لضمان وجود العناصر
document.addEventListener('DOMContentLoaded', () => {
    updateContent();

    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.textContent = "جاري الحجز...";
            
            const payload = {
                name: document.getElementById('cust-name').value,
                phone: document.getElementById('cust-phone').value,
                date: document.getElementById('book-date').value
            };

            fetch(SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(payload)
            }).then(() => {
                alert("تم استلام طلبك!");
                btn.textContent = "تأكيد الحجز";
                form.reset();
            }).catch(() => {
                alert("خطأ في الاتصال");
                btn.textContent = "تأكيد الحجز";
            });
        });
    }
});