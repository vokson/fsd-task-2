import noUiSlider from 'nouislider';

const lines = document.getElementsByClassName('slider__line');

Array.from(lines).forEach((line) => {
  noUiSlider.create(line, {
    start: [5000, 10000],
    connect: true,
    range: {
      min: [0, 5000],
      '31%': [5000, 5000],
      '63%': [10000, 10000],
      max: [20000],
    }
  });

  line.noUiSlider.on('update', (values) => {
    const slider = line.parentElement.parentElement;
    const range = slider.getElementsByClassName('slider__range')[0];
    const convert = (value) => {
      return new Intl.NumberFormat('ru-RU', {minimumFractionDigits: 0}).format(value);
    }

    range.innerHTML = convert(values[0]) + '₽ - ' + convert(values[1]) + '₽';
    
  });

});
