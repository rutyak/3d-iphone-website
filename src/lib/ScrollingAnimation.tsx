// Assuming this is your ScrollingAnimation.js
import gsap from "gsap";

const scrollingAnimation = ({ position, target, onUpdate }: any) => {
    console.log("ScrollingAnimation called with:", position, target, onUpdate );

    const tl = gsap.timeline();

    tl.to(position, {
        x: 1.69,
        y: -0.20,
        z: -9.85,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
        onUpdate
    }).to(target, {
        x: -3.51,
        y: -3.99,
        z: -8.47,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
    }).to('.jumbotron-section', {
        opacity: 0,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
    }).to('.sound-section-content', {
        opacity: 1,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
    }).to(position, {
        x: -3.51,
        y: -3.99,
        z: -8.47,
        scrollTrigger: {
            trigger: ".display-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
        onUpdate
    }).to(target, {
        x: 5.92,
        y: 4.28,
        z: -1.08,
        scrollTrigger: {
            trigger: ".display-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
    })
};

export default scrollingAnimation;