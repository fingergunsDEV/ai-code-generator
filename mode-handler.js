import { MODE_OPTIONS, MODES } from './modes-config.js';

// Initialize the mode selector with options
export function initializeModeSelector(elements) {
  const modeSelect = elements.modeOptions;
  modeSelect.innerHTML = MODE_OPTIONS.map(modeKey => 
    `<option value="${modeKey}">AI Code ${MODES[modeKey].title}</option>`
  ).join('');
}

// Handle mode change and update UI accordingly
export function handleModeChange(e, elements) {
  const modeKey = e.target.value;
  const modeConfig = MODES[modeKey];

  // Update UI elements
  elements.titleText.textContent = `AI Code ${modeConfig.title}`;
  elements.descriptionLabel.textContent = modeConfig.descriptionLabel;
  elements.description.placeholder = modeConfig.placeholder;
  elements.execute.querySelector('.button-text').textContent = modeConfig.executeName;

  // Toggle mode-specific options
  document.querySelectorAll('[data-mode-option]').forEach(el => {
    el.classList.toggle('hidden', !modeConfig.options?.includes(el.dataset.modeOption));
  });

  // Special handling for converter mode
  if (modeKey === 'converter') {
    elements.language.parentElement.querySelector('label').textContent = 'Source Language:';
    // Ensure targetLanguage element is fetched when mode is converter
    elements.targetLanguage = document.getElementById('targetLanguage');
  } else {
    elements.language.parentElement.querySelector('label').textContent = 'Programming Language/Software:';
    elements.targetLanguage = undefined; // clear targetLanguage when not in converter mode
  }

  // Hide custom tone input when tone option is hidden
  const toneOptionHidden = !modeConfig.options?.includes('tone');
  const toneSelect = document.getElementById('tone');
  const customToneInput = document.getElementById('customToneInput');
  if (toneOptionHidden) {
    customToneInput.classList.add('hidden');
    if (toneSelect) toneSelect.value = 'professional'; // Reset tone to default if hidden
  }

  updateUIForMode(modeKey, elements);
}

// Apply mode-specific CSS classes to UI elements
export function updateUIForMode(modeKey, elements) {
  const modeClass = `${modeKey}-mode`;
  
  const uiElements = [
    { el: elements.body, class: 'body' },
    { el: elements.container, class: 'container' },
    { el: elements.subtitle, class: 'subtitle' },
    { el: elements.execute, class: 'execute' },
    { el: elements.output, class: 'output' },
    { el: elements.modeSwitch, class: 'mode-switch' }
  ];

  // Remove all mode classes first
  uiElements.forEach(({ el }) => {
    MODE_OPTIONS.forEach(mode => {
      el.classList.remove(`${mode}-mode`);
    });
    el.classList.add(modeClass);
  });

  elements.labels.forEach(label => {
    MODE_OPTIONS.forEach(mode => {
      label.classList.remove(`${mode}-mode`);
    });
    label.classList.add(modeClass);
  });

  elements.selectsAndTextareas.forEach(el => {
    MODE_OPTIONS.forEach(mode => {
      el.classList.remove(`${mode}-mode`);
    });
    el.classList.add(modeClass);
  });

  if (elements.checkbox) {
    MODE_OPTIONS.forEach(mode => {
      elements.checkbox.classList.remove(`${mode}-mode`);
    });
    elements.checkbox.classList.add(modeClass);
  }

  if (elements.customLanguageInputEl) {
    MODE_OPTIONS.forEach(mode => {
      elements.customLanguageInputEl.classList.remove(`${mode}-mode`);
    });
    elements.customLanguageInputEl.classList.add(modeClass);
  }

  if (elements.customToneInputEl) {
    MODE_OPTIONS.forEach(mode => {
      elements.customToneInputEl.classList.remove(`${mode}-mode`);
    });
    elements.customToneInputEl.classList.add(modeClass);
  }

  if (elements.copyButton) {
    MODE_OPTIONS.forEach(mode => {
      elements.copyButton.classList.remove(`${mode}-mode`);
    });
    elements.copyButton.classList.add(modeClass);
  }
}
