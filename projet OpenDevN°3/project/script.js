// Currency data with symbols and names
const currencies = {
    ariary: { symbol: 'MGA', name: 'Ariary Malgache', flag: '🇲🇬' },
    euro: { symbol: 'EUR', name: 'Euro', flag: '🇪🇺' },
    dollar: { symbol: 'USD', name: 'Dollar Américain', flag: '🇺🇸' },
    yen: { symbol: 'JPY', name: 'Yen Japonais', flag: '🇯🇵' },
    franc: { symbol: 'CHF', name: 'Franc Suisse', flag: '🇨🇭' }
};

// DOM elements
const themeToggle = document.getElementById('themeToggle');
const converterForm = document.getElementById('converterForm');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const exchangeRateInput = document.getElementById('exchangeRate');
const swapButton = document.getElementById('swapButton');
const errorMessage = document.getElementById('errorMessage');
const result = document.getElementById('result');
const resultValue = document.getElementById('resultValue');
const resultDetails = document.getElementById('resultDetails');

// Theme management
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function updateTheme() {
    const body = document.body;
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }
    
    localStorage.setItem('darkMode', isDarkMode);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    updateTheme();
    
    // Add a subtle animation to the theme toggle
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
}

// Initialize theme
updateTheme();

// Event listeners
themeToggle.addEventListener('click', toggleTheme);

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize navigation
initializeNavigation();

// Swap currencies function
function swapCurrencies() {
    const fromValue = fromCurrencySelect.value;
    const toValue = toCurrencySelect.value;
    
    if (fromValue && toValue) {
        fromCurrencySelect.value = toValue;
        toCurrencySelect.value = fromValue;
        
        // Update exchange rate hint
        updateExchangeRateHint();
        
        // Clear previous results
        hideResult();
        hideError();
    }
}

swapButton.addEventListener('click', swapCurrencies);

// Update exchange rate hint based on selected currencies
function updateExchangeRateHint() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const hint = document.querySelector('.form-hint');
    
    if (fromCurrency && toCurrency && currencies[fromCurrency] && currencies[toCurrency]) {
        const fromSymbol = currencies[fromCurrency].symbol;
        const toSymbol = currencies[toCurrency].symbol;
        hint.textContent = `Entrez le taux de conversion (ex: 1 ${fromSymbol} = X ${toSymbol})`;
    } else {
        hint.textContent = 'Entrez le taux de conversion (combien vaut 1 unité de la devise source dans la devise cible)';
    }
}

// Add event listeners for currency changes
fromCurrencySelect.addEventListener('change', updateExchangeRateHint);
toCurrencySelect.addEventListener('change', updateExchangeRateHint);

// Validation functions
function validateForm() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const exchangeRate = parseFloat(exchangeRateInput.value);
    
    if (!amount || amount <= 0) {
        throw new Error('Veuillez entrer un montant valide supérieur à 0');
    }
    
    if (!fromCurrency) {
        throw new Error('Veuillez sélectionner une devise source');
    }
    
    if (!toCurrency) {
        throw new Error('Veuillez sélectionner une devise cible');
    }
    
    if (fromCurrency === toCurrency) {
        throw new Error('Les devises source et cible ne peuvent pas être identiques');
    }
    
    if (!exchangeRate || exchangeRate <= 0) {
        throw new Error('Veuillez entrer un taux de change valide supérieur à 0');
    }
    
    return { amount, fromCurrency, toCurrency, exchangeRate };
}

// Show/hide functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    result.style.display = 'none';
    
    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideError() {
    errorMessage.style.display = 'none';
}

function showResult(convertedAmount, data) {
    const fromCurrencyData = currencies[data.fromCurrency];
    const toCurrencyData = currencies[data.toCurrency];
    
    // Format the result with proper currency symbols
    const formattedOriginal = formatCurrency(data.amount, fromCurrencyData.symbol);
    const formattedResult = formatCurrency(convertedAmount, toCurrencyData.symbol);
    
    resultValue.innerHTML = `
        ${toCurrencyData.flag} ${formattedResult}
    `;
    
    resultDetails.innerHTML = `
        ${fromCurrencyData.flag} ${formattedOriginal} × ${data.exchangeRate} = ${toCurrencyData.flag} ${formattedResult}
        <br>
        <small>1 ${fromCurrencyData.symbol} = ${data.exchangeRate} ${toCurrencyData.symbol}</small>
    `;
    
    result.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Scroll to result
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideResult() {
    result.style.display = 'none';
}

// Currency formatting function
function formatCurrency(amount, symbol) {
    const formattedAmount = new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
    
    return `${formattedAmount} ${symbol}`;
}

// Conversion function
function convertCurrency(data) {
    return data.amount * data.exchangeRate;
}

// Add loading state
function setLoadingState(isLoading) {
    const form = document.querySelector('.converter-form');
    const button = document.querySelector('.convert-button');
    
    if (isLoading) {
        form.classList.add('loading');
        button.disabled = true;
    } else {
        form.classList.remove('loading');
        button.disabled = false;
    }
}

// Form submission handler
async function handleFormSubmission(event) {
    event.preventDefault();
    
    try {
        // Set loading state
        setLoadingState(true);
        
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Validate form
        const data = validateForm();
        
        // Perform conversion
        const convertedAmount = convertCurrency(data);
        
        // Show result
        showResult(convertedAmount, data);
        
    } catch (error) {
        showError(error.message);
    } finally {
        // Remove loading state
        setLoadingState(false);
    }
}

converterForm.addEventListener('submit', handleFormSubmission);

// Real-time validation feedback
function addInputValidation() {
    const inputs = [amountInput, exchangeRateInput];
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (this.value && (isNaN(value) || value <= 0)) {
                this.style.borderColor = 'var(--error)';
            } else {
                this.style.borderColor = '';
            }
        });
    });
}

// Initialize input validation
addInputValidation();

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter to submit form
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        converterForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape to clear results and errors
    if (event.key === 'Escape') {
        hideResult();
        hideError();
    }
    
    // Ctrl/Cmd + S to swap currencies
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        swapCurrencies();
    }
});

// Auto-focus on amount input when page loads
window.addEventListener('load', function() {
    amountInput.focus();
});

// Add smooth scrolling for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add click handler for logo/title to scroll to top
document.querySelector('.hero-title').addEventListener('click', smoothScrollToTop);

// Initialize exchange rate hint
updateExchangeRateHint();

// Add some preset conversion rates (optional feature)
const presetRates = {
    'euro-ariary': 4800,
    'dollar-ariary': 4500,
    'euro-dollar': 1.18,
    'dollar-euro': 0.85,
    'yen-dollar': 0.0091,
    'franc-euro': 0.92
};

// Auto-fill exchange rate based on common conversions
function autoFillExchangeRate() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const key = `${fromCurrency}-${toCurrency}`;
    const reverseKey = `${toCurrency}-${fromCurrency}`;
    
    if (presetRates[key] && !exchangeRateInput.value) {
        exchangeRateInput.value = presetRates[key];
        exchangeRateInput.style.background = 'rgba(16, 185, 129, 0.1)';
        setTimeout(() => {
            exchangeRateInput.style.background = '';
        }, 1000);
    } else if (presetRates[reverseKey] && !exchangeRateInput.value) {
        const reverseRate = (1 / presetRates[reverseKey]).toFixed(4);
        exchangeRateInput.value = reverseRate;
        exchangeRateInput.style.background = 'rgba(16, 185, 129, 0.1)';
        setTimeout(() => {
            exchangeRateInput.style.background = '';
        }, 1000);
    }
}

// Add event listeners for auto-fill
fromCurrencySelect.addEventListener('change', autoFillExchangeRate);
toCurrencySelect.addEventListener('change', autoFillExchangeRate);

console.log('💱 Convertisseur de Devises chargé avec succès!');
console.log('🔥 Fonctionnalités disponibles:');
console.log('   • Conversion entre 5 devises avec drapeaux');
console.log('   • Mode sombre/clair');
console.log('   • Animations fluides');
console.log('   • Validation en temps réel');
console.log('   • Raccourcis clavier (Ctrl+Enter, Ctrl+S, Escape)');
console.log('   • Taux de change prédéfinis pour certaines devises');
console.log('   • Navigation avec header et footer');
console.log('   • Design responsive et moderne');