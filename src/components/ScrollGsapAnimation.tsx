import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const ScrollGsapAnimation = () =>{

    useEffect(() => {
        gsap.to(".b", {
            scrollTrigger: {
                trigger: ".b",
                start: "top 80px",
                end: "top 80%",
                // end: "bottom 80%",
                scrub: 1,
                // pin: true,
                markers: true,
                toggleActions: "restart pause reverse pause",
            },
            x: 400,
            rotation: 360,
            duration: 3,
        });

        // gsap.to(".ghost", {
        //     scrollTrigger: {
        //         trigger: ".b",
        //         start: "top 80%",
        //         end: "top 100px",
        //         // end: "bottom 80%",
        //         scrub: 1,
        //         pin: true,
        //         markers: true,
        //         toggleActions: "restart pause reverse pause",
        //     },
        //     x: 400,
        //     rotation: 360,
        //     duration: 3,
        // });
    
    }, []);

    return (
        <div className="flex flex-col flex-direction gap-[620px] justify-between mt-[200px] ml-[30px]">
            <div className="a text-2xl w-30 h-30 text-black bg-white">a</div>
            <div className="b text-2xl w-30 h-30  text-black bg-yellow-300">b</div>
            <div className="c text-2xl w-30 h-30  text-black bg-pink-500">c</div>
        </div>
    )
}

export default ScrollGsapAnimation;