
// Initialize page animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.content-section p, .content-section h2, .content-section h3');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});


// Login Form Handler
const loginForm = document.getElementById('login-form');
if (loginForm) {
    const errorMessage = document.getElementById('error-message');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'naitbeats' && password === 'Palestine2024') {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'admin.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
        }
    });
}

// Admin Page Protection
if (window.location.pathname.includes('admin.html')) {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

// Fundraiser Management
const fundraiserForm = document.getElementById('fundraiser-form');
const fundraiserList = document.getElementById('fundraiser-list');

function loadFundraisers() {
    const fundraisers = JSON.parse(localStorage.getItem('fundraisers') || '[]');
    if (fundraiserList) {
        fundraiserList.innerHTML = fundraisers.map((f, i) => `
            <div class="fundraiser-item">
                <h3>${f.title}</h3>
                <p>${f.description}</p>
                <p>Raised: $${f.raised} / Goal: $${f.goal}</p>
                <button onclick="deleteFundraiser(${i})">Delete</button>
            </div>
        `).join('');
    }
    updateCampaignsPage(fundraisers);
}

function updateCampaignsPage(fundraisers) {
    const campaignsGrid = document.querySelector('.fundraiser-grid');
    if (campaignsGrid) {
        campaignsGrid.innerHTML = fundraisers.map(f => `
            <article class="fundraiser-card palestine-card">
                <div class="palestine-symbol">
                    <div class="crescent-moon"></div>
                    <div class="olive-branch"></div>
                </div>
                <div class="fundraiser-content">
                    <h2>${f.title}</h2>
                    <p>${f.description}</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(f.raised/f.goal * 100)}%"></div>
                    </div>
                    <div class="fundraiser-stats">
                        <span>Raised: $${f.raised}</span>
                        <span>Goal: $${f.goal}</span>
                    </div>
                    <a href="${f.link}" class="donate-button" target="_blank">Donate Now</a>
                </div>
            </article>
        `).join('');
    }
}

function deleteFundraiser(index) {
    const fundraisers = JSON.parse(localStorage.getItem('fundraisers') || '[]');
    fundraisers.splice(index, 1);
    localStorage.setItem('fundraisers', JSON.stringify(fundraisers));
    loadFundraisers();
}

if (fundraiserForm) {
    fundraiserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fundraisers = JSON.parse(localStorage.getItem('fundraisers') || '[]');
        fundraisers.push({
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            link: document.getElementById('link').value,
            raised: parseFloat(document.getElementById('raised').value),
            goal: parseFloat(document.getElementById('goal').value)
        });
        localStorage.setItem('fundraisers', JSON.stringify(fundraisers));
        fundraiserForm.reset();
        loadFundraisers();
    });
}

// Load fundraisers on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add page transition class to main elements
    document.querySelectorAll('main, section, .content-section').forEach(el => {
        el.classList.add('page-transition');
    });
    
    // Add shimmer effect while loading
    const addShimmerEffect = (element) => {
        if (element) {
            element.classList.add('shimmer');
            setTimeout(() => element.classList.remove('shimmer'), 1000);
        }
    };

    // Add loading animations to dynamic content
    const fundraiserGrid = document.querySelector('.fundraiser-grid');
    if (fundraiserGrid) {
        addShimmerEffect(fundraiserGrid);
    }

    // Initial load
    loadFundraisers();
    
    // Refresh campaigns every 2 seconds
    setInterval(loadFundraisers, 2000);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        window.location.href = 'login.html';
    });
}

