// ==========================================================================
// PART-TIME - Liquid Glass Interactive Application Engine
// ==========================================================================

const state = {
  theme: localStorage.getItem('parttime_theme') || 'dark',
  isExpanded: false,
  soundEnabled: true,
  activeTab: 'view-home',
  selectedCategory: 'All',
  searchQuery: '',
  activeChatId: 'chat-arun',
  mapRadius: 5,
  jobs: [...INITIAL_DATA.jobs],
  chats: JSON.parse(JSON.stringify(INITIAL_DATA.chats)),
  wallet: { ...INITIAL_DATA.wallet },
  recentActivities: [...INITIAL_DATA.recentActivities],
  notifications: [...INITIAL_DATA.notifications],
  user: { ...INITIAL_DATA.user },
  selectedJobForApply: null
};

// Web Audio API Procedural Sound Engine
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTap() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playSuccess() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playCashout() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [587.33, 739.99, 880, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.18);
      });
    } catch (e) {}
  }
}

const sounds = new SoundEngine();

function showToast(msg, icon = "✨") {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'liquid-toast';
  toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function applyTheme(themeName) {
  state.theme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('parttime_theme', themeName);
  
  const icon = document.getElementById('theme-icon');
  const text = document.getElementById('theme-text');
  if (icon && text) {
    if (themeName === 'light') {
      icon.textContent = '☀️';
      text.textContent = 'Light Crystal';
    } else {
      icon.textContent = '💎';
      text.textContent = 'Black Crystal';
    }
  }
}

function toggleTheme() {
  sounds.playTap();
  const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  showToast(`Switched to ${nextTheme === 'dark' ? 'Black Crystal Liquid Glass 💎' : 'Light Crystal Glass ☀️'}`);
}

function toggleFrameMode() {
  sounds.playTap();
  const frame = document.getElementById('device-frame');
  const wrapper = document.getElementById('iphone-wrapper');
  const text = document.getElementById('frame-mode-text');
  state.isExpanded = !state.isExpanded;
  
  if (state.isExpanded) {
    frame.classList.add('expanded');
    if (wrapper) wrapper.classList.add('expanded');
    text.textContent = 'iPhone 15 Pro Max';
    showToast('Expanded to Desktop Dashboard View');
  } else {
    frame.classList.remove('expanded');
    if (wrapper) wrapper.classList.remove('expanded');
    text.textContent = 'Expand View';
    showToast('Switched to iPhone 15 Pro Max Frame 📱');
  }
}

function switchTab(targetViewId) {
  sounds.playTap();
  state.activeTab = targetViewId;
  
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  const targetPanel = document.getElementById(targetViewId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-view') === targetViewId) {
      btn.classList.add('active');
    }
  });

  if (targetViewId === 'view-map') {
    renderMap();
  } else if (targetViewId === 'view-chat') {
    renderChats();
    openChatThread(state.activeChatId);
  } else if (targetViewId === 'view-wallet') {
    renderWallet();
  } else if (targetViewId === 'view-recent') {
    renderRecent();
  }
}

// HOME FEED: Render Job Cards
function renderJobs() {
  const grid = document.getElementById('home-jobs-grid');
  const countText = document.getElementById('jobs-count-text');
  if (!grid) return;

  const filtered = state.jobs.filter(job => {
    const matchesCategory = state.selectedCategory === 'All' || job.category === state.selectedCategory;
    const q = state.searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      job.title.toLowerCase().includes(q) || 
      job.employer.toLowerCase().includes(q) ||
      job.category.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  if (countText) {
    countText.textContent = `Showing ${filtered.length} gigs nearby`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
        <div style="font-weight: 700; color: var(--text-primary);">No matching vacancies</div>
        <div style="font-size: 12px; margin-top: 4px;">Try searching for "Cafe", "Flyer", or select "All Gigs"</div>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(job => {
    const badgeColorClass = job.badgeColor || 'cyan';
    return `
      <div class="job-card" data-job-id="${job.id}">
        <div class="card-top">
          <div class="employer-info">
            <img src="${job.employerAvatar}" class="emp-avatar" alt="${job.employer}">
            <div class="emp-meta">
              <span class="emp-name">${job.employer}</span>
              <span class="emp-rating">★ ${job.employerRating} • ${job.category}</span>
            </div>
          </div>
          <div class="wage-badge ${badgeColorClass}">
            <div class="wage-amount">\u20B9${job.wage.toLocaleString()}</div>
            <div class="wage-unit">${job.wageUnit}</div>
          </div>
        </div>

        <div class="job-title">${job.title}</div>

        <div class="job-tags-row">
          ${job.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
        </div>

        <div class="job-meta-row">
          <div class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>${job.duration}</span>
          </div>
          <div class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${job.distanceKm} km • ${job.location}</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="apply-btn btn-apply-job" data-id="${job.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>Apply Now (PIN 6767)</span>
          </button>
          <button class="chat-quick-btn btn-card-chat" data-id="${job.id}" title="Message Employer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.btn-apply-job').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jobId = btn.getAttribute('data-id');
      initiateApply(jobId);
    });
  });

  grid.querySelectorAll('.btn-card-chat').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jobId = btn.getAttribute('data-id');
      const job = state.jobs.find(j => j.id === jobId);
      switchTab('view-chat');
      if (job && job.employer.includes('Arun')) openChatThread('chat-arun');
      else if (job && job.employer.includes('Akhila')) openChatThread('chat-akhila');
      else if (job && job.employer.includes('Ryan')) openChatThread('chat-ryan');
      else if (job && job.employer.includes('Toby')) openChatThread('chat-toby');
    });
  });

  grid.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('click', () => {
      const jobId = card.getAttribute('data-job-id');
      initiateApply(jobId);
    });
  });
}

// MAP VIEW: Interactive Live Radar & Pins
function renderMap() {
  const container = document.getElementById('map-pins-container');
  if (!container) return;

  container.innerHTML = state.jobs.map(job => {
    const x = job.coords.x;
    const y = job.coords.y;
    const colorClass = job.badgeColor || 'cyan';
    return `
      <div class="map-pin" style="left: ${x}%; top: ${y}%;" data-job-id="${job.id}">
        <div class="pin-bubble ${colorClass}">
          <span>\u20B9${job.wage}</span>
          <span style="font-size: 8px; opacity: 0.8;">${job.employer.split(' ')[0]}</span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      sounds.playTap();
      const jobId = pin.getAttribute('data-job-id');
      const job = state.jobs.find(j => j.id === jobId);
      if (!job) return;

      const sheet = document.getElementById('map-job-sheet');
      document.getElementById('sheet-emp-avatar').src = job.employerAvatar;
      document.getElementById('sheet-emp-name').textContent = job.employer;
      document.getElementById('sheet-emp-rating').textContent = `★ ${job.employerRating}`;
      document.getElementById('sheet-wage-amount').textContent = `\u20B9${job.wage.toLocaleString()}`;
      document.getElementById('sheet-wage-unit').textContent = job.wageUnit;
      document.getElementById('sheet-job-title').textContent = job.title;
      document.getElementById('sheet-job-loc').textContent = `${job.distanceKm} km away • ${job.location}`;

      const applyBtn = document.getElementById('sheet-apply-btn');
      applyBtn.onclick = () => initiateApply(job.id);

      const chatBtn = document.getElementById('sheet-chat-btn');
      chatBtn.onclick = () => {
        switchTab('view-chat');
        if (job.employer.includes('Arun')) openChatThread('chat-arun');
        else if (job.employer.includes('Akhila')) openChatThread('chat-akhila');
        else if (job.employer.includes('Ryan')) openChatThread('chat-ryan');
        else if (job.employer.includes('Toby')) openChatThread('chat-toby');
      };

      sheet.style.display = 'block';
    });
  });
}

// CHATS VIEW: Contact List & Active Thread
function renderChats() {
  const listContainer = document.getElementById('chat-contacts-list');
  if (!listContainer) return;

  const q = (document.getElementById('search-chats-input')?.value || '').toLowerCase().trim();
  const filtered = state.chats.filter(c => !q || c.contactName.toLowerCase().includes(q) || c.jobReference.toLowerCase().includes(q));

  listContainer.innerHTML = filtered.map(chat => {
    const lastMsg = chat.messages[chat.messages.length - 1] || { text: "No messages yet", time: "" };
    const isActive = chat.id === state.activeChatId;
    return `
      <div class="chat-contact-item ${isActive ? 'active' : ''}" data-chat-id="${chat.id}">
        <div class="contact-avatar-wrap">
          <img src="${chat.avatar}" class="contact-avatar" alt="${chat.contactName}">
          <div class="contact-online-dot ${chat.status}"></div>
        </div>
        <div class="contact-info">
          <div class="contact-name-row">
            <span class="contact-name">${chat.contactName}</span>
            <span class="contact-time">${lastMsg.time || chat.lastMessageTime}</span>
          </div>
          <div class="contact-preview">${lastMsg.text}</div>
          <div class="contact-job-pill">${chat.jobReference}</div>
        </div>
        ${chat.unreadCount > 0 ? `<span class="notif-badge" style="position: static; width: 18px; height: 18px;">${chat.unreadCount}</span>` : ''}
      </div>
    `;
  }).join('');

  listContainer.querySelectorAll('.chat-contact-item').forEach(item => {
    item.addEventListener('click', () => {
      sounds.playTap();
      const chatId = item.getAttribute('data-chat-id');
      openChatThread(chatId);
    });
  });
}

function openChatThread(chatId) {
  state.activeChatId = chatId;
  const chat = state.chats.find(c => c.id === chatId) || state.chats[0];
  if (!chat) return;

  chat.unreadCount = 0;
  updateChatBadges();

  document.getElementById('active-thread-avatar').src = chat.avatar;
  document.getElementById('active-thread-name').textContent = chat.contactName;
  document.getElementById('active-thread-status').textContent = `${chat.status.toUpperCase()} • ${chat.role}`;

  const msgContainer = document.getElementById('chat-messages-container');
  msgContainer.innerHTML = chat.messages.map(m => `
    <div class="msg-bubble ${m.sender}">
      <div>${m.text}</div>
      <div class="msg-time">${m.time}</div>
    </div>
  `).join('');

  msgContainer.scrollTop = msgContainer.scrollHeight;

  document.querySelectorAll('.chat-contact-item').forEach(item => {
    if (item.getAttribute('data-chat-id') === chatId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function updateChatBadges() {
  const totalUnread = state.chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const badge = document.getElementById('nav-chat-badge');
  if (badge) {
    badge.textContent = totalUnread;
    badge.style.display = totalUnread > 0 ? 'flex' : 'none';
  }
}

function sendChatMessage(text) {
  if (!text || !text.trim()) return;
  sounds.playTap();
  
  const chat = state.chats.find(c => c.id === state.activeChatId);
  if (!chat) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newMsg = {
    id: 'm-' + Date.now(),
    sender: 'me',
    text: text.trim(),
    time: timeStr
  };
  chat.messages.push(newMsg);
  openChatThread(state.activeChatId);

  setTimeout(() => {
    sounds.playTap();
    let replyText = "Received! Looking forward to your shift. Please have the OTP 6767 ready.";
    if (text.includes('6767') || text.includes('PIN')) {
      replyText = "PIN 6767 confirmed! Shift checked in successfully. Have a great shift!";
    } else if (text.includes('Request Pay') || text.includes('completed')) {
      replyText = "Great work! I've approved your payout of \u20B9500 to your PART-TIME wallet right now.";
      addWalletCredit(500, `${chat.company} Shift Settlement`);
    } else if (text.includes('Arrived')) {
      replyText = "Great! Head to Counter 2 or the main desk, we're ready for you.";
    }

    chat.messages.push({
      id: 'm-reply-' + Date.now(),
      sender: 'them',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    openChatThread(state.activeChatId);
    showToast(`New reply from ${chat.contactName}`, "💬");
  }, 1400);
}

// RECENT ACTIVITIES VIEW
function renderRecent() {
  const list = document.getElementById('recent-activities-list');
  if (!list) return;

  list.innerHTML = state.recentActivities.map(act => `
    <div class="recent-card">
      <div class="recent-main">
        <span class="recent-title">${act.title}</span>
        <span class="recent-type">${act.type} • Check-in PIN: ${act.pinUsed}</span>
        <span class="recent-date">${act.date}</span>
      </div>
      <div class="recent-right">
        <span class="recent-wage">${act.wage}</span>
        <span class="recent-status-pill ${act.statusColor}">${act.status}</span>
      </div>
    </div>
  `).join('');
}

// WALLET VIEW & PAYOUT ENGINE (Matching sketch: Balance ₹1000, UPI / GPay)
function renderWallet() {
  document.getElementById('wallet-balance-display').textContent = `\u20B9${state.wallet.balance.toLocaleString()}`;
  document.getElementById('cashout-available-balance').textContent = `\u20B9${state.wallet.balance.toLocaleString()}`;
  document.getElementById('wallet-user-name').textContent = state.user.name.toUpperCase();
  document.getElementById('wallet-upi-tag').textContent = state.wallet.upiId;

  const txList = document.getElementById('wallet-tx-list');
  if (!txList) return;

  txList.innerHTML = state.wallet.transactions.map(tx => `
    <div class="tx-row">
      <div class="tx-left">
        <div class="tx-icon-wrap ${tx.type}">
          ${tx.type === 'credit' ? '↓' : '↑'}
        </div>
        <div class="tx-info">
          <span class="tx-title">${tx.title}</span>
          <span class="tx-date">${tx.date} • ${tx.category}</span>
        </div>
      </div>
      <div class="tx-amount ${tx.type}">
        ${tx.type === 'credit' ? '+' : '-'}\u20B9${tx.amount.toLocaleString()}
      </div>
    </div>
  `).join('');
}

function addWalletCredit(amount, title) {
  state.wallet.balance += amount;
  state.wallet.transactions.unshift({
    id: 'tx-' + Date.now(),
    title: title,
    category: "Shift Settlement",
    amount: amount,
    type: "credit",
    date: "Just now",
    status: "Completed",
    icon: "sparkles"
  });
  renderWallet();
  sounds.playSuccess();
}

function handleCashoutSubmit() {
  const amtInput = document.getElementById('cashout-amount');
  const upiInput = document.getElementById('cashout-upi');
  const amt = parseInt(amtInput.value, 10);
  const upiId = upiInput.value.trim();

  if (isNaN(amt) || amt <= 0) {
    showToast("Please enter a valid cashout amount", "⚠️");
    return;
  }
  if (amt > state.wallet.balance) {
    showToast(`Insufficient balance. Maximum: \u20B9${state.wallet.balance}`, "⚠️");
    return;
  }
  if (!upiId || !upiId.includes('@')) {
    showToast("Please enter a valid UPI ID (e.g. name@okaxis)", "⚠️");
    return;
  }

  state.wallet.balance -= amt;
  state.wallet.transactions.unshift({
    id: 'tx-' + Date.now(),
    title: `UPI Payout to ${upiId}`,
    category: "GPay / UPI Withdrawal",
    amount: amt,
    type: "debit",
    date: "Just now",
    status: "Completed",
    icon: "arrow-up-right"
  });

  renderWallet();
  sounds.playCashout();
  closeAllModals();
  showToast(`\u20B9${amt} successfully sent to ${upiId} via Google Pay!`, "🎉");
}

// JOB APPLICATION FLOW (One-Time PIN 6767 checkin)
function initiateApply(jobId) {
  sounds.playTap();
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  state.selectedJobForApply = job;
  document.getElementById('apply-modal-title').textContent = `Apply: ${job.title}`;
  document.getElementById('apply-modal-emp').textContent = `${job.employer} • \u20B9${job.wage} (${job.wageUnit})`;
  document.getElementById('apply-modal-details').innerHTML = `
    <div><strong>Location:</strong> ${job.location} (${job.distanceKm} km away)</div>
    <div><strong>Shift Time:</strong> ${job.timeSlot}</div>
    <div><strong>Duration:</strong> ${job.duration}</div>
    <div style="margin-top: 6px;"><strong>Brief:</strong> ${job.description}</div>
  `;

  openModal('modal-apply-confirm');
}

function submitJobApplication() {
  if (!state.selectedJobForApply) return;
  const job = state.selectedJobForApply;

  sounds.playSuccess();
  closeAllModals();

  state.recentActivities.unshift({
    id: 'act-' + Date.now(),
    title: job.title,
    type: "Application Sent",
    wage: `\u20B9${job.wage}`,
    date: "Today, Just now",
    status: "Confirmed",
    statusColor: "cyan",
    pinUsed: "6767"
  });

  state.notifications.unshift({
    id: 'notif-' + Date.now(),
    title: `Applied to ${job.employer} 🎉`,
    message: `Application submitted for \u20B9${job.wage}. Your check-in PIN is 6767.`,
    time: "Just now",
    type: "job",
    unread: true
  });
  updateNotifBadge();

  showToast(`Application submitted! Check-in PIN is 6767`, "🚀");
}

// POST A JOB (Employer "HIRE" modal submission)
function handleHireSubmit(e) {
  e.preventDefault();
  sounds.playSuccess();

  const title = document.getElementById('hire-title').value.trim();
  const category = document.getElementById('hire-category').value;
  const wage = parseInt(document.getElementById('hire-wage').value, 10);
  const duration = document.getElementById('hire-duration').value.trim();
  const slots = parseInt(document.getElementById('hire-slots').value, 10) || 1;
  const location = document.getElementById('hire-location').value.trim();
  const desc = document.getElementById('hire-desc').value.trim();

  const newJob = {
    id: 'job-' + Date.now(),
    title: title,
    employer: `${state.user.name}'s Enterprise`,
    employerAvatar: state.user.avatar,
    employerRating: 5.0,
    category: category,
    wage: wage,
    wageUnit: "per shift",
    duration: duration,
    timeSlot: "Today, Immediate Start",
    distanceKm: 0.5,
    location: location,
    coords: { x: Math.floor(Math.random() * 60) + 20, y: Math.floor(Math.random() * 60) + 20 },
    tags: ["Recently Posted", "Immediate Start", "Verified Hirer"],
    description: desc || "Looking for reliable part-time talent to join our on-ground shift immediately.",
    openSlots: slots,
    checkInPin: "6767",
    isUrgent: true,
    badgeColor: "cyan"
  };

  state.jobs.unshift(newJob);
  renderJobs();
  renderMap();
  closeAllModals();
  showToast(`Vacancy "${title}" published live for \u20B9${wage}!`, "📢");
  document.getElementById('hire-form').reset();
}

function renderNotifications() {
  const container = document.getElementById('notifs-list-container');
  if (!container) return;

  container.innerHTML = state.notifications.map(n => `
    <div style="background: var(--glass-card); border: 1px solid var(--glass-border); padding: 12px; border-radius: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 700; font-size: 13px;">${n.title}</span>
        <span style="font-size: 10px; color: var(--text-muted);">${n.time}</span>
      </div>
      <div style="font-size: 12px; color: var(--text-secondary);">${n.message}</div>
    </div>
  `).join('');
}

function updateNotifBadge() {
  const unread = state.notifications.filter(n => n.unread).length;
  const badge = document.getElementById('header-notif-count');
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }
}

function openModal(modalId) {
  sounds.playTap();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// SETUP EVENT LISTENERS & INITIALIZATION
function setupEventListeners() {
  document.getElementById('btn-toggle-theme').addEventListener('click', toggleTheme);
  document.getElementById('btn-toggle-frame').addEventListener('click', toggleFrameMode);
  document.getElementById('btn-toggle-sound').addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    const icon = document.getElementById('sound-icon');
    icon.textContent = state.soundEnabled ? '🔊' : '🔇';
    showToast(`Sound Effects: ${state.soundEnabled ? 'Enabled' : 'Muted'}`);
  });

  document.getElementById('btn-open-account').addEventListener('click', () => openModal('modal-account'));
  document.getElementById('btn-save-account').addEventListener('click', () => {
    const roleSelect = document.getElementById('account-role-select');
    state.user.userType = roleSelect.value;
    sounds.playSuccess();
    closeAllModals();
    showToast(`Profile saved as ${roleSelect.options[roleSelect.selectedIndex].text}!`, "✨");
  });

  document.getElementById('btn-open-hire').addEventListener('click', () => openModal('modal-hire'));
  document.getElementById('btn-open-settings').addEventListener('click', () => openModal('modal-settings'));
  document.getElementById('btn-open-notifs').addEventListener('click', () => {
    renderNotifications();
    openModal('modal-notifs');
  });
  document.getElementById('banner-kyc-btn').addEventListener('click', () => openModal('modal-account'));
  document.getElementById('banner-otp').addEventListener('click', () => {
    sounds.playTap();
    navigator.clipboard?.writeText('6767');
    showToast("Check-in PIN 6767 copied to clipboard!", "📋");
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      switchTab(targetView);
    });
  });

  document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      sounds.playTap();
      document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.selectedCategory = chip.getAttribute('data-category');
      renderJobs();
    });
  });

  const searchInput = document.getElementById('search-jobs-input');
  const clearSearchBtn = document.getElementById('btn-clear-search');
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
    renderJobs();
  });
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderJobs();
  });

  // Map controls
  const radiusSelector = document.getElementById('map-radius-selector');
  if (radiusSelector) {
    const radiuses = [1, 5, 10, 25];
    radiusSelector.addEventListener('click', () => {
      sounds.playTap();
      const nextIdx = (radiuses.indexOf(state.mapRadius) + 1) % radiuses.length;
      state.mapRadius = radiuses[nextIdx];
      document.getElementById('radius-text').textContent = `Radius: ${state.mapRadius} km`;
      showToast(`Radar scanning within ${state.mapRadius} km radius`, "📡");
    });
  }

  // Chat controls
  const chatSearch = document.getElementById('search-chats-input');
  if (chatSearch) {
    chatSearch.addEventListener('input', () => renderChats());
  }

  const backBtn = document.getElementById('btn-back-to-contacts');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      sounds.playTap();
      document.getElementById('chat-list-pane').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-text-input');
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendChatMessage(chatInput.value);
    chatInput.value = '';
  });

  document.querySelectorAll('.quick-reply-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.getAttribute('data-quick');
      sendChatMessage(text);
    });
  });

  document.getElementById('btn-simulate-call').addEventListener('click', () => {
    sounds.playTap();
    showToast("Calling employer via encrypted line...", "📞");
  });

  // Wallet controls
  document.getElementById('btn-open-cashout').addEventListener('click', () => openModal('modal-cashout'));
  document.getElementById('btn-open-deposit').addEventListener('click', () => {
    addWalletCredit(500, "Bank Deposit Transfer");
    showToast("₹500 added to wallet from HDFC Bank!", "💳");
  });
  document.getElementById('btn-confirm-cashout').addEventListener('click', handleCashoutSubmit);

  document.querySelectorAll('.btn-amt-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('cashout-amount').value = btn.getAttribute('data-amt');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  document.getElementById('btn-submit-job-apply').addEventListener('click', submitJobApplication);
  document.getElementById('hire-form').addEventListener('submit', handleHireSubmit);

  // Dynamic Island Interactive Live Activity Toggle
  const island = document.getElementById('dynamic-island');
  if (island) {
    island.addEventListener('click', (e) => {
      e.stopPropagation();
      sounds.playTap();
      island.classList.toggle('expanded');
    });
  }

  // iPhone 15 Pro Max Physical Hardware Buttons
  const actionBtn = document.querySelector('.iphone-btn-action');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      sounds.playSuccess();
      navigator.clipboard?.writeText('6767');
      showToast("Action Button: Check-in PIN 6767 copied! 🔑", "⚡");
    });
  }

  const volUpBtn = document.querySelector('.iphone-btn-vol-up');
  if (volUpBtn) {
    volUpBtn.addEventListener('click', () => {
      sounds.playTap();
      showToast("Volume: 80% 🔊");
    });
  }

  const volDownBtn = document.querySelector('.iphone-btn-vol-down');
  if (volDownBtn) {
    volDownBtn.addEventListener('click', () => {
      sounds.playTap();
      showToast("Volume: 60% 🔉");
    });
  }

  const powerBtn = document.querySelector('.iphone-btn-power');
  if (powerBtn) {
    powerBtn.addEventListener('click', () => {
      sounds.playTap();
      showToast("Side Button: iPhone 15 Pro Max Locked / Unlocked 🔒");
    });
  }

  document.getElementById('btn-settings-theme').addEventListener('click', toggleTheme);
  document.getElementById('btn-settings-sound').addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    showToast(`Sound Effects: ${state.soundEnabled ? 'Enabled' : 'Muted'}`);
  });
  document.getElementById('btn-reverify-kyc').addEventListener('click', () => {
    closeAllModals();
    openModal('modal-account');
  });
  document.getElementById('btn-signout').addEventListener('click', () => {
    sounds.playTap();
    showToast("Signed out. Switched to guest mode.");
    closeAllModals();
  });
}

// iOS Real-Time Clock
function initClock() {
  const clockEl = document.getElementById('ios-clock');
  function update() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    h = h % 12 || 12;
    m = m < 10 ? '0' + m : m;
    if (clockEl) clockEl.textContent = `${h}:${m}`;
  }
  update();
  setInterval(update, 10000);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  setupEventListeners();
  initClock();
  renderJobs();
  renderMap();
  renderChats();
  renderRecent();
  renderWallet();
  updateChatBadges();
  updateNotifBadge();
  showToast("Welcome to PART-TIME on iPhone 15 Pro Max!", "💎");
});
