import{o as y,r as m,Q as f}from"./index-DyhMd5_v.js";function D(){const{user:s}=y(),t=m.useCallback(async n=>{try{await f.from("audit_logs").insert({user_id:(s==null?void 0:s.id)||null,module:"security_enforcement",action:`violation_${n.type}`,meta_json:{violation_type:n.type,timestamp:n.timestamp.toISOString(),details:n.details,user_agent:navigator.userAgent}})}catch(r){console.error("Failed to log security violation:",r)}},[s]);m.useEffect(()=>{const n=e=>(e.preventDefault(),t({type:"copy",timestamp:new Date}),!1),r=e=>(e.preventDefault(),t({type:"paste",timestamp:new Date}),!1),o=e=>(e.preventDefault(),t({type:"copy",timestamp:new Date,details:"cut attempt"}),!1),i=e=>(e.preventDefault(),t({type:"contextmenu",timestamp:new Date}),!1),c=e=>{if(e.ctrlKey||e.metaKey){if(["c","v","x","a"].includes(e.key.toLowerCase()))return e.preventDefault(),t({type:"copy",timestamp:new Date,details:`Ctrl+${e.key}`}),!1;if(e.key.toLowerCase()==="p")return e.preventDefault(),t({type:"print",timestamp:new Date}),!1;if(e.key.toLowerCase()==="s")return e.preventDefault(),!1;if(e.shiftKey&&["i","j","c"].includes(e.key.toLowerCase()))return e.preventDefault(),t({type:"devtools",timestamp:new Date,details:`Ctrl+Shift+${e.key}`}),!1}if(e.key==="F12")return e.preventDefault(),t({type:"devtools",timestamp:new Date,details:"F12"}),!1;if(e.key==="PrintScreen")return e.preventDefault(),t({type:"screenshot",timestamp:new Date}),!1},u=()=>{document.visibilityState==="hidden"&&t({type:"screenshot",timestamp:new Date,details:"Tab switched - possible screenshot"})},l=e=>(e.preventDefault(),!1),d=e=>{const p=e.target;return["INPUT","TEXTAREA"].includes(p.tagName)?!0:(e.preventDefault(),!1)},a=document.createElement("style");return a.id="security-enforcement-styles",a.textContent=`
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      @media print {
        body { display: none !important; }
      }
    `,document.head.appendChild(a),document.addEventListener("copy",n),document.addEventListener("paste",r),document.addEventListener("cut",o),document.addEventListener("contextmenu",i),document.addEventListener("keydown",c),document.addEventListener("visibilitychange",u),document.addEventListener("dragstart",l),document.addEventListener("selectstart",d),()=>{document.removeEventListener("copy",n),document.removeEventListener("paste",r),document.removeEventListener("cut",o),document.removeEventListener("contextmenu",i),document.removeEventListener("keydown",c),document.removeEventListener("visibilitychange",u),document.removeEventListener("dragstart",l),document.removeEventListener("selectstart",d);const e=document.getElementById("security-enforcement-styles");e&&e.remove()}},[t])}export{D as u};
