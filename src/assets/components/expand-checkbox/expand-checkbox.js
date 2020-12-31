const buttons = document.getElementsByClassName('expand-checkbox__button');

Array.from(buttons).forEach((e) => {
    
    e.onclick = () => {
      let expandCheckbox = e.parentElement.parentElement;
      expandCheckbox.classList.toggle('expand-checkbox_expanded');
    };
});