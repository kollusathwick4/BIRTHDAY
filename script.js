/* ════════════════════════════════════
   BIRTHDAY PAGE — Index.js
════════════════════════════════════ */

/* ────────────────────────────────────
   BACKGROUND STARS
──────────────────────────────────── */
(function () {
  const colors = ['#ff6eb4','#a855f7','#ffd93d','#00d2d3','#54a0ff','#ff9f43','#1dd1a1'];
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'bg-star';
    const sz = 2 + Math.random() * 5;
    s.style.cssText = `
      width:${sz}px; height:${sz}px;
      background:${colors[i % colors.length]};
      left:${Math.random() * 100}vw;
      top:${Math.random() * 100}vh;
      animation-delay:${Math.random() * 4}s;
      animation-duration:${2 + Math.random() * 3}s;
    `;
    document.body.appendChild(s);
  }
})();

/* ────────────────────────────────────
   FIREWORK SPARKS
──────────────────────────────────── */
const sparkColors = ['#ffd93d','#ff6eb4','#a855f7','#00d2d3','#ff9f43','#1dd1a1','#54a0ff','#ff4757'];

function spawnSpark(cx, cy) {
  const s = document.createElement('div');
  s.className = 'spark';
  const angle = Math.random() * Math.PI * 2;
  const dist  = 60 + Math.random() * 140;
  s.style.cssText = `
    left:${cx}px; top:${cy}px;
    background:${sparkColors[Math.floor(Math.random() * sparkColors.length)]};
    --tx:${Math.cos(angle) * dist}px;
    --ty:${Math.sin(angle) * dist}px;
    animation-duration:${0.6 + Math.random() * 0.6}s;
  `;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 900);
}

/* ────────────────────────────────────
   FALLING PETALS
──────────────────────────────────── */
const petalEmojis = ['🌸','🌺','🌷','💐','🌼','✨','🎊','🎉','💖','⭐','🌟','💫'];
let petalInterval = null;

function startPetals() {
  if (petalInterval) return;
  petalInterval = setInterval(() => {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (18 + Math.random() * 22) + 'px';
    p.style.animationDuration = (3 + Math.random() * 4) + 's';
    document.getElementById('petals').appendChild(p);
    setTimeout(() => p.remove(), 7000);
  }, 400);
}

/* ────────────────────────────────────
   MUSIC NOTES
──────────────────────────────────── */
let lastNote = 0;
function spawnMusicNote(x, y) {
  const now = Date.now();
  if (now - lastNote < 250) return;
  lastNote = now;
  const notes = ['♪','♫','🎵','🎶'];
  const n = document.createElement('div');
  n.className = 'note';
  n.textContent = notes[Math.floor(Math.random() * notes.length)];
  n.style.left  = x + 'px';
  n.style.top   = y + 'px';
  n.style.color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

/* ────────────────────────────────────
   ENVELOPE OPEN
──────────────────────────────────── */
function openEnvelope() {
  const flap = document.getElementById('envFlap');
  flap.style.transform = 'rotateX(180deg)';
  flap.style.opacity   = '0';

  for (let i = 0; i < 22; i++) {
    spawnSpark(window.innerWidth / 2, window.innerHeight / 2);
  }

  setTimeout(() => {
    document.getElementById('envelope-section').style.display = 'none';
    const sc = document.getElementById('scratch-section');
    sc.classList.add('active');
    sc.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('birthdaySong').play().catch(() => {});
    startPetals();
    initScratch();
  }, 700);

  
}

/* ────────────────────────────────────
   SCRATCH CANVAS
──────────────────────────────────── */
function initScratch() {
  const canvas = document.getElementById('scratchCanvas');
  const ctx    = canvas.getContext('2d');

  /* Responsive canvas size */
  const maxSize = 340;
  const size    = Math.min(maxSize, Math.floor(window.innerWidth * 0.88));
  const W = size, H = size;
  canvas.width  = W;
  canvas.height = H;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';

  const scale = W / 320;

  /* Layer 0 — revealed birthday message */
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0,   '#1a0533');
  grad.addColorStop(0.5, '#0d1b6e');
  grad.addColorStop(1,   '#0b2d2d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  /* "Happy Birthday" text */
  const hbSize = Math.round(28 * scale);
  ctx.font = `bold ${hbSize}px Pacifico, cursive`;
  const gText = ctx.createLinearGradient(0, 0, W, 0);
  gText.addColorStop(0,   '#ffd93d');
  gText.addColorStop(0.5, '#ff6eb4');
  gText.addColorStop(1,   '#00d2d3');
  ctx.fillStyle = gText;
  ctx.fillText('Happy Birthday', W / 2, H / 2 - Math.round(55 * scale));

  /* ── CHANGE THE NAME BELOW ── */
  const nameSize = Math.round(42 * scale);
  ctx.font = `bold ${nameSize}px Pacifico, cursive`;
  const gName = ctx.createLinearGradient(0, 0, W, 0);
  gName.addColorStop(0, '#ff9f43');
  gName.addColorStop(1, '#a855f7');
  ctx.fillStyle = gName;
  ctx.fillText('KOLLU', W / 2, H / 2 + Math.round(5 * scale));/*NAME OF LINE-1*/
  ctx.fillText('SATHWICK', W / 2, H / 2 + Math.round(52 * scale));/*NAME OF LINE-2*/

  /* Emojis */
  const emojiSize = Math.round(26 * scale);
  ctx.font = `${emojiSize}px serif`;
  ctx.fillText('🎂 🎉 🎊 🎈', W / 2, H / 2 + Math.round(95 * scale));

  /* Layer 1 — golden scratch overlay */
  const scratchGrad = ctx.createLinearGradient(0, 0, W, H);
  scratchGrad.addColorStop(0,   '#f7c948');
  scratchGrad.addColorStop(0.3, '#ffe680');
  scratchGrad.addColorStop(0.6, '#e0a020');
  scratchGrad.addColorStop(1,   '#ffd93d');

  const revealedData = ctx.getImageData(0, 0, W, H);

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = scratchGrad;
  ctx.fillRect(0, 0, W, H);

  /* Noise texture */
  for (let i = 0; i < 9000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }
  ctx.fillStyle = 'rgba(255,255,255,.12)';
  for (let i = 0; i < 70; i++) {
    ctx.fillRect(Math.random() * W, Math.random() * H, 1 + Math.random() * 3, 1);
  }

  /* Guide text */
  const guideSize = Math.round(20 * scale);
  ctx.fillStyle = 'rgba(80,40,0,.6)';
  ctx.font = `bold ${guideSize}px Nunito, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('🪙 Scratch here! 🪙', W / 2, H / 2);

  const scratchData = ctx.getImageData(0, 0, W, H);

  /* Off-canvas holds the revealed message as CSS background */
  const offCanvas = document.createElement('canvas');
  offCanvas.width  = W;
  offCanvas.height = H;
  offCanvas.getContext('2d').putImageData(revealedData, 0, 0);

  ctx.clearRect(0, 0, W, H);
  ctx.putImageData(scratchData, 0, 0);
  canvas.style.backgroundImage = `url(${offCanvas.toDataURL()})`;

  /* Scratch interaction */
  let isDown         = false;
  const totalPx      = W * H;
  const scratchR     = Math.round(24 * scale);
  let preview50Shown = false;
  let songUnlocked   = false;

let blast25Done = false;
  let blast50Done = false;
  let blast75Done = false;

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, scratchR, 0, Math.PI * 2);
    ctx.fill();
    updateProgress();
    const rect = canvas.getBoundingClientRect();
    spawnMusicNote(rect.left + x, rect.top + y);

    /* ── BLASTS at key reveal milestones ── */
    const data = ctx.getImageData(0, 0, W, H).data;
    let opaque = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 10) opaque++;
    const pct = Math.round((1 - (opaque / totalPx)) * 100);

    /* 25% — "Happy Birthday" is visible → small burst */
    if (pct >= 25 && !blast25Done) {
      blast25Done = true;
      const cx = rect.left + W / 2;
      const cy = rect.top + H * 0.25;
      for (let i = 0; i < 40; i++) spawnSpark(cx + (Math.random()-0.5)*80, cy + (Math.random()-0.5)*40);
    }

    /* 50% — "KOLLU" is visible → big burst */
    if (pct >= 50 && !blast50Done) {
      blast50Done = true;
      const cx = rect.left + W / 2;
      const cy = rect.top + H * 0.55;
      /* Three rapid volleys */
      for (let v = 0; v < 4; v++) {
        setTimeout(() => {
          for (let i = 0; i < 45; i++) {
            spawnSpark(
              cx + (Math.random()-0.5) * 120,
              cy + (Math.random()-0.5) * 60
            );
          }
        }, v * 220);
      }
    }

    /* 70% — "SATHWICK" + emojis visible → massive grand finale */
    if (pct >= 60 && !blast75Done) {
      blast75Done = true;
      const cx = rect.left + W / 2;
      const cy = rect.top + H * 0.75;
      /* Five volleys across the whole screen */
      for (let v = 0; v < 6; v++) {
        setTimeout(() => {
          for (let i = 0; i < 56; i++) {
            spawnSpark(
              Math.random() * window.innerWidth,
              rect.top * Math.random() + rect.top * 0.2
            );
          }
        }, v * 180);
      }
    }
  }

  function updateProgress() {
    const data = ctx.getImageData(0, 0, W, H).data;
    let opaque = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 10) opaque++;
    const pct = Math.round((1 - (opaque / totalPx)) * 100);

    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-pct').textContent  = pct + '%';

    if (pct >= 60 && !preview50Shown) {
      preview50Shown = true;
      showPreviewPhoto();
    }
    if (pct >= 60 && !songUnlocked) {
      songUnlocked = true;
      revealComplete();
    }
  }

  /* Mouse events */
  canvas.addEventListener('mousedown', e => { isDown = true; scratch(e.offsetX, e.offsetY); });
  canvas.addEventListener('mouseup',   () => isDown = false);
  canvas.addEventListener('mouseleave',() => isDown = false);
  canvas.addEventListener('mousemove', e => { if (isDown) scratch(e.offsetX, e.offsetY); });

  /* Touch events */
  canvas.addEventListener('touchstart', e => {
    isDown = true;
    const t = e.touches[0], r = canvas.getBoundingClientRect();
    scratch(t.clientX - r.left, t.clientY - r.top);
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchend',    () => isDown = false);
  canvas.addEventListener('touchcancel', () => isDown = false);
  canvas.addEventListener('touchmove',   e => {
    if (!isDown) return;
    const t = e.touches[0], r = canvas.getBoundingClientRect();
    scratch(t.clientX - r.left, t.clientY - r.top);
    e.preventDefault();
  }, { passive: false });
}

function showPreviewPhoto() {
  const preview = document.getElementById('scratch-preview');
  if (!preview) return;
  preview.classList.add('show');
  for (let i = 0; i < 12; i++) {
    spawnSpark(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.7);
  }
  setTimeout(() => preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);

  /* ── Clicking the preview photo opens it in the lightbox ── */
  const previewImg = preview.querySelector('img');
  if (previewImg) {
    previewImg.style.cursor = 'pointer';
    previewImg.addEventListener('click', () => {
      openLightbox('personal', 0);
    }, { once: true });
  }
}

function revealComplete() {
  /* ── Clear remaining gold overlay instantly ── */
  const canvas = document.getElementById('scratchCanvas');
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      for (let j = 0; j < 18; j++) {
        spawnSpark(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.6);
      }
    }, i * 280);
  }
  setTimeout(() => {
    document.getElementById('scratch-section').style.display = 'none';
    const ps = document.getElementById('photo-section');
    ps.classList.add('active');
    ps.scrollIntoView({ behavior: 'smooth' });
  }, 1400);
}

/* ────────────────────────────────────
   FAMILY SONG ON SCROLL
──────────────────────────────────── */
let familySongPlaying = false;
window.addEventListener('scroll', () => {
  const track = document.getElementById('scrollerTrack');
  if (!track) return;
  const rect = track.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85 && !familySongPlaying) {
    familySongPlaying = true;
    /* Birthday song keeps playing - no swap */
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        for (let j = 0; j < 14; j++) {
          spawnSpark(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }
      }, i * 400);
    }
  }
});

/* ════════════════════════════════════
   LIGHTBOX
   ✅ Uses data-gallery / data-index attributes instead of
      inline onclick, so clicks work even inside animated
      CSS scrollers on all mobile browsers.
════════════════════════════════════ */
const lbGalleries = {
  personal: [
    { src: 'Example1-BT.jpeg', fallback: 'https://placehold.co/800x900/ff6eb4/fff?text=Photo+1', label: '💖 Moment 1' },
    { src: 'Example2-BT.jpeg', fallback: 'https://placehold.co/800x900/a855f7/fff?text=Photo+2', label: '⭐ Moment 2' },
    { src: 'Example3-BT.jpeg', fallback: 'https://placehold.co/800x900/ffd93d/333?text=Photo+3', label: '🌟 Moment 3' },
    { src: 'Example4-BT.jpeg', fallback: 'https://placehold.co/800x900/00d2d3/fff?text=Photo+4', label: '🎵 Moment 4' },
    { src: 'Example5-BT.jpeg', fallback: 'https://placehold.co/800x900/ff9f43/fff?text=Photo+5', label: '🌈 Moment 5' },
  ],
  family: [
    { src: 'ExampleFAMILY-1.jpeg', fallback: 'https://placehold.co/900x600/ff6eb4/fff?text=Family+1', label: 'Family Moment 💕' },
    { src: 'ExampleFAMILY-2.jpeg', fallback: 'https://placehold.co/900x600/a855f7/fff?text=Family+2', label: 'Family Moment ✨' },
    { src: 'ExampleFAMILY-3.jpeg', fallback: 'https://placehold.co/900x600/ffd93d/333?text=Family+3', label: 'Family Moment 🌟' },
    { src: 'ExampleFAMILY-4.jpeg', fallback: 'https://placehold.co/900x600/00d2d3/fff?text=Family+4', label: 'Family Moment 🎊' },
    { src: 'ExampleFAMILY-5.jpeg', fallback: 'https://placehold.co/900x600/ff9f43/fff?text=Family+5', label: 'Family Moment 🌸' },
    { src: 'ExampleFAMILY-6.jpeg', fallback: 'https://placehold.co/900x600/54a0ff/fff?text=Family+6', label: 'Family Moment 💙' },
  ]
};

let lbCurrentGallery = [];
let lbCurrentIndex   = 0;

/* ── Single event-delegation listener for ALL card clicks ── */
document.addEventListener('click', function (e) {
  /* Walk up DOM from click target to find a .family-card or .thumb-card */
  const familyCard = e.target.closest('.family-card[data-gallery]');
  const thumbCard  = e.target.closest('.thumb-card[onclick]');

  if (familyCard) {
    const gallery = familyCard.dataset.gallery;
    const index   = parseInt(familyCard.dataset.index, 10);
    if (!isNaN(index)) openLightbox(gallery, index);
    return;
  }

  /* thumb-cards still use onclick attribute — handled naturally */
});

function openLightbox(galleryKey, index) {
  lbCurrentGallery = lbGalleries[galleryKey];
  lbCurrentIndex   = index;

  /* Build thumbnail strip */
  const strip = document.getElementById('lb-strip');
  strip.innerHTML = '';
  lbCurrentGallery.forEach((item, i) => {
    const dot = document.createElement('div');
    dot.className = 'lb-dot' + (i === index ? ' active' : '');
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      lbCurrentIndex = i;
      lbShow();
    });
    const img = document.createElement('img');
    img.src = item.src;
    img.onerror = () => { img.src = item.fallback; };
    img.alt = item.label;
    dot.appendChild(img);
    strip.appendChild(dot);
  });

  /* Show lightbox — force display:flex so it always opens */
  const lb = document.getElementById('lightbox');
  lb.style.display = 'flex';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';

  lbShow();
  document.addEventListener('keydown', lbKeyHandler);
}

function lbShow() {
  const item = lbCurrentGallery[lbCurrentIndex];
  const img  = document.getElementById('lb-img');

  /* Replay pop-in animation */
  img.style.animation = 'none';
  void img.offsetWidth; // force reflow
  img.style.animation = 'lbImgPop .35s cubic-bezier(.34,1.56,.64,1)';

  img.src = item.src;
  img.onerror = () => { img.src = item.fallback; };
  img.alt = item.label;

  document.getElementById('lb-caption').textContent = item.label;
  document.getElementById('lb-counter').textContent =
    (lbCurrentIndex + 1) + ' / ' + lbCurrentGallery.length;

  /* Sync strip dots */
  document.querySelectorAll('.lb-dot').forEach((d, i) => {
    d.classList.toggle('active', i === lbCurrentIndex);
  });
  const activeDot = document.querySelectorAll('.lb-dot')[lbCurrentIndex];
  if (activeDot) activeDot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

  /* Sparkles */
  for (let i = 0; i < 8; i++) {
    spawnSpark(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5);
  }
}

function lbNav(dir) {
  lbCurrentIndex = (lbCurrentIndex + dir + lbCurrentGallery.length) % lbCurrentGallery.length;
  lbShow();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  lb.style.display = 'none'; /* explicitly hide */
  document.body.style.overflow = '';
  document.removeEventListener('keydown', lbKeyHandler);
}

function lbKeyHandler(e) {
  if      (e.key === 'ArrowRight') lbNav(1);
  else if (e.key === 'ArrowLeft')  lbNav(-1);
  else if (e.key === 'Escape')     closeLightbox();
}

/* Click dark backdrop to close */
document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this) closeLightbox();
});

/* ── Mobile swipe to navigate ── */
(function () {
  let startX = null;
  const lb = document.getElementById('lightbox');
  lb.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1);
    startX = null;
  });
})();
