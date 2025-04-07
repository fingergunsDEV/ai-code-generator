// Theme color configurations
export const THEMES = {
  ocean: {
    primary: {
      main: '#3b82f6',
      hover: '#2563eb',
      text: '#f8fafc'
    },
    background: {
      main: '#0f172a',
      secondary: '#1e293b',
      accent: '#334155'
    },
    accent: {
      success: '#22c55e',
      warning: '#eab308', 
      error: '#ef4444'
    },
    mode: 'dark'
  },
  forest: {
    primary: {
      main: '#22c55e',
      hover: '#16a34a',
      text: '#f8fafc'
    },
    background: {
      main: '#052e16',
      secondary: '#14532d',
      accent: '#166534'
    },
    accent: {
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#f87171'
    },
    mode: 'dark'
  },
  sunset: {
    primary: {
      main: '#f97316',
      hover: '#ea580c',
      text: '#f8fafc'
    },
    background: {
      main: '#431407',
      secondary: '#7c2d12',
      accent: '#9a3412'
    },
    accent: {
      success: '#84cc16',
      warning: '#facc15',
      error: '#dc2626'
    },
    mode: 'dark'
  },
  aurora: {
    primary: {
      main: '#8b5cf6',
      hover: '#7c3aed',
      text: '#f8fafc'
    },
    background: {
      main: '#2e1065',
      secondary: '#4c1d95',
      accent: '#5b21b6'
    },
    accent: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    mode: 'dark'
  },
  moonlight: {
    primary: {
      main: '#6366f1',
      hover: '#4f46e5',
      text: '#f8fafc'
    },
    background: {
      main: '#020617',
      secondary: '#0f172a',
      accent: '#1e293b'
    },
    accent: {
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171'
    },
    mode: 'dark'
  }
};

export function initThemeManager() {
  // Load saved theme or default to 'ocean'
  const savedTheme = localStorage.getItem('selectedTheme') || 'ocean';
  applyTheme(savedTheme);

  // Create and inject theme switcher UI
  createThemeSwitcher();
}

function createThemeSwitcher() {
  // Instead of adding to title-section, create a new floating container
  const themeSelect = document.createElement('div');
  themeSelect.className = 'theme-switcher-floating';
  themeSelect.innerHTML = `
    <div class="theme-options-vertical">
      ${Object.keys(THEMES).map(themeName => `
        <button class="theme-option ${themeName}" data-theme="${themeName}">
          <div class="theme-preview">
            <div class="preview-primary" style="background: ${THEMES[themeName].primary.main}"></div>
            <div class="preview-bg" style="background: ${THEMES[themeName].background.main}"></div>
            <div class="preview-accent" style="background: ${THEMES[themeName].accent.success}"></div>
          </div>
          <span>${themeName.charAt(0).toUpperCase() + themeName.slice(1)}</span>
        </button>
      `).join('')}
    </div>
  `;

  document.body.appendChild(themeSelect);

  // Add event listeners
  themeSelect.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('.theme-option');
    if (themeBtn) {
      const themeName = themeBtn.dataset.theme;
      applyTheme(themeName);
      localStorage.setItem('selectedTheme', themeName);

      // Update active state
      document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.remove('active');
      });
      themeBtn.classList.add('active');
    }
  });

  // Set initial active state
  const savedTheme = localStorage.getItem('selectedTheme') || 'ocean';
  document.querySelector(`.theme-option[data-theme="${savedTheme}"]`).classList.add('active');
}

function applyTheme(themeName) {
  const theme = THEMES[themeName];
  const root = document.documentElement;

  // Apply theme colors to CSS variables
  Object.entries(theme).forEach(([category, values]) => {
    if (typeof values === 'object') {
      Object.entries(values).forEach(([key, value]) => {
        root.style.setProperty(`--${category}-${key}`, value);
      });
    } else {
      root.style.setProperty(`--${category}`, values);
    }
  });

  // Add theme class to body
  document.body.className = `theme-${themeName}`;
}
