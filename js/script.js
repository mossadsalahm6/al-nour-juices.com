// ============================================
// AL NOUR JUICES - JAVASCRIPT FUNCTIONALITY
// ============================================

const SETTINGS_PASSWORD = '0000';

// Drinks Data
const drinksData = [
    {
        id: 'kharoub',
        name: 'عصير الخروب',
        description: 'عصير طبيعي من الخروب الفاخر، غني بالفوائد الصحية',
        price: 15,
        image: 'images/kharoub.png'
    },
    {
        id: 'tamarindi',
        name: 'عصير التمر الهندي',
        description: 'مشروب منعش من التمر الهندي الطبيعي، طعم حامضي رائع',
        price: 12,
        image: 'images/tamarindi.png'
    },
    {
        id: 'sabaya',
        name: 'عصير السوبيا',
        description: 'المشروب التقليدي اللذيذ، مثالي للأيام الحارة',
        price: 10,
        image: 'images/sabaya.png'
    },
    {
        id: 'araq_sous',
        name: 'عرق السوس',
        description: 'عصير عرق السوس الأبيض، طعم منعش وصحي',
        price: 8,
        image: 'images/araq_sous.png'
    },
    {
        id: 'lemon_orange',
        name: 'عصير الليمون والبرتقال',
        description: 'مزيج حمضي طبيعي، غني بفيتامين سي',
        price: 14,
        image: 'images/lemon_orange.png'
    },
    {
        id: 'mango',
        name: 'عصير المانجو',
        description: 'عصير المانجو الفاخر، طعم استوائي لذيذ',
        price: 16,
        image: 'images/mango.png'
    },
    {
        id: 'cocktail_enab',
        name: 'كوكتيل العناب',
        description: 'مشروب كوكتيل فاخر من العناب الطبيعي',
        price: 18,
        image: 'images/cocktail_enab.png'
    }
];

// Store Information
let storeInfo = {
    address: 'المنصورة - شارع مجمع المحاكم أمام عالم التوفير',
    phone: '01065040078',
    experience: '16 سنة',
    manager: 'م. مسعد صلاح'
};

let isPasswordCorrect = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    loadSettings();
    setupEventListeners();
});

// Initialize page content
function initializePage() {
    renderDrinks();
    updateStoreInfo();
    populateDrinkSelect();
}

// Render drinks grid
function renderDrinks() {
    const drinksGrid = document.getElementById('drinksGrid');
    drinksGrid.innerHTML = '';

    drinksData.forEach((drink, index) => {
        const drinkCard = createDrinkCard(drink, index);
        drinksGrid.appendChild(drinkCard);
    });
}

// Create drink card element
function createDrinkCard(drink, index) {
    const card = document.createElement('div');
    card.className = 'drink-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="drink-image">
            <img src="${drink.image}" alt="${drink.name}" loading="lazy">
        </div>
        <div class="drink-content">
            <h3 class="drink-name">${drink.name}</h3>
            <p class="drink-description">${drink.description}</p>
            <div class="drink-price" data-drink-id="${drink.id}">
                ${drink.price} ج.م
            </div>
            <div class="drink-actions">
                <button class="drink-btn order-btn" onclick="orderDrink('${drink.name}')">
                    <i class="fas fa-shopping-cart"></i> اطلب الآن
                </button>
                <button class="drink-btn details-btn" onclick="showDetails('${drink.name}')">
                    <i class="fas fa-info-circle"></i> التفاصيل
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Order drink function
function orderDrink(drinkName) {
    const phone = storeInfo.phone;
    const message = `مرحبا، أود طلب ${drinkName} من عصائر النور`;
    const whatsappUrl = `https://wa.me/20${phone.replace(/^0/, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Show drink details
function showDetails(drinkName) {
    alert(`تفاصيل ${drinkName}\n\nللمزيد من المعلومات، يرجى التواصل معنا عبر WhatsApp`);
}

// Update store information on page
function updateStoreInfo() {
    document.getElementById('experienceText').textContent = `${storeInfo.experience} من الخبرة في صناعة العصائر الطبيعية`;
    document.getElementById('managerText').textContent = `إدارة ${storeInfo.manager}`;
    document.getElementById('locationText').textContent = storeInfo.address;
    document.getElementById('phoneText').textContent = storeInfo.phone;
    document.getElementById('addressText').textContent = storeInfo.address;
}

// Populate drink select dropdown
function populateDrinkSelect() {
    const drinkSelect = document.getElementById('drinkSelect');
    drinkSelect.innerHTML = '<option value="">اختر مشروب</option>';
    drinksData.forEach(drink => {
        const option = document.createElement('option');
        option.value = drink.id;
        option.textContent = drink.name;
        drinkSelect.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    const closeSettings = document.getElementById('closeSettings');
    const saveSettings = document.getElementById('saveSettings');
    const resetSettings = document.getElementById('resetSettings');
    const passwordBtn = document.getElementById('passwordBtn');
    const passwordInput = document.getElementById('passwordInput');
    const settingsPanel = document.getElementById('settingsPanel');

    // Password verification
    passwordBtn.addEventListener('click', verifyPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyPassword();
    });

    closeSettings.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
        resetPasswordForm();
    });

    saveSettings.addEventListener('click', saveAllSettings);
    resetSettings.addEventListener('click', resetAllSettings);

    // Close settings panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && e.target.id !== 'logo-section') {
            settingsPanel.classList.remove('active');
        }
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Open settings panel
function openSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.classList.add('active');
}

// Verify password
function verifyPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;

    if (password === SETTINGS_PASSWORD) {
        isPasswordCorrect = true;
        document.getElementById('settingsPassword').style.display = 'none';
        document.getElementById('settingsContent').style.display = 'block';
        createDrinkSettings();
        populateSettingsForm();
        showNotification('تم التحقق من كلمة السر بنجاح!');
    } else {
        showNotification('كلمة السر غير صحيحة!');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Reset password form
function resetPasswordForm() {
    if (!isPasswordCorrect) return;
    
    isPasswordCorrect = false;
    document.getElementById('passwordInput').value = '';
    document.getElementById('settingsPassword').style.display = 'flex';
    document.getElementById('settingsContent').style.display = 'none';
}

// Create settings inputs for drinks
function createDrinkSettings() {
    const drinkSettingsContainer = document.getElementById('drinkSettings');
    drinkSettingsContainer.innerHTML = '';

    drinksData.forEach(drink => {
        const settingItem = document.createElement('div');
        settingItem.className = 'setting-item';
        settingItem.innerHTML = `
            <label>${drink.name}</label>
            <div class="drink-price-input">
                <input type="number" class="drink-price-input-field" data-drink-id="${drink.id}" 
                       value="${drink.price}" min="0" step="0.5">
                <span>ج.م</span>
            </div>
        `;
        drinkSettingsContainer.appendChild(settingItem);
    });
}

// Load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('alNourSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Load drink prices
        if (settings.drinks) {
            drinksData.forEach(drink => {
                if (settings.drinks[drink.id]) {
                    drink.price = settings.drinks[drink.id];
                }
            });
        }
        
        // Load store info
        if (settings.storeInfo) {
            storeInfo = { ...storeInfo, ...settings.storeInfo };
        }

        // Load images
        if (settings.images) {
            if (settings.images.heroBanner) {
                document.getElementById('heroBannerImg').src = settings.images.heroBanner;
            }
            if (settings.images.drinks) {
                drinksData.forEach(drink => {
                    if (settings.images.drinks[drink.id]) {
                        drink.image = settings.images.drinks[drink.id];
                    }
                });
            }
        }
    }
}

// Populate settings form
function populateSettingsForm() {
    document.getElementById('storeAddress').value = storeInfo.address;
    document.getElementById('storePhone').value = storeInfo.phone;
    document.getElementById('storeExperience').value = storeInfo.experience;
    document.getElementById('storeManager').value = storeInfo.manager;
}

// Update image
function updateImage(type) {
    if (type === 'heroBanner') {
        const fileInput = document.getElementById('heroBannerInput');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                document.getElementById('heroBannerImg').src = imageData;
                saveImageToStorage('heroBanner', imageData);
                showNotification('تم تحديث صورة البانر بنجاح!');
                fileInput.value = '';
            };
            reader.readAsDataURL(file);
        }
    }
}

// Update drink image
function updateDrinkImage() {
    const drinkSelect = document.getElementById('drinkSelect');
    const drinkId = drinkSelect.value;
    const fileInput = document.getElementById('drinkImageInput');
    const file = fileInput.files[0];

    if (!drinkId) {
        showNotification('يرجى اختيار مشروب أولاً!');
        return;
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            const drink = drinksData.find(d => d.id === drinkId);
            if (drink) {
                drink.image = imageData;
                saveDrinkImageToStorage(drinkId, imageData);
                renderDrinks();
                showNotification('تم تحديث صورة المشروب بنجاح!');
                fileInput.value = '';
                drinkSelect.value = '';
            }
        };
        reader.readAsDataURL(file);
    }
}

// Save image to storage
function saveImageToStorage(type, imageData) {
    const settings = JSON.parse(localStorage.getItem('alNourSettings') || '{"images":{}}');
    if (!settings.images) settings.images = {};
    settings.images[type] = imageData;
    localStorage.setItem('alNourSettings', JSON.stringify(settings));
}

// Save drink image to storage
function saveDrinkImageToStorage(drinkId, imageData) {
    const settings = JSON.parse(localStorage.getItem('alNourSettings') || '{"images":{"drinks":{}}}');
    if (!settings.images) settings.images = {};
    if (!settings.images.drinks) settings.images.drinks = {};
    settings.images.drinks[drinkId] = imageData;
    localStorage.setItem('alNourSettings', JSON.stringify(settings));
}

// Save all settings
function saveAllSettings() {
    const drinks = {};
    document.querySelectorAll('.drink-price-input-field').forEach(input => {
        const drinkId = input.dataset.drinkId;
        drinks[drinkId] = parseFloat(input.value) || 0;
        
        // Update drink data
        const drink = drinksData.find(d => d.id === drinkId);
        if (drink) {
            drink.price = parseFloat(input.value) || 0;
        }
    });

    const newStoreInfo = {
        address: document.getElementById('storeAddress').value || storeInfo.address,
        phone: document.getElementById('storePhone').value || storeInfo.phone,
        experience: document.getElementById('storeExperience').value || storeInfo.experience,
        manager: document.getElementById('storeManager').value || storeInfo.manager
    };

    storeInfo = newStoreInfo;

    const settings = JSON.parse(localStorage.getItem('alNourSettings') || '{}');
    settings.drinks = drinks;
    settings.storeInfo = newStoreInfo;

    localStorage.setItem('alNourSettings', JSON.stringify(settings));
    
    updateStoreInfo();
    renderDrinks();
    
    showNotification('تم حفظ التغييرات بنجاح!');
}

// Reset all settings
function resetAllSettings() {
    if (confirm('هل تريد إعادة تعيين جميع الإعدادات إلى القيم الافتراضية؟')) {
        localStorage.removeItem('alNourSettings');
        location.reload();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: linear-gradient(135deg, #D4AF37, #1B4D3E);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInLeft 0.4s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutLeft 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.drink-card, .info-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Performance optimization - debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll event handler
    });
}, { passive: true });

// Add slide-in animations for keyframe styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            transform: translateX(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu close on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
        }
    });
});

console.log('AL NOUR Juices Website Loaded Successfully! 🎉');
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        openSettings();
    }
});

