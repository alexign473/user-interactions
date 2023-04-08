const $menu = document.querySelector('.menu');
const $menuBtn = document.querySelector('.menu-btn');
const $closeBtn = document.querySelector('.closebtn');

// MENU
$closeBtn.addEventListener('click', () => {
  $menu.classList.remove('open');
});

$menuBtn.addEventListener('click', () => {
  $menu.classList.toggle('open');
});

// DROPDOWNS
const hideDropdowns = () => {
  const $lists = document.querySelectorAll('.dropdown-list');
  $lists.forEach((list) => list.classList.remove('open'));
};

const $dropdowns = document.querySelectorAll('[data-dropdown]');

$dropdowns.forEach(($dropdown) =>
  $dropdown.addEventListener('click', (e) => {
    const $list = e.target.nextElementSibling;
    // check if it was already open
    const wasOpen = $list.classList.contains('open');
    // hide all lists
    hideDropdowns();
    // toggle selected
    if (!wasOpen) {
      $list.classList.add('open');
    }
  })
);

document.addEventListener('click', (e) => {
  // If clicked outside dropdown, hide lists
  if (
    !e.target.matches('[data-dropdown]') &&
    !e.target.matches('.dropdown a')
  ) {
    hideDropdowns();
  }
});

// SLIDER
const $track = document.querySelector('.track');
const slides = [...$track.children];
const $nextBtn = document.querySelector('.next');
const $prevBtn = document.querySelector('.prev');
const $dotsNav = document.querySelector('.slider-nav');
const $dots = [...$dotsNav.children];

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

const moveToSlide = ($track, $currentSlide, $targetSlide) => {
  $track.style.transform = `translateX(-${$targetSlide.style.left})`;
  $currentSlide.classList.remove('current-slide');
  $targetSlide.classList.add('current-slide');
};

const updateDots = ($currentDot, $targetDot) => {
  $currentDot.classList.remove('current-slide');
  $targetDot.classList.add('current-slide');
};

// On click prev, move slides to left
$prevBtn.addEventListener('click', (e) => {
  const $currentSlide = $track.querySelector('.current-slide');
  const $prevSlide = $currentSlide.previousElementSibling;
  const $currentDot = $dotsNav.querySelector('.current-slide');
  const $prevDot = $currentDot.previousElementSibling;
  // move to prev slide
  moveToSlide($track, $currentSlide, $prevSlide);
  updateDots($currentDot, $prevDot);
});

// On click next, move slides to right
$nextBtn.addEventListener('click', (e) => {
  const $currentSlide = $track.querySelector('.current-slide');
  const $nextSlide = $currentSlide.nextElementSibling;
  const $currentDot = $dotsNav.querySelector('.current-slide');
  const $nextDot = $currentDot.nextElementSibling;
  // move to next slide
  moveToSlide($track, $currentSlide, $nextSlide);
  updateDots($currentDot, $nextDot);
});

// On click nav dot, move to that slide
$dotsNav.addEventListener('click', (e) => {
  const $targetDot = e.target.closest('button');
  if (!$targetDot) return;

  const $currentSlide = $track.querySelector('.current-slide');
  const $currentDot = $dotsNav.querySelector('.current-slide');
  const targetIndex = $dots.findIndex((dot) => dot === $targetDot);
  const $targetSlide = slides[targetIndex];
  moveToSlide($track, $currentSlide, $targetSlide);
  updateDots($currentDot, $targetDot);
});
