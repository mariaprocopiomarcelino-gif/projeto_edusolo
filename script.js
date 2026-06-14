/* ==========================================================================
   BANCO DE DADOS LOCAL (ARRAYS CONFIGURADOS PEDAGOGICAMENTE)
   ========================================================================== */

const DIAGNOSTICO_DATA = [
    {
        icon: "fa-solid fa-cloud-showers-heavy",
        titulo: "Erosão Hídrica",
        descricao: "A água da chuva arrasta a camada superficial rica em matéria orgânica quando o solo está desprotegido, gerando voçorocas e empobrecimento severo."
    },
    {
        icon: "fa-solid fa-wind",
        titulo: "Erosão Eólica",
        descricao: "Ventos fortes removem as partículas mais finas e férteis do solo em regiões planas e secas, reduzindo drasticamente o potencial produtivo da lavoura."
    },
    {
        icon: "fa-solid fa-tractor",
        titulo: "Compactação mecânica",
        descricao: "O tráfego pesado de máquinas e o manejo em solo muito úmido esmagam os poros da terra, impedindo que as raízes cresçam e que a água penetre."
    }
];

const PANORAMA_DATA = [
    { number: "33%", titulo: "Solos Degradados", desc: "Da superfície global sofre degradação moderada a alta, segundo dados da FAO." },
    { number: "10x+", titulo: "Perda de Velocidade", desc: "O solo se esgota dez vezes mais rápido do que a natureza consegue regenerá-lo." },
    { number: "R$ 11Bi", titulo: "Prejuízo Anual", desc: "Estimativa de perda econômica no Brasil apenas devido à lavagem de nutrientes por erosão." },
    { number: "100%", titulo: "Dependência Vital", desc: "De toda a nossa produção de alimentos terrestres depende diretamente da camada fértil superior." }
];

const SOLUCOES_DATA = [
    {
        icon: "fa-solid fa-layer-group",
        titulo: "Plantio em Curvas de Nível",
        descricao: "Cultivar seguindo as cotas altimétricas do terreno quebra a velocidade do escoamento da água da chuva, forçando-a a infiltrar em vez de erodir."
    },
    {
        icon: "fa-solid fa-wheat-awn",
        titulo: "Plantio Direto & Palhada",
        descricao: "Elimina a aração tradicional. As sementes são plantadas sobre os restos vegetais anteriores, blindando a terra contra calor e impactos pluviais."
    },
    {
        icon: "fa-solid fa-arrows-spin",
        titulo: "Rotação de Culturas",
        descricao: "Alternar espécies botanicamente diferentes na mesma área melhora a biologia do solo, recicla nutrientes de forma eficiente e quebra ciclos de pragas."
    }
];

/* ==========================================================================
   INICIALIZAÇÃO E RENDERIZAÇÃO DINÂMICA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    renderDiagnostico();
    renderPanorama();
    renderSolucoes();
    initAcessibilidade();
    initTabs();
    initCarrossel();
    initAccordion();
});

function renderDiagnostico() {
    const container = document.getElementById("diagnostico-grid");
    if (!container) return;
    
    container.innerHTML = DIAGNOSTICO_DATA.map(item => `
        <article class="info-card">
            <div class="card-icon" aria-hidden="true"><i class="${item.icon}"></i></div>
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
        </article>
    `).join('');
}

function renderPanorama() {
    const container = document.getElementById("indicators-grid");
    if (!container) return;

    container.innerHTML = PANORAMA_DATA.map(item => `
        <div class="indicator-card">
            <span class="indicator-number">${item.number}</span>
            <h3>${item.titulo}</h3>
            <p>${item.desc}</p>
        </div>
    `).join('');
}

function renderSolucoes() {
    const container = document.getElementById("solucoes-grid");
    if (!container) return;

    container.innerHTML = SOLUCOES_DATA.map(item => `
        <article class="info-card solucoes-card">
            <div class="card-icon" aria-hidden="true"><i class="${item.icon}"></i></div>
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
        </article>
    `).join('');
}

/* ==========================================================================
   RECURSOS DE ACESSIBILIDADE DE FONTE E CONTRASTE
   ========================================================================== */

function initAcessibilidade() {
    const btnAumentar = document.getElementById("btn-aumentar-fonte");
    const btnDiminuir = document.getElementById("btn-diminuir-fonte");
    const btnContraste = document.getElementById("btn-alto-contraste");
    let currentScale = 100;

    btnAumentar.addEventListener("click", () => {
        if(currentScale < 130) {
            currentScale += 10;
            document.documentElement.style.setProperty('--font-base', `${currentScale / 100}rem`);
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if(currentScale > 90) {
            currentScale -= 10;
            document.documentElement.style.setProperty('--font-base', `${currentScale / 100}rem`);
        }
    });

    btnContraste.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
        const isHigh = document.body.classList.contains("high-contrast");
        btnContraste.setAttribute("aria-pressed", isHigh);
    });
}

/* ==========================================================================
   METODOLOGIA ATIVA: DESAFIO DO SIMULADOR (INTERATIVIDADE)
   ========================================================================== */

function jogarSimulador(opcao) {
    const feedback = document.getElementById("game-feedback");
    feedback.classList.remove("hidden", "feedback-success", "feedback-error");

    if (opcao === 1) {
        feedback.innerText = "❌ Decisão Incorreta! Passar o arado quebra a estrutura da terra e deixar o solo exposto acelerou a erosão. Suas perdas agrícolas aumentaram em 40% após a primeira chuva forte.";
        feedback.classList.add("feedback-error");
    } else if (opcao === 2) {
        feedback.innerText = "✅ Decisão Perfeita! As curvas de nível seguraram a água e a palhada protegeu o impacto das gotas. A retenção hídrica aumentou e sua produtividade subiu 25% já no próximo ciclo!";
        feedback.classList.add("feedback-success");
    }
}

/* ==========================================================================
   SISTEMA DE ABAS (TABS ACESSÍVEIS)
   ========================================================================== */

function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetPanelId = button.getAttribute("aria-controls");

            tabButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
                btn.setAttribute("tabindex", "-1");
            });

            tabPanels.forEach(panel => panel.setAttribute("hidden", "true"));

            button.classList.add("active");
            button.setAttribute("aria-selected", "true");
            button.removeAttribute("tabindex");
            document.getElementById(targetPanelId).removeAttribute("hidden");
        });

        // Suporte a navegação pelas setas do teclado
        button.addEventListener("keydown", (e) => {
            const index = Array.from(tabButtons).indexOf(button);
            let nextIndex;

            if (e.key === "ArrowRight") {
                nextIndex = (index + 1) % tabButtons.length;
                tabButtons[nextIndex].focus();
                tabButtons[nextIndex].click();
            } else if (e.key === "ArrowLeft") {
                nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[nextIndex].focus();
                tabButtons[nextIndex].click();
            }
        });
    });
}

/* ==========================================================================
   CARROSSEL INTERATIVO (COM AUTOPLAY, PAUSA E ACESSIBILIDADE)
   ========================================================================== */

function initCarrossel() {
    const inner = document.querySelector(".carousel-inner");
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");
    const indicators = document.querySelectorAll(".carousel-indicators .indicator");
    
    let currentIndex = 0;
    let autoplayTimer;

    function updateCarousel(index) {
        if(index >= items.length) currentIndex = 0;
        else if(index < 0) currentIndex = items.length - 1;
        else currentIndex = index;

        inner.style.transform = `translateX(-${currentIndex * (100 / items.length)}%)`;
        
        // Atualiza estados visuais e acessíveis
        items.forEach((item, i) => {
            if(i === currentIndex) {
                item.classList.add("active");
                item.removeAttribute("hidden");
            } else {
                item.classList.remove("active");
                item.setAttribute("hidden", "true");
            }
        });

        indicators.forEach((ind, i) => {
            ind.classList.toggle("active", i === currentIndex);
            ind.setAttribute("aria-label", `Ir para slide ${i + 1}`);
        });
    }

    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    // Eventos de controles manuais
    nextBtn.addEventListener("click", () => { updateCarousel(currentIndex + 1); });
    prevBtn.addEventListener("click", () => { updateCarousel(currentIndex - 1); });

    indicators.forEach((indicator, i) => {
        indicator.addEventListener("click", () => updateCarousel(i));
    });

    // Pausa em Hover / Foco (Requisito WCAG)
    const carouselRegion = document.querySelector(".carousel");
    carouselRegion.addEventListener("mouseenter", stopAutoplay);
    carouselRegion.addEventListener("mouseleave", startAutoplay);
    carouselRegion.addEventListener("focusin", stopAutoplay);
    carouselRegion.addEventListener("focusout", startAutoplay);

    // Suporte para Teclado (Setas Esquerda/Direita)
    carouselRegion.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
    });

    // Swipe simples para dispositivos móveis (Mobile First)
    let touchStartX = 0;
    carouselRegion.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    carouselRegion.addEventListener("touchend", (e) => {
        let touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextBtn.click(); // Swipe esquerda
        if (touchEndX - touchStartX > 50) prevBtn.click(); // Swipe direita
    }, {passive: true});

    // Iniciar
    startAutoplay();
    updateCarousel(0);
}

/* ==========================================================================
   ACORDEÃO (FAQ ACESSÍVEL - APENAS UM ABERTO POR VEZ)
   ========================================================================== */

function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const isExpanded = header.getAttribute("aria-expanded") === "true";
            const targetId = header.getAttribute("aria-controls");
            const body = document.getElementById(targetId);

            // Fecha todos os outros itens abertos (Garante foco único)
            headers.forEach(otherHeader => {
                if(otherHeader !== header) {
                    otherHeader.setAttribute("aria-expanded", "false");
                    const otherBodyId = otherHeader.getAttribute("aria-controls");
                    document.getElementById(otherBodyId).setAttribute("hidden", "true");
                }
            });

            // Altera o estado do item clicado
            if (isExpanded) {
                header.setAttribute("aria-expanded", "false");
                body.setAttribute("hidden", "true");
            } else {
                header.setAttribute("aria-expanded", "true");
                body.removeAttribute("hidden");
            }
        });
    });
}