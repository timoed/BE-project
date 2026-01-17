const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (amount, currency = 'myr', source, description) => {
    try {
        const charge = await stripe.charges.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            source,
            description
        });
        return { success: true, charge };
    } catch (error) {
        console.error("Stripe Error:", error);
        throw error;
    }
};

module.exports = { processPayment };
