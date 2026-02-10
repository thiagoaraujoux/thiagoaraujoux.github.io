import React, { useState, useRef, useEffect } from 'react';
import CardSwap, { Card } from '../components/CardSwap/CardSwap';
import Aurora from '../components/Aurora/Aurora';
import './Portfolio.css';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 968);

  const closeMenu = () => setIsMenuOpen(false);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.ls-mobile-menu') && !event.target.closest('.ls-hamburguer')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Acompanhar tamanho da janela para responsividade do CardSwap
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Evitar scroll do body quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handlers para os botões
  const handleEmailClick = () => {
    window.location.href = 'mailto:thiagoaraujo.tec@gmail.com';
  };

  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/in/thiagoaraujotec', '_blank');
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/thiagoaraujoux', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5563999603333', '_blank');
  };

  const handleProjectsClick = () => {
    // Implementar navegação para projetos
    console.log('Ver projetos clicado');
  };

  const handleDownloadCV = () => {
    window.open('/cv-thiago-araujo.pdf', '_blank');
  };

  return (
    <div className="ls-wrapper">
      {/* BACKGROUND COM PARTICULAS - Mantenha a estrutura que está funcionando */}
      <div className="ls-background-fixed">
        <Aurora
          particleCount={550}
          particleSpread={20}
          speed={0.3}
          particleBaseSize={140}
          sizeRandomness={3.5}
          moveParticlesOnHover={true}
          particleHoverFactor={0.8}
          alphaParticles={true}
          disableRotation={false}
          pixelRatio={1.5}
          intensity={1.8}
          className="purple-particles-fullscreen"
        />
        <div className="content-overlay" />
      </div>

      {/* NAVBAR */}
      <nav className="ls-navbar">
        <div className="ls-nav-content">
          <div className="ls-logo">THIAGO ARAÚJO</div>
          <button
            className={`ls-hamburguer ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      <div className={`ls-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="ls-menu-links">
          <a href="#home" onClick={closeMenu}>INÍCIO</a>
          <a href="#exp" onClick={closeMenu}>EXPERIÊNCIA</a>
          <a href="#skills" onClick={closeMenu}>TECNOLOGIAS</a>
          <a href="#contact" onClick={closeMenu}>CONTATO</a>
        </div>
      </div>

      {/* MAIN CONTENT - Use a classe que está funcionando */}
      <div className="ls-main-scroll">
        {/* Seção Hero */}
        <section id="home" className="ls-section">
          <div className="ls-hero-container">
            <div className="ls-hero-text">
              <div className="ls-badge">ANALISTA DE INFRAESTRUTURA & DEV</div>
              <h1 className="ls-title">Sistemas Fluidos,<br />Infraestrutura Robusta.</h1>
              <p className="ls-description">
                Bacharel em Sistemas de Informação pela <b>UNITINS</b>.
                Especialista em unir hardware, software e inteligência de dados com foco em UX/UI.
              </p>
              <div className="ls-btn-group">
                <button 
                  className="ls-btn-primary"
                  onClick={handleProjectsClick}
                >
                  Ver Projetos
                </button>
                <button 
                  className="ls-btn-glass"
                  onClick={handleDownloadCV}
                >
                  Download CV
                </button>
              </div>
            </div>
 {/* DIV DE ESPAÇAMENTO VISÍVEL APENAS EM MOBILE */}
  <div className="button-cards-spacer"></div>


            <div className="ls-hero-cards">
              <CardSwap cardDistance={windowWidth < 400 ? 10 : (windowWidth < 768 ? 15 : 30)}>
                <Card>
                  <div className="ls-card-glass">
                    <h3 className="card-title">Fullstack Dev</h3>
                    <p className="card-text">Java, React, Next.js e PHP. Dashboards em Power BI e Looker Studio.</p>
                  </div>
                </Card>
                <Card>
                  <div className="ls-card-glass">
                    <h3 className="card-title">Infra & Redes</h3>
                    <p className="card-text">Docker, VMware, Linux (Ubuntu/Debian) e Mikrotik.</p>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </section>

        {/* SEÇÃO EXPERIÊNCIA PROFISSIONAL */}
        <section id="exp" className="ls-section">
          <div className="ls-content-glass">
            <h2 className="section-title">Trajetória Profissional</h2>
            <div className="ls-timeline">
              <div className="timeline-item" data-year="03">
                <div className="timeline-marker">
                  <span className="timeline-number">03</span>
                </div>
                <span className="date">2023 - 2026</span>
                <h4>SEDUC-TO</h4>
                <p>Analista de Sistemas e BI. Desenvolvimento de apps e painéis de dados estratégicos para a Secretaria da Educação.</p>
              </div>
              <div className="timeline-item" data-year="02">
                <div className="timeline-marker">
                  <span className="timeline-number">02</span>
                </div>
                <span className="date">2022 - 2023</span>
                <h4>PGE-TO</h4>
                <p>Suporte de Infraestrutura, implantação de Docker e gestão de ativos via GLPI na Procuradoria Geral.</p>
              </div>
              <div className="timeline-item" data-year="01">
                <div className="timeline-marker">
                  <span className="timeline-number">01</span>
                </div>
                <span className="date">2020 - 2022</span>
                <h4>TCE-TO</h4>
                <p>Suporte técnico e elaboração de fluxos de processos com Bizagi no Tribunal de Contas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO TECNOLOGIAS - NOVA SEÇÃO ADICIONADA */}
        <section id="skills" className="ls-section">
          <div className="ls-tech-container">
            <h2 className="ls-tech-title">Tecnologias & Ferramentas</h2>
            <p className="ls-tech-subtitle">
              Stack técnica utilizada no desenvolvimento de soluções robustas e escaláveis.
            </p>
            <div className="ls-tech-grid">
              <div className="tech-card">
                <div className="tech-icon">⚡</div>
                <h4>Frontend</h4>
                <p>React, Next.js, TypeScript, Tailwind CSS</p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">🔧</div>
                <h4>Backend</h4>
                <p>Node.js, Java, PHP, Python, APIs REST</p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">📊</div>
                <h4>Data & BI</h4>
                <p>Power BI, Looker Studio, SQL, ETL</p>
              </div>
              <div className="tech-card">
                <div className="tech-icon">🛠️</div>
                <h4>DevOps & Infra</h4>
                <p>Docker, Linux, VMware, Git, CI/CD</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO CONTATO */}
        <section id="contact" className="ls-section">
          <div className="ls-content-glass">
            <h2 className="section-title">Contato</h2>
            <div className="contact-content">
              <p className="card-text">
                Disponível para oportunidades e projetos desafiadores.
                Vamos conversar sobre como posso contribuir com sua equipe.
              </p>
              <div className="ls-btn-group">
                <button 
                  className="ls-btn-primary" 
                  onClick={handleEmailClick}
                >
                  Enviar Email
                </button>
                <button 
                  className="ls-btn-glass" 
                  onClick={handleLinkedInClick}
                >
                  LinkedIn
                </button>
                <button 
                  className="ls-btn-glass" 
                  onClick={handleGitHubClick}
                >
                  GitHub
                </button>
                <button 
                  className="whatsapp-btn" 
                  onClick={handleWhatsAppClick}
                >
                  <span className="whatsapp-icon">💬</span>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;