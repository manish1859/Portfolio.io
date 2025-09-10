
      // Loading screen
      window.addEventListener('load', () => {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() => {
          loading.style.display = 'none';
        }, 500);
      });

      // Smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Navbar scroll effect
      window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
          nav.style.background = 'rgba(255, 255, 255, 0.98)';
          nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
          nav.style.background = 'rgba(255, 255, 255, 0.95)';
          nav.style.boxShadow = 'none';
        }
      });

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, observerOptions);

      // Observe skill cards
      document.querySelectorAll('.skill__card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
      });

      // Observe service cards
      document.querySelectorAll('.service__card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
      });

      // Observe portfolio cards
      document.querySelectorAll('.portfolio__card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
      });

      // Mobile menu toggle
      const menuBtn = document.getElementById('menu-btn');
      const navLinks = document.getElementById('nav-links');
      
      menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });

      // Typing effect for header
      const typingText = document.querySelector('.header__content h1');
      const originalText = typingText?.textContent || '';
      
      if (typingText) {
        typingText.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
          if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          }
        };
        
        setTimeout(typeWriter, 1500);
      }

      // Parallax effect for background elements
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.about__bg-1, .about__bg-2');
        
        parallaxElements.forEach((element, index) => {
          const speed = (index + 1) * 0.1;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });

      // Add hover effects to buttons
      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
        });
      });

      // Add click ripple effect
      document.querySelectorAll('.btn, .service__card, .portfolio__card').forEach(element => {
        element.addEventListener('click', function(e) {
          const ripple = document.createElement('div');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
          `;
          
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });

      // Add ripple animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .nav__links.active {
          display: flex;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          flex-direction: column;
          padding: 1rem 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
          .nav__links {
            display: none;
          }
          
          .nav__links.active {
            display: flex;
          }
        }
      `;
      document.head.appendChild(style);

      // Add scroll progress indicator
      const progressBar = document.createElement('div');
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        z-index: 9999;
        transition: width 0.3s ease;
      `;
      document.body.appendChild(progressBar);

      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      });

      // Add cursor trail effect
      const cursor = document.createElement('div');
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #6366f1, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease;
        opacity: 0;
      `;
      document.body.appendChild(cursor);

      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.7';
      });

      document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
      });

      // Add interactive hover effects for skill cards
      document.querySelectorAll('.skill__card').forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-15px) rotateY(5deg)';
          this.style.boxShadow = '0 25px 50px -12px rgba(99, 102, 241, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) rotateY(0deg)';
          this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
      });

      // Add loading animations for images
      document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
          this.style.opacity = '1';
          this.style.transform = 'scale(1)';
        });
        
        img.style.cssText += `
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.5s ease, transform 0.5s ease;
        `;
      });

      // Performance optimization: Throttle scroll events
      let ticking = false;
      
      function updateScrollEffects() {
        // Your scroll-based animations here
        ticking = false;
      }
      
      function requestTick() {
        if (!ticking) {
          requestAnimationFrame(updateScrollEffects);
          ticking = true;
        }
      }
      
      window.addEventListener('scroll', requestTick);

      console.log('🚀 Portfolio loaded successfully!');
      console.log('👨‍💻 Developed by Manish Singh Kushwah');
    