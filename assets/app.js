const hamburguer = document.getElementById('hamburguer');
const nav = document.getElementById('nav');
const navList = document.getElementById('nav-ul');


hamburguer.addEventListener('click', () => {
    navList.classList.toggle('show');
    nav.classList.toggle('show');

})