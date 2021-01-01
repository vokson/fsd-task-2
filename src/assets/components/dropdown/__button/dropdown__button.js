const buttons = document.getElementsByClassName('dropdown__button');

Array.from(buttons).forEach((e) => {
  e.onclick = () => {
    let addition = 0;

    if (e.classList.contains('dropdown__button_substract')) {
      addition = -1;
    }

    if (e.classList.contains('dropdown__button_add')) {
      addition = 1;
    }

    const row = e.parentElement;
    const item = row.getElementsByClassName('dropdown__item-value')[0];

    let value = parseInt(item.innerHTML) + addition;
    value = Math.max(0, value);
    item.innerHTML = String(value);

    const substractButton = row.getElementsByClassName(
      'dropdown__button_substract'
    )[0];
    value == 0
      ? substractButton.classList.add('dropdown__button_disabled')
      : substractButton.classList.remove('dropdown__button_disabled');
    }
    
  
});
