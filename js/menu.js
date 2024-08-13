(function(){
    const listElements = document.querySelectorAll('.menu__item--show');
    const list = document.querySelector('.menu__links');
    const menu = document.querySelector('.menu__hamburguer');
    const close = document.querySelector('.close_hamburguesa');

    const addClick = ()=>{
        listElements.forEach(element =>{
            element.addEventListener('click', ()=>{

                
                let subMenu = element.children[1];
                let height = 0;
                element.classList.toggle('menu__item--active');


                if(subMenu.clientHeight === 0){
                    height = subMenu.scrollHeight;
                }

                subMenu.style.height = `${height}px`;

            });
        });
    }

    const deleteStyleHeight = ()=>{
        listElements.forEach(element=>{

            if(element.children[1].getAttribute('style')){
                element.children[1].removeAttribute('style');
                element.classList.remove('menu__item--active');
            }

        });
    }


    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 800){
            deleteStyleHeight();
            if(list.classList.contains('menu__links--show'))
                list.classList.remove('menu__links--show');

        }else{
            addClick();
        }
    });

    if(window.innerWidth <= 800){
        addClick();
    }

    menu.addEventListener('click', ()=>{
        list.classList.toggle('menu__links--show')
        menu.style.display = 'none'
        close.style.display = 'inline'
    });

    close.addEventListener('click', ()=> {
        list.classList.toggle('menu__links--show')
        close.style.display = 'none'
        menu.style.display = 'inline'
    });



})();
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href="#"]');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });
});