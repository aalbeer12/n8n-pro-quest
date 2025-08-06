// Centralized pricing variables for consistency across languages and components
export const PRICING_CONFIG = {
  // Core pricing
  FREE_CHALLENGES_PER_WEEK: 1,
  PRO_MONTHLY_PRICE: 19,
  PRO_ANNUAL_PRICE: 190,
  CURRENCY: 'EUR',
  CURRENCY_SYMBOL: '€',
  
  // Calculated values
  get SAVINGS_MONTHS() {
    return Math.floor((this.PRO_MONTHLY_PRICE * 12 - this.PRO_ANNUAL_PRICE) / this.PRO_MONTHLY_PRICE);
  },
  
  get SAVINGS_AMOUNT() {
    return this.PRO_MONTHLY_PRICE * 12 - this.PRO_ANNUAL_PRICE;
  },
  
  // Display strings
  get MONTHLY_DISPLAY() {
    return `${this.CURRENCY_SYMBOL}${this.PRO_MONTHLY_PRICE}`;
  },
  
  get ANNUAL_DISPLAY() {
    return `${this.CURRENCY_SYMBOL}${this.PRO_ANNUAL_PRICE}`;
  },
  
  get SAVINGS_DISPLAY() {
    return `${this.CURRENCY_SYMBOL}${this.SAVINGS_AMOUNT}`;
  }
} as const;

// Pricing content for translations
export const getPricingTranslations = (lang: 'en' | 'es') => {
  const common = {
    freeFeature1: `${PRICING_CONFIG.FREE_CHALLENGES_PER_WEEK} ${lang === 'es' ? 'reto semanal' : 'challenge per week'}`,
    proPrice: PRICING_CONFIG.MONTHLY_DISPLAY,
    annualPrice: PRICING_CONFIG.ANNUAL_DISPLAY,
    savingsFeature: `${PRICING_CONFIG.SAVINGS_MONTHS} ${lang === 'es' ? 'meses GRATIS' : 'months FREE'}`,
    savingsAmount: `${lang === 'es' ? 'Ahorra' : 'Save'} ${PRICING_CONFIG.SAVINGS_DISPLAY}`
  };
  
  return common;
};

export default PRICING_CONFIG;