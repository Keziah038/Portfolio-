// ===== WELCOME SCREEN =====
window.addEventListener('load', () => {
  const welcome = document.getElementById('welcome-screen');
  if (welcome) {
    // Animate the loading bar
    const loadingProgress = document.querySelector('.loading-progress');
    if (loadingProgress) {
      loadingProgress.style.width = '100%';
    }
    
    // Hide welcome screen after animation
    setTimeout(() => {
      welcome.classList.add('hidden');
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 1500);
  }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
      }
    });
  });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const headerHeight = document.querySelector('.site-header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-pressed', 'false');
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.setAttribute('aria-pressed', 'true');
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      themeToggle.setAttribute('aria-pressed', 'false');
      localStorage.setItem('theme', 'light');
    }
  });
}

// ===== SKILLS ANIMATION =====
function animateSkills() {
  const skillProgresses = document.querySelectorAll('.skill-progress');
  
  skillProgresses.forEach(progress => {
    const width = progress.getAttribute('data-width');
    progress.style.width = width + '%';
  });
}

// Animate skills when they come into view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(skillsSection);
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== FORM SUBMISSION HANDLING =====
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    
    // Show success message
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.backgroundColor = 'var(--success)';
    
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.backgroundColor = '';
      contactForm.reset();
    }, 3000);
    
    // In a real application, you would send the form data to a server here
    console.log('Form submitted:', { name: formData.get('name'), email: formData.get('email'), subject: formData.get('subject'), message: formData.get('message') });
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('.newsletter-input');
    const email = emailInput.value;
    
    // Show success feedback
    const originalPlaceholder = emailInput.placeholder;
    emailInput.placeholder = 'Subscribed! Thank you!';
    emailInput.value = '';
    emailInput.style.borderColor = 'var(--success)';
    
    setTimeout(() => {
      emailInput.placeholder = originalPlaceholder;
      emailInput.style.borderColor = '';
    }, 3000);
    
    // In a real application, you would send the email to a newsletter service
    console.log('Newsletter subscription:', email);
  });
}

// ===== PROJECT CARD INTERACTIONS =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    
    if (window.pageYOffset >= (sectionTop - headerHeight - 50)) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// ===== PAGE LOAD ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
  // Animate elements on page load
  const animatedElements = document.querySelectorAll('.hero-text, .about-content, .skill-category, .project-card, .contact-item');
  
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape key
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    document.body.style.overflow = 'auto';
  }
  
  // Focus trap for mobile menu
  if (e.key === 'Tab' && navLinks && navLinks.classList.contains('active')) {
    const focusableElements = navLinks.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
});
console.log('Portfolio website loaded successfully!');