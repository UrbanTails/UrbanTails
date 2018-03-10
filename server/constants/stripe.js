const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_live_MY_SECRET_KEY'
    : 'sk_test_1fSHwPTuhT7Uvq5rpz7hFaNo';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;