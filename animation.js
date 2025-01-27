const shapes = document.querySelectorAll('.shape');
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const logo = document.querySelector('.main-logo');
const lottieAnim = document.getElementById('lottie-animation');
let mouseX = 0;
let mouseY = 0;
let hasMouseMoved = false;

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

// Set initial opacity only
gsap.set([cursor, cursorDot], { 
    opacity: 0
});

// Track mouse position and initialize cursor
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Initialize cursor position and show it on first mouse move
    if (!hasMouseMoved) {
        hasMouseMoved = true;
        gsap.set([cursor, cursorDot], {
            xPercent: -50,
            yPercent: -50,
            x: mouseX,
            y: mouseY
        });
        gsap.to([cursor, cursorDot], {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

// Use RAF for smoother animation
function updateCursor() {
    gsap.to(cursor, {
        duration: 0.5,
        x: mouseX,
        y: mouseY,
        ease: 'power2.out'
    });
    
    // Update dot position immediately
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    
    requestAnimationFrame(updateCursor);
}

// Start the animation loop
updateCursor();

// Hover effects
const interactiveElements = document.querySelectorAll('.main-logo, #lottie-animation');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
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
        rotateX: 110,
        scale: 8,      // Increased initial scale for more dramatic start
        opacity: 0,
        z: 2000,      // Increased depth for longer approach
        transformOrigin: "center center"
    });

    // Animate after a longer initial delay
    gsap.delayedCall(2, () => {
        const tl = gsap.timeline({
            onStart: () => {
                animation.play();
            }
        });

        // Combined animation with overlapping
        tl.to('#lottie-animation', {
            scale: 1,
            opacity: 1,
            z: 0,
            duration: 6.5,  // Much longer duration for the approach
            ease: "power2.inOut"  // Changed to inOut for smoother approach and landing
        })
        // Start rotation when it's getting closer
        .to('#lottie-animation', {
            rotateX: 0,
            duration: 4.5,  // Longer rotation
            ease: "power1.inOut"  // Gentler easing for more floaty feel
        }, "-=3.5");  // Start rotating earlier

        // Add the logo animation
        gsap.to('.main-logo', {
            opacity: 1,
            y: 0,
            duration: 3,
            ease: 'power2.out',
            delay: 5.75  // Adjusted delay to match new timing
        });
    });
});

// Add cursor visibility handling
document.addEventListener('mouseleave', () => {
    gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
    });
});

document.addEventListener('mouseenter', () => {
    gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
}); 