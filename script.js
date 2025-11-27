document.addEventListener('DOMContentLoaded', () => {
    loadComponents(); 
    
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path.endsWith('/')) {
        loadCarousel();
    } 
    if (path.includes('research.html')) {
        loadInterests();
        loadOrganization();
        loadAcademicWork(); // Carga Pubs, Preprints y Tesis
    }
});

// ... (loadComponents, highlightActiveLink, loadInterests, loadOrganization IGUAL QUE ANTES) ...
async function loadComponents() {
    try {
        const nav = await fetch('components/nav.html');
        if(nav.ok) {
            document.getElementById('nav-placeholder').innerHTML = await nav.text();
            highlightActiveLink(); 
        }
        const footer = await fetch('components/footer.html');
        if(footer.ok) document.getElementById('footer-placeholder').innerHTML = await footer.text();
    } catch (e) { console.error(e); }
}

function highlightActiveLink() {
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === '/') currentPath = 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });
}

function loadInterests() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('interests-list');
            if(!list) return;
            data.research_interests.forEach(item => {
                list.innerHTML += `<li>${item}</li>`;
            });
        });
}

function loadOrganization() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('org-list');
            if (!list || !data.organization) return;
            list.innerHTML = '';
            data.organization.forEach(item => {
                list.innerHTML += `
                    <li class="pub-item">
                        <div class="pub-year">${item.year}</div>
                        <div class="pub-content">
                            ${item.role} 
                            <strong><a href="${item.link}" target="_blank" style="color:#003366; text-decoration:none;">${item.title}</a></strong>.
                            <br><span style="color: #555; font-size: 0.95em;">${item.description}</span>
                        </div>
                    </li>
                `;
            });
        });
}

// --- FUNCIÓN ACTUALIZADA ---
function loadAcademicWork() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            // 1. PUBLICACIONES
            const pubSection = document.getElementById('publications-section');
            const pubList = document.getElementById('pub-list');
            if (pubList && data.publications && data.publications.length > 0) {
                pubSection.style.display = 'block';
                renderList(pubList, data.publications);
            } else {
                pubSection.style.display = 'none';
            }

            // 2. PREPRINTS
            const prepSection = document.getElementById('preprints-section');
            const prepList = document.getElementById('preprint-list');
            if (prepList && data.preprints && data.preprints.length > 0) {
                prepSection.style.display = 'block';
                renderList(prepList, data.preprints);
            } else {
                prepSection.style.display = 'none';
            }

            // 3. THESES & OTHER WRITINGS (NUEVO)
            const otherSection = document.getElementById('other-writings-section');
            const otherList = document.getElementById('other-list');
            if (otherList && data.other_writings && data.other_writings.length > 0) {
                otherSection.style.display = 'block';
                renderList(otherList, data.other_writings);
            } else {
                otherSection.style.display = 'none';
            }
        });
}

function renderList(container, items) {
    container.innerHTML = '';
    items.forEach(item => {
        let links = '';
        if (item.has_pdf) links += `<a href="${item.pdf}" target="_blank" class="pdf-tag">[PDF]</a>`;
        if (item.link) links += `<a href="${item.link}" target="_blank" class="link-tag">[Link]</a>`;

        container.innerHTML += `
            <li class="pub-item">
                <div class="pub-year">${item.year}</div>
                <div class="pub-content">
                    <strong>${item.title}</strong>, 
                    <span style="font-style:italic;">${item.authors}</span>. 
                    ${item.journal}.
                    ${links}
                </div>
            </li>
        `;
    });
}

function loadCarousel() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const wrapper = document.querySelector('.swiper-wrapper');
            if(!wrapper) return;
            wrapper.innerHTML = ''; 
            data.carousel.forEach(slide => {
                wrapper.innerHTML += `
                    <div class="swiper-slide">
                        <img src="${slide.image}" alt="${slide.caption}">
                        <div class="slide-caption">${slide.caption}</div>
                    </div>
                `;
            });
            new Swiper('.mySwiper', {
                loop: true,
                autoplay: { delay: 4000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            });
        });
}