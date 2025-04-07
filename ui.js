import { getUIElements, setupToneHandlers } from './ui-elements.js';
import { initializeModeSelector, handleModeChange, updateUIForMode } from './mode-handler.js';
import { handleExecute } from './execution-handler.js';
import { displayResult } from './output-handler.js';

export let elements;

export { 
  displayResult, 
  updateUIForMode,
  handleModeChange 
};

export async function setupUIHandlers(room) {
  // Get UI Elements
  elements = getUIElements();

  // Initialize mode selector
  initializeModeSelector(elements);

  // Setup tone handlers
  setupToneHandlers(elements);
  
  // Setup event handlers
  elements.modeOptions.addEventListener('change', (e) => handleModeChange(e, elements));
  elements.execute.addEventListener('click', () => handleExecute(elements));
  elements.description.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      elements.execute.click();
    }
  });

  // Initial UI setup
  handleModeChange({target:{value: elements.modeOptions.value}}, elements);
}
