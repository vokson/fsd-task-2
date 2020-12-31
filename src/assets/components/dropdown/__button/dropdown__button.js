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

    // Обновление текста
    const menu = row.parentElement;
    const dropdown = menu.parentElement;

    const valuesItems = dropdown.getElementsByClassName('dropdown__item-value');
    let values = [];
    Array.from(valuesItems).forEach((item) => {
      values.push(parseInt(item.innerHTML));
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

    let description = [];

    if (dropdown.classList.contains('dropdown_theme_room')) {
      const functions = [bedroom, bed, bathroom];

      for (let i = 0; i < 3; i++) {
        if (values[i] > 0) {
          description.push(values[i] + ' ' + functions[i](values[i]));
        }
      }

      description = (description.length > 0)
        ? description.join(', ')
        : 'Сделайте выбор ...';
    }

    const field = dropdown.getElementsByClassName('dropdown__field')[0];
    field.setAttribute('value', description);
  };
});
