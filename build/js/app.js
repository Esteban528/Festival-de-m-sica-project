function iniciarApp(){navegacionFija(),crearGaleria(),scrollNav()}function navegacionFija(){const e=document.querySelector(".header"),t=document.querySelector(".sobre-festival"),n=document.querySelector("body");window.addEventListener("scroll",(function(){console.log(),t.getBoundingClientRect().bottom<0?(e.classList.add("fijo"),n.classList.add("body-scroll")):(e.classList.remove("fijo"),n.classList.remove("body-scroll"))}))}function scrollNav(){document.querySelectorAll(".navegacion-principal").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault();e.target.attributes.href.value;document.querySelector(e.target.attributes.href.value).scrollIntoView({behavior:"smooth"})}))})}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let t=1;t<=12;t++){const n=document.createElement("picture"),i=t;n.innerHTML=`\n            <source srcset="build/img/thumb/${i}.avif" type="image/avif">\n            <source srcset="build/img/thumb/${i}.webp" type="image/webp">\n            <img width="200" height="300" loading="lazy" src="build/img/thumb/${i}.jpg" alt="Imagen Galeria">\n        `,n.onclick=function(){mostrarImagen(t)},e.appendChild(n)}}function mostrarImagen(e){const t=document.createElement("picture"),n=e;t.innerHTML=`\n        <source srcset="build/img/grande/${n}.avif" type="image/avif">\n        <source srcset="build/img/grande/${n}.webp" type="image/webp">\n        <img width="200" height="300" loading="lazy" src="build/img/grande/${n}.jpg" alt="Imagen Galeria">\n    `;const i=document.createElement("DIV");i.appendChild(t),i.classList.add("overlay"),i.onclick=function(){i.remove();document.querySelector("body").classList.remove("fijar-body")};const o=document.createElement("P");o.textContent="X",o.classList.add("btn-cerrar"),o.onclick=function(){i.remove();document.querySelector("body").classList.remove("fijar-body")},i.appendChild(o);const a=document.querySelector("body");a.appendChild(i),a.classList.add("fijar-body"),a.classList.add("fijar-body")}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));