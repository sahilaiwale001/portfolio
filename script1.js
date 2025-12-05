// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const scrollTopBtn = document.getElementById('scrollTop');

// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
  
  // Add animation to theme toggle
  themeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    themeToggle.style.transform = 'scale(1)';
  }, 150);
}

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    themeToggle.setAttribute('title', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  }
}

// Mobile Menu Toggle
function toggleMenu() {
  navMenu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
  
  // Update hamburger icon
  const icon = hamburger.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.className = 'fa-solid fa-times';
  } else {
    icon.className = 'fa-solid fa-bars';
  }
}

// Close mobile menu when clicking a link
function closeMenuOnClick() {
  if (window.innerWidth <= 768) {
    navMenu.classList.remove('active');
    hamburger.querySelector('i').className = 'fa-solid fa-bars';
    hamburger.setAttribute('aria-expanded', 'false');
  }
}

// Scroll to Top Button
function handleScroll() {
  // Show/hide scroll to top button
  if (scrollTopBtn) {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }
  
  // Animate skill bars on scroll
  animateSkillBars();
  
  // Animate stats on scroll
  animateStats();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Animate skill bars
function animateSkillBars() {
  const progressBars = document.querySelectorAll('.progress span');
  
  progressBars.forEach(bar => {
    const parent = bar.parentElement;
    const value = parent.getAttribute('data-value');
    
    // Check if element is in viewport
    const rect = parent.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isInView && !parent.classList.contains('animated')) {
      parent.classList.add('animated');
      setTimeout(() => {
        bar.style.width = `${value}%`;
      }, 300);
    }
  });
}

// Animate counting numbers
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(number => {
    const rect = number.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isInView && !number.classList.contains('animated')) {
      number.classList.add('animated');
      const target = parseInt(number.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        number.textContent = Math.floor(current);
      }, 16);
    }
  });
}

// Create floating particles
function createParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  
  const particleCount = window.innerWidth < 768 ? 15 : 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    // Random animation
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    container.appendChild(particle);
  }
}

// Contact Form Submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  if (!contactForm) return;
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMsg = document.getElementById('formMsg');
  
  // Validation
  if (!name || !email || !message) {
    showFormMessage('Please fill in all required fields.', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = contactForm.querySelector('.form-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Show success message
    showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
      if (formMsg) {
        formMsg.textContent = '';
        formMsg.className = 'form-message';
      }
    }, 5000);
  }, 1500);
}

function showFormMessage(text, type) {
  const formMsg = document.getElementById('formMsg');
  if (!formMsg) return;
  
  formMsg.textContent = text;
  formMsg.className = 'form-message';
  
  switch(type) {
    case 'success':
      formMsg.style.color = '#4CAF50';
      formMsg.style.background = 'rgba(76, 175, 80, 0.1)';
      formMsg.style.border = '1px solid #4CAF50';
      break;
    case 'error':
      formMsg.style.color = '#f44336';
      formMsg.style.background = 'rgba(244, 67, 54, 0.1)';
      formMsg.style.border = '1px solid #f44336';
      break;
  }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();
  
  // Create particles
  createParticles();
  
  // Event Listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenuOnClick);
  });
  
  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Scroll to top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
  }
  
  // Scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Initial animations
  handleScroll();
  
  // Add hover effects to cards
  document.querySelectorAll('.project, .skill, .about-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  // Re-create particles on resize
  const container = document.querySelector('.particles-container');
  if (container) {
    container.innerHTML = '';
    createParticles();
  }
});