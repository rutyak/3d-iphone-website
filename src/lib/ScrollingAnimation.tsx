// Assuming this is your ScrollingAnimation.js
import gsap from "gsap";

const scrollingAnimation = ({ position, target, onUpdate }: any) => {
    console.log("ScrollingAnimation called with:", position, target, onUpdate );

    const tl = gsap.timeline();

    tl.to(position, {
        x: -3.38,
        y: -10.74,
        z: -5.93,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
        onUpdate: () => {
            console.log("Position updated:", position);
            onUpdate();
        },
    }).to(target, {
        x: 1.52,
        y: 0.77,
        z: -1.08,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
        onUpdate: () => {
            console.log("Target updated:", target);
            onUpdate();
        },
    });
};

export default scrollingAnimation;