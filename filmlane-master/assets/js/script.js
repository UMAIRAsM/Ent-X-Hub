'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});








/*search box*/
// Get the search button and search box elements
const searchButton = document.getElementById("search-button");
const searchBox = document.getElementById("search-box");

// Add a click event listener to the search button
searchButton.addEventListener("click", function() {
  // Toggle the visibility of the search box
  if (searchBox.style.display === "none" || !searchBox.style.display) {
    searchBox.style.display = "block";
  } else {
    searchBox.style.display = "none";
  }
});

// You can also add functionality to handle search submissions here
const searchSubmitButton = document.getElementById("search-submit-button");
searchSubmitButton.addEventListener("click", function() {
  const searchTerm = document.querySelector(".search-box input").value;
  // Perform the search using 'searchTerm' and take appropriate action
  // For this example, we're not implementing the search functionality itself.
});



// Initialize the main slider
const mainSlider = new Swiper('.main-slider', {
  loop: true, // Enable loop mode
  navigation: {
      nextEl: '.main-slider .swiper-button-next',
      prevEl: '.main-slider .swiper-button-prev',
  },
});

// Initialize the thumbnail slider
const thumbnailSlider = new Swiper('.thumbnail-slider', {
  spaceBetween: 10, // Adjust the spacing between thumbnails as needed
  slidesPerView: 3, // Number of thumbnails to show
  slideToClickedSlide: true,
});












// Master DOManipulator v2 ------------------------------------------------------------
const items = document.querySelectorAll('.slideshow-container .item'),
  controls = document.querySelectorAll('.slideshow-container .control'),
  headerItems = document.querySelectorAll('.slideshow-container .item-header'),
  descriptionItems = document.querySelectorAll('.slideshow-container .item-description'),
  activeDelay = .76,
  interval = 5000;

let current = 0;

const slider = {
  init: () => {
    controls.forEach(control => control.addEventListener('click', (e) => { slider.clickedControl(e) }));
    controls[current].classList.add('active');
    items[current].classList.add('active');
  },
  nextSlide: () => {
    slider.reset();
    if (current === items.length - 1) current = -1;
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: (e) => {
    slider.reset();
    clearInterval(intervalF);

    const control = e.target,
      dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach((item, index) => {
      if (index === dataIndex) {
        item.classList.add('active');
      }
    })
    current = dataIndex;
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval);
  },
  reset: () => {
    items.forEach(item => item.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
  },
  transitionDelay: (items) => {
    let seconds;

    items.forEach(item => {
      const children = item.childNodes;
      let count = 1,
        delay;

      item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

      children.forEach(child => {
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = `${delay}s`;
          count++;
        }
      })
    })
  },
}

let intervalF = setInterval(slider.nextSlide, interval);
slider.init();
