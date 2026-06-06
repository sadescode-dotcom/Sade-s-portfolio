const allMyNavLinks = document.querySelectorAll('.nav-btn');

allMyNavLinks.forEach(tabItem => {
    tabItem.addEventListener('click', () => {
        allMyNavLinks.forEach(resetNode => resetNode.classList.remove('active'));
        tabItem.classList.add('active');
    });
});

const snowCanvas = document.getElementById('thrones-canvas');
const ctxDrawEngine = snowCanvas.getContext('2d');

function resizeSnowScreen() {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
}
resizeSnowScreen();
window.addEventListener('resize', resizeSnowScreen);

const userCursor = { x: null, y: null, windRadius: 150 };

window.addEventListener('mousemove', (e) => {
    userCursor.x = e.clientX;
    userCursor.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    userCursor.x = null;
    userCursor.y = null;
});

class IceSnowflake {
    constructor() {
        this.generateNewFlake();
    }

    generateNewFlake() {
        this.x = Math.random() * snowCanvas.width;
        this.y = Math.random() * -snowCanvas.height; 
        this.size = Math.random() * 2.5 + 0.5;       
        this.speedY = Math.random() * 1.2 + 0.4;     
        this.speedX = Math.random() * 0.8 - 0.4;     
    }

    processPhysics() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (userCursor.x !== null && userCursor.y !== null) {
            let dx = this.x - userCursor.x;
            let dy = this.y - userCursor.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < userCursor.windRadius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let gustStrength = (userCursor.windRadius - distance) / userCursor.windRadius;
                
                this.x += forceDirectionX * gustStrength * 6;
                this.y += forceDirectionY * gustStrength * 6;
            }
        }

        if (this.y > snowCanvas.height || this.x < 0 || this.x > snowCanvas.width) {
            this.generateNewFlake();
        }
    }

    drawToCanvas() {
        ctxDrawEngine.fillStyle = 'rgba(215, 235, 255, 0.75)';
        ctxDrawEngine.beginPath();
        ctxDrawEngine.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxDrawEngine.closePath();
        ctxDrawEngine.fill();
    }
}

const blizzardArrayStorage = [];
const snowflakeDensity = 130; 

for (let i = 0; i < snowflakeDensity; i++) {
    blizzardArrayStorage.push(new IceSnowflake());
}

function animateBlizzardFrame() {
    ctxDrawEngine.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    
    for (let index = 0; index < blizzardArrayStorage.length; index++) {
        blizzardArrayStorage[index].processPhysics();
        blizzardArrayStorage[index].drawToCanvas();
    }
    
    requestAnimationFrame(animateBlizzardFrame);
}
animateBlizzardFrame();

const dynamicRoles = ["REPAIRS LAPTOPS", "REPAIRS DESKTOPS", "DOES SOFTWARE SERVICES"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpanTarget = document.querySelector('.dynamic-text');

function runBannerTypingLoop() {
    const currentFullWord = dynamicRoles[roleIndex];
    
    if (isDeleting) {
        typingSpanTarget.textContent = currentFullWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingSpanTarget.textContent = currentFullWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let dynamicDelayValue = 120 - Math.random() * 40; 
    if (isDeleting) { dynamicDelayValue /= 2; } 

    if (!isDeleting && charIndex === currentFullWord.length) {
        dynamicDelayValue = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % dynamicRoles.length; 
        dynamicDelayValue = 400; 
    }

    setTimeout(runBannerTypingLoop, dynamicDelayValue);
}

if (typingSpanTarget) {
    setTimeout(runBannerTypingLoop, 1000);
}

const startPortfolioBtn = document.getElementById('splash-start-btn');
const masterIntroSplash = document.getElementById('intro-splash-screen');
const mainSiteWrapper = document.getElementById('main-portfolio-wrapper');

if (startPortfolioBtn && masterIntroSplash && mainSiteWrapper) {
    startPortfolioBtn.addEventListener('click', () => {
        masterIntroSplash.classList.add('fade-out');
        mainSiteWrapper.classList.remove('hidden-on-start');
        mainSiteWrapper.classList.add('reveal-site');
    });
}
const toggleMenuBtn = document.getElementById('menu-toggle-btn');
const navigationMenuBox = document.querySelector('.center-menu');
const individualNavButtons = document.querySelectorAll('.nav-btn');

if (toggleMenuBtn && navigationMenuBox) {
    toggleMenuBtn.addEventListener('click', (clickEvent) => {
        clickEvent.stopPropagation();
        navigationMenuBox.classList.toggle('menu-active');
    });

    individualNavButtons.forEach(btnTarget => {
        btnTarget.addEventListener('click', () => {
            navigationMenuBox.classList.remove('menu-active');
        });
    });

    document.addEventListener('click', () => {
        navigationMenuBox.classList.remove('menu-active');
    });
}
