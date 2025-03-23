'use client';

import Image from "next/image";
import HoldingIphone from "../assets/images/iphone-hand.png"
import NewModel from "./Model";
const Jumbotron = () => {

    const handleLearnMore = () => {
       const element = document.querySelector(".sound-section");
       window.scrollTo({
        top: element?.getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth'
       })
    }   

    return (
        <div className="jumbotron-section wrapper"> 
            <h2 className="title">New</h2>
            <p className="text">Big and bigger.</p>
            <span className="description">
                From $41.62/mo. for 24 mo. or $999 before trade-in
            </span>
            <ul className="links">
               <li>
                 <button className="button">Buy</button>
               </li>
               <li>
                 <a className="link" onClick={handleLearnMore}>Learn more</a>
               </li>
            </ul>
            {/* <Image className="iphone-img" src={HoldingIphone} alt="iphone-hand"/> */}
            <NewModel />
        </div>
    )
}

export default Jumbotron;