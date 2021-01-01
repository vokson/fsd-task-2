const buttons = document.getElementsByClassName('dropdown__clean-button');

Array.from(buttons).forEach((e) => {
  e.onclick = () => {
    const container = e.parentElement;
    const menu = container.parentElement;

    const valuesItems = menu.getElementsByClassName('dropdown__item-value');
    Array.from(valuesItems).forEach((e) => {
      e.innerHTML = 0;
    });
  };
});
