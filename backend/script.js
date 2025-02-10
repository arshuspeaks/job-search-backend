document.addEventListener('DOMContentLoaded', () => {
    // Handle user registration
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.token) {
                alert('Registration successful!');
            } else {
                alert(data.error || 'Registration failed');
            }
        });
    }

    // Handle user login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            } else {
                alert(data.error || 'Login failed');
            }
        });
    }

    // Handle job posting
    const postJobForm = document.getElementById('postJobForm');
    if (postJobForm) {
        postJobForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const company = document.getElementById('company').value;
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Please log in to post a job.');
                return;
            }

            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, company, location, description }),
            });

            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert('Job posted successfully!');
            }
        });
    }
});
