const hamburguer = document.getElementById('hamburguer');
const asideBar = document.getElementById('aside');
const x = document.getElementById('close');



x.addEventListener('click', () => {
    asideBar.classList.remove('show');

})

hamburguer.addEventListener('click', () => {
    asideBar.classList.toggle('show');

})