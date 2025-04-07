export async function setupCustomLanguageHandlers(room) {
  const languageSelect = document.getElementById('language');
  const customLanguageInput = document.getElementById('customLanguageInput');
  const customLanguageField = document.getElementById('customLanguage');
  
  let lastSelectedLanguage = languageSelect.value;
  let lastCustomInput = '';

  // Load custom languages from localStorage
  function loadLocalCustomLanguages() {
    try {
      const localCustomLanguages = JSON.parse(localStorage.getItem('customLanguages')) || [];
      
      // Get the custom option element to insert before
      const customOption = languageSelect.querySelector('option[value="custom"]');
      
      // Remove any existing local custom language options to prevent duplicates
      Array.from(languageSelect.options)
        .filter(option => option.dataset.isCustom === 'true')
        .forEach(option => option.remove());
      
      // Add local custom languages that are not already present
      localCustomLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.name.toLowerCase();
        option.textContent = lang.name;
        option.dataset.isCustom = 'true';
        languageSelect.insertBefore(option, customOption);
      });

      // Add clear languages option
      addClearLanguagesOption();
    } catch (error) {
      console.error("Error loading custom languages from localStorage:", error);
    }
  }

  // Add clear languages option to the dropdown
  function addClearLanguagesOption() {
    // First, remove any existing clear languages option
    const existingClearOption = languageSelect.querySelector('option[value="clear_languages"]');
    if (existingClearOption) {
      existingClearOption.remove();
    }

    const clearOption = document.createElement('option');
    clearOption.value = 'clear_languages';
    clearOption.textContent = '🗑️ Clear Saved Languages';
    clearOption.style.color = '#ef4444'; // Red color for visibility
    languageSelect.appendChild(clearOption);
  }

  // Handle clearing languages
  async function handleClearLanguages() {
    const confirmClear = confirm('Are you sure you want to clear all saved custom languages? This cannot be undone.');
    
    if (confirmClear) {
      try {
        // Remove custom languages from localStorage
        localStorage.removeItem('customLanguages');
        
        // Remove local custom language options from the select
        Array.from(languageSelect.options)
          .filter(option => option.dataset.isCustom === 'true')
          .forEach(option => option.remove());
        
        alert('Saved custom languages have been cleared.');
      } catch (error) {
        console.error('Error clearing custom languages:', error);
        alert('Failed to clear saved languages.');
      }
    }
    
    // Restore last selected language if it's not a custom language
    const standardLanguages = Array.from(languageSelect.options)
      .filter(option => !option.dataset.isCustom)
      .map(option => option.value);
    
    if (standardLanguages.includes(lastSelectedLanguage)) {
      languageSelect.value = lastSelectedLanguage;
    } else {
      languageSelect.value = 'javascript';
      lastSelectedLanguage = 'javascript';
    }
  }

  // Load custom languages from localStorage
  loadLocalCustomLanguages();

  // Add event listener to handle clear languages option
  languageSelect.addEventListener('change', (e) => {
    if (e.target.value === 'clear_languages') {
      handleClearLanguages();
    } else if (e.target.value === 'custom') {
      customLanguageInput.classList.remove('hidden');
      customLanguageField.value = lastCustomInput;
      customLanguageField.focus();
    } else {
      customLanguageInput.classList.add('hidden');
      lastSelectedLanguage = e.target.value;
    }
  });

  customLanguageField.addEventListener('blur', (e) => {
    const customValue = e.target.value.trim();
    lastCustomInput = customValue;
    
    if (!customValue) {
      languageSelect.value = lastSelectedLanguage;
      customLanguageInput.classList.add('hidden');
    }
  });

  customLanguageField.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const customValue = customLanguageField.value.trim();
      lastCustomInput = customValue;
      
      if (customValue) {
        // Check if the language already exists in select
        const exists = Array.from(languageSelect.options).some(
          option => option.text.toLowerCase() === customValue.toLowerCase()
        );

        if (!exists) {
          // Save to localStorage
          const localCustomLanguages = JSON.parse(localStorage.getItem('customLanguages')) || [];
          const isExistsInLocal = localCustomLanguages.some(lang => 
            lang.name.toLowerCase() === customValue.toLowerCase()
          );
          
          if (!isExistsInLocal) {
            localCustomLanguages.push({ name: customValue });
            localStorage.setItem('customLanguages', JSON.stringify(localCustomLanguages));
          }
          
          // Create and insert new option before the "custom" option
          const newOption = document.createElement('option');
          newOption.value = customValue.toLowerCase();
          newOption.textContent = customValue;
          newOption.dataset.isCustom = 'true';
          const customOption = languageSelect.querySelector('option[value="custom"]');
          languageSelect.insertBefore(newOption, customOption);
          
          // Re-add clear languages option
          addClearLanguagesOption();
          
          // Select the new language
          languageSelect.value = customValue.toLowerCase();
          lastSelectedLanguage = customValue.toLowerCase();
          customLanguageInput.classList.add('hidden');
          customLanguageField.value = '';
        } else {
          // If language exists, just select it
          languageSelect.value = customValue.toLowerCase();
          lastSelectedLanguage = customValue.toLowerCase();
          customLanguageInput.classList.add('hidden');
          customLanguageField.value = '';
        }
      }
    }
  });
}
