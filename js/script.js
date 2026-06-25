/* =========================================================
   Zumppy Soluções Digitais — script.js
   Reproduz em JS puro tudo que era feito com React + Framer Motion
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- ÍCONES (lucide) ---------------- */
  if (window.lucide) lucide.createIcons();

  /* ---------------- HEADER: scroll + menu mobile ---------------- */
  const header = document.getElementById("siteHeader");
  const onScrollHeader = () => {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const iconOpen = document.getElementById("menuIconOpen");
  const iconClose = document.getElementById("menuIconClose");
  let navOpen = false;
  menuToggle.addEventListener("click", () => {
    navOpen = !navOpen;
    mobileNav.classList.toggle("open", navOpen);
    iconOpen.style.display = navOpen ? "none" : "block";
    iconClose.style.display = navOpen ? "block" : "none";
  });
  mobileNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navOpen = false;
      mobileNav.classList.remove("open");
      iconOpen.style.display = "block";
      iconClose.style.display = "none";
    })
  );

  /* ---------------- REVEAL ON SCROLL (substitui useInView) ---------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "-80px" }
  );

  /* ---------------- HERO SLIDER ---------------- */
  const slides = [
    {
      eyebrow: "Desenvolvimento Web",
      title: "Sites Profissionais que Geram Resultados",
      text: "Transforme visitantes em clientes com um site moderno, rápido, responsivo e otimizado para o Google.",
    },
    {
      eyebrow: "Marketing Digital & SEO",
      title: "Sua Empresa Merece Presença Digital de Alto Nível",
      text: "Criação de sites, identidade visual, SEO e Google Meu Negócio para impulsionar sua marca na internet.",
    },
  ];
  const WHATSAPP_URL =
    "https://wa.me/5538984141399?text=Olá,%20vim%20através%20do%20site%20da%20Zumppy%20e%20gostaria%20de%20solicitar%20um%20orçamento.";

  const heroSlideEls = document.querySelectorAll(".hero-slide");
  const heroTextWrap = document.getElementById("heroTextWrap");
  const heroIndicators = document.getElementById("heroIndicators");
  let heroIdx = 0;
  let heroTimer = null;

  function renderHeroText() {
    const s = slides[heroIdx];
    heroTextWrap.innerHTML = `
      <span class="eyebrow glass">
        <span class="hero-eyebrow-dot animate-pulse"></span>
        ${s.eyebrow}
      </span>
      <h1 class="hero-title"><span class="text-metal">${s.title}</span></h1>
      <p class="hero-text">${s.text}</p>
      <div class="hero-ctas">
        <a href="${WHATSAPP_URL}" target="_blank" rel="noreferrer" class="btn btn-glow btn-glow-hover">
          <svg class="icon icon-sm" data-lucide="rocket"></svg> Solicitar Orçamento
        </a>
        <a href="${WHATSAPP_URL}" target="_blank" rel="noreferrer" class="btn glass card-hover btn-ghost-glass">
          <svg class="icon icon-sm" data-lucide="message-circle"></svg> Falar no WhatsApp
        </a>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  function renderHeroIndicators() {
    heroIndicators.innerHTML = slides
      .map(
        (_, i) =>
          `<button class="dot ${i === heroIdx ? "active" : ""}" data-i="${i}" aria-label="Slide ${i + 1}"></button>`
      )
      .join("");
    heroIndicators.querySelectorAll(".dot").forEach((btn) =>
      btn.addEventListener("click", () => goToSlide(parseInt(btn.dataset.i, 10)))
    );
  }

  function showSlide(i) {
    heroSlideEls.forEach((el) => el.classList.toggle("active", parseInt(el.dataset.index, 10) === i));
    renderHeroText();
    renderHeroIndicators();
  }

  function goToSlide(i) {
    heroIdx = i;
    showSlide(heroIdx);
    restartHeroTimer();
  }

  function nextSlide() {
    heroIdx = (heroIdx + 1) % slides.length;
    showSlide(heroIdx);
  }
  function prevSlide() {
    heroIdx = (heroIdx - 1 + slides.length) % slides.length;
    showSlide(heroIdx);
  }
  function restartHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(nextSlide, 5000);
  }

  document.getElementById("heroNext").addEventListener("click", () => goToSlide((heroIdx + 1) % slides.length));
  document.getElementById("heroPrev").addEventListener("click", () => goToSlide((heroIdx - 1 + slides.length) % slides.length));

  showSlide(heroIdx);
  restartHeroTimer();

  /* ---------------- PARALLAX no hero (scroll) ---------------- */
  const heroBgs = [document.getElementById("heroBg0"), document.getElementById("heroBg1")];
  function onScrollParallax() {
    const y = Math.min(window.scrollY, 600);
    const translate = (y / 600) * 120;
    heroBgs.forEach((bg) => {
      if (bg) bg.style.transform = `scale(1.1) translateY(${translate}px)`;
    });
  }
  window.addEventListener("scroll", onScrollParallax, { passive: true });

  /* ---------------- PARTICLES ---------------- */
  const particlesEl = document.getElementById("particles");
  const dotsCount = 28;
  let particlesHtml = "";
  for (let i = 0; i < dotsCount; i++) {
    const left = (i * 37) % 100;
    const size = 1 + (i % 3);
    const dur = 12 + (i % 8) * 2;
    const delay = i % 10;
    particlesHtml += `<span class="particle" style="left:${left}%;width:${size}px;height:${size}px;animation:particle ${dur}s linear ${delay}s infinite;"></span>`;
  }
  particlesEl.innerHTML = particlesHtml;

  /* ---------------- ABOUT: differentials ---------------- */
  const differentials = [
    { icon: "users", label: "Atendimento Personalizado" },
    { icon: "palette", label: "Design Moderno" },
    { icon: "globe", label: "Sites Responsivos" },
    { icon: "search", label: "SEO Estratégico" },
    { icon: "zap", label: "Entrega Rápida" },
    { icon: "shield", label: "Suporte Especializado" },
  ];
  const differentialsGrid = document.getElementById("differentialsGrid");
  differentialsGrid.innerHTML = differentials
    .map(
      (d, i) => `
    <div class="reveal" data-delay="${(i * 0.05).toFixed(2)}">
      <div class="diff-card glass card-hover">
        <div class="icon-tile"><svg class="icon" data-lucide="${d.icon}"></svg></div>
        <h3>${d.label}</h3>
        <p>Excelência em cada detalhe para entregar resultados consistentes ao seu negócio.</p>
      </div>
    </div>`
    )
    .join("");

  /* ---------------- SERVICES ---------------- */
  const services = [
    { icon: "code-2", title: "Criação de Sites", items: ["Landing Pages", "Sites Institucionais", "Sites Empresariais", "Sites Responsivos"] },
    { icon: "palette", title: "Criação de Logos", items: ["Identidade Visual", "Logotipos Profissionais", "Manual da Marca", "Branding"] },
    { icon: "search", title: "SEO", items: ["Otimização para Google", "SEO Local", "Posicionamento Orgânico", "Estratégias de Crescimento"] },
    { icon: "map-pin", title: "Google Meu Negócio", items: ["Configuração Completa", "Otimização do Perfil", "Estratégia Local", "Aumento de Visibilidade"] },
    { icon: "bar-chart-3", title: "Gestão Digital", items: ["Consultoria Digital", "Presença Online", "Estratégias de Marketing", "Crescimento da Marca"] },
    { icon: "wrench", title: "Manutenção de Sites", items: ["Atualizações", "Segurança", "Correções", "Monitoramento"] },
  ];
  const servicesGrid = document.getElementById("servicesGrid");
  servicesGrid.innerHTML = services
    .map(
      (s, i) => `
    <div class="reveal" data-delay="${(i * 0.06).toFixed(2)}">
      <div class="service-card glass card-hover">
        <div class="service-glow"></div>
        <div style="position:relative">
          <div class="service-icon"><svg class="icon" data-lucide="${s.icon}"></svg></div>
          <h3>${s.title}</h3>
          <ul class="service-list">
            ${s.items
              .map(
                (it) =>
                  `<li><svg class="icon icon-sm icon-xs" data-lucide="check-circle-2"></svg><span>${it}</span></li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
    </div>`
    )
    .join("");

  /* ---------------- PROCESS TIMELINE ---------------- */
  const steps = ["Briefing", "Planejamento", "Design", "Desenvolvimento", "Aprovação", "Publicação", "Suporte"];
  const processSteps = document.getElementById("processSteps");
  processSteps.innerHTML = steps
    .map(
      (s, i) => `
    <div class="reveal" data-delay="${(i * 0.05).toFixed(2)}">
      <div class="timeline-step ${i % 2 !== 0 ? "reverse" : ""}">
        <div class="timeline-num">${i + 1}</div>
        <div class="timeline-card-wrap">
          <div class="timeline-card glass card-hover">
            <p class="step-label">Etapa ${i + 1}</p>
            <h3>${s}</h3>
            <p>Fase essencial para garantir um resultado alinhado, estratégico e de alta performance.</p>
          </div>
        </div>
        <div class="timeline-spacer"></div>
      </div>
    </div>`
    )
    .join("");

  /* ---------------- PORTFOLIO ---------------- */
  const portfolio = [
    { img: "assets/portfolio-1.jpg", title: "Landing Page Premium", tag: "Web Design" },
    { img: "assets/portfolio-3.jpg", title: "Site Institucional", tag: "Desenvolvimento" },
    { img: "assets/portfolio-2.jpg", title: "Identidade Visual", tag: "Branding" },
    { img: "assets/portfolio-4.jpg", title: "SEO Local", tag: "Estratégia" },
  ];
  const portfolioGrid = document.getElementById("portfolioGrid");
  portfolioGrid.innerHTML = portfolio
    .map(
      (p, i) => `
    <div class="reveal" data-delay="${(i * 0.08).toFixed(2)}">
      <div class="portfolio-card glass card-hover">
        <div class="portfolio-img-wrap"><img src="${p.img}" alt="${p.title}" loading="lazy" /></div>
        <div class="portfolio-overlay"></div>
        <div class="portfolio-info">
          <span class="portfolio-tag">${p.tag}</span>
          <h3>${p.title}</h3>
          <div class="portfolio-link">Ver projeto <svg class="icon icon-sm" data-lucide="arrow-right"></svg></div>
        </div>
      </div>
    </div>`
    )
    .join("");

  /* ---------------- BENEFITS ---------------- */
  const benefits = [
    { icon: "users", title: "Mais Clientes" },
    { icon: "award", title: "Mais Autoridade" },
    { icon: "shield", title: "Mais Credibilidade" },
    { icon: "globe", title: "Mais Visibilidade" },
    { icon: "search", title: "Melhor Posição no Google" },
    { icon: "trending-up", title: "Crescimento da Marca" },
    { icon: "sparkles", title: "Atendimento Profissional" },
    { icon: "bar-chart-3", title: "Maior Conversão" },
  ];
  const benefitsGrid = document.getElementById("benefitsGrid");
  benefitsGrid.innerHTML = benefits
    .map(
      (b, i) => `
    <div class="reveal" data-delay="${(i * 0.04).toFixed(2)}">
      <div class="benefit-card glass card-hover">
        <div class="icon-tile"><svg class="icon" data-lucide="${b.icon}"></svg></div>
        <h3>${b.title}</h3>
      </div>
    </div>`
    )
    .join("");

  /* ---------------- STATS (contadores animados) ---------------- */
  const stats = [
    { to: 100, suffix: "+", label: "Projetos Desenvolvidos" },
    { to: 95, suffix: "%", label: "Clientes Satisfeitos" },
    { to: 24, suffix: "h", label: "Atendimento" },
    { to: 100, suffix: "%", label: "Responsivo" },
  ];
  const statsGrid = document.getElementById("statsGrid");
  statsGrid.innerHTML = stats
    .map(
      (s, i) => `
    <div class="reveal" data-delay="${(i * 0.08).toFixed(2)}">
      <div class="stat-num text-metal" data-to="${s.to}" data-suffix="${s.suffix}" data-counted="false">0${s.suffix}</div>
      <p class="stat-label">${s.label}</p>
    </div>`
    )
    .join("");

  function animateCounter(el) {
    const to = parseInt(el.dataset.to, 10);
    const suffix = el.dataset.suffix;
    const dur = 1600;
    const start = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.dataset.counted === "false") {
          entry.target.dataset.counted = "true";
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  statsGrid.querySelectorAll(".stat-num").forEach((el) => counterObserver.observe(el));

  /* ---------------- TESTIMONIALS ---------------- */
  const testimonials = [
    { name: "Carlos Mendes", role: "Empresário", text: "Profissionalismo do início ao fim. O site ficou impecável e já trouxe novos clientes na primeira semana." },
    { name: "Juliana Rocha", role: "Clínica Estética", text: "Minha presença no Google mudou completamente. Hoje recebo agendamentos todos os dias pelo WhatsApp." },
    { name: "Rafael Souza", role: "Restaurante Local", text: "Atendimento personalizado e entrega rápida. Recomendo a Zumppy para qualquer negócio sério." },
    { name: "Ana Beatriz", role: "Advogada", text: "Identidade visual sofisticada e site rápido. A Zumppy entendeu exatamente o que minha marca precisava." },
  ];
  const testimonialsGrid = document.getElementById("testimonialsGrid");
  const testiDots = document.getElementById("testiDots");
  let testiIdx = 0;
  let testiTimer = null;

  function starsHtml() {
    return Array.from({ length: 5 })
      .map(() => `<svg class="icon icon-sm" data-lucide="star" style="fill:currentColor"></svg>`)
      .join("");
  }

  function renderTestimonials() {
    const visible = [0, 1].map((o) => testimonials[(testiIdx + o) % testimonials.length]);
    testimonialsGrid.innerHTML = visible
      .map(
        (t) => `
      <div class="testi-card glass card-hover">
        <div class="testi-stars">${starsHtml()}</div>
        <p class="testi-text">"${t.text}"</p>
        <div class="testi-author">
          <div class="testi-avatar">${t.name[0]}</div>
          <div>
            <p>${t.name}</p>
            <p>${t.role}</p>
          </div>
        </div>
      </div>`
      )
      .join("");
    testiDots.innerHTML = testimonials
      .map((_, i) => `<button class="dot ${i === testiIdx ? "active" : ""}" data-i="${i}" aria-label="Depoimento ${i + 1}"></button>`)
      .join("");
    testiDots.querySelectorAll(".dot").forEach((btn) =>
      btn.addEventListener("click", () => {
        testiIdx = parseInt(btn.dataset.i, 10);
        renderTestimonials();
        restartTestiTimer();
      })
    );
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => {
      testimonialsGrid.querySelectorAll(".testi-card").forEach((c) => c.classList.add("active"));
    });
  }

  function restartTestiTimer() {
    clearInterval(testiTimer);
    testiTimer = setInterval(() => {
      testiIdx = (testiIdx + 1) % testimonials.length;
      renderTestimonials();
    }, 5000);
  }

  renderTestimonials();
  restartTestiTimer();

  /* ---------------- Observa todos os .reveal (estáticos + gerados dinamicamente) ---------------- */
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}s`;
    revealObserver.observe(el);
  });

  /* Re-render dos ícones lucide após popular todo o conteúdo dinâmico */
  if (window.lucide) lucide.createIcons();
});
