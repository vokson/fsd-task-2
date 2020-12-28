import $ from 'jquery';

$('.like-button').on('click', function () {
  this.classList
  $('.radio__native[name=' + this.name + ']').each((index, elem) => {
    const parentClasses = elem.parentNode.parentNode.classList;
    elem.checked
      ? parentClasses.add('radio_checked')
      : parentClasses.remove('radio_checked');
  });
});