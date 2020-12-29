const stars = document.getElementsByClassName('rate__star');

Array.from(stars).forEach((star) => {
  star.onclick = () => {
    const value = star.getAttribute('value');
    const rate = star.parentElement;
    rate.setAttribute('score', value);

    Array.from(rate.children).forEach((e) => {
      if (e.getAttribute('value') <= value) {
        e.classList.add('star_active');
      } else {
        e.classList.remove('star_active');
      }
    });
  };

});
