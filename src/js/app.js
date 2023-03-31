document.addEventListener('DOMContentLoaded', function (){
    iniciarApp();
});

function iniciarApp () {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija () {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function () {
        console.log()
        if (sobreFestival.getBoundingClientRect().bottom < 0){ 
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }


/*      // DETECTAR SI PASAMOS O NO EL ELEMENTO CON EL SCROLL   
        if (sobreFestival.getBoundingClientRect().top < 0){ 
            console.log('Ya pasamos el elemento')
        }else {
            console.log('Aun no');
        } */
    });
}

function scrollNav () { /* Efecto scroll */
    const enlaces = document.querySelectorAll('.navegacion-principal');

    enlaces.forEach( enlace => {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();/* Previene el comportamiento por defecto */
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });
}

function crearGaleria () {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        const ruta_imagen = i;
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${ruta_imagen}.avif" type="image/avif">
            <source srcset="build/img/thumb/${ruta_imagen}.webp" type="image/webp">
            <img width="200" height="300" loading="lazy" src="build/img/thumb/${ruta_imagen}.jpg" alt="Imagen Galeria">
        `;
        imagen.onclick = function () {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen)
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    const ruta_imagen = id;
    imagen.innerHTML = `
        <source srcset="build/img/grande/${ruta_imagen}.avif" type="image/avif">
        <source srcset="build/img/grande/${ruta_imagen}.webp" type="image/webp">
        <img width="200" height="300" loading="lazy" src="build/img/grande/${ruta_imagen}.jpg" alt="Imagen Galeria">
    `;

    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        overlay.remove(); //Elimina el overlay
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
    }

    //Boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar')
    cerrarModal.onclick = function () {
        overlay.remove(); //Elimina el overlay
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
    }

    overlay.appendChild(cerrarModal)

    //Añade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay)

    body.classList.add('fijar-body')
    body.classList.add('fijar-body'); // Añade la clase  fijar body para detener el scroll
}