// vibe coded: prompt: "how do i do shared navigation in html", google search. All code below, 9/28/26

class MainNavigation extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;

    const isWorkPage = path.endsWith('/work/') || path.includes('/work/');


    const homePath = isWorkPage ? '../index.html' : 'index.html';
    const aboutPath = isWorkPage ? '../about.html' : 'about.html';
    const workPath = isWorkPage ? './' : 'work/';

    this.innerHTML = `
      <style>
        main-nav {
          display: block;
          font-family: system-ui, sans-serif;
        }

        main-nav nav {
          background: #1a1a1a;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #333;
        }

        main-nav .logo a {
          font-weight: bold;
          font-size: 1.2rem;
          color: #00ffcc;
          text-decoration: none;
        }

        main-nav .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        main-nav a {
          color: #fff;
          text-decoration: none;
        }

        main-nav a:hover,
        main-nav a:focus-visible {
          color: #00ffcc;
        }

        main-nav .dropdown {
          position: relative;
        }

        main-nav .dropdown-trigger {
          color: #fff;
          background: none;
          border: 0;
          border-bottom: 1px dashed #00ffcc;
          padding: 0 0 2px;
          cursor: pointer;
          font: inherit;
        }

        main-nav .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          width: 200px;
          padding: 10px;
          margin: 0;
          list-style: none;
          background: #222;
          border: 1px solid #333;
          z-index: 1000;
        }

        main-nav .dropdown-menu.show {
          display: block;
        }

        main-nav .dropdown-menu a {
          display: block;
          padding: 8px 5px;
          color: #ccc;
        }

        main-nav .dropdown-menu a:hover {
          color: #00ffcc;
          background: #2a2a2a;
        }
      </style>

      <nav>
        <div class="logo">
          <a href="${homePath}">PORTFOLIO</a>
        </div>

        <ul class="nav-links">
          <li>
            <a href="${homePath}">Home</a>
          </li>

          <li>
            <a href="${aboutPath}">About Me</a>
          </li>

          <li class="dropdown">
            <button
              class="dropdown-trigger"
              type="button"
              aria-expanded="false"
            >
              My Work ▼
            </button>

            <ul class="dropdown-menu">
              <li><a href="${workPath}work1.html">01. Project One</a></li>
              <li><a href="${workPath}work2.html">02. Project Two</a></li>
              <li><a href="${workPath}work3.html">03. Project Three</a></li>
              <li><a href="${workPath}work4.html">04. Project Four</a></li>
              <li><a href="${workPath}work5.html">05. Project Five</a></li>
              <li><a href="${workPath}work6.html">06. Project Six</a></li>
              <li><a href="${workPath}work7.html">07. Project Seven</a></li>
              <li><a href="${workPath}work8.html">08. Project Eight</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    `;

    const dropdown = this.querySelector('.dropdown');
    const menu = this.querySelector('.dropdown-menu');
    const trigger = this.querySelector('.dropdown-trigger');

    if (!dropdown || !menu || !trigger) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();

      const isOpen = menu.classList.toggle('show');
      trigger.setAttribute('aria-expanded', isOpen);
    });

    dropdown.addEventListener('mouseenter', () => {
      menu.classList.add('show');
      trigger.setAttribute('aria-expanded', 'true');
    });

    dropdown.addEventListener('mouseleave', () => {
      menu.classList.remove('show');
      trigger.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        menu.classList.remove('show');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

customElements.define('main-nav', MainNavigation);
