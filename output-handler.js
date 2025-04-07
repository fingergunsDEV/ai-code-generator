import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';

// Handle displaying the result in the output area
export function displayResult(result, language, modeKey, elements) {
  if (modeKey === 'generator') {
    let codeContent = result;
    if (result.includes('\n\n/*\nExplanation:')) {
      codeContent = result.split('\n\n/*\nExplanation:')[0];
    }
    
    if (language.includes("html_css_javascript")) {
      language = "html";
    }
    
    let modifiedResult = language.includes("html") ? escapeHtml(codeContent) : result;
    if (language.includes("html")) {
      elements.output.innerHTML = `<pre data-raw-code="${encodeURIComponent(codeContent)}"><code class="language-${language}">${modifiedResult}</code></pre>`;
    } else {
      elements.output.innerHTML = `<pre><code class="language-${language}">${modifiedResult}</code></pre>`;
    }
    hljs.highlightAll();
    addCopyButton(elements.output.querySelector('pre'), codeContent);
    
    if (language.includes("html")) {
      addRunButton(elements);
    }
  } else if (modeKey === 'converter') {
    let codeContent = result;
    let modifiedResult = language.includes("html") ? escapeHtml(codeContent) : result;
    if (language.includes("html")) {
      elements.output.innerHTML = `<pre data-raw-code="${codeContent}"><code class="language-${elements.targetLanguage}">${modifiedResult}</code></pre>`;
    } else {
      elements.output.innerHTML = `<pre><code class="language-${elements.targetLanguage}">${modifiedResult}</code></pre>`;
    }
    hljs.highlightAll();
    addCopyButton(elements.output.querySelector('pre'), codeContent);

    if (language.includes("html")) {
      addRunButton(elements);
    }
  } else {
    elements.output.innerHTML = result;

    const codeBlocks = elements.output.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock) => {
      hljs.highlightElement(codeBlock);
      const preBlock = codeBlock.parentElement;
      addCopyButton(preBlock, codeBlock.textContent);
      if (language && language.includes("html")) {
        addRunButtonForCodeBlock(preBlock, codeBlock.textContent);
      }
    });
  }
}

// Add a run button for HTML code
function addRunButton(elements) {
  let preBlock = elements.output.querySelector('pre');
  let runButton = document.createElement('button');
  runButton.className = 'run-code-button';
  runButton.textContent = 'Run Code (Review the above code first!)';
  runButton.addEventListener('click', () => {
    let rawCode = decodeURIComponent(preBlock.getAttribute('data-raw-code'));
    let iframe = document.createElement('iframe');
    iframe.srcdoc = rawCode;
    iframe.className = 'run-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    let oldIframe = elements.output.querySelector('iframe.run-iframe');
    if (oldIframe) oldIframe.remove();
    elements.output.appendChild(iframe);
  });
  elements.output.appendChild(runButton);
}

// Add a run button for HTML code blocks in reviewer/explainer modes
function addRunButtonForCodeBlock(preBlock, codeContent) {
  let runButton = document.createElement('button');
  runButton.className = 'run-code-button';
  runButton.textContent = 'Run Code';
  runButton.addEventListener('click', () => {
    let iframe = document.createElement('iframe');
    iframe.srcdoc = codeContent;
    iframe.className = 'run-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '300px';
    let oldIframe = preBlock.querySelector('iframe.run-iframe');
    if (oldIframe) oldIframe.remove();
    preBlock.parentElement.appendChild(iframe);
  });
  preBlock.appendChild(runButton);
}

// Add a copy button to code blocks
export function addCopyButton(container, textToCopy) {
  const copyButton = document.createElement('button');
  copyButton.className = 'copy-button';
  copyButton.textContent = 'Copy';

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      copyButton.textContent = 'Copied!';
      copyButton.classList.add('copied');

      setTimeout(() => {
        copyButton.textContent = 'Copy';
        copyButton.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      copyButton.textContent = 'Failed to copy';

      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    }
  });

  container.style.position = 'relative';
  copyButton.style.position = 'absolute';
  copyButton.style.top = '-15px';
  copyButton.style.right = '0px';
  container.appendChild(copyButton);
}

// Escape HTML for safe rendering
export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
