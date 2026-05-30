import React from 'react';
import './Homepage.css';

export default function Homepage({ onLogout, onRegisterRedirect}) {
  return (
    <div className="portfolio-wrapper">
      
      {/* 1. HEADER NAVIGATION */}
      <header className="navbar">
        <div className="nav-logo">SAIRAM PORTFOLIO</div>
        
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#work">Work Exp</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button onClick={onRegisterRedirect} className="register-link-btn">Register</button>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* MAIN CONTAINER CANVAS */}
      <main className="main-content" id="home">
        
        {/* 2. HERO SECTION */}
        <div className="hero-grid">
          <div className="card hero-text-card">
            <span className="tagline">Frontend Developer</span>
            <h1 className="hero-title">Building High-Performance Single Page Applications</h1>
            <p className="hero-description">
              Frontend Developer with 5+ years of experience building scalable, high-performance Single Page Applications (SPAs) for enterprise clients across healthcare, logistics, e-commerce, insurance, and public safety domains. Proficient in React.js, Redux Toolkit, TypeScript, and modern JavaScript (ES6+), with a strong track record of improving performance by up to 40%, reducing defects by 25%, and accelerating feature delivery. Experienced in JWT authentication, REST/GraphQL API integrations, WebSocket, CI/CD pipelines, Jest/React Testing Library, and Agile/Scrum delivery.
            </p>
          </div>

          <div className="image-container-box hero-media">
            <img 
              src="/coding.jpg" 
              alt="Nidamaluru Sairam Profile" 
              className="profile-image-fluid"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* 3. WORK EXPERIENCE SECTION */}
        <section id="work" className="card work-experience-section">
          <div className="section-header">
            <h2>Work Experience</h2>
          </div>
          
          <div className="timeline">
            {/* Freelance */}
            <div className="timeline-item">
              <div className="timeline-dot special-dot"></div>
              <span className="timeline-date">May 2025 – Present</span>
              <h3 className="timeline-title">Freelancer Frontend Developer</h3>
              <p className="timeline-location"><strong>Location:</strong> Remote | Self-Employed</p>
              <ul className="timeline-bullets">
                <li>Developed and delivered scalable React.js, Next.js, and TypeScript web applications for clients across healthcare, e-commerce, and business service domains, focusing on reusable component architecture and responsive UI development.</li>
                <li>Integrated REST APIs using Axios and custom hooks, implementing structured error handling, loading state management, and optimized asynchronous data fetching for improved application reliability.</li>
                <li>Collaborated directly with clients to gather requirements, translate business needs into technical solutions, and deliver production-ready features within defined timelines.</li>
              </ul>
            </div>

            {/* QuessCorp */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date">Aug 2024 – Mar 2025</span>
              <h3 className="timeline-title">Digital Engineer — QuessCorp Limited (Conneqt Digital)</h3>
              <p className="timeline-location"><strong>Location:</strong> Bengaluru | <strong>Client:</strong> Adobe</p>
              
              <div className="project-block">
                <h4 className="project-title">Project 1: UPS HealthCare — Healthcare Logistics Platform</h4>
                <ul className="timeline-bullets">
                  <li>Built scalable SPAs for real-time healthcare logistics tracking using React.js and Edge Delivery Services (EDS), reducing frontend load time by ~30% through lazy loading and optimized asset delivery.</li>
                  <li>Designed and implemented reusable React component library (forms, tables, modals, status indicators) used across 10+ modules, cutting new feature development time significantly.</li>
                  <li>Integrated GraphQL queries and mutations with Apollo Client for dynamic shipment and patient data fetching, replacing REST endpoints for complex nested data needs.</li>
                  <li>Implemented JWT-based authentication with silent token refresh using Axios interceptors, protecting all private routes and maintaining seamless user sessions.</li>
                  <li>Used React Context API and useReducer to manage complex multi-step workflow states (order creation, tracking, delivery confirmation) without prop drilling.</li>
                </ul>
              </div>

              <div className="project-block">
                <h4 className="project-title">Project 2: Victoria's Secret — E-Commerce Platform</h4>
                <ul className="timeline-bullets">
                  <li>Integrated product catalog, inventory, and pricing REST APIs using Axios with request caching and debounced search to minimize redundant network calls on the storefront.</li>
                  <li>Applied React.lazy and Suspense for route-level code splitting across the checkout funnel, reducing initial bundle size and improving time-to-interactive on mobile devices.</li>
                  <li>Built responsive, pixel-perfect UI components from Figma designs using Styled Components, ensuring consistent brand rendering across breakpoints (mobile, tablet, desktop).</li>
                </ul>
              </div>

              <div className="project-block">
                <h4 className="project-title">Project 3: H&M — Retail E-Commerce Platform</h4>
                <ul className="timeline-bullets">
                  <li>Architected a scalable component system for H&M's multi-region storefront using React.js and EDS, enabling rapid deployment of localized content across 5+ regional markets.</li>
                  <li>Handled complex async data flows using custom React hooks (useFetch, useDebounce) to encapsulate API logic and enable infinite scroll on category pages.</li>
                  <li>Integrated error boundaries and fallback UI components to gracefully handle API failures and network errors, improving platform reliability for high-traffic sale events.</li>
                  <li>Optimized re-render performance using React.memo and useMemo on heavy list components, reducing unnecessary renders by ~40% during rapid user interactions like filtering and sorting.</li>
                </ul>
              </div>
            </div>

            {/* Exabyte */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date">Sep 2022 – Jul 2024</span>
              <h3 className="timeline-title">Software Engineer — Box Ventures Pvt Ltd</h3>
              <p className="timeline-location"><strong>Location:</strong>Chennai</p>
              <div className="project-block">
                <h4 className="project-title">Project: Safety Management — Public Safety Platform</h4>
                <ul className="timeline-bullets">
                  <li>Architected modular React.js components with Redux Toolkit for predictable global state management, handling complex real-time incident data across a high-stakes public safety dashboard.</li>
                  <li>Reduced UI production defects by ~25% by introducing component-level unit tests using Jest and React Testing Library, catching regressions before they reached production.</li>
                  <li>Accelerated feature delivery by 20% by building a shared internal component library (buttons, forms, data tables, alerts) adopted across all product modules.</li>
                </ul>
              </div>
            </div>

            {/* Iorta */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date">Feb 2022 – Aug 2022</span>
              <h3 className="timeline-title">Software Engineer — Iorta Technology Solutions</h3>
              <p className="timeline-location"><strong>Location:</strong> Mumbai</p>
              <div className="project-block">
                <h4 className="project-title">Project: TATA AIG Insurance — Insurance Portal</h4>
                <ul className="timeline-bullets">
                  <li>Built a secure insurance policy management portal using React.js with JWT authentication, protected routes, and silent token refresh via Axios interceptors for uninterrupted session handling.</li>
                  <li>Integrated RESTful APIs for policy retrieval, premium calculation, and claim submission with centralized error handling and loading state management using custom hooks.</li>
                  <li>Leveraged React.lazy and Suspense for code splitting across heavy portal sections (policy dashboard, claims history), reducing initial bundle load time noticeably.</li>
                  <li>Managed complex local and global state using a combination of Redux for shared data and useState/useReducer for component-level form and UI states.</li>
                </ul>
              </div>
            </div>

            {/* VoltStream */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date">Dec 2020 – Jan 2022</span>
              <h3 className="timeline-title">Associate Software Engineer — VoltStream Technologies</h3>
              <p className="timeline-location"><strong>Location:</strong> Bengaluru | <strong>Client:</strong> Iorta Technology Solutions</p>
              <div className="project-block">
                <h4 className="project-title">Project: HealthClaim — Healthcare Domain</h4>
                <ul className="timeline-bullets">
                  <li>Developed responsive UI modules for a healthcare claims processing platform using HTML5, CSS3, and React.js, translating wireframes into functional, production-ready components.</li>
                  <li>Utilized ES6+ JavaScript patterns including async/await, Promise chaining, destructuring, and optional chaining to write clean, readable, and maintainable component logic.</li>
                  <li>Collaborated with backend developers to integrate REST APIs for claims data retrieval and submission, implementing robust error handling and user feedback mechanisms.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ASYMMETRIC GRID MAP */}
        <div className="asymmetric-grid" id="skills">
          
          {/* Left Column Stack: Core Technical Skill Matrices */}
          <div className="sub-stack">
            <div className="card skills-card">
              <div className="skills-header-block">
                <h2>Technical Core Expertise</h2>
              </div>

              <div className="skills-category-group">
                <h3>Frontend Core</h3>
                <div className="skills-pill-box">
                  <span>React.js</span><span>Next.js (App Router)</span><span>TypeScript</span><span>JavaScript (ES6+)</span><span>HTML5</span><span>CSS3</span>
                </div>
              </div>

              <div className="skills-category-group">
                <h3>State Management</h3>
                <div className="skills-pill-box">
                  <span>Redux Toolkit</span><span>Context API</span><span>useReducer</span>
                </div>
              </div>

              <div className="skills-category-group">
                <h3>API Integration & Auth</h3>
                <div className="skills-pill-box">
                  <span>REST APIs</span><span>GraphQL</span><span>Apollo Client</span><span>Axios</span><span>Fetch API</span><span>JWT</span><span>Token Refresh Strategy</span>
                </div>
              </div>

              <div className="skills-category-group">
                <h3>Performance Optimization</h3>
                <div className="skills-pill-box">
                  <span>Code Splitting</span><span>Lazy Loading</span><span>React.memo</span><span>useMemo</span><span>useCallback</span>
                </div>
              </div>

              <div className="skills-category-group">
                <h3>UI Libraries & Design Systems</h3>
                <div className="skills-pill-box">
                  <span>Material UI</span><span>Ant Design</span><span>Styled Components</span><span>Tailwind CSS</span>
                </div>
              </div>

              <div className="skills-category-group">
                <h3>Testing & Tooling</h3>
                <div className="skills-pill-box">
                  <span>Jest</span><span>React Testing Library</span><span>Webpack</span><span>Vite</span><span>Git</span><span>CI/CD</span><span>Agile/Scrum</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Stack */}
          <div className="sub-stack">
            <div className="card achievements-card">
              <div className="achievements-header-block">
                <h2>Key Achievements</h2>
              </div>
              <ul className="achievements-list">
                <li>
                  <span className="metric-accent">~30%</span> 
                  <p>Reduced frontend load time for UPS Healthcare logistics platform via lazy loading and EDS optimization.</p>
                </li>
                <li>
                  <span className="metric-accent">~40%</span> 
                  <p>Cut unnecessary React re-renders on H&M's high-traffic product grids using React.memo and useMemo.</p>
                </li>
                <li>
                  <span className="metric-accent">~25%</span> 
                  <p>Decreased UI production defects at Exabyte Technologies by introducing Jest + React Testing Library coverage.</p>
                </li>
                <li>
                  <span className="metric-accent">20%</span> 
                  <p>Accelerated feature delivery through internal shared component libraries adopted across all product modules.</p>
                </li>
              </ul>
            </div>
            
            <div id="contact" className="card contact-card">
              <h2>Initiate Contact</h2>
              
              <form onSubmit={(e) => e.preventDefault()} className="contact-form">
                <div className="contact-info-static">
                  <span><strong>Contact Node:</strong> sairam.nidamaluru288@gmail.com</span>
                </div>
                <input type="text" placeholder="Your Identity Anchor" className="form-input-alt" />
                <input type="email" placeholder="Your Communication Email" className="form-input-alt" />
                <button type="button" className="form-btn">Dispatch Secure Payload</button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* 5. FOOTER */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} — Fully Encoded and Formatted via Isolated CSS Components.
      </footer>
    </div>
  );
}