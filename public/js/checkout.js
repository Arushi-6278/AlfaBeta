function checkFormValidity() {
    const plan = document.querySelector('input[name="plan"]:checked');
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expDate = document.getElementById('exp-date').value;
    const securityCode = document.getElementById('security-code').value;

    const isFormValid = plan && country && state && cardName && cardNumber && expDate && securityCode;
    document.getElementById('start-subscription').disabled = !isFormValid;
}

function startSubscription() {
    localStorage.setItem('subscriptionActive', 'true');
    updateUIForSubscriptionStatus();
    window.location.href = "payment.html";
}

function updateUIForSubscriptionStatus() {
    const subscriptionActive = localStorage.getItem('subscriptionActive') === 'true';
    const checkoutDetails = document.getElementById('checkout-details');
    const startSubscriptionButton = document.getElementById('start-subscription');
    const subscriptionStatus = document.getElementById('subscription-status');
    const subscriptionInfo = document.getElementById('subscription-info');

    if (subscriptionActive) {
        checkoutDetails.classList.add('hidden');
        startSubscriptionButton.classList.add('hidden');
        subscriptionStatus.textContent = 'You have an active subscription.';
        subscriptionInfo.classList.add('hidden');
    } else {
        checkoutDetails.classList.remove('hidden');
        startSubscriptionButton.classList.remove('hidden');
        subscriptionStatus.textContent = 'Yearly access:';
        subscriptionInfo.classList.remove('hidden');
    }
}

document.querySelectorAll('input, select').forEach((elem) => {
    elem.addEventListener('input', checkFormValidity);
});

document.querySelectorAll('input[name="plan"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        let value = event.target.value;
        let totalElement = document.querySelector('.summary .total');
        if (value === 'monthly') {
            totalElement.textContent = '₹1,039/mo';
        } else {
            totalElement.textContent = '₹10,200/year';
        }
        checkFormValidity();
    });
});

document.getElementById('new-card').addEventListener('change', function() {
    let paymentSection = document.getElementById('payment-method-section');
    if (this.checked) {
        paymentSection.classList.add('expanded');
    } else {
        paymentSection.classList.remove('expanded');
    }
    checkFormValidity();
});

// Initial expand on page load
document.getElementById('payment-method-section').classList.add('expanded');

// Update UI based on subscription status on page load
window.onload = updateUIForSubscriptionStatus;