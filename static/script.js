async function generateFlashcards() {
    const notes = document.getElementById('notes').value.trim();
    if (!notes) {
        alert('Please enter study notes!');
        return;
    }

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes })
        });
        if (!response.ok) throw new Error((await response.json()).error || 'Failed to generate flashcards');
        const questions = await response.json();

        const container = document.getElementById('flashcard-container');
        container.innerHTML = '';
        questions.forEach(q => {
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
        <div class="card shadow-sm h-100">
          <div class="card-body text-center">
            <div class="flashcard" onclick="this.querySelector('.flashcard-inner').classList.toggle('flipped')">
              <div class="flashcard-inner">
                <div class="flashcard-front p-3 bg-light">${q.question}</div>
                <div class="flashcard-back p-3 bg-info text-white">${q.answer}</div>
              </div>
            </div>
          </div>
        </div>
      `;
            container.appendChild(col);
        });
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Show modal with Bootstrap
function showModal(type) {
    const modal = new bootstrap.Modal(document.getElementById(`${type}-modal`));
    modal.show();
}

// Close modal with Bootstrap
function closeModal(type) {
    const modalEl = document.getElementById(`${type}-modal`);
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        if (response.ok) {
            window.location.reload();
        } else {
            alert(result.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            closeModal('register');
        } else {
            alert(result.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function logout() {
    try {
        const response = await fetch('/logout', { method: 'POST' });
        if (response.ok) {
            window.location.reload();
        } else {
            alert('Logout failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function initializePayment() {
    try {
        const response = await fetch('/initialize-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error((await response.json()).error || 'Failed to initialize payment');
        const { authorization_url } = await response.json();

        const handler = PaystackPop.setup({
            key: document.querySelector('[data-paystack-public-key]').getAttribute('data-paystack-public-key'),
            email: '{{ user.email }}',
            amount: 500, // Adjust amount for your currency
            currency: 'USD',
            onClose: () => {
                alert('Payment cancelled');
            },
            callback: async () => {
                const verifyResponse = await fetch('/payment-success', { method: 'POST' });
                const result = await verifyResponse.json();
                alert(result.message);
            }
        });
        handler.openIframe();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
