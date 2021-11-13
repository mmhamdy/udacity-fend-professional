/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navBar = document.getElementById('navbar__list');
const links = document.getElementsByTagName('a');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createListElement(linkedSection){
    const listElement = document.createElement('li');
    const htmlString = `<a href='#${linkedSection.id}' class='${linkedSection.id}'>${linkedSection.getAttribute('data-nav')}</a>`;
    listElement.innerHTML = htmlString;
    return listElement;
};


function checkActive(box, link){
    if (box.top <= 150 && box.bottom >= 150){
        link.setAttribute('class', 'active');
        document.querySelector(link.getAttribute('href')).setAttribute('class', 'your-active-class');
    }else {
        link.removeAttribute('class');
        document.querySelector(link.getAttribute('href')).removeAttribute('class');
    }
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBar(){
    const fragment = document.createDocumentFragment();
    for(const section of sections){
        fragment.appendChild(
            createListElement(section)
        );
    }
    navBar.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
function makeActive(){
    for(const link of links){
        const box = document.querySelector(link.getAttribute('href')).getBoundingClientRect();
        checkActive(box, link);    
    }
};

// Scroll to anchor ID using scrollTO event
function scrolling(target){
    target.scrollIntoView({behavior: 'smooth'});
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavBar());

// Scroll to section on link click
for(const link of links){
    link.addEventListener(
        'click',
        (e) =>{
            e.preventDefault();
            scrolling(document.querySelector(link.getAttribute('href')));
        }
    )
};
    
// Set sections as active
document.addEventListener('scroll', ()=> {
    makeActive();
});

