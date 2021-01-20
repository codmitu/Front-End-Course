// Loading circle animation with delay on form  animation (.left > form)
let loader = document.querySelector(".anim");
let loading = document.querySelector(".left");
loading.classList.add('js-loading');
window.addEventListener('load', function () {
    loader.parentElement.removeChild(loader);
    loading.classList.remove('js-loading');
});  