let e=null;const t=document.body,a=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");a.addEventListener("click",(()=>{a.disabled=!0,e=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),d.addEventListener("click",(()=>{clearInterval(e),a.disabled=!1}));
//# sourceMappingURL=01-color-switcher.2f8f6b1e.js.map
