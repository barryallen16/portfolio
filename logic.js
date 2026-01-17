document.addEventListener("DOMContentLoaded", ()=>{
   const pixelsContainer = document.querySelector("#pixelated-container");

      for (let i = 0; i < 100; i++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel bg-[#0e0e0e]";
        pixelsContainer.appendChild(pixel);
      }

      const tl = gsap.timeline({});

      tl.to(".pixel", {
        opacity: 0,
        duration: 0.1,
        stagger: { amount: 1, from: "random" },
      });

      gsap.registerPlugin(ScrollTrigger);
      console.log("gsap registerd");
      // gsap.to(".des-dev", {
      //   scrollTrigger: {
      //     trigger: ".des-dev-container",
      //     start: "top 20%",
      //     end: "top 50%",
      //     triggerActions: "restart complete pause reset",
      
      //   },
      //   x: "0%",
      // });
      
      gsap.to(".des-dev", {
        scrollTrigger: {
          trigger: "#des-dev",
          start: "top 20%",
          end: "top 50%",
          triggerActions: "play reverse reset reset",
          markers: true,
          // markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20}
        }, // start animation when ".box" enters the viewport
        x: "0%",
        duration: 3,
      });
})
