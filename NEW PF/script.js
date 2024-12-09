// =============== Matrix Background Effect ===============
class MatrixBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrix = document.querySelector('.matrix-bg');
        this.matrix.appendChild(this.canvas);
        
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/*-+=#$%@';
        this.fontSize = 14;
        this.drops = [];
        
        this.initialize();
        window.addEventListener('resize', () => this.initialize());
    }

    initialize() {
        this.canvas.width = this.matrix.offsetWidth;
        this.canvas.height = this.matrix.offsetHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(10, 25, 47, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#64ffda';
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = '#64ffda';
        this.ctx.font = `${this.fontSize}px 'Fira Code', monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// =============== Project Data ===============
const projectsData = {
    pinned: [
        {
            title: "PRG 1",
            description: "First major project description",
            technologies: ["React", "Node.js", "MongoDB"],
            github: "https://github.com/RishitTandon7/prg1",
            demo: "https://prg1-demo.com"
        },
        {
            title: "PRG 2",
            description: "Second major project description",
            technologies: ["Python", "TensorFlow"],
            github: "https://github.com/RishitTandon7/prg2",
            demo: "https://prg2-demo.com"
        },
        {
            title: "PRG 3",
            description: "Third major project description",
            technologies: ["Angular", "Firebase"],
            github: "https://github.com/RishitTandon7/prg3",
            demo: "https://prg3-demo.com"
        },
        {
            title: "PRG 4",
            description: "Fourth major project description",
            technologies: ["Vue.js", "Express"],
            github: "https://github.com/RishitTandon7/prg4",
            demo: "https://prg4-demo.com"
        }
    ],
    additional: [
        {
            title: "PRG 5",
            description: "Fifth project description",
            technologies: ["React Native", "Firebase"],
            github: "https://github.com/RishitTandon7/prg5",
            demo: "https://prg5-demo.com"
        },
        {
            title: "PRG 6",
            description: "Sixth project description",
            technologies: ["Django", "MySQL"],
            github: "https://github.com/RishitTandon7/prg6",
            demo: "https://prg6-demo.com"
        },
        {
            title: "PRG 7",
            description: "Seventh project description",
            technologies: ["Flutter", "Firebase"],
            github: "https://github.com/RishitTandon7/prg7",
            demo: "https://prg7-demo.com"
        },
        {
            title: "PRG 8",
            description: "Eighth project description",
            technologies: ["MERN Stack"],
            github: "https://github.com/RishitTandon7/prg8",
            demo: "https://prg8-demo.com"
        }
    ]
};

// =============== Slideshow Class ===============
class ProjectSlideshow {
    constructor() {
        this.modal = document.querySelector('.slideshow-modal');
        this.currentSlide = 0;
        this.slides = projectsData.additional;
        this.setupSlideshow();
    }

    setupSlideshow() {
        this.renderSlides();
        this.setupControls();
    }

    renderSlides() {
        const container = this.modal.querySelector('.slides');
        container.innerHTML = this.slides.map((project, index) => this.createSlide(project, index)).join('');
    }

    createSlide(project, index) {
        return `
            <div class="slide ${index === 0 ? 'active' : ''}">
                <div class="project-card">
                    <div class="project-header">
                        <div class="folder-icon">
                            <i class="far fa-folder"></i>
                        </div>
                        <div class="project-links">
                            <a href="${project.github}" target="_blank">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="${project.demo}" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    setupControls() {
        this.modal.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        this.modal.querySelector('.next').addEventListener('click', () => this.nextSlide());
        
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('show')) return;
            if (e.key === 'Escape') this.closeModal();
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    openModal() {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    nextSlide() {
        const slides = this.modal.querySelectorAll('.slide');
        slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        slides[this.currentSlide].classList.add('active');
    }

    prevSlide() {
        const slides = this.modal.querySelectorAll('.slide');
        slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
        slides[this.currentSlide].classList.add('active');
    }
}

// =============== Initialize Everything ===============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Background
    const matrix = new MatrixBackground();
    matrix.animate();

    // Initialize Pinned Projects
    populatePinnedProjects();

    // Initialize View More Button
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const slideshow = new ProjectSlideshow();
    
    viewMoreBtn.addEventListener('click', () => {
        slideshow.openModal();
    });

    // Initialize Social Links
    initializeSocialLinks();
});

// =============== Helper Functions ===============
function populatePinnedProjects() {
    const container = document.querySelector('.pinned-projects');
    if (!container) return;

    container.innerHTML = projectsData.pinned.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div class="folder-icon">
                    <i class="far fa-folder"></i>
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="${project.demo}" target="_blank" aria-label="Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function initializeSocialLinks() {
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            if (!url || url.startsWith('mailto:')) return;
            
            e.preventDefault();
            window.open(url, '_blank', 'noopener noreferrer');
        });
    });
}