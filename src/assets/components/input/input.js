let inputsDateMask = document.getElementsByClassName(
  'input_date-mask'
);

Array.from(inputsDateMask).forEach((e) => {
  e.oninput = function () {
    const mask = 'ДДММГГГГ';
    let cursorPosition = e.selectionStart;
    let text = e.value.match(/\d/g);

    if (text === null) {
      e.value = '';
      return;
    }

    text = text.join('').substring(0, 8);
    text = text.concat(mask.substring(text.length));

    e.value =
      text.substring(0, 2) +
      '.' +
      text.substring(2, 4) +
      '.' +
      text.substring(4, 8);

    if (cursorPosition == 2 || cursorPosition == 5) {
      cursorPosition += 1;
    }
    e.selectionStart = cursorPosition;
    e.selectionEnd = cursorPosition;
  };
});
