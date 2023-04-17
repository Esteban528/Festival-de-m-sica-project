document.addEventListener('DOMContentLoaded', function (){
    iniciarApp();
}); // Esto inicia el funcionamiento solo cuando ha cargado todo. Para no hacer la carga tan pesada

function iniciarApp () { // Esta funcion activa las demás funciones 
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija () { // Funcion de aparecer la barra de navegacion cuando llegamos a cierta parte
    const barra = document.querySelector('.header'); // Selector del header
    const sobreFestival = document.querySelector('.sobre-festival'); // Selecciona la seccion de informacion sobre el festival
    const body = document.querySelector('body'); // Selecciona el body

    window.addEventListener('scroll', function () { //Cuando demos scroll se activará este código

        if (sobreFestival.getBoundingClientRect().bottom < 0){  //arroja un valor de una posición de un elemento, si el lado inferior de este elemento es igual a 0, nos pondrá las clases que fijaran el menú de navegación en la pantalla
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else { // Si no se cumple la validación de arriba el efecto de navegación fija será removido
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }

// Utilidad disponible
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
            const seccionScroll = e.target.attributes.href.value; //Obtienes el valor de un atributo fijado a un elemento
            const seccion = document.querySelector(seccionScroll); //Selecciona el elemento extraido de la variable
            seccion.scrollIntoView({behavior: 'smooth'}); //Realiza el scroll suave
        });
    });
}

function crearGaleria () { /* Funcion de la galeria */
    const galeria = document.querySelector('.galeria-imagenes'); // selecciona la galería desde el html

    for(let i = 1; i <= 12; i++) { //Crea un bucle en torno a la cantidad de imágenes que existen
        const imagen = document.createElement('picture'); //Crea un elemento donde se asignará la imagen
        const ruta_imagen = i;
        imagen.innerHTML = ` 
            <source srcset="build/img/thumb/${ruta_imagen}.avif" type="image/avif">
            <source srcset="build/img/thumb/${ruta_imagen}.webp" type="image/webp">
            <img width="200" height="300" loading="lazy" src="build/img/thumb/${ruta_imagen}.jpg" alt="Imagen Galeria">
        `; // Agrega los elementos HTML con el nombre de la ruta y compatibles con varios formatos
        imagen.onclick = function () { // Agrega el evento onclick  a cada imagen
            mostrarImagen(i); // Cuando este evento se active llamará la funcion mostrarImagen()
        }
        galeria.appendChild(imagen) // Finalmente Agrega el elemento imagen al HTML real
    }
}

function mostrarImagen(id) { /* Funcion de mostrar la imagen grande */
    const imagen = document.createElement('picture'); // Crea un elemento picture donde se mostrará la imagen
    const ruta_imagen = id; //Se selecciona la ruta donde se guardará la imagen
    imagen.innerHTML = `
        <source srcset="build/img/grande/${ruta_imagen}.avif" type="image/avif">
        <source srcset="build/img/grande/${ruta_imagen}.webp" type="image/webp">
        <img width="200" height="300" loading="lazy" src="build/img/grande/${ruta_imagen}.jpg" alt="Imagen Galeria">
    `;// Agrega los elementos HTML con el nombre de la ruta y compatibles con varios formatos

    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV'); // Crea un elemento DIV
    overlay.appendChild(imagen); // Agrega la imagen al HTML
    overlay.classList.add('overlay'); // Añade la clase 'overlay' que va a oscurecer el fondo
    overlay.onclick = function () { // Funcion de al dar clic fuera vuelve todo a la normalidad
        overlay.remove(); //Elimina el overlay
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
    }

    //Boton para cerrar el modal
    const cerrarModal = document.createElement('P'); // Crea un elemento
    cerrarModal.textContent = 'X'; // Texto del boton
    cerrarModal.classList.add('btn-cerrar') // Agrega la clase con sus estilos
    cerrarModal.onclick = function () {// Funcion de al dar clic en el boton vuelve todo a la normalidad
        overlay.remove(); //Elimina el overlay
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
    }

    overlay.appendChild(cerrarModal) // Agrega el boton al HTML

    //Añade al HTML
    const body = document.querySelector('body'); //Selecciona el body
    body.appendChild(overlay) // Añade el overlay
    body.classList.add('fijar-body'); // Añade la clase  fijar body para detener el scroll
}