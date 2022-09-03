import gsap from 'gsap';

function remove(selector){
    gsap.to(selector, {x: 20})
}

export default remove