document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.getElementById('main-title');
    const titleText = "The Final Nights";
    const titleBaseDelay = 1.0;
    const titleLetterDelayIncrement = 0.24;
    const titleLetterAnimationDuration = 3.0;
    let originalTitleHTML = '';

    titleElement.textContent = '';

    titleText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.classList.add('letter-span');
        span.innerHTML = (char === ' ') ? '&nbsp;' : char;
        const delay = titleBaseDelay + index * titleLetterDelayIncrement;
        span.style.animationDelay = `${delay}s`;
        titleElement.appendChild(span);
    });
    originalTitleHTML = titleElement.innerHTML;

    const lastLetterStartTime = titleBaseDelay + (titleText.length - 1) * titleLetterDelayIncrement;
    const titleEndTime = lastLetterStartTime + titleLetterAnimationDuration;

    setTimeout(() => {
        if (titleElement) {
             titleElement.classList.add('initial-fade-complete');
        }
    }, titleEndTime * 1000);

    const audioPlayer = document.getElementById('background-audio');
    audioPlayer.volume = 0.2;
    audioPlayer.play().catch(error => {});

    const canvas = document.getElementById('dust-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.15 + 0.05,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < -p.radius) p.x = canvas.width + p.radius;
            if (p.x > canvas.width + p.radius) p.x = -p.radius;
            if (p.y < -p.radius) p.y = canvas.height + p.radius;
            if (p.y > canvas.height + p.radius) p.y = -p.radius;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
        });
        requestAnimationFrame(updateParticles);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    resizeCanvas();
    createParticles();
    updateParticles();

    const glitchTarget = document.getElementById('main-title');
    const glitchMinInterval = 5000;
    const glitchMaxInterval = 20000;
    const glitchDuration = 400;

    const randomWords = ["Malkav", "Sabbat", "Gehenna", "Nimi", "REGIME KNOWS BEST"];

    function scheduleNextGlitch(delay) {
         setTimeout(triggerGlitch, delay);
    }

    function triggerGlitch() {
        if (glitchTarget && glitchTarget.classList.contains('initial-fade-complete')) {
            const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
            const glitchedTitle = `The ${randomWord} Nights`;

            glitchTarget.innerHTML = glitchedTitle;
            glitchTarget.classList.add('glitching');

            setTimeout(() => {
                 glitchTarget.classList.remove('glitching');
                 glitchTarget.innerHTML = originalTitleHTML;
            }, glitchDuration);
        }
        const nextDelay = Math.random() * (glitchMaxInterval - glitchMinInterval) + glitchMinInterval;
        scheduleNextGlitch(nextDelay);
    }

     const initialGlitchWait = titleEndTime * 1000;
     setTimeout(() => {
         scheduleNextGlitch(Math.random() * (glitchMaxInterval - glitchMinInterval) + glitchMinInterval);
     }, initialGlitchWait);
});
