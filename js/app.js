/**
 * ERAY067 × MANSUR Official Web Application Logic
 * Built adhering to Apple Fluid Interface Guidelines (SKILL.md)
 * 1:1 Direct Manipulation, Physics Springs, Multi-modal Audio-Visual Feedback
 */

// Lucide Icon SVG Definitions (Zero-Emoji Compliance)
const ICONS = {
  play: '<svg class="icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  pause: '<svg class="icon" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  skipBack: '<svg class="icon" viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="4"/></svg>',
  skipForward: '<svg class="icon" viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
  video: '<svg class="icon" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
  lyrics: '<svg class="icon" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  ticket: '<svg class="icon" viewBox="0 0 24 24"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',
  volume: '<svg class="icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
  volumeMute: '<svg class="icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
  flame: '<svg class="icon" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  check: '<svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  close: '<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
};

class AppState {
  constructor() {
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.currentFilter = 'all';
    this.playbackTimer = null;
    this.currentSeconds = 0;
    this.isMuted = false;
    this.selectedBookingTour = null;
    this.ticketCount = 1;
    this.selectedTierPrice = 450;
    this.selectedTierName = "Genel Giriş";
  }

  get currentTrack() {
    return ARTIST_DATA.songs[this.currentTrackIndex];
  }
}

const state = new AppState();

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderDiscography();
  renderTourDates();
  renderSoundboard();
  initPlayer();
  initModals();
  initVipPassGenerator();
  initVisualizerSpectrum();
  initPointerDownAudioFeedback();
});

/* ==========================================================================
   1. MULTIMODAL POINTER-DOWN AUDIO FEEDBACK (SKILL.md §1 & §13)
   ========================================================================== */
function initPointerDownAudioFeedback() {
  document.addEventListener('pointerdown', (e) => {
    const target = e.target.closest('button, .song-card, .sound-pad, .nav-link, .filter-btn');
    if (target) {
      window.appleDrillAudio.playUiTap(650);
    }
  }, { passive: true });
}

/* ==========================================================================
   2. DISCOGRAPHY BENTO MATRIX
   ========================================================================== */
function renderDiscography() {
  const container = document.getElementById('bentoDiscography');
  if (!container) return;

  const filtered = ARTIST_DATA.songs.filter(s => {
    if (state.currentFilter === 'all') return true;
    return s.category === state.currentFilter;
  });

  container.innerHTML = filtered.map((song, index) => {
    let spanClass = 'card-medium';
    if (index === 0) spanClass = 'card-featured-large';
    else if (index % 4 === 1 || index % 4 === 2) spanClass = 'card-compact';

    return `
      <div class="song-card ${spanClass}" data-id="${song.id}">
        <div class="song-card-img-wrap">
          <img class="song-card-img" src="${song.image}" alt="${song.title} Kapak" loading="lazy">
          <span class="song-badge ${song.badge.includes('Hit') || song.badge.includes('#1') ? 'hit' : ''}">${song.badge}</span>
          <div class="song-quick-play" onpointerdown="playSongById('${song.id}')">
            <div class="play-btn-circle">
              ${ICONS.play}
            </div>
          </div>
        </div>
        <div class="song-card-body">
          <h4 class="song-card-title">${song.title}</h4>
          <p class="song-card-artist">${song.artist}</p>
          <div class="song-card-meta-row">
            <span class="song-stats-pill">${ICONS.flame} ${song.streams}</span>
            <div class="song-actions-row">
              <button class="btn btn-secondary btn-sm" onpointerdown="openLyricsModal('${song.id}')" title="Sözleri Gör">
                ${ICONS.lyrics} Sözler
              </button>
              <button class="btn btn-primary btn-sm" onpointerdown="openVideoModal('${song.youtube_id}', '${song.title}')" title="Klibi İzle">
                ${ICONS.video} Klip
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterDiscography(cat) {
  state.currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === cat);
  });
  renderDiscography();
}

/* ==========================================================================
   3. APPLE FIXED LIQUID PLAYER (Music Sequencer + Visualizer)
   ========================================================================== */
function initPlayer() {
  updatePlayerUI();

  const playBtn = document.getElementById('masterPlayBtn');
  const prevBtn = document.getElementById('prevTrackBtn');
  const nextBtn = document.getElementById('nextTrackBtn');
  const scrubTrack = document.getElementById('playerScrubTrack');
  const muteBtn = document.getElementById('muteBtn');

  if (playBtn) playBtn.addEventListener('pointerdown', togglePlayback);
  if (prevBtn) prevBtn.addEventListener('pointerdown', prevTrack);
  if (nextBtn) nextBtn.addEventListener('pointerdown', nextTrack);

  // 1:1 Direct Manipulation Scrubber (SKILL.md §2)
  if (scrubTrack) {
    let isDragging = false;
    const handleScrub = (e) => {
      const rect = scrubTrack.getBoundingClientRect();
      const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      state.currentSeconds = Math.floor(clickPos * state.currentTrack.durationSec);
      updateScrubFill();
    };

    scrubTrack.addEventListener('pointerdown', (e) => {
      isDragging = true;
      scrubTrack.setPointerCapture(e.pointerId);
      handleScrub(e);
    });

    scrubTrack.addEventListener('pointermove', (e) => {
      if (isDragging) handleScrub(e);
    });

    scrubTrack.addEventListener('pointerup', (e) => {
      if (isDragging) {
        isDragging = false;
        scrubTrack.releasePointerCapture(e.pointerId);
      }
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('pointerdown', () => {
      const isMuted = window.appleDrillAudio.toggleMute();
      muteBtn.innerHTML = isMuted ? ICONS.volumeMute : ICONS.volume;
      showToast(isMuted ? 'Müzik Sesi Kapatıldı' : 'Müzik Sesi Açıldı');
    });
  }
}

function togglePlayback() {
  state.isPlaying = !state.isPlaying;
  const playBtn = document.getElementById('masterPlayBtn');

  if (state.isPlaying) {
    playBtn.innerHTML = ICONS.pause;
    window.appleDrillAudio.startMusic(state.currentTrack);
    startPlaybackTimer();
    showToast(`Oynatılıyor: ${state.currentTrack.title} (${state.currentTrack.bpm} BPM / ${state.currentTrack.key})`);
  } else {
    playBtn.innerHTML = ICONS.play;
    window.appleDrillAudio.stopMusic();
    stopPlaybackTimer();
    showToast('Duraklatıldı');
  }
}

function playSongById(id) {
  const idx = ARTIST_DATA.songs.findIndex(s => s.id === id);
  if (idx !== -1) {
    state.currentTrackIndex = idx;
    state.currentSeconds = 0;
    state.isPlaying = true;
    updatePlayerUI();
    document.getElementById('masterPlayBtn').innerHTML = ICONS.pause;
    window.appleDrillAudio.startMusic(state.currentTrack);
    startPlaybackTimer();
    showToast(`Çalıyor: ${state.currentTrack.title}`);
  }
}

function nextTrack() {
  state.currentTrackIndex = (state.currentTrackIndex + 1) % ARTIST_DATA.songs.length;
  state.currentSeconds = 0;
  updatePlayerUI();
  if (state.isPlaying) {
    window.appleDrillAudio.startMusic(state.currentTrack);
    showToast(`Sıradaki: ${state.currentTrack.title}`);
  }
}

function prevTrack() {
  state.currentTrackIndex = (state.currentTrackIndex - 1 + ARTIST_DATA.songs.length) % ARTIST_DATA.songs.length;
  state.currentSeconds = 0;
  updatePlayerUI();
  if (state.isPlaying) {
    window.appleDrillAudio.startMusic(state.currentTrack);
    showToast(`Önceki: ${state.currentTrack.title}`);
  }
}

function updatePlayerUI() {
  const track = state.currentTrack;
  const titleEl = document.getElementById('playerTrackTitle');
  const artistEl = document.getElementById('playerTrackArtist');
  const thumbEl = document.getElementById('playerThumbImg');
  const durEl = document.getElementById('playerTotalTime');

  if (titleEl) titleEl.textContent = track.title;
  if (artistEl) artistEl.textContent = track.artist;
  if (thumbEl) thumbEl.src = track.image;
  if (durEl) durEl.textContent = track.duration;

  updateScrubFill();
}

function startPlaybackTimer() {
  stopPlaybackTimer();
  state.playbackTimer = setInterval(() => {
    state.currentSeconds++;
    if (state.currentSeconds >= state.currentTrack.durationSec) {
      nextTrack();
    } else {
      updateScrubFill();
    }
  }, 1000);
}

function stopPlaybackTimer() {
  if (state.playbackTimer) {
    clearInterval(state.playbackTimer);
    state.playbackTimer = null;
  }
}

function updateScrubFill() {
  const fill = document.getElementById('playerSliderFill');
  const currTime = document.getElementById('playerCurrentTime');
  if (!fill || !currTime) return;

  const pct = (state.currentSeconds / state.currentTrack.durationSec) * 100;
  fill.style.width = `${pct}%`;

  const mins = Math.floor(state.currentSeconds / 60);
  const secs = state.currentSeconds % 60;
  currTime.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/* ==========================================================================
   4. AUDIO SPECTRUM VISUALIZER (Canvas 60 FPS)
   ========================================================================== */
function initVisualizerSpectrum() {
  const canvas = document.getElementById('spectrumCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = 120;
  canvas.height = 28;

  function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, 120, 28);
    const data = window.appleDrillAudio.getSpectrumData();

    const barCount = 18;
    const barWidth = 4;
    const gap = 2.5;

    for (let i = 0; i < barCount; i++) {
      const val = state.isPlaying ? data[i * 2] || 0 : (Math.sin(Date.now() / 400 + i) * 10 + 15);
      const barHeight = Math.max(3, (val / 255) * 26);

      const grad = ctx.createLinearGradient(0, 28 - barHeight, 0, 28);
      grad.addColorStop(0, '#ff2a55');
      grad.addColorStop(1, '#f59e0b');

      ctx.fillStyle = grad;
      ctx.fillRect(i * (barWidth + gap), 28 - barHeight, barWidth, barHeight);
    }
  }

  draw();
}

/* ==========================================================================
   5. DRILL SOUNDBOARD & BEAT PAD (Zero-Latency Web Audio API)
   ========================================================================== */
function renderSoundboard() {
  const grid = document.getElementById('soundboardGrid');
  if (!grid) return;

  grid.innerHTML = ARTIST_DATA.soundboardPads.map(pad => `
    <div class="sound-pad" data-key="${pad.key}" data-type="${pad.type}" onpointerdown="triggerPad('${pad.type}', this)">
      <span class="pad-key-badge">${pad.key}</span>
      <h5 class="pad-label">${pad.label}</h5>
      <p class="pad-desc">${pad.desc}</p>
    </div>
  `).join('');

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    const key = e.key.toUpperCase();
    const pad = ARTIST_DATA.soundboardPads.find(p => p.key === key);
    if (pad) {
      const padEl = document.querySelector(`.sound-pad[data-key="${key}"]`);
      triggerPad(pad.type, padEl);
    }
  });
}

function triggerPad(type, el) {
  window.appleDrillAudio.playVox(type);
  if (el) {
    el.classList.add('pad-active');
    setTimeout(() => el.classList.remove('pad-active'), 100);
  }
}

/* ==========================================================================
   6. TOUR DATES & INTERACTIVE TICKET BOOKING SHEET (No primitive alert!)
   ========================================================================== */
function renderTourDates() {
  const list = document.getElementById('tourList');
  if (!list) return;

  list.innerHTML = ARTIST_DATA.tours.map(tour => `
    <div class="tour-card">
      <div class="tour-date">${tour.date}</div>
      <div class="tour-location-wrap">
        <span class="tour-city">${tour.city}</span>
        <span class="tour-venue">${tour.venue}</span>
      </div>
      <div>
        <span class="tour-badge ${tour.badgeClass}">${tour.status}</span>
      </div>
      <div style="text-align: right;">
        <button class="btn btn-primary btn-sm btn-pill" onpointerdown="openBookingModal('${tour.id}')">
          ${ICONS.ticket} Bilet Al
        </button>
      </div>
    </div>
  `).join('');
}

function openBookingModal(tourId) {
  const tour = ARTIST_DATA.tours.find(t => t.id === tourId) || ARTIST_DATA.tours[0];
  state.selectedBookingTour = tour;
  state.ticketCount = 1;
  state.selectedTierPrice = tour.price;
  state.selectedTierName = "Genel Giriş";

  const modal = document.getElementById('genericModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.innerHTML = `${ICONS.ticket} ${tour.city} Konseri — Resmi Bilet Satışı`;
  
  body.innerHTML = `
    <div class="ticket-booking-box">
      <div style="background: rgba(255,255,255,0.04); padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
        <h4 style="font-size: 1.2rem; color: #fff;">${tour.city} — ${tour.venue}</h4>
        <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.8125rem; color: #ff476e; margin-top: 4px;">
          Tarih: ${tour.date} • Saat: ${tour.time}
        </p>
      </div>

      <div>
        <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 800; margin-bottom: 8px; color: #94a3b8;">
          KATEGORİ SEÇİN
        </label>
        <div class="ticket-tier-selector">
          <div class="tier-option selected" onclick="selectTier(this, ${tour.price}, 'Genel Giriş')">
            <span class="tier-name">Genel Giriş</span>
            <span class="tier-price">${tour.price} ₺</span>
          </div>
          <div class="tier-option" onclick="selectTier(this, ${Math.floor(tour.price * 1.6)}, 'Sahne Önü')">
            <span class="tier-name">Sahne Önü</span>
            <span class="tier-price">${Math.floor(tour.price * 1.6)} ₺</span>
          </div>
          <div class="tier-option" onclick="selectTier(this, ${tour.vipPrice}, 'VIP Lounge')">
            <span class="tier-name">VIP Lounge</span>
            <span class="tier-price">${tour.vipPrice} ₺</span>
          </div>
        </div>
      </div>

      <div class="ticket-counter-row">
        <span style="font-weight: 700; color: #fff;">Bilet Adedi</span>
        <div style="display: flex; align-items: center; gap: 14px;">
          <button class="counter-btn" onclick="updateTicketCount(-1)">-</button>
          <span id="ticketCountDisplay" style="font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 800; color: #fff;">1</span>
          <button class="counter-btn" onclick="updateTicketCount(1)">+</button>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.08);">
        <span style="color: #94a3b8; font-size: 0.9375rem;">Toplam Tutar:</span>
        <span id="totalPriceDisplay" style="font-family: 'JetBrains Mono', monospace; font-size: 1.65rem; font-weight: 900; color: #ff2a55;">
          ${tour.price} ₺
        </span>
      </div>

      <button class="btn btn-primary btn-lg btn-pill" style="width: 100%;" onclick="confirmTicketReservation()">
        ${ICONS.check} Rezervasyonu Tamamla
      </button>
    </div>
  `;

  modal.classList.add('open');
}

window.selectTier = function(el, price, name) {
  document.querySelectorAll('.tier-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedTierPrice = price;
  state.selectedTierName = name;
  updateBookingTotal();
};

window.updateTicketCount = function(delta) {
  state.ticketCount = Math.max(1, Math.min(8, state.ticketCount + delta));
  const disp = document.getElementById('ticketCountDisplay');
  if (disp) disp.textContent = state.ticketCount;
  updateBookingTotal();
};

function updateBookingTotal() {
  const totalEl = document.getElementById('totalPriceDisplay');
  if (totalEl) {
    totalEl.textContent = `${state.ticketCount * state.selectedTierPrice} ₺`;
  }
}

window.confirmTicketReservation = function() {
  closeModal();
  window.appleDrillAudio.playVox('vox_067');
  showToast(`Tebrikler! ${state.ticketCount} adet ${state.selectedTierName} biletiniz ayrıldı.`);
};

/* ==========================================================================
   7. MODALS (Lyrics & Video)
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('genericModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn) closeBtn.addEventListener('pointerdown', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('pointerdown', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
}

function openLyricsModal(songId) {
  const song = ARTIST_DATA.songs.find(s => s.id === songId);
  if (!song) return;

  const modal = document.getElementById('genericModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.innerHTML = `${ICONS.lyrics} ${song.title} — Şarkı Sözleri`;
  body.innerHTML = `
    <div style="margin-bottom: 20px; font-family: 'JetBrains Mono', monospace; font-size: 0.8125rem; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 14px;">
      <span style="color: #fbbf24;">Prodüktör: ${song.producers}</span> • 
      <span>Mix/Master: ${song.mix_master}</span> • 
      <span style="color: #ff476e;">Tempo: ${song.bpm} BPM</span>
    </div>
    <div class="lyrics-content">${song.lyrics}</div>
    <div style="margin-top: 24px; text-align: right;">
      <button class="btn btn-primary btn-sm btn-pill" onclick="playSongById('${song.id}'); closeModal();">
        ${ICONS.play} Bu Şarkıyı Çal
      </button>
    </div>
  `;

  modal.classList.add('open');
}

function openVideoModal(ytId, songTitle) {
  const modal = document.getElementById('genericModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.innerHTML = `${ICONS.video} ${songTitle} — Resmi Video Klip`;
  body.innerHTML = `
    <div class="video-responsive-wrap">
      <iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  `;

  modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('genericModal');
  const body = document.getElementById('modalBody');
  if (modal) modal.classList.remove('open');
  if (body) body.innerHTML = '';
}

/* ==========================================================================
   8. VIP FAN PASS GENERATOR (Canvas with 3D Holographic Rendering)
   ========================================================================== */
function initVipPassGenerator() {
  const input = document.getElementById('fanNameInput');
  const citySelect = document.getElementById('fanCitySelect');
  const downloadBtn = document.getElementById('downloadPassBtn');

  if (input) input.addEventListener('input', drawVipPass);
  if (citySelect) citySelect.addEventListener('change', drawVipPass);
  if (downloadBtn) downloadBtn.addEventListener('pointerdown', downloadVipPass);

  drawVipPass();
}

function drawVipPass() {
  const canvas = document.getElementById('vipPassCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const fanName = (document.getElementById('fanNameInput')?.value || 'CLTR VIP GUEST').toUpperCase();
  const city = document.getElementById('fanCitySelect')?.value || 'İSTANBUL';

  canvas.width = 600;
  canvas.height = 850;

  // Rich Dark Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 600, 850);
  bgGrad.addColorStop(0, '#151928');
  bgGrad.addColorStop(0.5, '#090b10');
  bgGrad.addColorStop(1, '#1b0914');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 600, 850);

  // Specular Border
  ctx.strokeStyle = '#ff2a55';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, 560, 810);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, 540, 790);

  // Brand Titles
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ERAY067 × MANSUR', 300, 95);

  ctx.fillStyle = '#ff2a55';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('ALLIANCE TOUR 2026', 300, 130);

  // VIP Ribbon
  ctx.fillStyle = '#ff2a55';
  ctx.fillRect(170, 165, 260, 46);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('ALL ACCESS VIP', 300, 197);

  // Lanyard hole
  ctx.beginPath();
  ctx.arc(300, 48, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#060709';
  ctx.fill();
  ctx.strokeStyle = '#ff2a55';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Guest Details
  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('ÖZEL DAVETLİ / FAN:', 60, 280);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(fanName.substring(0, 22), 60, 322);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('ETKİNLİK ŞEHRİ:', 60, 385);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(city, 60, 422);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('TURNE RESMİ KODU:', 60, 480);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText('CLTR-2026-ALLIANCE', 60, 510);

  // Barcode container
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(60, 560, 480, 120);

  ctx.fillStyle = '#ff2a55';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText('PASS SERIAL: 067-M607-' + Math.abs(hashStr(fanName)), 80, 595);

  // Barcode bars
  ctx.fillStyle = '#ffffff';
  for (let x = 80; x < 520; x += 12) {
    const w = (x % 5 === 0) ? 6 : (x % 3 === 0) ? 4 : 2;
    ctx.fillRect(x, 620, w, 40);
  }

  // Footer seal
  ctx.fillStyle = '#64748b';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CULTURE RECORDS (CLTR) OFFICIAL FAN CARD', 300, 745);
  ctx.fillText('FRANKFURT / ANKARA / MALATYA', 300, 770);
}

function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 99999);
}

function downloadVipPass() {
  const canvas = document.getElementById('vipPassCanvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = 'CLTR_ALLIANCE_VIP_PASS.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('VIP Kartınız PNG olarak indirildi!');
}

/* ==========================================================================
   9. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}
