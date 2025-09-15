// Currency Converter JavaScript

class CurrencyConverter {
    constructor() {
        this.apiKey = 'demo'; // Using demo key - in production, get a real API key from exchangerate-api.com
        this.baseUrl = 'https://v6.exchangerate-api.com/v6';
        this.exchangeRates = null;
        this.lastUpdate = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadInitialRates();
    }
    
    initializeElements() {
        this.amountInput = document.getElementById('amount');
        this.fromCurrency = document.getElementById('fromCurrency');
        this.toCurrency = document.getElementById('toCurrency');
        this.swapButton = document.getElementById('swapCurrencies');
        this.convertButton = document.getElementById('convertBtn');
        this.retryButton = document.getElementById('retryBtn');
        
        this.resultElement = document.getElementById('result');
        this.resultAmount = this.resultElement.querySelector('.result-amount');
        this.resultCurrency = this.resultElement.querySelector('.result-currency');
        this.exchangeRateElement = document.getElementById('exchangeRate');
        this.lastUpdatedElement = document.getElementById('lastUpdated');
        
        this.loadingElement = document.getElementById('loading');
        this.errorElement = document.getElementById('error');
    }
    
    attachEventListeners() {
        this.convertButton.addEventListener('click', () => this.convertCurrency());
        this.swapButton.addEventListener('click', () => this.swapCurrencies());
        this.retryButton.addEventListener('click', () => this.loadInitialRates());
        
        // Auto-convert when inputs change
        this.amountInput.addEventListener('input', () => this.debouncedConvert());
        this.fromCurrency.addEventListener('change', () => this.convertCurrency());
        this.toCurrency.addEventListener('change', () => this.convertCurrency());
        
        // Allow Enter key to trigger conversion
        this.amountInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.convertCurrency();
            }
        });
    }
    
    // Debounce function to avoid too many API calls while typing
    debouncedConvert() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.convertCurrency();
        }, 500);
    }
    
    async loadInitialRates() {
        this.showLoading();
        
        try {
            const response = await fetch(`${this.baseUrl}/demo/latest/USD`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.result === 'success') {
                this.exchangeRates = data.conversion_rates;
                this.lastUpdate = new Date();
                this.hideLoading();
                this.convertCurrency();
                this.updateLastUpdatedTime();
            } else {
                throw new Error(data['error-type'] || 'API Error');
            }
            
        } catch (error) {
            console.error('Error loading exchange rates:', error);
            this.showError();
            
            // Fallback to demo rates if API fails
            this.useFallbackRates();
        }
    }
    
    useFallbackRates() {
        // Fallback exchange rates (approximate values)
        this.exchangeRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73,
            JPY: 110,
            AUD: 1.35,
            CAD: 1.25,
            CHF: 0.92,
            CNY: 6.45,
            SEK: 8.85,
            NZD: 1.42
        };
        this.lastUpdate = new Date();
        this.hideError();
        this.convertCurrency();
        this.updateLastUpdatedTime();
    }
    
    convertCurrency() {
        const amount = parseFloat(this.amountInput.value) || 0;
        const fromCode = this.fromCurrency.value;
        const toCode = this.toCurrency.value;
        
        if (!this.exchangeRates || amount < 0) {
            return;
        }
        
        let convertedAmount;
        
        if (fromCode === 'USD') {
            // Converting from USD to another currency
            convertedAmount = amount * this.exchangeRates[toCode];
        } else if (toCode === 'USD') {
            // Converting to USD from another currency
            convertedAmount = amount / this.exchangeRates[fromCode];
        } else {
            // Converting between two non-USD currencies
            const usdAmount = amount / this.exchangeRates[fromCode];
            convertedAmount = usdAmount * this.exchangeRates[toCode];
        }
        
        // Update the display
        this.updateResult(convertedAmount, toCode);
        this.updateExchangeRate(fromCode, toCode, amount);
    }
    
    updateResult(amount, currency) {
        this.resultAmount.textContent = this.formatNumber(amount);
        this.resultCurrency.textContent = currency;
    }
    
    updateExchangeRate(fromCode, toCode, amount) {
        if (!this.exchangeRates) return;
        
        let rate;
        
        if (fromCode === 'USD') {
            rate = this.exchangeRates[toCode];
        } else if (toCode === 'USD') {
            rate = 1 / this.exchangeRates[fromCode];
        } else {
            const usdRate = 1 / this.exchangeRates[fromCode];
            rate = usdRate * this.exchangeRates[toCode];
        }
        
        this.exchangeRateElement.textContent = `1 ${fromCode} = ${this.formatNumber(rate)} ${toCode}`;
    }
    
    updateLastUpdatedTime() {
        if (this.lastUpdate) {
            const timeString = this.lastUpdate.toLocaleTimeString();
            this.lastUpdatedElement.textContent = `Last updated: ${timeString}`;
        }
    }
    
    swapCurrencies() {
        const fromValue = this.fromCurrency.value;
        const toValue = this.toCurrency.value;
        
        this.fromCurrency.value = toValue;
        this.toCurrency.value = fromValue;
        
        // Trigger conversion with swapped currencies
        this.convertCurrency();
    }
    
    formatNumber(number) {
        if (number === 0) return '0.00';
        
        // Handle very large numbers
        if (number >= 1000000) {
            return (number / 1000000).toFixed(2) + 'M';
        }
        
        // Handle very small numbers
        if (number < 0.01 && number > 0) {
            return number.toExponential(2);
        }
        
        // Regular formatting
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }
    
    showLoading() {
        this.loadingElement.style.display = 'flex';
        this.errorElement.style.display = 'none';
        this.resultElement.parentElement.style.opacity = '0.5';
    }
    
    hideLoading() {
        this.loadingElement.style.display = 'none';
        this.resultElement.parentElement.style.opacity = '1';
    }
    
    showError() {
        this.loadingElement.style.display = 'none';
        this.errorElement.style.display = 'block';
        this.resultElement.parentElement.style.opacity = '0.5';
    }
    
    hideError() {
        this.errorElement.style.display = 'none';
        this.resultElement.parentElement.style.opacity = '1';
    }
}

// Popular currency symbols for enhanced display
const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'Fr',
    CNY: '¥',
    SEK: 'kr',
    NZD: 'NZ$'
};

// Additional utility functions
function addCurrencySymbol(amount, currency) {
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${amount}`;
}

// Initialize the currency converter when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CurrencyConverter();
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}