// Storage Keys
const STORAGE = {
  TASKS: 'planit-tasks-v2',
  THEME: 'planit-theme',
  ACHIEVEMENTS: 'planit-achievements',
  STREAK: 'planit-streak'
};

// State
let tasks = [];
let achievements = {};
let streak = { count: 0, lastDate: null };
let selectedPriority = 'medium';

// Motivational Quotes
const quotes = [
  "Satu langkah kecil hari ini, satu lompatan besar besok! 🚀",
  "Mulai dari yang sederhana, raih yang luar biasa! ✨",
  "Konsistensi adalah kunci kesuksesan! 💪",
  "Hari ini adalah hari terbaik untuk memulai! 🌟",
  "Kamu bisa! Percaya pada prosesnya! 🎯",
  "Setiap tugas selesai adalah pencapaian! 🏆",
  "Fokus pada progress, bukan perfeksi! 📈",
  "Kamu lebih kuat dari yang kamu kira! 💫"
];

// Achievement Definitions
const ACHIEVEMENTS = {
  firstTask: { 
    id: 'firstTask', 
    name: 'Getting Started', 
    desc: 'Buat tugas pertama',
    icon: '🎯',
    check: () => tasks.length >= 1
  },
  streak7: { 
    id: 'streak7', 
    name: 'Consistency King', 
    desc: '7 hari berturut-turut',
    icon: '🔥',
    check: () => streak.count >= 7
  },
  tenTasks: { 
    id: 'tenTasks', 
    name: 'Overachiever', 
    desc: '10 tugas dalam sehari',
    icon: '⚡',
    check: () => getCompletedToday() >= 10
  },
  earlyBird: { 
    id: 'earlyBird', 
    name: 'Early Bird', 
    desc: 'Selesaikan tugas sebelum jam 8 pagi',
    icon: '🌅',
    check: () => hasEarlyCompletion()
  },
  nightOwl: { 
    id: 'nightOwl', 
    name: 'Night Owl', 
    desc: 'Selesaikan tugas setelah jam 10 malam',
    icon: '🦉',
    check: () => hasLateCompletion()
  },
  taskMaster: { 
    id: 'taskMaster', 
    name: 'Task Master', 
    desc: '50 tugas selesai total',
    icon: '👑',
    check: () => tasks.filter(t => t.completed).length >= 50
  },
  priorityPro: { 
    id: 'priorityPro', 
    name: 'Priority Pro', 
    desc: '20 tugas prioritas tinggi',
    icon: '🎖️',
    check: () => tasks.filter(t => t.priority === 'high').length >= 20
  },
  perfectWeek: { 
    id: 'perfectWeek', 
    name: 'Perfect Week', 
    desc: '100% completion 7 hari',
    icon: '💎',
    check: () => checkPerfectWeek()
  },
  speedDemon: { 
    id: 'speedDemon', 
    name: 'Speed Demon', 
    desc: '5 tugas dalam 1 jam',
    icon: '⚡',
    check: () => checkSpeedCompletion()
  }
};

// Initialize
function init() {
  loadData();
  setupEventListeners();
  updateStreak();
  renderTasks();
  updateStats();
  updateMotivation();
  checkAchievements();
  applyTheme();
  
  // Check system theme preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem(STORAGE.THEME)) {
      document.documentElement.classList.add('dark');
    }
  }
}

// Data Management
function loadData() {
  tasks = JSON.parse(localStorage.getItem(STORAGE.TASKS) || '[]');
  achievements = JSON.parse(localStorage.getItem(STORAGE.ACHIEVEMENTS) || '{}');
  streak = JSON.parse(localStorage.getItem(STORAGE.STREAK) || '{"count":0,"lastDate":null}');
}

function saveData() {
  localStorage.setItem(STORAGE.TASKS, JSON.stringify(tasks));
  localStorage.setItem(STORAGE.ACHIEVEMENTS, JSON.stringify(achievements));
  localStorage.setItem(STORAGE.STREAK, JSON.stringify(streak));
}

// Event Listeners
function setupEventListeners() {
  document.getElementById('taskForm').addEventListener('submit', handleAddTask);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
  document.getElementById('achievementsBtn').addEventListener('click', showAchievements);
  document.getElementById('achievementsBtnMobile').addEventListener('click', showAchievements);
  document.getElementById('closeAchievements').addEventListener('click', hideAchievements);
  document.getElementById('filterBy').addEventListener('change', renderTasks);
  document.getElementById('sortBy').addEventListener('change', renderTasks);
  document.getElementById('editForm').addEventListener('submit', handleEditTask);
  document.getElementById('cancelEdit').addEventListener('click', hideEditModal);
  
  // Priority buttons
  document.querySelectorAll('.priority-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.priority-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      e.currentTarget.classList.add('active');
      e.currentTarget.setAttribute('aria-checked', 'true');
      selectedPriority = e.currentTarget.dataset.priority;
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('taskName').focus();
    }
    if (e.key === 'Escape') {
      hideEditModal();
      hideAchievements();
    }
  });

  // Modal click outside to close
  document.getElementById('achievementsModal').addEventListener('click', (e) => {
    if (e.target.id === 'achievementsModal') hideAchievements();
  });
  document.getElementById('editModal').addEventListener('click', (e) => {
    if (e.target.id === 'editModal') hideEditModal();
  });
}

// Task Management
function handleAddTask(e) {
  e.preventDefault();
  const name = document.getElementById('taskName').value.trim();
  if (!name) return;
  
  const task = {
    id: Date.now(),
    name,
    time: document.getElementById('taskTime').value,
    priority: selectedPriority,
    completed: false,
    createdAt: Date.now(),
    completedAt: null
  };
  
  tasks.unshift(task);
  saveData();
  renderTasks();
  updateStats();
  checkAchievements();
  
  document.getElementById('taskForm').reset();
  
  // Reset priority to medium
  document.querySelectorAll('.priority-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-checked', 'false');
  });
  document.querySelector('.priority-btn[data-priority="medium"]').classList.add('active');
  document.querySelector('.priority-btn[data-priority="medium"]').setAttribute('aria-checked', 'true');
  selectedPriority = 'medium';
  
  showToast('✨ Tugas berhasil ditambahkan!', 'success');
  if (navigator.vibrate) navigator.vibrate(10);
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  
  task.completed = !task.completed;
  task.completedAt = task.completed ? Date.now() : null;
  
  saveData();
  renderTasks();
  updateStats();
  checkAchievements();
  
  if (task.completed) {
    showToast('🎉 Tugas selesai! Kerja bagus!', 'success');
    if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
    
    const pending = tasks.filter(t => !t.completed);
    if (pending.length === 0 && tasks.length > 0) {
      setTimeout(() => {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        showToast('🏆 Semua tugas selesai! Luar biasa!', 'success');
      }, 300);
    }
  }
}

function deleteTask(id) {
  if (!confirm('Hapus tugas ini?')) return;
  
  tasks = tasks.filter(t => t.id !== id);
  saveData();
  renderTasks();
  updateStats();
  showToast('🗑️ Tugas dihapus', 'info');
}

function showEditModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  
  document.getElementById('editId').value = task.id;
  document.getElementById('editName').value = task.name;
  document.getElementById('editTime').value = task.time || '';
  document.getElementById('editPriority').value = task.priority;
  
  document.getElementById('editModal').classList.remove('hidden');
  document.getElementById('editModal').classList.add('flex');
  document.getElementById('editName').focus();
}

function hideEditModal() {
  document.getElementById('editModal').classList.add('hidden');
  document.getElementById('editModal').classList.remove('flex');
}

function handleEditTask(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('editId').value);
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  
  task.name = document.getElementById('editName').value.trim();
  task.time = document.getElementById('editTime').value;
  task.priority = document.getElementById('editPriority').value;
  
  saveData();
  renderTasks();
  hideEditModal();
  showToast('✏️ Tugas diperbarui', 'success');
}

// Render
function renderTasks() {
  const list = document.getElementById('taskList');
  const empty = document.getElementById('emptyState');
  
  let filtered = [...tasks];
  
  // Filter
  const filter = document.getElementById('filterBy').value;
  if (filter === 'active') filtered = filtered.filter(t => !t.completed);
  else if (filter === 'completed') filtered = filtered.filter(t => t.completed);
  else if (['high', 'medium', 'low'].includes(filter)) filtered = filtered.filter(t => t.priority === filter);
  
  // Sort
  const sort = document.getElementById('sortBy').value;
  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'time') filtered.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  else if (sort === 'priority') {
    const order = { high: 0, medium: 1, low: 2 };
    filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  }
  else filtered.sort((a, b) => b.createdAt - a.createdAt);
  
  // Update task count
  document.getElementById('taskCount').textContent = `(${filtered.length})`;
  
  if (filtered.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  
  empty.classList.add('hidden');
  list.innerHTML = filtered.map(task => {
    const isOverdue = task.time && !task.completed && isTaskOverdue(task.time);
    return `
    <div class="task-item priority-${task.priority} ${task.completed ? 'completed' : ''} glass rounded-2xl p-4 transition-all" 
         data-id="${task.id}"
         role="listitem">
      <div class="flex items-start gap-4">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          onchange="toggleTask(${task.id})"
          aria-label="Tandai ${escapeHtml(task.name)} sebagai selesai" />
        
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-base ${task.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'} mb-2">
            ${escapeHtml(task.name)}
          </h3>
          
          <div class="flex flex-wrap items-center gap-2">
            ${task.time ? `
              <span class="time-badge ${isOverdue ? 'overdue' : ''}">
                <i class="far fa-clock"></i>
                ${task.time}
                ${isOverdue ? '<i class="fas fa-exclamation-circle ml-1"></i>' : ''}
              </span>
            ` : ''}
            
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${getPriorityBadgeClass(task.priority)}">
              ${getPriorityText(task.priority)}
            </span>
          </div>
        </div>
        
        <div class="flex gap-2 flex-shrink-0">
          <button 
            onclick="showEditModal(${task.id})" 
            class="w-9 h-9 glass rounded-lg flex items-center justify-center hover:scale-110 transition-all focus-visible"
            aria-label="Edit ${escapeHtml(task.name)}">
            <i class="fas fa-edit text-sm text-gray-600 dark:text-gray-400"></i>
          </button>
          <button 
            onclick="deleteTask(${task.id})" 
            class="w-9 h-9 glass rounded-lg flex items-center justify-center hover:scale-110 transition-all focus-visible"
            aria-label="Hapus ${escapeHtml(task.name)}">
            <i class="fas fa-trash text-sm text-red-500"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  }).join('');
}

// Stats
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('pendingCount').textContent = pending;
  document.getElementById('progressPercent').textContent = percent + '%';
  document.getElementById('streakCount').textContent = streak.count;
  
  // Progress ring
  const circle = document.getElementById('progressCircle');
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function updateStreak() {
  const today = new Date().toDateString();
  const lastDate = streak.lastDate;
  
  if (lastDate === today) return;
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastDate === yesterday.toDateString()) {
    const completedToday = tasks.filter(t => {
      const taskDate = new Date(t.completedAt).toDateString();
      return t.completed && taskDate === today;
    }).length;
    
    if (completedToday > 0) {
      streak.count++;
      streak.lastDate = today;
      saveData();
    }
  } else if (lastDate !== today) {
    const completedToday = tasks.filter(t => {
      const taskDate = new Date(t.completedAt).toDateString();
      return t.completed && taskDate === today;
    }).length;
    
    if (completedToday > 0) {
      streak.count = 1;
      streak.lastDate = today;
      saveData();
    } else {
      streak.count = 0;
      streak.lastDate = null;
      saveData();
    }
  }
}

// Achievements
function checkAchievements() {
  let newAchievements = 0;
  
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (!achievements[achievement.id] && achievement.check()) {
      achievements[achievement.id] = {
        unlocked: true,
        unlockedAt: Date.now()
      };
      newAchievements++;
      showAchievementUnlock(achievement);
    }
  });
  
  if (newAchievements > 0) {
    saveData();
    updateAchievementBadge();
  }
}

function showAchievementUnlock(achievement) {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  }
  
  showToast(`🏆 ${achievement.icon} ${achievement.name} unlocked!`, 'achievement');
  if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
}

function updateAchievementBadge() {
  const unlockedCount = Object.keys(achievements).length;
  const badge = document.getElementById('achievementBadge');
  if (unlockedCount > 0) {
    badge.textContent = unlockedCount;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function showAchievements() {
  const modal = document.getElementById('achievementsModal');
  const list = document.getElementById('achievementsList');
  
  list.innerHTML = Object.values(ACHIEVEMENTS).map(achievement => {
    const unlocked = achievements[achievement.id];
    return `
      <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'} glass rounded-2xl p-5 text-center" role="listitem">
        <div class="text-5xl mb-3">${achievement.icon}</div>
        <div class="font-bold text-sm mb-1 ${unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'}">${achievement.name}</div>
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-3">${achievement.desc}</div>
        ${unlocked ? 
          '<div class="inline-flex items-center gap-1 text-xs font-semibold text-success"><i class="fas fa-check-circle"></i> Unlocked</div>' : 
          '<div class="inline-flex items-center gap-1 text-xs font-semibold text-gray-400"><i class="fas fa-lock"></i> Locked</div>'}
      </div>
    `;
  }).join('');
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function hideAchievements() {
  document.getElementById('achievementsModal').classList.add('hidden');
  document.getElementById('achievementsModal').classList.remove('flex');
}

// Achievement Checks
function getCompletedToday() {
  const today = new Date().toDateString();
  return tasks.filter(t => {
    const taskDate = new Date(t.completedAt).toDateString();
    return t.completed && taskDate === today;
  }).length;
}

function hasEarlyCompletion() {
  return tasks.some(t => {
    if (!t.completed || !t.completedAt) return false;
    const hour = new Date(t.completedAt).getHours();
    return hour < 8;
  });
}

function hasLateCompletion() {
  return tasks.some(t => {
    if (!t.completed || !t.completedAt) return false;
    const hour = new Date(t.completedAt).getHours();
    return hour >= 22;
  });
}

function checkPerfectWeek() {
  const now = Date.now();
  const weekAgo = now - (7 * 24 * 60 * 60 * 1000);
  const weekTasks = tasks.filter(t => t.createdAt >= weekAgo);
  return weekTasks.length > 0 && weekTasks.every(t => t.completed);
}

function checkSpeedCompletion() {
  const completedTasks = tasks.filter(t => t.completed && t.completedAt).sort((a, b) => b.completedAt - a.completedAt);
  if (completedTasks.length < 5) return false;
  
  for (let i = 0; i < completedTasks.length - 4; i++) {
    const first = completedTasks[i].completedAt;
    const fifth = completedTasks[i + 4].completedAt;
    if (first - fifth <= 60 * 60 * 1000) return true;
  }
  return false;
}

// Theme
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem(STORAGE.THEME, isDark ? 'dark' : 'light');
}

function applyTheme() {
  const theme = localStorage.getItem(STORAGE.THEME);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

// Motivation
function updateMotivation() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('motivationText').textContent = quote;
}

// Toast
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  
  const colors = {
    success: 'from-success to-emerald-600',
    error: 'from-danger to-rose-600',
    info: 'from-primary to-secondary',
    achievement: 'from-yellow-500 to-orange-500'
  };
  
  toast.className = `toast glass px-5 py-3 text-white bg-gradient-to-r ${colors[type]} shadow-xl rounded-xl font-medium`;
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  
  container.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
}

// Utilities
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getPriorityBadgeClass(priority) {
  if (priority === 'high') return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
  if (priority === 'medium') return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
  return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
}

function getPriorityText(priority) {
  if (priority === 'high') return 'Tinggi';
  if (priority === 'medium') return 'Sedang';
  return 'Rendah';
}

function isTaskOverdue(time) {
  if (!time) return false;
  const now = new Date();
  const [hours, minutes] = time.split(':').map(Number);
  const taskTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  return now > taskTime;
}

// Initialize app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateStreak();
    updateStats();
  }
});