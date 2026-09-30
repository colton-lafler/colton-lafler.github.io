// vibe coded: prompt: "how do i do shared navigation in html", google search. All code below, 9/28/26

class MainNavigation extends HTMLElement {
  connectedCallback() {
    // 1. Detect if the browser is currently looking inside the /work/ subfolder
    const isInsideWorkFolder = window.location.pathname.includes('/work/');

    const rootPath = isInsideWorkFolder ? '../' : '';
    const workPath = isInsideWorkFolder ? './' : 'work/';

    this.innerHTML = `
      <style>
        main-nav nav {
          background: #1a1a1a;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #333;
          font-family: system-ui, sans-serif;
        }

        main-nav .logo a {
          font-weight: bold;
          font-size: 1.2rem;
          color: #00ffcc;
          text-decoration: none;
        }

        main-nav .nav-links {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
          gap: 20px;
          align-items: center;
        }

        main-nav .nav-links a {
          color: #fff;
          text-decoration: none;
          transition: color 0.2s;
        }

        main-nav .nav-links a:hover {
          color: #00ffcc;
        }

        main-nav .dropdown {
          position: relative;
        }

        main-nav .dropdown-trigger {
          color: #fff;
          cursor: pointer;
          border-bottom: 1px dashed #00ffcc;
          padding-bottom: 2px;
        }

        main-nav .dropdown-menu {
          display: none;
          position: absolute;
          background: #222;
          top: 100%;
          right: 0;
          width: 200px;
          padding: 10px;
          list-style: none;
          border: 1px solid #333;
          z-index: 100;
        }

        main-nav .dropdown-menu a {
          color: #ccc !important;
          display: block;
          padding: 8px 5px;
        }

        main-nav .dropdown-menu.show {
          display: block;
        }
      </style>

      <nav>
        <div class="logo">
          <a href="${rootPath}index.html">PORTFOLIO</a>
        </div>

        <ul class="nav-links">
          <li>
            <a href="${rootPath}index.html">Home</a>
          </li>

          <li>
            <a href="${rootPath}about.html">About Me</a>
          </li>

          <li class="dropdown">
            <span class="dropdown-trigger">My Work ▼</span>

            <ul class="dropdown-menu">
              <li><a href="${workPath}work1.html">01. Project One</a></li>
              <li><a href="/work/work2.html">02. Project Two</a></li>
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

    dropdown.addEventListener('mouseenter', () => {
      menu.classList.add('show');
    });

    dropdown.addEventListener('mouseleave', () => {
      menu.classList.remove('show');
    });

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  }
}

customElements.define('main-nav', MainNavigation);
