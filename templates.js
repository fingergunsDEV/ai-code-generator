export const TEMPLATES = {
  javascript: {
    desktop: {
      basic: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desktop App</title>
  <style>
    :root {
      --primary: #3b82f6;
      --background: #0f172a;
      --text: #f8fafc;
    }
    
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--background);
      color: var(--text);
      margin: 0;
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
    }
    
    header {
      padding: 1rem;
      background: rgba(255,255,255,0.1);
    }
    
    main {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    footer {
      padding: 1rem;
      text-align: center;
      background: rgba(255,255,255,0.1);
    }
    
    @media (max-width: 768px) {
      main {
        padding: 1rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>App Title</h1>
    <nav>
      <!-- Navigation items -->
    </nav>
  </header>

  <main>
    <!-- Main content -->
  </main>

  <footer>
    <!-- Footer content -->
  </footer>

  <script>
    // Your JavaScript code here
  </script>
</body>
</html>`,

      spa: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SPA Template</title>
  <script type="importmap">
  {
    "imports": {
      "lit": "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js"
    }
  }
  </script>
  <style>
    /* App styles */
    :root {
      --primary: #3b82f6;
      --background: #0f172a;
      --text: #f8fafc;
    }
    
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--background);
      color: var(--text);
      margin: 0;
      min-height: 100vh;
    }
    
    #app {
      display: grid;
      min-height: 100vh;
      grid-template-rows: auto 1fr auto;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
    }
  </style>
</head>
<body>
  <div id="app"></div>
  
  <script type="module">
    import { LitElement, html, css } from 'lit';
    
    class AppRoot extends LitElement {
      static styles = css\`
        :host {
          display: block;
        }
      \`;
      
      render() {
        return html\`
          <header>
            <h1>App Title</h1>
          </header>
          
          <main>
            <!-- App content -->
          </main>
          
          <footer>
            <!-- Footer content -->
          </footer>
        \`;
      }
    }
    
    customElements.define('app-root', AppRoot);
    
    document.getElementById('app').appendChild(
      document.createElement('app-root')
    );
  </script>
</body>
</html>`
    },
    
    mobile: {
      basic: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <title>Mobile App</title>
  <style>
    :root {
      --safe-area-inset-top: env(safe-area-inset-top);
      --safe-area-inset-bottom: env(safe-area-inset-bottom);
      --primary: #3b82f6;
      --background: #0f172a;
      --text: #f8fafc;
    }
    
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--background);
      color: var(--text);
      margin: 0;
      min-height: 100vh;
      padding: var(--safe-area-inset-top) 0 var(--safe-area-inset-bottom);
      display: flex;
      flex-direction: column;
    }
    
    .app-header {
      position: sticky;
      top: 0;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      padding: 1rem;
      z-index: 100;
    }
    
    .content {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    
    .bottom-nav {
      position: sticky;
      bottom: 0;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      padding: 1rem;
      display: flex;
      justify-content: space-around;
    }
    
    @media (min-width: 768px) {
      body {
        max-width: 768px;
        margin: 0 auto;
      }
    }
  </style>
</head>
<body>
  <header class="app-header">
    <h1>Mobile App</h1>
  </header>

  <main class="content">
    <!-- App content -->
  </main>

  <nav class="bottom-nav">
    <!-- Navigation items -->
  </nav>

  <script>
    // Handle touch events
    document.addEventListener('touchstart', () => {}, {passive: true});
  </script>
</body>
</html>`
    }
  },
  
  react: {
    desktop: {
      basic: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Desktop App</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    :root {
      --primary: #3b82f6;
      --background: #0f172a;
      --text: #f8fafc;
    }
    
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--background);
      color: var(--text);
      margin: 0;
    }
    
    #root {
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 1rem; 
      }
    }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    function App() {
      return (
        <>
          <header>
            <h1>React App</h1>
          </header>
          
          <main>
            {/* App content */}
          </main>
          
          <footer>
            {/* Footer content */}
          </footer>
        </>
      );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`
    }
  }
  // Additional languages/frameworks can be added here
};

export const getTemplate = (language, platform = 'desktop', type = 'basic') => {
  try {
    return TEMPLATES[language][platform][type];
  } catch (e) {
    return TEMPLATES.javascript.desktop.basic; // Default template
  }
};
