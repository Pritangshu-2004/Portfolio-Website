// Loader fade out
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
    }, 600);
  }, 1200);
});

// Navbar animation and section switching
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');
const navAnim = document.querySelector('.nav-anim');

function setNavAnim(link) {
  const rect = link.getBoundingClientRect();
  const parentRect = link.parentElement.parentElement.getBoundingClientRect();
  navAnim.style.width = rect.width + 'px';
  navAnim.style.left = (rect.left - parentRect.left) + 'px';
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    sections.forEach(sec => sec.classList.remove('active'));
    const target = document.querySelector(link.getAttribute('href'));
    if(target) target.classList.add('active');
    setNavAnim(link);
    window.scrollTo({top:0,behavior:'smooth'});
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const activeLink = document.querySelector('.nav-links a.active');
  if(activeLink) setNavAnim(activeLink);
});
window.addEventListener('resize', () => {
  const activeLink = document.querySelector('.nav-links a.active');
  if(activeLink) setNavAnim(activeLink);
});

// Network nodes background animation
const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');
let nodes = [];
const nodeCount = 38;
const linkDist = 140;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
function randomNode() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7,
    r: 2 + Math.random() * 2
  };
}
function initNodes() {
  nodes = [];
  for(let i=0;i<nodeCount;i++) nodes.push(randomNode());
}
initNodes();
function drawNetwork() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // Draw links
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist < linkDist){
        ctx.save();
        ctx.globalAlpha = 1 - dist/linkDist;
        ctx.strokeStyle = 'rgba(0,242,254,0.7)';
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  // Draw nodes
  for(const node of nodes){
    ctx.save();
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}
function updateNodes() {
  for(const node of nodes){
    node.x += node.vx;
    node.y += node.vy;
    if(node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if(node.y < 0 || node.y > canvas.height) node.vy *= -1;
  }
}
function animateNetwork() {
  updateNodes();
  drawNetwork();
  requestAnimationFrame(animateNetwork);
}
animateNetwork();
// Re-init nodes on resize
window.addEventListener('resize', () => {
  initNodes();
});
// Contact form fake submit
const contactForm = document.querySelector('.contact-form');
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.reset();
    alert('Message sent! (Not really, this is a demo.)');
  });
}

// Add this to script.js for about section animations
// Add to script.js for cyber effects
document.addEventListener('DOMContentLoaded', function() {
  // Create binary rain
  function createBinaryRain() {
    const binaryRain = document.querySelector('.binary-rain');
    if (!binaryRain) return;
    
    const characters = '01';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
      const span = document.createElement('span');
      span.style.left = `${(i * 20) + (Math.random() * 20)}px`;
      span.style.animationDuration = `${5 + Math.random() * 10}s`;
      span.style.animationDelay = `${Math.random() * 5}s`;
      
      let binaryString = '';
      for (let j = 0; j < 20; j++) {
        binaryString += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      span.textContent = binaryString;
      binaryRain.appendChild(span);
    }
  }
  
  // Cyber node hover effects
  const cyberNodes = document.querySelectorAll('.cyber-node');
  cyberNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const icon = node.querySelector('.node-icon');
      if (icon) {
        icon.style.animation = 'pulse 0.5s';
        setTimeout(() => {
          icon.style.animation = '';
        }, 500);
      }
    });
  });
  
  // Animate cyber card on load
  const cyberCard = document.querySelector('.cyber-card');
  if (cyberCard) {
    cyberCard.style.opacity = '0';
    cyberCard.style.transform = 'translateY(50px)';
    cyberCard.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    setTimeout(() => {
      cyberCard.style.opacity = '1';
      cyberCard.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // Animate nodes sequentially
  cyberNodes.forEach((node, index) => {
    node.style.opacity = '0';
    node.style.transform = 'scale(0.8)';
    node.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.2}s`;
    
    setTimeout(() => {
      node.style.opacity = '1';
      node.style.transform = 'scale(1)';
    }, 500 + (index * 200));
  });
  
  // Initialize effects
  createBinaryRain();
  
  // Add pulse animation to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});

// Add this to your existing script.js file

// Function to animate skill bars when they come into view
function animateSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  // Reset all skill levels to 0% width initially
  skillLevels.forEach(level => {
    level.style.width = '0%';
  });
  
  // Create an intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the skill level value from the CSS variable
        const targetWidth = entry.target.style.getPropertyValue('--level');
        
        // Animate to the target width
        setTimeout(() => {
          entry.target.style.width = targetWidth;
        }, 200);
        
        // Unobserve after animation to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Observe all skill levels
  skillLevels.forEach(level => {
    observer.observe(level);
  });
}

// Random circuit pattern effect for cyber nodes
function addCircuitPatterns() {
  const cyberNodes = document.querySelectorAll('.cyber-node');
  
  cyberNodes.forEach(node => {
    // Add data points that look like circuit connections
    for (let i = 0; i < 5; i++) {
      const dataPoint = document.createElement('div');
      dataPoint.className = 'data-point';
      dataPoint.style.top = `${Math.random() * 100}%`;
      dataPoint.style.left = `${Math.random() * 100}%`;
      dataPoint.style.animationDelay = `${Math.random() * 5}s`;
      node.appendChild(dataPoint);
    }
  });
}

// Add hover effect for skill bars
function addSkillBarInteractivity() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  skillBars.forEach(bar => {
    bar.addEventListener('mouseenter', () => {
      const level = bar.querySelector('.skill-level');
      if (level) {
        level.style.boxShadow = '0 0 15px rgba(0, 242, 254, 1)';
      }
    });
    
    bar.addEventListener('mouseleave', () => {
      const level = bar.querySelector('.skill-level');
      if (level) {
        level.style.boxShadow = '0 0 8px rgba(0, 242, 254, 0.5)';
      }
    });
  });
}

// Execute these functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add this to your existing DOMContentLoaded event listener
  animateSkillBars();
  addCircuitPatterns();
  addSkillBarInteractivity();
  
  // Additional CSS for the data points
  const style = document.createElement('style');
  style.textContent = `
    .data-point {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #00f2fe;
      border-radius: 50%;
      opacity: 0.6;
      z-index: 1;
      box-shadow: 0 0 5px #00f2fe;
      animation: data-pulse 3s infinite;
    }
    
    @keyframes data-pulse {
      0% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.5); opacity: 1; }
      100% { transform: scale(1); opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);
});

window.addEventListener("DOMContentLoaded", function() {
  const phrases = [
    "Software developer",
    "Python developer",
    "Website Designer"
  ];
  const el = document.getElementById("typewriter-text");
  let phraseIndex = 0;
  let charIndex = 0;
  let typing = true;

  function type() {
    if (!el) return;
    if (typing) {
      if (charIndex < phrases[phraseIndex].length) {
        el.textContent = phrases[phraseIndex].slice(0, charIndex + 1);
        charIndex++;
        setTimeout(type, 80);
      } else {
        typing = false;
        setTimeout(type, 1200);
      }
    } else {
      if (charIndex > 0) {
        el.textContent = phrases[phraseIndex].slice(0, charIndex - 1);
        charIndex--;
        setTimeout(type, 40);
      } else {
        typing = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
      }
    }
  }
  type();
});

// Add this to your existing script.js file

// Initialize project cards with staggered entrance animation
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    // Set initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.15}s`;
    
    // Animate in when visible
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 300 + (index * 150));
  });
}

// Add interactive scan effect on project cards
function addProjectCardEffects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Mouse move effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update hologram effect based on mouse position
      const hologram = card.querySelector('.card-hologram');
      if (hologram) {
        hologram.style.background = `
          radial-gradient(
            circle at ${x}px ${y}px,
            rgba(0, 242, 254, 0.2) 0%,
            rgba(79, 172, 254, 0.1) 20%,
            rgba(24, 28, 36, 0.05) 100%
          )
        `;
      }
      
      // Create subtle tilt effect based on mouse position
      const xPercent = (x / rect.width - 0.5) * 4;
      const yPercent = (y / rect.height - 0.5) * 4;
      card.style.transform = `translateY(-5px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg)`;
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      
      const hologram = card.querySelector('.card-hologram');
      if (hologram) {
        hologram.style.background = `
          linear-gradient(
            135deg,
            rgba(0, 242, 254, 0.05) 0%,
            rgba(79, 172, 254, 0.05) 50%,
            rgba(254, 79, 188, 0.05) 100%
          )
        `;
      }
    });
  });
}

// Create data lines effect for projects section
function createDataLines() {
  const projectsContainer = document.querySelector('.projects-container');
  if (!projectsContainer) return;
  
  const dataLinesContainer = document.createElement('div');
  dataLinesContainer.className = 'data-lines';
  
  // Create vertical and horizontal lines
  for (let i = 0; i < 4; i++) {
    const vLine = document.createElement('div');
    vLine.className = 'data-line vertical';
    vLine.style.left = `${20 + (i * 20)}%`;
    vLine.style.animationDelay = `${i * 0.2}s`;
    dataLinesContainer.appendChild(vLine);
    
    const hLine = document.createElement('div');
    hLine.className = 'data-line horizontal';
    hLine.style.top = `${15 + (i * 25)}%`;
    hLine.style.animationDelay = `${i * 0.3}s`;
    dataLinesContainer.appendChild(hLine);
  }
  
  projectsContainer.appendChild(dataLinesContainer);
  
  // Add CSS for data lines
  const style = document.createElement('style');
  style.textContent = `
    .data-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    
    .data-line {
      position: absolute;
      background: rgba(0, 242, 254, 0.1);
    }
    
    .data-line.vertical {
      width: 1px;
      height: 100%;
      top: 0;
    }
    
    .data-line.horizontal {
      height: 1px;
      width: 100%;
      left: 0;
    }
    
    /* Pulse animation for data lines */
    @keyframes data-line-pulse {
      0% { opacity: 0.1; }
      50% { opacity: 0.3; }
      100% { opacity: 0.1; }
    }
    
    .data-line {
      animation: data-line-pulse 4s infinite;
    }
  `;
  document.head.appendChild(style);
}

// Dynamically set status color based on status text
function setProjectStatus() {
  const statusElements = document.querySelectorAll('.project-status');
  
  statusElements.forEach(status => {
    const statusText = status.querySelector('.status-text').textContent.trim().toLowerCase();
    const statusDot = status.querySelector('.status-dot');
    
    if (statusText === 'completed') {
      statusDot.style.background = '#00f2fe';
    } else if (statusText === 'in progress') {
      statusDot.style.background = '#fe4fbc';
    } else if (statusText === 'planned') {
      statusDot.style.background = '#fec94f';
    }
  });
}

// Execute these functions when the projects section becomes visible
document.addEventListener('DOMContentLoaded', function() {
  // Initialization
  initProjectCards();
  setProjectStatus();
  createDataLines();
  
  // Interactive effects
  setTimeout(() => {
    addProjectCardEffects();
  }, 1000); // Add a delay to ensure cards are visible
  
  // Handle navigation to projects section
  const projectsNavLink = document.querySelector('a[href="#projects"]');
  if (projectsNavLink) {
    projectsNavLink.addEventListener('click', () => {
      setTimeout(() => {
        initProjectCards(); // Re-trigger animations when navigating to section
      }, 300);
    });
  }
});

