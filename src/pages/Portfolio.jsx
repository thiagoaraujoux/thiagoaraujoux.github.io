import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import './Portfolio.css';

const WHATSAPP_URL = 'https://wa.me/5563999603333?text=Ol%C3%A1%2C%20Thiago!%20Quero%20um%20or%C3%A7amento%20para%20automatizar%20meu%20CRM.';

const solutions = [
  { number: '01', title: 'Atendimento que não dorme', text: 'Respostas instantâneas no WhatsApp com texto, áudio e linguagem natural — sem deixar o lead esperando.', tag: 'WhatsApp + IA' },
  { number: '02', title: 'CRM sempre atualizado', text: 'Cada conversa vira histórico, tarefa e oportunidade. Seu time trabalha com contexto, não com planilhas soltas.', tag: 'Integração total' },
  { number: '03', title: 'Follow-up no tempo certo', text: 'A automação identifica o momento da compra, recupera contatos e encaminha oportunidades quentes ao vendedor.', tag: 'Mais conversão' },
];

const flowSteps = [
  ['01', 'Mensagem recebida', 'O lead chega pelo WhatsApp, site ou campanha.'],
  ['02', 'IA entende e responde', 'Texto e áudio personalizados em poucos segundos.'],
  ['03', 'CRM organiza tudo', 'Contato, etapa, histórico e próxima ação são registrados.'],
  ['04', 'Seu time vende', 'O vendedor recebe a oportunidade pronta para avançar.'],
];

function CountUp({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1450;
    const startedAt = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCurrent(value * (1 - Math.pow(1 - progress, 4)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return <span ref={ref}>{current.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

function ChatDemo() {
  const reduceMotion = useReducedMotion();
  const messages = [
    { type: 'client', delay: 0.3, content: 'Oi! Vi o anúncio e queria saber os planos.' },
    { type: 'bot', delay: 1.25, content: 'Olá, Marina! 👋 Claro. Posso entender o tamanho da sua equipe primeiro?' },
    { type: 'audio', delay: 2.2 },
    { type: 'status', delay: 3.05 },
  ];

  return (
    <motion.div className="chat-shell" initial={{ opacity: 0, y: 24, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
      <div className="chat-topbar">
        <div className="bot-avatar">T</div>
        <div><strong>Assistente Thiago</strong><span><i /> online • responde agora</span></div>
        <div className="chat-dots">•••</div>
      </div>
      <div className="chat-body">
        <div className="chat-date">HOJE, 09:41</div>
        {messages.map((message, index) => (
          <motion.div key={index} className={`chat-item ${message.type}`} initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: reduceMotion ? 0 : message.delay, duration: 0.42 }}>
            {message.type === 'audio' ? (
              <><button className="audio-play" aria-label="Reproduzir áudio demonstrativo">▶</button><div className="waveform" aria-hidden="true">{[9, 14, 20, 12, 25, 18, 11, 23, 16, 9, 19, 13, 7].map((height, i) => <i key={i} style={{ height }} />)}</div><span>0:18</span></>
            ) : message.type === 'status' ? (
              <><span className="status-icon">✓</span><div><strong>Novo lead qualificado</strong><span>Negócio criado no CRM</span></div></>
            ) : <>{message.content}<small>{message.type === 'bot' ? '09:42  ✓✓' : '09:41'}</small></>}
          </motion.div>
        ))}
        <motion.div className="typing" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ delay: 0.75, duration: 1.25 }}><i /><i /><i /></motion.div>
      </div>
      <div className="chat-input"><span>Digite uma mensagem</span><button aria-label="Enviar mensagem">➤</button></div>
      <div className="automation-pill"><span>✦</span> automação em execução</div>
    </motion.div>
  );
}

function OrbitSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-45, 260]);
  const counterRotate = useTransform(orbitRotate, value => -value * 0.7);
  const planetY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);

  return (
    <section className="orbit-section" ref={sectionRef}>
      <div className="orbit-copy reveal-block">
        <span className="section-kicker">UMA OPERAÇÃO CONECTADA</span>
        <h2>Do primeiro “oi” até a venda, <em>tudo gira junto.</em></h2>
        <p>Conecto as ferramentas que sua empresa já usa e desenho um fluxo que trabalha de ponta a ponta.</p>
      </div>
      <motion.div className="solar-system" style={{ y: planetY }} aria-hidden="true">
        <div className="sun-core"><span>CRM</span></div>
        <motion.div className="orbit-track orbit-one" style={{ rotate: orbitRotate }}><div className="planet planet-whatsapp"><span>WhatsApp</span></div><div className="planet planet-ia"><span>IA</span></div></motion.div>
        <motion.div className="orbit-track orbit-two" style={{ rotate: counterRotate }}><div className="planet planet-lead"><span>Leads</span></div><div className="planet planet-sales"><span>Vendas</span></div></motion.div>
      </motion.div>
      <div className="orbit-features">{['Captura automática', 'Qualificação com IA', 'Histórico centralizado', 'Follow-up inteligente'].map((item, index) => <div key={item}><span>0{index + 1}</span>{item}</div>)}</div>
    </section>
  );
}

function DashboardSection() {
  return (
    <section className="dashboard-section" id="resultados">
      <div className="section-heading reveal-block"><span className="section-kicker">RESULTADO VISÍVEL</span><h2>Menos tarefas repetidas.<br /><em>Mais controle para crescer.</em></h2></div>
      <div className="metric-strip">
        <div><strong><CountUp value={3.2} decimals={1} suffix="x" /></strong><span>mais velocidade<br />no atendimento</span></div>
        <div><strong><CountUp value={38} suffix="%" /></strong><span>mais leads<br />respondidos</span></div>
        <div><strong><CountUp value={12} suffix="h" /></strong><span>economizadas<br />por semana</span></div>
      </div>
      <motion.div className="dashboard-card" initial={{ opacity: 0, y: 48, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.7 }}>
        <div className="dashboard-sidebar"><div className="mini-brand">TA</div><i className="active" /><i /><i /><i /></div>
        <div className="dashboard-main">
          <div className="dashboard-head"><div><span>VISÃO GERAL</span><strong>Performance comercial</strong></div><button>Últimos 30 dias⌄</button></div>
          <div className="dashboard-kpis"><div><span>Novos leads</span><strong>248</strong><small>↑ 24%</small></div><div><span>Conversão</span><strong>31,8%</strong><small>↑ 8,2%</small></div><div><span>Tempo médio</span><strong>42s</strong><small>↓ 67%</small></div></div>
          <div className="dashboard-grid">
            <div className="chart-card"><div className="chart-title"><strong>Conversas qualificadas</strong><span>● automação</span></div><div className="chart-area"><div className="chart-lines"><i /><i /><i /><i /></div><div className="bars">{[38,52,43,68,58,82,72,91,77,96].map((height,i)=><b key={i} style={{height:`${height}%`}} />)}</div></div></div>
            <div className="donut-card"><strong>Canais</strong><div className="donut"><span>72%<small>WhatsApp</small></span></div><div className="legend"><span><i className="purple" /> WhatsApp</span><span><i className="blue" /> Site</span></div></div>
          </div>
        </div>
      </motion.div>
      <p className="metrics-note">* Números ilustrativos. Os resultados variam conforme operação, volume e estratégia.</p>
    </section>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-block');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.15 });
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <main className="site-shell">
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Início"><strong>THIAGO ARAÚJO</strong><i /></a>
        <nav className={menuOpen ? 'open' : ''} aria-label="Navegação principal"><a href="#solucoes" onClick={() => setMenuOpen(false)}>Soluções</a><a href="#resultados" onClick={() => setMenuOpen(false)}>Indicadores</a><a href="#processo" onClick={() => setMenuOpen(false)}>Como funciona</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="nav-cta">Falar no WhatsApp ↗</a></nav>
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}><i /><i /></button>
      </header>
      <section className="hero" id="inicio">
        <div className="hero-video" aria-hidden="true">
          <video autoPlay={!reduceMotion} muted loop playsInline preload="metadata">
            <source src="/abstract-flow.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>
        <div className="hero-copy">
          <motion.div className="availability" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><i /> AUTOMAÇÕES CRM + INTELIGÊNCIA ARTIFICIAL</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>Seu atendimento no automático.<br /><em>Suas vendas em movimento.</em></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.65 }}>Transformo conversas em oportunidades com automações que atendem, qualificam e organizam seus leads — 24 horas por dia.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="button-primary"><span>Solicitar orçamento</span><b>↗</b></a><a href="#como-funciona" className="button-link">Ver como funciona <span>↓</span></a></motion.div>
          <motion.div className="trust-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}><div className="avatar-stack"><i>T</i><i>IA</i><i>+</i></div><span>Projeto sob medida<br /><strong>para a sua operação</strong></span></motion.div>
        </div>
        <div className="hero-demo"><div className="planet-halo" aria-hidden="true"><i /><i /><i /></div><ChatDemo /></div>
        <div className="scroll-cue"><span>ROLE PARA EXPLORAR</span><i /></div>
      </section>
      <section className="context-strip" id="como-funciona"><p>Enquanto você lê isso, alguém pode estar esperando uma resposta da sua empresa.</p><div><span>RESPOSTA</span><i>→</i><span>RELACIONAMENTO</span><i>→</i><strong>RECEITA</strong></div></section>
      <OrbitSection />
      <section className="solutions-section" id="solucoes">
        <div className="section-heading reveal-block"><span className="section-kicker">O QUE EU AUTOMATIZO</span><h2>Menos operação manual.<br /><em>Mais espaço para vender.</em></h2></div>
        <div className="solution-list">{solutions.map((solution,index)=><motion.article key={solution.title} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-10%'}} transition={{delay:index*.08}}><span className="solution-number">{solution.number}</span><div className="solution-icon"><i /><b>{index===0?'↗':index===1?'⌁':'◎'}</b></div><div><h3>{solution.title}</h3><p>{solution.text}</p><small>{solution.tag}</small></div></motion.article>)}</div>
      </section>
      <DashboardSection />
      <section className="process-section" id="processo">
        <div className="process-intro reveal-block"><span className="section-kicker">COMO FUNCIONA</span><h2>Uma jornada simples.<br /><em>Uma operação inteligente.</em></h2><p>Eu mapeio a sua rotina, desenho a automação e deixo tudo funcionando com clareza para o seu time.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Quero desenhar meu fluxo ↗</a></div>
        <div className="process-flow">{flowSteps.map(([number,title,text],index)=><motion.div key={title} className="process-step" initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:index*.1}}><span>{number}</span><i /><div><strong>{title}</strong><p>{text}</p></div></motion.div>)}</div>
      </section>
      <section className="final-cta"><div className="cta-planet" aria-hidden="true"><i /><i /><span>✦</span></div><div className="final-cta-content reveal-block"><span className="section-kicker">PRONTO PARA SAIR DO MANUAL?</span><h2>Vamos colocar sua<br /><em>operação em órbita.</em></h2><p>Me conte como seu atendimento funciona hoje. Eu te mostro o que pode ser automatizado e preparo um orçamento sob medida.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="button-primary button-large"><span>Solicitar orçamento no WhatsApp</span><b>↗</b></a><small>Resposta direta • Sem compromisso • Projeto personalizado</small></div></section>
      <footer><a href="#inicio" className="brand"><strong>THIAGO ARAÚJO</strong><i /></a><p>Automação CRM, atendimento e IA para empresas que querem crescer com eficiência.</p><div><a href="mailto:thiagoaraujo.tec@gmail.com">E-mail</a><a href="https://linkedin.com/in/thiagoaraujotec" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/thiagoaraujoux" target="_blank" rel="noreferrer">GitHub</a></div><small>© 2026 Thiago Araújo. Todos os direitos reservados.</small></footer>
      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Solicitar orçamento pelo WhatsApp"><span>✆</span><b>Orçamento</b></a>
    </main>
  );
}
