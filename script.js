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
function hideDropdowns() {
  const $lists = document.querySelectorAll('.dropdown-list');
  $lists.forEach((list) => list.classList.remove('open'));
}

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
