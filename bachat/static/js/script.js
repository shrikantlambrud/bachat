
const startDateInput = document.getElementById('start_date');
const endDateInput = document.getElementById('end_date');

if (startDateInput && endDateInput) {
    startDateInput.addEventListener('change', function() {
        if (startDateInput.value) {
            endDateInput.min = startDateInput.value;
        }
    });

    endDateInput.addEventListener('change', function() {
        if (endDateInput.value && startDateInput.value && endDateInput.value < startDateInput.value) {
            alert('End date cannot be before start date.');
            endDateInput.value = ''; // Clear invalid date
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Example: Client-side validation for date inputs in loan application
    const startDateInput = document.getElementById('start_date');
    const endDateInput = document.getElementById('end_date');

    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', function() {
            if (startDateInput.value) {
                endDateInput.min = startDateInput.value;
            }
        });

        endDateInput.addEventListener('change', function() {
            if (endDateInput.value && startDateInput.value && endDateInput.value < startDateInput.value) {
                alert('End date cannot be before start date.');
                endDateInput.value = ''; // Clear invalid date
            }
        });
    }

    // Dynamic display of current date for payment button context
    const paymentDateInfo = document.getElementById('payment-date-info');
    if (paymentDateInfo) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Months are 0-indexed
        const year = today.getFullYear();
        paymentDateInfo.textContent = `Today's Date: ${day}/${month}/${year}`;
    }

    // --- UPI Payment Logic ---
    const initiatePaymentBtn = document.getElementById('initiatePaymentBtn');
    const upiPaymentModal = document.getElementById('upiPaymentModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    const amountInput = document.getElementById('amount');
    const modalAmountSpan = document.getElementById('modalAmount');
    const upiAppLink = document.getElementById('upiAppLink');
    const qrCodeImage = document.getElementById('qrCodeImage');
    const contributionForm = document.getElementById('contributionForm');

    if (initiatePaymentBtn && upiPaymentModal && closeModalBtn && confirmPaymentBtn && amountInput && modalAmountSpan && upiAppLink && qrCodeImage && contributionForm) {
        initiatePaymentBtn.addEventListener('click', function() {
            const amount = amountInput.value;
            if (!amount || parseFloat(amount) <= 0) {
                alert('Please enter a valid contribution amount.');
                return;
            }

            // Display amount in modal
            modalAmountSpan.textContent = `₹${parseFloat(amount).toFixed(2)}`;

            // Construct UPI deep link (example VPA, replace with actual)

            // In a real scenario, merchant code (mc), transaction ID (tid), transaction reference (tr)
            // would be dynamically generated and managed by your backend/payment gateway.
            // For demonstration, using placeholders.
            const merchantVPA = 'your_merchant_vpa@bank'; // Replace with actual VPA
            const merchantName = 'BachatGat';
            const transactionId = `TXN${Date.now()}`; // Simple unique ID for demonstration
            const transactionRef = `REF${Date.now()}`; // Simple unique reference

            const upiUrl = `upi://pay?pa=${merchantVPA}&pn=${encodeURIComponent(merchantName)}&mc=0000&tid=${transactionId}&tr=${transactionRef}&am=${parseFloat(amount).toFixed(2)}&cu=INR`;

            upiAppLink.href = upiUrl;

            // For dynamic QR code generation, you would typically call a backend API
            // or use a client-side library. For this example, it's a placeholder.
            // Example of a public QR code API (for demonstration, not for production with sensitive data):
            // const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
            // qrCodeImage.src = qrCodeApiUrl;
            // Using a static placeholder image as per previous instructions for safety/simplicity
            qrCodeImage.src = `https://placehold.co/200x200/E0F2FE/0369A1?text=Scan+QR+Code`;


            // Show the modal
            upiPaymentModal.classList.remove('hidden');
        });

        closeModalBtn.addEventListener('click', function() {
            upiPaymentModal.classList.add('hidden');
        });

        confirmPaymentBtn.addEventListener('click', function() {
            // This button will now submit the form to record the payment in the database.
            // In a real application, you might have a more robust way to verify
            // if the UPI payment was successful before submitting.
            upiPaymentModal.classList.add('hidden'); // Hide modal
            contributionForm.submit(); // Submit the form to the Flask backend
        });

        // Optional: Close modal if clicked outside (simple implementation)
        upiPaymentModal.addEventListener('click', function(event) {
            if (event.target === upiPaymentModal) {
                upiPaymentModal.classList.add('hidden');
            }
        });
    }
});
