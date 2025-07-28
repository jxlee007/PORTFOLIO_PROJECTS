let locoScrollInstance;

locoScroll = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    locoScrollInstance = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScrollInstance.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScrollInstance.scrollTo(value, 0, 0) : locoScrollInstance.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScrollInstance.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

};
locoScroll();

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

function toggleBackToTopButton() {
    if (!backToTopButton) return;
    
    // Use LocomotiveScroll's scroll position if available, otherwise fallback to window.scrollY
    const scrollY = locoScrollInstance ? locoScrollInstance.scroll.instance.scroll.y : window.scrollY;
    
    if (scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.add('opacity-0', 'invisible');
        backToTopButton.classList.remove('opacity-100', 'visible');
    }
}

function scrollToTop() {
    if (locoScrollInstance) {
        locoScrollInstance.scrollTo(0, {
            duration: 1000,
            easing: [0.25, 0.0, 0.35, 1.0]
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Add scroll listener for LocomotiveScroll
if (locoScrollInstance) {
    locoScrollInstance.on("scroll", toggleBackToTopButton);
} else {
    window.addEventListener('scroll', toggleBackToTopButton);
}

// Add click event listener for back to top button
if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
    });
}

function initAnimations() {
    const tl = gsap.timeline();
    
    // Check if loader exists before animating it
    const loader = document.querySelector("#loader");
    if (loader) {
        // Check if this is the first visit to the site
        const isFirstVisit = !sessionStorage.getItem('hasVisited');
        
        if (isFirstVisit) {
            // Mark that user has visited the site
            sessionStorage.setItem('hasVisited', 'true');
            
            // Show loader animation for first visit
            tl.to("#loader", {
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 4.5, // Wait for 4.5 seconds before starting the loader animation
                onComplete: () => {
                    loader.style.display = "none";
                }
            });
        } else {
            // Hide loader immediately for subsequent visits
            loader.style.display = "none";
        }
    }

    // Check if text reveal elements exist
    const textElements = document.querySelectorAll(".box .boxelem span");
    if (textElements.length > 0) {
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
}

// Initialize animations
initAnimations();

// Cursor following is now handled in Dot.astro component

// Interactive dot functionality is now handled in Dot.astro component

// Display real-time in the footer
function updateRealTime() {
    const realTimeElement = document.getElementById("realtime");
    if (!realTimeElement) return; // Exit if element doesn't exist

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

// Sidebar open/close functions
function openNav() {
    const sidebar = document.getElementById("sidebar");
    const heading = document.querySelector("#heading");
    if (window.innerWidth >= 769) {
        sidebar.style.width = "35%";
    } else {
        sidebar.style.width = "100%";
        heading.classList.add("hidden");
    }
}

function closeNav() {
    const sidebar = document.getElementById("sidebar");
    const heading = document.querySelector("#heading");
    sidebar.style.width = "0";
    heading.classList.remove("hidden");
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    updateRealTime();
});

animfooter = () => {
    const footerElements = document.querySelectorAll("#footer h1 span");
    const footer = document.querySelector("#footer");
    
    // Only run animation if footer and spans exist
    if (footer && footerElements.length > 0) {
        gsap.from("#footer h1 span", {
            y: -100,
            stagger: .25,
            opacity: 0,
            duration: .8,
            // delay: 1,
            scrollTrigger: {
                trigger: "#footer",
                scroller: "#main",
                start: "top 90%",
                end: "top 80%",
                // markers: true,
                scrub: 2,
            }
        })
    }
}
animfooter()

form = () => {
    document.addEventListener("DOMContentLoaded", function () {
        // Form elements animation
        const formElements = document.querySelectorAll(
            "form input, form textarea",
        );

        formElements.forEach((element) => {
            element.addEventListener("focus", function () {
                this.parentElement.classList.add("scale-105");
                this.classList.add("bg-gray-50");
            });

            element.addEventListener("blur", function () {
                this.parentElement.classList.remove("scale-105");
                this.classList.remove("bg-gray-50");
            });
        });

        // Check if required elements exist before creating ScrollTrigger
        const formSection = document.querySelector("#form-section");
        const contactSection = document.querySelector("#contact");
        
        if (formSection && contactSection) {
            // Wait a bit to ensure the LocomotiveScroll instance is fully initialized
            setTimeout(() => {
                // Create the pinning effect compatible with Locomotive Scroll
                ScrollTrigger.create({
                    trigger: "#form-section",
                    scroller: "#main",  // This is important - use the LocomotiveScroll container
                    start: "top 20%",
                    endTrigger: "#contact",
                    end: "top 20%", // Changed from "top bottom" to "center bottom" to extend pinning
                    pin: true,
                    // pinSpacing: true,
                    markers: true
                });

                // Refresh ScrollTrigger to ensure everything is set up correctly
                ScrollTrigger.refresh();
            }, 1000);
        } else {
            console.log("Form section or contact section not found, skipping ScrollTrigger setup");
        }
    });

}
// form();