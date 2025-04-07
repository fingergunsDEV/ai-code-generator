import { setupUIHandlers } from './ui.js';
import { setupCustomLanguageHandlers } from './language-handlers.js';
import { handleModeChange } from './mode-handler.js';  
import { getUIElements } from './ui-elements.js';  

document.addEventListener('DOMContentLoaded', async () => {
  const room = new WebsimSocket();
  const elements = getUIElements();  
  await setupUIHandlers(room);
  await setupCustomLanguageHandlers(room);

  // Default to generator mode on page load
  await setTimeout(() => handleModeChange({target:{value: "generator"}}, elements), 250);
});
