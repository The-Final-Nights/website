
const isMobile = window.location.href.includes('mobile.html');
const slideShowDelay = isMobile ? 1000 : 10000;

setTimeout(() => {
    const customBox = document.getElementById('custom-fadein-box');
    if (!customBox) return;
    const dataPanel = document.getElementById('data-panel');
    if (dataPanel) {
        dataPanel.style.opacity = '1';
        dataPanel.style.position = 'absolute';
        dataPanel.style.bottom = '0';
        dataPanel.style.left = '0';
        dataPanel.style.right = '0';
        dataPanel.style.zIndex = '10';
    }
    
    const images = [
        'slideshow/armed_resistance.png',
        'slideshow/birddog.png',
        'slideshow/bonko_republic.png',
        'slideshow/corax.png',
        'slideshow/crude_oil.png',
        'slideshow/dancefloor.png',
        'slideshow/femboy.png',
        'slideshow/garou_cancer.png',
        'slideshow/glasswalkers.png',
        'slideshow/grafitti.png',
        'slideshow/guerilla_2.png',
        'slideshow/guerilla.png',
        'slideshow/hospital_gang.png',
        'slideshow/winners.png',
        'slideshow/dance.gif',
        'slideshow/laced.gif',
        'slideshow/nimi_gang.gif',
        'slideshow/masquerade.png',
        'slideshow/catastrophe.png',
        'slideshow/salutes.webp',
        'slideshow/bear.gif',
        'slideshow/puppy.png',
        'slideshow/cat_violence.gif',
        'slideshow/trujah.png',
        'slideshow/Job_fair_1.png',
        'slideshow/smells.png'
    ];    
    function showRandomImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        const selectedImage = images[randomIndex];
        

        const dataPanel = document.getElementById('data-panel');
        customBox.innerHTML = '';
        
        const img = document.createElement('img');
        img.src = selectedImage;
        img.alt = ' ';        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '0.75rem';
        img.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0.10)';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        customBox.appendChild(img);
        if (dataPanel) {
            customBox.appendChild(dataPanel);
        }
        customBox.style.opacity = '1';
        let delay = 6000;
        if (selectedImage.endsWith('.gif')) {
            delay = Math.random() * 10000 + 5000;
        } else {
            delay = 6000;
        }
        setTimeout(showRandomImage, delay);
    }
    customBox.style.minHeight = '440px';
    if (isMobile) {
        customBox.style.minHeight = '300px';
        customBox.style.height = '300px';
    } else {
        customBox.style.minHeight = '440px';
        customBox.style.height = '440px';
    }
    showRandomImage();
}, slideShowDelay);
