import { MODES } from './modes-config.js';
import { updateUIForMode } from './ui.js';
import { displayResult } from './ui.js';

// Handle execute button click
export async function handleExecute(elements) {
  const modeKey = elements.modeOptions.value;
  const modeConfig = MODES[modeKey];
  const description = elements.description.value;
  let toneValue = elements.tone ? elements.tone.value : 'professional';
  const customToneField = document.getElementById('customTone');

  if (toneValue === 'custom' && customToneField) {
    toneValue = customToneField.value.trim();
    if (!toneValue) {
      elements.output.textContent = `Please provide a custom tone.`;
      return;
    }
  }

  if (!description.trim()) {
    elements.output.textContent = `Please provide ${modeConfig.descriptionLabel.toLowerCase()}`;
    return;
  }

  elements.execute.classList.add('loading');
  elements.output.textContent = `${modeConfig.loadingText}...`;

  try {
    const parameters = modeConfig.parameters(elements);
    if (modeConfig.options?.includes('tone')) {
      // Find the correct index to replace based on the handler function parameters
      const handlerName = modeConfig.handler.name;
      
      switch (handlerName) {
        case 'generateCode':
          parameters[2] = toneValue; // tone is 3rd parameter
          break;
        case 'explainCode':
        case 'reviewCode':
          parameters[2] = toneValue; // add tone as 3rd parameter 
          break;
        case 'commentCode':
          parameters[4] = toneValue; // tone is 5th parameter
          break;
        case 'convertCode':
          parameters[4] = toneValue; // tone is 5th parameter
          break;
      }
    }
    
    const result = await modeConfig.handler(...parameters);
    displayResult(result, elements.language.value, modeKey, elements);
  } catch (error) {
    console.error("Error:", error);
    elements.output.textContent = error.message || 'Error processing request. Please try again.';
  } finally {
    elements.execute.classList.remove('loading');
  }
}
