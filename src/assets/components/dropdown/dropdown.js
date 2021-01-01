const buttons = document.getElementsByClassName('dropdown__icon');

Array.from(buttons).forEach((e) => {
  e.onclick = () => {
    let dropdown = e.parentElement.parentElement;
    dropdown.classList.toggle('dropdown_expanded');
  };
});

const bed = (count) => {
  if (count == 1) {
    return 'кровать';
  } else if (count <= 4) {
    return 'кровати';
  } else if (count <= 20) {
    return 'кроватей';
  }
};

const bedroom = (count) => {
  if (count == 1) {
    return 'спальня';
  } else if (count <= 4) {
    return 'спальни';
  } else if (count <= 20) {
    return 'спален';
  }
};

const bathroom = (count) => {
  if (count == 1) {
    return 'ванная комната';
  } else if (count <= 4) {
    return 'ванные комнаты';
  } else if (count <= 20) {
    return 'ванных комнат';
  }
};

const guest = (count) => {
  if (count == 1) {
    return 'гость';
  } else if (count <= 4) {
    return 'гостя';
  } else if (count <= 20) {
    return 'гостей';
  }
};

const onValueChange = (itemValueElement) => {
  const row = itemValueElement.parentElement;
  const menu = row.parentElement;
  const dropdown = menu.parentElement;

  const valuesItems = dropdown.getElementsByClassName('dropdown__item-value');
  let values = [];
  Array.from(valuesItems).forEach((item) => {
    values.push(parseInt(item.innerHTML));
  });

  let description = [];

  if (dropdown.classList.contains('dropdown_theme_room')) {
    const functions = [bedroom, bed, bathroom];

    for (let i = 0; i < 3; i++) {
      if (values[i] > 0) {
        description.push(values[i] + ' ' + functions[i](values[i]));
      }
    }

    description =
      description.length > 0 ? description.join(', ') : 'Сделайте выбор..';
  }

  if (dropdown.classList.contains('dropdown_theme_guest')) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = values.reduce(reducer);
    description = sum > 0 ? sum + ' ' + guest(sum) : 'Сколько гостей';
  }

  const field = dropdown.getElementsByClassName('dropdown__field')[0];
  field.setAttribute('value', description);
};


const observer = new MutationObserver((e) => {
  onValueChange(e[0].target);
});


const values = document.getElementsByClassName('dropdown__item-value');
Array.from(values).forEach((itemValueElement) => {
  observer.observe(itemValueElement, { subtree: true, childList: true });
});

Array.from(values).forEach((itemValue) => {
  onValueChange(itemValue);
});

import './__button/dropdown__button.js';
import './__clean-button/dropdown__clean-button.js';
