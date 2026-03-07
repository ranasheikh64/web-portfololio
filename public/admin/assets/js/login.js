// Check if already logged in
if (localStorage.getItem('token')) {
    window.location.href = '/admin/';
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');
    const submitBtn = e.target.querySelector('button');

    submitBtn.disabled = true;
    submitBtn.innerText = 'Loging in...';
    errorDiv.style.display = 'none';

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('admin', JSON.stringify(data.admin));
            window.location.href = '/admin/';
        } else {
            errorDiv.innerText = data.message || 'Login failed';
            errorDiv.style.display = 'block';
        }
    } catch (err) {
        errorDiv.innerText = 'Server error. Please try again.';
        errorDiv.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Log In';
    }
});
