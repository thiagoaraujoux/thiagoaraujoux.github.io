import React, { useState, useRef, useEffect } from 'react';
import CardSwap, { Card } from '../components/CardSwap/CardSwap';
import Aurora from '../components/Aurora/Aurora';
import TiltedCard from '../components/TiltedCard/TiltedCard';
import ShinyText from '../components/ShinyText/ShinyText';
import './Portfolio.css';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 968);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [gestureStartX, setGestureStartX] = useState(null);

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

  // Acompanhar tamanho da janela para responsividade
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
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    window.open('/cv-thiago-araujo.pdf', '_blank');
  };

  // Dados dos projetos
  const projects = [
    {
      id: 1,
      title: "Sistema de Infraestrutura",
      subtitle: "DevOps & Cloud",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Arquitetura de containerização e orquestração com Docker e VMware.",
      technologies: ["Docker", "VMware", "Linux", "GitHub Actions"],
      link: "#"
    },
    {
      id: 2,
      title: "Portfolio Moderno",
      subtitle: "UI/UX & Frontend",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Interface interativa com efeitos 3D, partículas e animações fluidas.",
      technologies: ["React", "Motion", "CSS 3D", "Framer Motion"],
      link: "https://github.com/thiagoaraujoux"
    },
    {
      id: 3,
      title: "Dashboard SEDUC-TO",
      subtitle: "BI & Data Visualization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Painel de controle em tempo real para monitoramento educacional com Power BI e APIs.",
      technologies: ["Power BI", "React", "Node.js", "SQL Server"],
      link: "#"
    },
    {
      id: 4,
      title: "Automações & Chatbot",
      subtitle: "RPA & IA Conversacional",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Sistema de automação de processos com chatbot integrado para atendimento inteligente.",
      technologies: ["Python", "RPA", "OpenAI API", "Flask", "WhatsApp API"],
      link: "#"
    }
  ];

  // Touch handlers para swipe no carrossel mobile
  const handleGestureStart = (x) => {
    setGestureStartX(x);
  };

  const handleGestureEnd = (x) => {
    if (gestureStartX === null) return;
    handleSwipe(gestureStartX, x);
    setGestureStartX(null);
  };

  const handleTouchStart = (e) => handleGestureStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => handleGestureEnd(e.changedTouches[0].clientX);
  const handleMouseDown = (e) => handleGestureStart(e.clientX);
  const handleMouseUp = (e) => handleGestureEnd(e.clientX);
  const handleMouseLeave = () => setGestureStartX(null);

  const handleSwipe = (startX, endX) => {
    const distance = startX - endX;
    const threshold = 40; // Reduzido para ser mais responsivo

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Swipe para esquerda - próximo projeto
        nextProject();
      } else {
        // Swipe para direita - projeto anterior
        prevProject();
      }
    }
  };

  // Navegação do carrossel
  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToProject = (index) => {
    setCurrentProjectIndex(index);
  };

  // Determinar se é mobile baseado na largura
  const isMobile = windowWidth <= 768;

  return (
    <div className="ls-wrapper">

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
          <a href="#projects" onClick={closeMenu}>PROJETOS</a>
          <a href="#exp" onClick={closeMenu}>EXPERIÊNCIA</a>
          <a href="#skills" onClick={closeMenu}>TECNOLOGIAS</a>
          <a href="#contact" onClick={closeMenu}>CONTATO</a>
        </div>
      </div>

      {/* MAIN CONTENT */}
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
              <CardSwap cardDistance={windowWidth < 400 ? 5 : (windowWidth < 768 ? 8 : 15)}>
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

        {/* SEÇÃO: PROJETOS DESTAQUE - ATUALIZADO */}
        <section id="projects" className="ls-section">
          <div className="ls-projects-container">
            <div className="ls-content-glass">
              <h2 className="section-title">Projetos em Destaque</h2>
              <p className="ls-description">
                Soluções técnicas que unem design moderno, performance e usabilidade.
              </p>

              {/* Desktop: Grid de projetos */}
              {!isMobile ? (
                <div className="ls-projects-grid">
                  {projects.map((project) => (
                    <div key={project.id} className="ls-project-item">
                      <div className="project-image-wrapper">
                        {/* Texto com efeito sobre a imagem */}
                        <div className="image-overlay-text">
                          <h3 className="overlay-title">{project.title}</h3>
                          <span className="overlay-subtitle">{project.subtitle}</span>
                        </div>

                        <TiltedCard
                          imageSrc={project.image}
                          altText={project.title}
                          containerHeight="240px"
                          containerWidth="100%"
                          imageHeight="240px"
                          imageWidth="100%"
                          rotateAmplitude={12}
                          scaleOnHover={1.05}
                          showMobileWarning={false}
                          showTooltip={false}
                          displayOverlayContent={true}
                          overlayContent={
                            <div className="image-overlay-text">
                              <h3 className="overlay-title">{project.title}</h3>
                              <span className="overlay-subtitle">{project.subtitle}</span>
                            </div>
                          }
                        />
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                /* Mobile: Carrossel de projetos */
                <div className="ls-projects-carousel">
                  <div className="carousel-container">
                    <div 
                      className="carousel-track"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                    >
                      {projects.map((project, index) => (
                        <div
                          key={project.id}
                          className={`carousel-slide ${index === currentProjectIndex ? 'active' : ''}`}
                          style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
                        >
                          <div className="project-image-wrapper">
                            {/* Texto com efeito sobre a imagem */}
                            <div className="image-overlay-text">
                              <h3 className="overlay-title">{project.title}</h3>
                              <span className="overlay-subtitle">{project.subtitle}</span>
                            </div>

                            <TiltedCard
                              imageSrc={project.image}
                              altText={project.title}
                              containerHeight="260px"
                              containerWidth="100%"
                              imageHeight="260px"
                              imageWidth="100%"
                              rotateAmplitude={10}
                              scaleOnHover={1.03}
                              showMobileWarning={false}
                              showTooltip={false}
                              displayOverlayContent={true}
                              overlayContent={
                                <div className="image-overlay-text">
                                  <h3 className="overlay-title">{project.title}</h3>
                                  <span className="overlay-subtitle">{project.subtitle}</span>
                                </div>
                              }
                            />
                          </div>

                        </div>
                      ))}
                    </div>

                    {/* Indicadores */}
                    <div className="carousel-indicators">
                      {projects.map((_, index) => (
                        <button
                          key={index}
                          className={`indicator ${index === currentProjectIndex ? 'active' : ''}`}
                          onClick={() => goToProject(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* APENAS UM BOTÃO "VER MAIS" QUE DIRECIONA PARA CONTATOS */}
              <div className="ls-projects-actions">
                <button
                  className="ls-btn-primary"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Ver Mais
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO EXPERIÊNCIA PROFISSIONAL */}
        <section id="exp" className="ls-section">
          <div className="ls-experience-container">
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

        {/* SEÇÃO TECNOLOGIAS */}
        <section id="skills" className="ls-section">
          <div className="ls-tech-container">
            <h2 className="ls-tech-title">
              <ShinyText
                text="Tecnologias & Ferramentas"
                speed={2.5}
                delay={0}
                color="#d0d0d0"
                shineColor="#ffffff"
                spread={100}
                direction="left"
              />
            </h2>
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