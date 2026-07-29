import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import doctorImage from "../images/personal-approach.webp";


const points = [
  "Detailed evaluation of each joint before recommending surgery",

  "Evidence-based treatment planning for long-term outcomes",

  "Clear, honest guidance through conservative care, surgery, and recovery",

  "Focus on restoring movement and quality of life",

  "Patient education and step-by-step guidance through recovery, so decisions are informed and confident",
];



const PersonalApproach = () => {


const sectionRef = useRef(null);


useLayoutEffect(()=>{


gsap.registerPlugin(ScrollTrigger);


const ctx = gsap.context(()=>{


const points =
document.querySelectorAll(
".approach-point"
);



const dots =
document.querySelectorAll(
".approach-dot"
);



const tl = gsap.timeline({

  scrollTrigger: {

    trigger: sectionRef.current,

    start: "top 70%",

    end: "bottom 40%",

    toggleActions: "play none none reverse",

  }

});


points.forEach((point, index) => {


  tl.to(point, {

    opacity: 1,

    y: 0,

    duration: 1,

    ease: "power4.out",
    delay:"-0.75",


    onStart: () => {

      dots[index].classList.add("active");

      point.classList.add("active");

    },


    onReverseComplete: () => {

      dots[index].classList.remove("active");

      point.classList.remove("active");

    }


  })

  .to({}, {

    duration: 0.45

  });


});


points.forEach((point,index)=>{


tl.to(point,{

opacity:1,

y:0,

duration:.2,

ease:"power3.out",


onStart:()=>{


dots[index]
.classList.add("active");


point.classList.add(
"active"
);


},


onReverseComplete:()=>{


dots[index]
.classList.remove(
"active"
);


point.classList.remove(
"active"
);


}

})


.to(
{},
{
duration:.10
}
);



});



},sectionRef);



return ()=>ctx.revert();


},[]);



return (


<section
className="personal-approach"
ref={sectionRef}
>


<div className="container">


<div className="personal-grid">



{/* IMAGE */}


<div className="personal-image">


<img

src={doctorImage}

alt="Personal approach"

/>


</div>





{/* CONTENT */}


<div className="personal-content">


<h2>
Personal Approach
</h2>



<div className="approach-list">


<div className="timeline-line"></div>



{
points.map(
(item,index)=>(


<div

className="approach-point"

key={index}

>


<span
className="approach-dot"
/>



<p>
{item}
</p>


</div>


))
}



</div>


</div>



</div>


</div>


</section>


)

};


export default PersonalApproach;