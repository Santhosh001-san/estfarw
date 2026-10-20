/**
 * ==========================================================================
 * ESTELLE "COMMANDER" FAREWELL TRIBUTE - SHARED SCRIPT
 * Configuration, Canvas Starfield, Typewriter & Interactions
 * ==========================================================================
 */

// ==========================================================================
// 1. EDITABLE CONFIGURATION OBJECT
// Customize names, memories, and letter contents here without editing HTML!
// ==========================================================================
const SITE_CONFIG = {
  recipient: {
    name: "Estelle",
    callsign: "Commander",
    subtitle: "For Estelle, My Commander 🌙"
  },

  // Farewell Letter Content (Displayed on letter.html and downloaded on goodbye.html)
  letter: {
    salutation: "To Estelle, my Commander 🌙",
    paragraphs: [
      "Hey, Commander…",
      "I don't really know how to put everything into words, but I wanted to make this little corner of the internet just for you.",
      "Maybe one day, we'll stop talking here. Maybe this little part of our daily lives will become a memory. And maybe things won't always be the way they are now.",
      "But I don't want this goodbye to feel like all those moments meant nothing.",
      "You became someone special to me in a way I never really planned. The conversations, the little moments, the smiles, and even the ordinary days — they all became a part of a memory I'll carry with me.",
      "If this is the end of this chapter, I hope you know that I'm genuinely glad our paths crossed.",
      "Every single day I spent talking with you will always stay alive in my heart. I really hope you won't forget me, Commander.",
      "Please take good care of your health, and most importantly, take good care of your family and everyone around you. All the good things you are setting out to do will definitely happen for the best, so no matter what anyone says, please don't let it worry you. Just take good care of yourself and the people with you—everything good will happen.",
      "And more than that... one day, please come visit my home, Commander. If possible, bring your family along too! It might not be as big or grand as your home, but I think you'll truly like it. I'll take you around and show you all the wonderful places I know, and if I ever come over there, you have to promise to show me around too, okay?",
      "You don't owe me anything, Commander. No promises, no explanations, no pressure. I just wanted you to leave this little place knowing that you mattered.",
      "And wherever life takes you next, I hope you find happiness, peace, beautiful people, and a thousand little reasons to smile.",
      "Thank you for being my Estelle. Thank you for being my Commander.",
      "Maybe this is goodbye to a place, not to the memories it gave us.",
      "Take care of yourself, okay?"
    ],
    closing: "— Someone who will remember this chapter fondly. 💙"
  },

  // Editable Memory Cards (Displayed below the letter on letter.html)
  memories: [
    {
      id: "little-things",
      title: "The Little Things",
      tag: "Small Bright Sparks",
      icon: "✨",
      text: "[Editable Memory Placeholder] The unexpected laughs, random check-ins, and shared thoughts that turned ordinary days into something genuinely warmer and brighter."
    },
    {
      id: "moments-worth-keeping",
      title: "Moments Worth Keeping",
      tag: "Unforgettable",
      icon: "🌌",
      text: "[Editable Memory Placeholder] Honest conversations, mutual support, and having someone who truly understood without needing a million explanations."
    },
    {
      id: "chapter-remembered",
      title: "A Chapter I'll Remember",
      tag: "Lasting Impression",
      icon: "📖",
      text: "[Editable Memory Placeholder] Walking away with nothing but gratitude and fondness for having crossed paths with you and cheered for you, Commander."
    }
  ],

  // Sequential Goodbye Messages (goodbye.html)
  goodbyeSequence: [
    "Some chapters end...",
    "Some memories stay...",
    "And some people will always have a special place in our story."
  ],

  finalFarewell: "Take care, Commander. Wherever life takes you, I hope it gives you countless reasons to smile. 💙",

  // Surprise for Commander (goodbye.html)
  surprise: {
    buttonLabel: "Surprise, Commander 🎁",
    badge: "A Little Secret",
    title: "A Little Surprise For You, Commander 🌙",
    lines: [
      "Commander, you've never actually seen what I look like, right? 🌙",
      "There's a little button down below... go ahead and take a peek if you're curious.",
      "Fair warning though haha: I'm definitely not some handsome prince or model—just a very ordinary, average guy. But well... here I am. 🙂"
    ],
    photoSrc: "assets/my-photo.jpg",
    fallbackPhotoSrc: "assets/placeholder-avatar.svg",
    photoCaption: "No matter how you look, you will always be beautiful to me, Commander. That's why you never need to send me your photo—just having my picture with you is more than enough. Whether you choose to keep it safe or not is entirely up to you. 💙\n\nAlso, I completely forgot to tell you one funny thing, Commander… this is honestly the single only decent photo I had of myself! 😅 All my other pictures look terrible haha. Even this one was taken back when I finished my internship, on the graduation day celebration held at that company. Aside from this, the only good photos I have are from when I was a little kid—I really don't have any other nice photos, Commander, sorry! 😔🫡"
  }
};

// Make config globally accessible
window.SITE_CONFIG = SITE_CONFIG;

// ==========================================================================
// 2. CANVAS STARFIELD ENGINE
// Supports ambient twinkling (Pages 1 & 2) and upward drift (Page 3)
// Respects prefers-reduced-motion
// ==========================================================================
class Starfield {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.mode = options.mode || 'ambient'; // 'ambient' or 'upward'
    this.stars = [];
    this.shootingStars = [];
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isRunning = false;
    this.animationId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Listen for changes in reduced motion preference
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        this.shootingStars = [];
      }
    });

    this.createStars();
    this.start();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    // Recreate stars on significant size changes
    if (this.stars.length === 0 || Math.abs(this.stars.length - this.getStarCount()) > 50) {
      this.createStars();
    }
  }

  getStarCount() {
    const area = this.width * this.height;
    // Scale density based on screen size
    if (this.mode === 'upward') {
      return Math.floor(Math.min(220, Math.max(90, area / 5500)));
    }
    return Math.floor(Math.min(260, Math.max(100, area / 4800)));
  }

  createStars() {
    const count = this.getStarCount();
    this.stars = [];

    for (let i = 0; i < count; i++) {
      const isUpward = this.mode === 'upward';
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        // For upward drift (goodbye.html)
        speedY: isUpward ? -(Math.random() * 0.45 + 0.15) : (Math.random() * 0.08 - 0.04),
        speedX: isUpward ? (Math.random() * 0.1 - 0.05) : (Math.random() * 0.08 - 0.04),
        color: this.getRandomStarColor()
      });
    }
  }

  getRandomStarColor() {
    const colors = [
      'rgba(240, 244, 255, ',   // Silver White
      'rgba(196, 181, 253, ',   // Soft Lavender
      'rgba(167, 139, 250, ',   // Radiant Purple
      'rgba(147, 197, 253, ',   // Pale Starlight Blue
      'rgba(255, 255, 255, '    // Pure Diamond White
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  spawnShootingStar() {
    if (this.reducedMotion || this.shootingStars.length > 1) return;

    // Shooting stars appear across the upper atmosphere
    const startX = Math.random() * (this.width * 0.85);
    const startY = Math.random() * (this.height * 0.45);
    const length = Math.random() * 90 + 70;
    const speed = Math.random() * 8 + 6;
    const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // ~45 degrees

    this.shootingStars.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      length: length,
      life: 0,
      maxLife: 45 + Math.random() * 20,
      opacity: 1
    });
  }

  update() {
    // Star updates
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];

      if (!this.reducedMotion) {
        // Twinkle
        star.alpha += star.twinkleSpeed;
        if (star.alpha >= 1 || star.alpha <= star.baseAlpha * 0.3) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Drift motion
        star.y += star.speedY;
        star.x += star.speedX;

        // Wrap around boundaries
        if (this.mode === 'upward') {
          if (star.y < -5) {
            star.y = this.height + 5;
            star.x = Math.random() * this.width;
          }
        } else {
          if (star.y < -5) star.y = this.height + 5;
          if (star.y > this.height + 5) star.y = -5;
          if (star.x < -5) star.x = this.width + 5;
          if (star.x > this.width + 5) star.x = -5;
        }
      }
    }

    // Shooting stars update (Pages 1 & 2 mainly)
    if (!this.reducedMotion && this.mode !== 'upward') {
      // Small random chance to spawn a meteor
      if (Math.random() < 0.008) {
        this.spawnShootingStar();
      }

      for (let i = this.shootingStars.length - 1; i >= 0; i--) {
        const meteor = this.shootingStars[i];
        meteor.x += meteor.dx;
        meteor.y += meteor.dy;
        meteor.life++;

        if (meteor.life > meteor.maxLife * 0.6) {
          meteor.opacity = 1 - (meteor.life - meteor.maxLife * 0.6) / (meteor.maxLife * 0.4);
        }

        if (meteor.life >= meteor.maxLife) {
          this.shootingStars.splice(i, 1);
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw regular twinkling stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      const alpha = Math.max(0.1, Math.min(1, star.alpha));

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${star.color}${alpha})`;
      this.ctx.fill();

      // Soft glow for larger stars
      if (star.radius > 1.2) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
        this.ctx.fillStyle = `${star.color}${alpha * 0.25})`;
        this.ctx.fill();
      }
    }

    // Draw shooting stars
    for (let i = 0; i < this.shootingStars.length; i++) {
      const meteor = this.shootingStars[i];
      const tailX = meteor.x - (meteor.dx / Math.hypot(meteor.dx, meteor.dy)) * meteor.length;
      const tailY = meteor.y - (meteor.dy / Math.hypot(meteor.dx, meteor.dy)) * meteor.length;

      const gradient = this.ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
      gradient.addColorStop(0, 'rgba(167, 139, 250, 0)');
      gradient.addColorStop(0.7, `rgba(196, 181, 253, ${0.4 * meteor.opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${meteor.opacity})`);

      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(meteor.x, meteor.y);
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 1.8;
      this.ctx.stroke();

      // Meteor head glow
      this.ctx.beginPath();
      this.ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
      this.ctx.fill();
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = () => {
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };

    loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ==========================================================================
// 3. TYPEWRITER EFFECT ENGINE (letter.html)
// ==========================================================================
class LetterTypewriter {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.paragraphs = options.paragraphs || SITE_CONFIG.letter.paragraphs;
    this.closing = options.closing || SITE_CONFIG.letter.closing;
    this.speed = options.speed || 18; // ms per character
    this.isComplete = false;
    this.currentParaIndex = 0;
    this.currentCharIndex = 0;
    this.timeoutId = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.cursor = document.createElement('span');
    this.cursor.className = 'typewriter-cursor';
    this.cursor.setAttribute('aria-hidden', 'true');

    this.readAllBtn = document.getElementById(options.readAllBtnId || 'btnReadAll');
    this.statusText = document.getElementById(options.statusTextId || 'letterStatusText');

    this.init();
  }

  init() {
    if (this.readAllBtn) {
      this.readAllBtn.addEventListener('click', () => this.revealAll());
    }

    if (this.reducedMotion) {
      this.revealAll();
    } else {
      this.startTyping();
    }
  }

  startTyping() {
    this.container.innerHTML = '';
    this.currentParaEl = document.createElement('p');
    this.container.appendChild(this.currentParaEl);
    this.currentParaEl.appendChild(this.cursor);

    if (this.statusText) {
      this.statusText.textContent = "Commander's letter is unfolding…";
    }

    this.typeNextChar();
  }

  typeNextChar() {
    if (this.isComplete) return;

    const currentParagraph = this.paragraphs[this.currentParaIndex];

    if (this.currentCharIndex < currentParagraph.length) {
      const char = currentParagraph[this.currentCharIndex];
      // Insert character before cursor
      const textNode = document.createTextNode(char);
      this.currentParaEl.insertBefore(textNode, this.cursor);
      this.currentCharIndex++;

      // Natural pause on punctuation
      let delay = this.speed;
      if (['.', '!', '?'].includes(char)) delay += 120;
      else if ([',', '…', ';'].includes(char)) delay += 60;

      this.timeoutId = setTimeout(() => this.typeNextChar(), delay);
    } else {
      // Completed current paragraph, move to next
      this.currentParaIndex++;
      this.currentCharIndex = 0;

      if (this.currentParaIndex < this.paragraphs.length) {
        this.currentParaEl = document.createElement('p');
        this.container.appendChild(this.currentParaEl);
        this.currentParaEl.appendChild(this.cursor);
        this.timeoutId = setTimeout(() => this.typeNextChar(), 180);
      } else {
        // All paragraphs finished
        this.finishTyping();
      }
    }
  }

  finishTyping() {
    this.isComplete = true;
    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
    }

    // Append signature
    if (this.closing) {
      const sigEl = document.createElement('div');
      sigEl.className = 'letter-signature';
      sigEl.textContent = this.closing;
      this.container.appendChild(sigEl);
    }

    if (this.statusText) {
      this.statusText.textContent = 'Letter completely revealed 💌';
    }

    if (this.readAllBtn) {
      this.readAllBtn.innerHTML = '<span>All Read ✨</span>';
      this.readAllBtn.disabled = true;
      this.readAllBtn.style.opacity = '0.7';
      this.readAllBtn.style.cursor = 'default';
    }
  }

  revealAll() {
    if (this.isComplete) return;
    this.isComplete = true;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Build complete formatted letter
    let html = '';
    this.paragraphs.forEach(para => {
      html += `<p>${para}</p>`;
    });
    if (this.closing) {
      html += `<div class="letter-signature">${this.closing}</div>`;
    }

    this.container.innerHTML = html;

    if (this.statusText) {
      this.statusText.textContent = 'Letter completely revealed 💌';
    }

    if (this.readAllBtn) {
      this.readAllBtn.innerHTML = '<span>All Read ✨</span>';
      this.readAllBtn.disabled = true;
      this.readAllBtn.style.opacity = '0.7';
      this.readAllBtn.style.cursor = 'default';
    }
  }
}

// ==========================================================================
// 4. MEMORY CARDS RENDERER (letter.html)
// Reads from SITE_CONFIG.memories so users can easily edit
// ==========================================================================
function renderMemoryCards(containerId = 'memoryCardsGrid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cards = SITE_CONFIG.memories || [];
  container.innerHTML = '';

  cards.forEach(card => {
    const cardEl = document.createElement('article');
    cardEl.className = 'memory-card';
    cardEl.innerHTML = `
      <div class="memory-card-icon" aria-hidden="true">${card.icon || '✨'}</div>
      <div class="memory-card-header">
        <span class="memory-card-tag">${card.tag || 'Memory'}</span>
        <h3>${card.title}</h3>
      </div>
      <p class="memory-card-text">${card.text}</p>
    `;
    container.appendChild(cardEl);
  });
}

// ==========================================================================
// 5. SEQUENTIAL MESSAGE REVEAL (goodbye.html)
// Reveals cosmic farewell messages one by one
// ==========================================================================
function initGoodbyeSequence() {
  const quotes = document.querySelectorAll('.quote-line');
  const finalCard = document.getElementById('finalFarewellCard');
  const actionsGroup = document.getElementById('goodbyeActions');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    // Show all immediately without waiting
    quotes.forEach(q => q.classList.add('visible'));
    if (finalCard) finalCard.classList.add('visible');
    if (actionsGroup) actionsGroup.classList.add('visible');
    return;
  }

  // Sequential gentle fade-in
  let delay = 600;
  quotes.forEach((quote, index) => {
    setTimeout(() => {
      quote.classList.add('visible');
    }, delay);
    delay += 1400; // 1.4s between each line
  });

  // Reveal final heartfelt card
  setTimeout(() => {
    if (finalCard) finalCard.classList.add('visible');
  }, delay + 400);

  // Reveal action buttons
  setTimeout(() => {
    if (actionsGroup) actionsGroup.classList.add('visible');
  }, delay + 1200);
}

// ==========================================================================
// 6. KEEPSAKE LETTER DOWNLOAD HELPER (goodbye.html)
// Client-side text file generation & download
// ==========================================================================
function downloadFarewellLetter() {
  const letter = SITE_CONFIG.letter;
  const divider = "=======================================================\n";
  
  let content = "";
  content += "FAREWELL LETTER FOR ESTELLE (COMMANDER)\n";
  content += "A Quiet Corner of the Stars\n";
  content += divider + "\n";
  content += `${letter.salutation}\n\n`;

  letter.paragraphs.forEach(para => {
    content += `${para}\n\n`;
  });

  content += `${letter.closing}\n\n`;
  content += divider;
  content += "Some chapters end. The memories remain. 💙\n";

  // Create text blob and download
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Letter-For-Commander-Estelle.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Letter saved to your device. 💙");
}

// ==========================================================================
// 7. TOAST NOTIFICATION UTILITY
// ==========================================================================
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-container';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span aria-hidden="true">🌌</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

// ==========================================================================
// 8. SURPRISE MODAL & PHOTO REVEAL ENGINE (goodbye.html)
// ==========================================================================
function openSurpriseModal() {
  const modal = document.getElementById('surpriseModal');
  if (!modal) return;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Small delay for smooth CSS transition
  requestAnimationFrame(() => {
    modal.classList.add('open');
  });

  // Focus trap / keyboard handler
  initSurpriseModalListeners();
}

function closeSurpriseModal() {
  const modal = document.getElementById('surpriseModal');
  if (!modal) return;

  modal.classList.remove('open');
  document.body.style.overflow = '';

  setTimeout(() => {
    modal.style.display = 'none';
  }, 350);
}

function toggleSurprisePhoto() {
  const container = document.getElementById('surprisePhotoContainer');
  const btn = document.getElementById('btnRevealPhoto');
  const btnIcon = document.getElementById('revealBtnIcon');
  const btnText = document.getElementById('revealBtnText');
  const hint = document.getElementById('surpriseHint');
  if (!container || !btn) return;

  const isHidden = container.style.display === 'none' || getComputedStyle(container).display === 'none';

  if (isHidden) {
    // Reveal photo
    container.style.display = 'flex';
    if (btnIcon) btnIcon.textContent = '👁️';
    if (btnText) btnText.textContent = 'Hide Photo';
    if (hint) hint.textContent = '✨ Photo unlocked! You can view or hide this anytime.';
    btn.classList.add('btn-secondary');
    btn.classList.remove('btn-primary');

    showToast('Photo unlocked for Commander! ✨');
    try {
      localStorage.setItem('commander_surprise_unlocked', 'true');
    } catch (e) {}
  } else {
    // Hide photo
    container.style.display = 'none';
    if (btnIcon) btnIcon.textContent = '📷';
    if (btnText) btnText.textContent = 'View Photo Again';
    if (hint) hint.textContent = 'Photo is currently hidden · Click anytime to take another look.';
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-primary');
  }
}

function openPhotoNewTab() {
  openLightbox();
}

function openLightbox() {
  const lightbox = document.getElementById('photoLightbox');
  if (!lightbox) return;

  lightbox.style.display = 'flex';
  requestAnimationFrame(() => {
    lightbox.classList.add('open');
  });
}

function closeLightbox() {
  const lightbox = document.getElementById('photoLightbox');
  if (!lightbox) return;

  lightbox.classList.remove('open');
  setTimeout(() => {
    lightbox.style.display = 'none';
  }, 300);
}

let surpriseListenersInitialized = false;
function initSurpriseModalListeners() {
  if (surpriseListenersInitialized) return;
  surpriseListenersInitialized = true;

  const modal = document.getElementById('surpriseModal');
  const lightbox = document.getElementById('photoLightbox');

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSurpriseModal();
      }
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('open')) {
        closeLightbox();
      } else if (modal && modal.classList.contains('open')) {
        closeSurpriseModal();
      }
    }
  });
}

// Global exposure for event handlers
window.downloadFarewellLetter = downloadFarewellLetter;
window.showToast = showToast;
window.renderMemoryCards = renderMemoryCards;
window.initGoodbyeSequence = initGoodbyeSequence;
window.LetterTypewriter = LetterTypewriter;
window.Starfield = Starfield;
window.openSurpriseModal = openSurpriseModal;
window.closeSurpriseModal = closeSurpriseModal;
window.toggleSurprisePhoto = toggleSurprisePhoto;
window.openPhotoNewTab = openPhotoNewTab;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;


