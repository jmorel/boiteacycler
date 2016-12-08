(function () {
    'use strict';

    var navElement = document.getElementsByTagName('nav')[0];
    var navItemElements = document.querySelectorAll('nav a');

    if (!navElement) {
        return;
    }

    var i;
    var sectionElements = [];
    for (i = 0; i < navItemElements.length; i++) {
        var href = navItemElements[i].href;
        var sectionId = href.substring(href.indexOf('#') + 1, href.length);
        var sectionElement = document.getElementById(sectionId);
        sectionElements.push({
            element: sectionElement,
            navElement: navItemElements[i],
            id: sectionId,
            offsetTop: sectionElement.offsetTop
        });
    }
    
    var setCurrentNavItem = function (sectionElement) {
        for (i=0; i < sectionElements.length; i++) {
            sectionElements[i].navElement.classList.remove('active');
        }
        sectionElement.navElement.classList.add('active');
    };
    
    var updateNavBar = function () {
        if (window.scrollY === 0 && navElement.classList.contains('nav--wide')) {
            navElement.classList.remove('nav--wide');
        }
        if (window.scrollY > 0 && !navElement.classList.contains('nav-wide')) {
            navElement.classList.add('nav--wide');
        }

        for (i = sectionElements.length - 1; i >= 0; i--) {
            var sectionElement = sectionElements[i];
            if (sectionElement.offsetTop + 40 < window.innerHeight + window.scrollY) {
                setCurrentNavItem(sectionElement);
                break;
            }
        }
    };

    window.addEventListener('scroll', updateNavBar);
    
    updateNavBar();
}());
