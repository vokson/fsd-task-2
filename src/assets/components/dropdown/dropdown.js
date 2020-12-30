import './__button/dropdown__button.js';

const buttons = document.getElementsByClassName('dropdown__icon');

Array.from(buttons).forEach((e) => {
    
    e.onclick = () => {
      let dropdown = e.parentElement.parentElement;
      dropdown.classList.toggle('dropdown_expanded');
    };
});
