// Main JavaScript file for the job portal

// Add any global JavaScript logic here

// Example: Function to check user login status
function checkUserLogin() {
    fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            alert('You must be logged in to access this feature.');
            window.location.href = '/login.html'; // Redirect to login page
        }
    });
}

// Call the function to check user login status on page load
document.addEventListener('DOMContentLoaded', checkUserLogin);
