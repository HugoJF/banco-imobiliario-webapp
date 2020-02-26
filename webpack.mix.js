const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .postCss('resources/css/tailwind.css', 'public/css', [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
    ])
    .react('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
