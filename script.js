locoScroll = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

};
locoScroll();



function initAnimations() {
    const tl = gsap.timeline();

    // Loader animation
    tl.to("#loader", {
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 4.5, // Wait for 4.5 seconds before starting the loader animation
        onComplete: () => {
            document.querySelector("#loader").style.display = "none";
        }
    });

    // Text reveal animation
    tl.set(".box .boxelem span", { y: "100%", opacity: 0 }) // Hide each character
        .to(".box .boxelem span", {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "bounce.out"
        }); // Animate each character into view with a stagger
}

// Initialize animations
initAnimations();

// Create a smooth moving dot cursor with improved performance
function initFollowCursor() {
    const dot = document.getElementById("dot");
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Set initial position
    dot.style.transform = 'translate(-50%, -50%)';

    // Track mouse position
    document.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Separate animation loop for smooth movement
    function animateDot() {
        // Calculate smooth movement - adjust the 0.1 value for different follow speeds
        // Lower = slower/smoother, higher = faster/more direct
        const speed = 0.5;
        currentX += (mouseX - currentX) * speed;
        currentY += (mouseY - currentY) * speed;

        // Apply position with fixed transform for centering
        dot.style.left = `${currentX}px`;
        dot.style.top = `${currentY}px`;

        // Continue animation loop
        requestAnimationFrame(animateDot);
    }

    // Start animation loop
    animateDot();
}

function interactiveDot() {
    const dot = document.getElementById('dot');
    // Generic hover targets (exclude reload menu links)
    const hoverElements = [
        ...Array.from(document.querySelectorAll('a:not(#reload .menu-item a)')),
        document.querySelector('[onclick="openNav()"]')
    ].filter(Boolean);
    // All reload menu-item links
    const reloadLinks = document.querySelectorAll('#reload .menu-item a');

    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" });
        });

        elem.addEventListener('mouseleave', () => {
            gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });

    // Bind transform/reset on each reload link
    reloadLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            dot.innerHTML = "OPEN";
            dot.style.width = '70px';
            dot.style.height = 'auto';
            dot.style.display = 'flex';
            dot.style.alignItems = 'center';
            dot.style.justifyContent = 'center';
            dot.style.fontSize = '15px';
            dot.style.padding = '5px 15px';
            dot.style.borderRadius = '50px';
            dot.style.color = '#000';
        });

        link.addEventListener('mouseleave', () => {
            dot.innerHTML = ""; // Reset dot
            dot.style.width = '17px';
            dot.style.height = '17px';
            dot.style.display = 'block';
            dot.style.fontSize = '0';
            dot.style.padding = '0';
            dot.style.borderRadius = '50%';
        });
    });

    document.addEventListener('mousemove', (e) => {
        let nearElement = false;
        hoverElements.forEach(elem => {
            const rect = elem.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) { // Adjust threshold as needed
                nearElement = true;
            }
        });

        if (nearElement) {
            gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" });
        } else {
            gsap.to(dot, { scale: 1, duration: 0.3, ease: "bounce.out" });
        }
    });
}

// Display real-time in the footer
function updateRealTime() {
    const realTimeElement = document.getElementById("realtime");

    function updateTime() {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        // Add Tailwind classes to the time element if needed
        realTimeElement.textContent = now.toLocaleTimeString('en-US', options) + " IST";
    }

    // Update the time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
}


// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    initFollowCursor();
    interactiveDot()
    updateRealTime();
});

animfooter = () => {
    gsap.from("#footer h1 span", {
        y: -100,
        stagger: .25,
        opacity: 0,
        duration: .8,
        // delay: 1,
        scrollTrigger: {
            trigger: "#footer",
            scroller: "#main",
            start: "top 70%",
            end: "top 55%",
            markers: true,
            scrub: 2,
        }
    })
}
animfooter()