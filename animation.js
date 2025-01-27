const shapes = document.querySelectorAll('.shape');
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const logo = document.querySelector('.main-logo');
const lottieAnim = document.getElementById('lottie-animation');

shapes.forEach(shape => {
    // Bigger random starting position
    gsap.set(shape, {
        x: gsap.utils.random(-200, 200),
        y: gsap.utils.random(-200, 200)
    });

    // Create infinite random movement with bigger ranges
    function animate() {
        gsap.to(shape, {
            duration: gsap.utils.random(10, 20),  // Faster animations
            x: gsap.utils.random(-300, 300),      // Bigger movement range
            y: gsap.utils.random(-300, 300),
            scale: gsap.utils.random(0.7, 1.4),   // Bigger scale changes
            opacity: gsap.utils.random(0.4, 0.8),  // Higher opacity range
            filter: `blur(${gsap.utils.random(60, 120)}px)`,
            ease: "power1.inOut",
            onComplete: animate
        });
    }

    animate();
});

// Update cursor movement
window.addEventListener('mousemove', e => {
    // Instant movement for the dot with requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
    
    // Faster, snappier movement for the larger cursor
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,  // Reduced from 0.2 to 0.15
        ease: 'expo.out'  // Changed to expo.out for snappier movement
    });
});

// Make cursor disappear when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
});

// Add hover effect for logo
logo.addEventListener('mouseenter', () => {
    cursor.classList.add('grow');
});

logo.addEventListener('mouseleave', () => {
    cursor.classList.remove('grow');
});

// Add hover effect for lottie animation
lottieAnim.addEventListener('mouseenter', () => {
    cursor.classList.add('grow');
});

lottieAnim.addEventListener('mouseleave', () => {
    cursor.classList.remove('grow');
});

let animation;

window.addEventListener('load', () => {
    // Initialize Lottie
    animation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: false,  // Start paused
        path: 'assets/laude-logo.json'
    });

    // Set initial state
    gsap.set('#lottie-animation', {
        rotateX: 90,
        scale: 2.5,
        opacity: 0,
        z: 500,
        transformOrigin: "center center"
    });

    // Animate after a longer initial delay
    gsap.delayedCall(2, () => {
        gsap.to('#lottie-animation', {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            z: 0,
            duration: 3.75,
            ease: 'power2.inOut',
            onStart: () => {
                animation.play();
                
                // Start the logo animation sooner
                gsap.to('.main-logo', {
                    opacity: 1,
                    y: 0,
                    duration: 2.5,  // Increased from 1.8 to 2.5 seconds
                    ease: 'power2.out',
                    delay: 0.05  // Reduced from 0.45 to 0.05 seconds
                });
            }
        });
    });
}); 