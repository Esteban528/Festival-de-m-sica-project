"mode = strict"
const { src, dest, watch, parallel} = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require("cssnano");
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');

//Variables
const fileSCSS = 'src/scss/**/*.scss';
const fileJS = 'src/js/**/*.js';

// Javascript
const terser = require('gulp-terser-js')

function css (done) { // Compila el css
    src(fileSCSS)// Identificar el archivo SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())// Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()])) // Esto comprime el codigo css haciendolo mas ligero
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"))// Almacenarla en el disco duro

    done(); // Callback que avisa a gulp cuando llegamos al final
}

function versionWebp (done) { /* Convierte imagenes a webp */
    const opciones = {
        quality:50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionAvif (done) { /* Convierte imagenes a webp */
    const opciones = {
        quality:50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function imagenes (done) { /* Optimiza las imagenes y las exporta optimizadas*/
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe(dest('build/img'))
    done();
}

function javascript (done) {
    src(fileJS)
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
    done();
}

function dev(done) { //Nos actualiza el proyecto
    watch(fileSCSS, css)
    watch(fileJS, javascript)

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp,versionAvif,dev);
