const buttons = document.getElementsByClassName('button');

Array.from(buttons).forEach((e) => {
  if (e.classList.contains('button_mode_like')) {
    e.onclick = () => {
      e.classList.toggle('button_active');
      const icons = e.getElementsByClassName('button__icon');

      Array.from(icons).forEach((e) => {
        e.classList.toggle('button__icon_active');
      });
    };
  }
});
