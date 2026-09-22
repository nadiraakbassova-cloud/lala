const pages=[...document.querySelectorAll(".page")];
const dots=document.querySelector(".dots");
pages.forEach((p,i)=>{
  const b=document.createElement("button");
  b.setAttribute("aria-label",`Go to page ${i+1}`);
  b.onclick=()=>p.scrollIntoView({behavior:"smooth"});
  dots.appendChild(b);
});
const buttons=[...dots.children];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const i=pages.indexOf(e.target);
      buttons.forEach((b,j)=>b.classList.toggle("active",j===i));
    }
  });
},{threshold:.55});
pages.forEach(p=>observer.observe(p));
buttons[0]?.classList.add("active");
