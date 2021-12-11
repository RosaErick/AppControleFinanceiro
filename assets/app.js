const hamburguer = document.getElementById('hamburguer');
const asideBar = document.getElementById('aside');
const x = document.getElementById('close');



x.addEventListener('click', () => {
    asideBar.classList.remove('show');

})

hamburguer.addEventListener('click', () => {
    asideBar.classList.toggle('show');

})





function getInputValue() {
    
    let merchName = document.getElementById('name').value;
    let merchValue = document.getElementById('number').value;
    
    document.getElementById('merch').innerHTML = merchName;
    document.getElementById('value').innerHTML = "R$ " + merchValue;

 

}



