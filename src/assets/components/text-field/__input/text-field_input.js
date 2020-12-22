let textFieldInputsDateMask = document.getElementsByClassName(
  'text-field__input_date-mask'
);

Array.from(textFieldInputsDateMask).forEach((e) => {
  e.oninput = function () {
    console.log(e.selectionStart);
    e.value += '__.__._____';
  };
});