import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Corrected import
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const ScrollGsapAnimation = () =>{

    useEffect(() => {
        gsap.to(".a", {
           scrollTrigger: {
            trigger: ".a",
            toggleActions: "restart pause reverse pause"
           },
           x: 400,
           rotation: 360,
           duration: 3
        })
    }, [])

    return (
        <div className="flex flex-col flex-direction gap-[300px] justify-between mt-[200px] ml-[300px]">
            <div className="a text-2xl w-30 h-30 text-black bg-white">a</div>
            <div className="b text-2xl w-30 h-30  text-black bg-yellow-300">b</div>
            <div className="c text-2xl w-30 h-30  text-black bg-pink-500">c</div>
        </div>
    )
}

export default ScrollGsapAnimation;