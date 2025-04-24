// Initialize LocomotiveScroll for smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Create a function to handle the text revealing animation
function initTextReveal() {
    // Make sure the elements are initially hidden and positioned correctly
    gsap.set(".box .boxelem", {
        y: "100%",
        opacity: 0
    });

    // Animate the elements into view
    gsap.to(".box .boxelem", {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        delay: 0.8, // Increased delay to ensure font loads
        stagger: 0.25,
        ease: "power3.out"
    });
}

// Create a smooth moving dot cursor
function initFollowCursor() {
    const dot = document.getElementById("dot");
    const pos = { x: 0, y: 0 };

    // Use GSAP's quickSetter for optimized updates
    const setDot = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    // Center dot initially
    gsap.set(dot, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });

    document.addEventListener("mousemove", e => {
        // Update position directly
        pos.x = e.clientX;
        pos.y = e.clientY;

        // Use quickSetter for optimized rendering
        setDot(pos.x);
        setDotY(pos.y);
    });

}

menu = () => {
    const dot = document.getElementById('dot');
    const elems = document.querySelector('[onclick="openNav()"]');

    // On hover: scale dot to 0
    elems.addEventListener('mouseenter', () => {
        gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" });
    });

    document.addEventListener('mousemove', (e) => {
        const rect = elems.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Adjust threshold (e.g., 60px) as desired
        if (distance < 60) {
            gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" });
        } else {
            gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
        }
    });


    // On leave: scale dot back to normal
    menuSpan.addEventListener('mouseleave', () => {
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
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
    initTextReveal(); // Add this line to initialize the text reveal animation
    initFollowCursor();
    menu();
    updateRealTime();
});
