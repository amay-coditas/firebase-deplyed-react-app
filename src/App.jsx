import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Download,
  Code,
  Database,
  Cloud,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Star,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import './App.css';
import { navItems } from './constants.js';


const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element);
      
      const navbarHeight = 70;
      const scrollPosition = window.scrollY + navbarHeight + 100; // Add offset for better detection
      
      // Find the current active section
      let currentSection = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && scrollPosition >= section.element.offsetTop) {
          currentSection = section.id;
          break;
        }
      }
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get navbar height for proper offset
      const navbarHeight = 70;
      const elementPosition = element.offsetTop - navbarHeight;
      
      // Use window.scrollTo for better mobile compatibility
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(sectionId);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('home')}
            style={{ cursor: 'pointer' }}
          >
            SJ
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <motion.button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDarkTheme ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm <span className="highlight">Sahil Jain</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Software Engineer with a product-focused mindset
            </motion.p>
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Bringing 3 years of experience delivering scalable, high-impact backend systems. 
              Skilled in designing and deploying resilient services using Node.js, TypeScript, and AWS.
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('experience')}
              >
                View Experience
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="profile-placeholder">
              <Code size={80} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>About Me</h2>
            <p>Passionate about creating impactful solutions</p>
          </motion.div>
          <div className="about-content">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p>
                I'm a Software Engineer with a strong focus on product development and technical excellence. 
                With 3 years of experience, I specialize in building scalable backend systems using modern 
                technologies like Node.js, TypeScript, and AWS.
              </p>
              <p>
                My approach combines clean architecture principles with performance optimization, 
                resulting in systems that are not only robust but also maintainable and efficient. 
                I believe in the power of collaboration and mentorship to drive team success.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>3+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>60%</h3>
                  <p>Code Quality Improvement</p>
                </div>
                <div className="stat">
                  <h3>87%</h3>
                  <p>Performance Boost</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="about-card">
                <div className="card-icon">
                  <Star size={40} />
                </div>
                <h3>Key Achievements</h3>
                <ul>
                  <li>Runner-Up in Codemania Coding Competition (2020)</li>
                  <li>Top 5% in Savitribai Phule Pune University Exam</li>
                  <li>CGPA: 9.77 in Computer Engineering</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Work Experience</h2>
            <p>My professional journey in software development</p>
          </motion.div>
          <div className="timeline">
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker current"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Software Engineer</h3>
                  <span className="company">Coditas</span>
                  <span className="duration">August 2023 - Present</span>
                </div>
                <p className="location">Pune, Maharashtra</p>
                <ul className="achievements">
                  <li>Re-architected monolithic app into lightweight, serverless structure on AWS</li>
                  <li>Elevated codebase quality by 60% and achieved 30% reduction in post-release defects</li>
                  <li>Optimized cron job operations, resulting in 87.39% runtime reduction</li>
                  <li>Mentored junior developers, accelerating onboarding efficiency by 35%</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Associate Software Engineer</h3>
                  <span className="company">Coditas</span>
                  <span className="duration">January 2022 - July 2023</span>
                </div>
                <p className="location">Pune, Maharashtra</p>
                <ul className="achievements">
                  <li>Achieved 10% reduction in bugs through systematic refactoring</li>
                  <li>Contributed to Trepp's serverless projects using Node.js</li>
                  <li>Enhanced DMGT Usher repository stability and reliability</li>
                  <li>Implemented granular role-based access controls, increasing returning visitors by 60%</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Skills & Expertise</h2>
            <p>Technologies and tools I work with</p>
          </motion.div>
          <div className="skills-grid">
            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="skill-header">
                <Code size={24} />
                <h3>Programming Languages</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">C++</span>
              </div>
            </motion.div>

            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="skill-header">
                <Database size={24} />
                <h3>Databases</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Redis</span>
                <span className="skill-tag">Elasticsearch</span>
              </div>
            </motion.div>

            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="skill-header">
                <Cloud size={24} />
                <h3>Cloud & Tools</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">GitHub</span>
                <span className="skill-tag">GitLab</span>
                <span className="skill-tag">Nest.js</span>
              </div>
            </motion.div>

            <motion.div 
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="skill-header">
                <Star size={24} />
                <h3>Soft Skills</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Attention to Detail</span>
                <span className="skill-tag">Adaptability</span>
                <span className="skill-tag">Creativity</span>
                <span className="skill-tag">Time Management</span>
                <span className="skill-tag">Self-motivation</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Education & Certifications</h2>
            <p>My academic background and professional development</p>
          </motion.div>
          <div className="education-content">
            <motion.div 
              className="education-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="education-icon">
                <GraduationCap size={40} />
              </div>
              <h3>Bachelor of Engineering</h3>
              <p className="degree">Computer Engineering</p>
              <p className="institution">Marathwada MitraMandal's College of Engineering</p>
              <p className="location">Pune • 2022</p>
              <p className="gpa">CGPA: 9.77</p>
              <div className="achievements">
                <p>• Minor in Data Science</p>
                <p>• Runner-Up in Codemania Coding Competition (2020)</p>
                <p>• Top 5% in Savitribai Phule Pune University Exam</p>
              </div>
            </motion.div>

            <div className="certifications">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Certifications
              </motion.h3>
              <motion.div 
                className="cert-item"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="cert-icon">
                  <Award size={24} />
                </div>
                <div>
                  <h4>Node.js - Master the Fundamentals</h4>
                  <p>Scaler Academy • 2023</p>
                </div>
              </motion.div>
              <motion.div 
                className="cert-item"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="cert-icon">
                  <Award size={24} />
                </div>
                <div>
                  <h4>JavaScript Zero to Hero</h4>
                  <p>LetsUpgrade • 2023</p>
                </div>
              </motion.div>
              <motion.div 
                className="cert-item"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="cert-icon">
                  <Award size={24} />
                </div>
                <div>
                  <h4>SQL (Intermediate)</h4>
                  <p>HackerRank • 2021</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Get In Touch</h2>
            <p>Let's discuss how we can work together</p>
          </motion.div>
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h4>Email</h4>
                <p>developer.sahiljain@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h4>Phone</h4>
                <p>+91 9579484545</p>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h4>Location</h4>
                <p>Pune, India</p>
              </div>
            </div>
            <div className="social-links">
              <motion.a 
                href="https://linkedin.com/in/sahiljain1205" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a 
                href="https://github.com/SahilJain1205" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Sahil Jain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
