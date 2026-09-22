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

/* Click-through Instagram-style viewer */
const viewer=document.querySelector(".viewer");
const viewerContent=document.querySelector(".viewer-content");
const closeViewer=document.querySelector(".viewer-close");
const nextViewer=document.querySelector(".viewer-next");
const prevViewer=document.querySelector(".viewer-prev");
const nextSide=document.querySelector(".viewer-next-side");
const backViewer=document.querySelector(".viewer-back");

const sections = {
  puzzle:{
    label:"THE PUZZLE",
    eyebrow:"// POST 01 · THE PUZZLE",
    title:"From <em>entertainer</em><br>to candidate.",
    quote:"What happens when fame meets the ballot box?",
    body:"Public visibility can open doors. But does it make someone a legitimate political actor? The project begins with the tension between entertainment, recognition and political authority."
  },
  question:{
    label:"RESEARCH QUESTION",
    eyebrow:"// POST 02 · MAIN QUESTION",
    title:"How do Kazakhstani people make sense of the political legitimacy of entertainer-background candidates from Respublica and ҚХП during the 2026 Quriltai elections?",
    body:"The question is deliberately interpretive: it asks how political legitimacy is understood and constructed rather than testing a predetermined causal relationship."
  },
  case:{
    label:"THE CASE",
    eyebrow:"// HIGHLIGHT · THE CASE",
    title:"Kazakhstan,<br>2026.",
    quote:"A focused context for studying visibility, party politics and non-traditional political backgrounds.",
    body:"The project narrows the broader phenomenon of celebrity politics to a specific electoral context: the 2026 Quriltai elections."
  },
  actors:{
    label:"KEY ACTORS",
    eyebrow:"// POST 04 · KEY ACTORS",
    title:"Two parties.<br><em>Different contexts.</em>",
    body:"The comparison centers on Respublica and ҚХП and examines how party-level messaging frames entertainer-background candidates.",
    list:[["RESPUBLICA","Positioning · candidate background · messaging"],["ҚХП","Positioning · candidate background · messaging"]]
  },
  theory:{
    label:"THE THEORY",
    eyebrow:"// HIGHLIGHT · THEORETICAL FRAMEWORK",
    title:"What does<br><em>legitimacy</em> mean?",
    body:"The conceptual lens connects visibility, credibility and representation to political legitimacy. An interpretivist approach treats these as meanings to be explored in context, not variables with assumed effects.",
    list:[["VISIBILITY","Being known by the public"],["CREDIBILITY","Being seen as capable and trustworthy"],["REPRESENTATION","Being seen as “one of us”"],["POLITICAL LEGITIMACY","How people make sense of a candidate’s right to hold power"]]
  },
  method:{
    label:"THE METHOD",
    eyebrow:"// HIGHLIGHT · RESEARCH PROCESS",
    title:"A qualitative,<br><em>interpretivist</em> approach.",
    body:"The research process moves from a bounded case to collection, interpretation and comparison.",
    list:[["01 · SELECT","Respublica + ҚХП"],["02 · COLLECT","Party statements, candidate biographies, campaign materials and relevant public discourse"],["03 · INTERPRET","Identify how legitimacy is constructed and understood"],["04 · COMPARE","Look for patterns across the two party contexts"],["05 · EXPLAIN","What these meanings reveal about entertainer-background candidates"]]
  },
  literature:{
    label:"LITERATURE",
    eyebrow:"// POST 07 · LITERATURE",
    title:"Three overlapping<br><em>debates.</em>",
    body:"Celebrity politics · political legitimacy · non-traditional candidates.",
    list:[["01","How public visibility can create political recognition."],["02","How legitimacy is constructed and perceived."],["03","Why and how outsiders enter politics."]]
  },
  why:{
    label:"WHY IT MATTERS",
    eyebrow:"// POST 08 · CONTRIBUTION",
    title:"More than<br>just <em>celebrities.</em>",
    body:"The project contributes to debates on celebrity politics, political legitimacy in non-Western contexts, and public meaning-making around non-traditional political actors."
  },
  timeline:{
    label:"NEXT STEPS",
    eyebrow:"// POST 09 · NEXT STEPS",
    title:"From proposal<br>to <em>research.</em>",
    list:[["NOW","Refine research design"],["2025–26","Data collection & analysis"],["2026","Findings and final paper"]]
  }
};

let currentKeys=Object.keys(sections);
let currentIndex=0;

function renderViewer(key){
  const s=sections[key];
  currentIndex=currentKeys.indexOf(key);
  viewerContent.innerHTML=`
    <span class="eyebrow">${s.eyebrow}</span>
    <h2>${s.title}</h2>
    ${s.quote?`<div class="viewer-quote">“${s.quote}”</div>`:""}
    ${s.body?`<p>${s.body}</p>`:""}
    ${s.list?`<div class="viewer-list">${s.list.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>`:""}
  `;
  viewer.querySelector(".viewer-label").textContent=s.label;
  viewer.classList.remove("opening");
  void viewer.offsetWidth;
  viewer.classList.add("opening");
  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden","false");
}

document.querySelectorAll("[data-open]").forEach(el=>{
  el.addEventListener("click",()=>renderViewer(el.dataset.open));
});

function close(){viewer.classList.remove("open");viewer.setAttribute("aria-hidden","true")}
closeViewer.addEventListener("click",close);
backViewer.addEventListener("click",close);
viewer.addEventListener("click",e=>{if(e.target===viewer)close()});

function next(){
  currentIndex=(currentIndex+1)%currentKeys.length;
  renderViewer(currentKeys[currentIndex]);
}
function prev(){
  currentIndex=(currentIndex-1+currentKeys.length)%currentKeys.length;
  renderViewer(currentKeys[currentIndex]);
}
nextViewer.addEventListener("click",next);
nextSide.addEventListener("click",next);
prevViewer.addEventListener("click",prev);
document.addEventListener("keydown",e=>{
  if(!viewer.classList.contains("open")) return;
  if(e.key==="Escape") close();
  if(e.key==="ArrowRight") next();
  if(e.key==="ArrowLeft") prev();
});
