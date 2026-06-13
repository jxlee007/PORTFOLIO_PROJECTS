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
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
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
// ------------

dot = () =>{
    var pageContent = document.querySelector('.page-content')
var cursor = document.querySelector('#cursor')

pageContent.addEventListener('mousemove', function(dets){
    // console.log(dets.x)
// without gsap = no smooth flow 
//--------- str concat
    // cursor.style.left = dets.x+'px' 
    // cursor.style.top = dets.y+'px'
//--------- str templates
    // cursor.style.left = `${dets.x}px`
    // cursor.style.top = `${dets.y}px`

// with gsap = smooth flow
    gsap.to('#cursor',{
        x :dets.x,
        y: dets.y,
    })
})

// scaling of dot
pageContent.addEventListener('mouseenter', (dets)=>{
    gsap.to('#cursor',{
        scale: 1,
        opacity: 1
    })
})
pageContent.addEventListener('mouseleave', (dets)=>{
    gsap.to('#cursor',{
        scale: 0,
        opacity: 1,
    })
})

};
dot();
// ------------

animpage2 = () =>{
    gsap.from(".elem h1",{
        y: 120,
        stagger: 0.25,
        duration: 1,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 40%",
            end: "top 37%",
            // markers: "true",
            scrub: 2,
        }
    })
}
animpage2();
// ------------

swiper = () => {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
    });    
}
swiper();
// -------------

loader = () =>{
    var tl = gsap.timeline()

    tl.from('#loader h3',{
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: .3,
    })

    tl.to('#loader h3',{
        x: -200,
        stagger: .2,
        duration: .5,
        opacity: 0,
    })

    tl.to('#loader',{
        x: -200,
        duration: .3,
        opacity: 0,
        display: "none",
    })

    tl.from('nav', {
        x: 100,
        duration: .4,
    })

    tl.from(".page-content h1 span", {
        y: 100,
        opacity: 0,
        stagger: .1,
    })


}
loader();
// -------------

openNav = () =>{
    var menu = document.getElementById('menu');
    if (window.innerWidth <= 768) { // If the window's width is 768px or less
        menu.style.height = "100vh"; // Set the height to 100vh
    } else {
        menu.style.height = "70vh"; // Otherwise, set the height to 70vh
    }
    document.getElementById('menu').style.zIndex = "70";
    document.getElementById('menu').style.opacity = "1";

}

closeNav = () =>{
    document.getElementById('menu').style.height = "0";
    document.getElementById('menu').style.opacity = "0";
    document.getElementById('menu').style.zIndex = "0";
}

function updateH4TextOnResize() {
    var h4 = document.querySelector("#up h4");

    function checkWindowSize() {
        if (window.innerWidth <= 768) { // 768px is a common breakpoint for mobile screens
            h4.innerText = "X";
        } else {
            h4.innerText = "Close";
        }
    }

    // Call checkWindowSize at run time
    checkWindowSize();
    // Bind the event to the window
    window.addEventListener("resize", checkWindowSize);
}

// Call the function
updateH4TextOnResize();
// ---------------
animpage6 = () =>{
    gsap.from("footer h1 span",{
        y: -100,
        stagger: .25,
        opacity:0,
        duration: .8,
     // delay: 1,
        scrollTrigger: {
            trigger: "footer",
            scroller: "#main",
            start: "top 17%",
            end: "top 20%",
            // markers: "true",
            scrub: 2,
        }
    })
}
animpage6()
