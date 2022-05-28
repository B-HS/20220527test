window.addEventListener('DOMContentLoaded', event => {
    //로컬스트리지 검사해서 로그인+가입/로그아웃 메뉴 추가/제거
    const stg = window.localStorage
    if(stg.length!=0){
        for (i of document.body.querySelectorAll(".toggle1")){
            const line = `<h2>환영합니다 <span class="text-primary" id="name">${window.localStorage.getItem("name")}</span>님!`
            document.body.querySelector("#line").innerHTML= line
            i.remove()
        }
    }else{
        for (i of document.body.querySelectorAll(".toggle2")){
            i.remove()
            
        }
    }
    
    const sideNav = document.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});


