function nextScreen(screenNumber) {
    const screens = document.querySelectorAll('.screen');
    
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });

    const targetScreen = document.getElementById('screen-' + screenNumber);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
}

const noBtn = document.getElementById('no-btn');

if (noBtn) {
    noBtn.addEventListener('mouseover', function() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        const randomX = Math.floor(Math.random() * (windowWidth - btnWidth));
        const randomY = Math.floor(Math.random() * (windowHeight - btnHeight));
        
        noBtn.style.position = 'fixed'; 
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    });
}
