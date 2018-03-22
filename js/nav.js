(function () {
    'use strict';

    var navElement = document.getElementsByTagName('nav')[0];
    var navItemElements = document.querySelectorAll('nav a');

    if (!navElement) {
        return;
    }

    var i;
    var sections = [];
    for (i = 0; i < navItemElements.length; i++) {
        var href = navItemElements[i].href;
        var sectionId = href.substring(href.indexOf('#') + 1, href.length);
        var sectionElement = document.getElementById(decodeURIComponent(sectionId));
        sections.push({
            element: sectionElement,
            navElement: navItemElements[i],
            id: sectionId
        });
    }

    var setCurrentNavItem = function (section) {
        for (i=0; i < sections.length; i++) {
            sections[i].navElement.classList.remove('active');
        }
        section.navElement.classList.add('active');
    };

    var updateNavBar = function () {
        if (window.scrollY === 0 && navElement.classList.contains('nav--wide')) {
            navElement.classList.remove('nav--wide');
        }
        if (window.scrollY > 0 && !navElement.classList.contains('nav-wide')) {
            navElement.classList.add('nav--wide');
        }

        for (i = sections.length - 1; i >= 0; i--) {
            var section = sections[i];
            if (section.element.offsetTop + 40 < window.innerHeight + window.scrollY) {
                setCurrentNavItem(section);
                break;
            }
        }
    };

    window.addEventListener('scroll', updateNavBar);

    updateNavBar();
}());
