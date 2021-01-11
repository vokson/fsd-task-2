import './__button-apply/calendar__button-apply.js';
import './__button-clean/calendar__button-clean.js';

export default function (calendarNode, inputNodes, options) {
  const getMonth = () => {
    return parseInt(calendarNode.getAttribute('month'));
  };

  const getYear = () => {
    return parseInt(calendarNode.getAttribute('year'));
  };

  const getMonthYear = (month, year, offset) => {
    const total = 12 * year + (month - 1) + offset;
    return {
      month: (total % 12) + 1,
      year: Math.floor(total / 12),
    };
  };

  const parseDate = (dateString) => {
    return new Date(
      Date.UTC(
        parseInt(dateString.substring(0, 4)),
        parseInt(dateString.substring(5, 7)) - 1,
        parseInt(dateString.substring(8))
      )
    );
  };

  const formatDate = (dateString) => {
    if (dateString === '') {
      return 'ДД.ММ.ГГГГ';
    }
    return (
      dateString.substring(8) +
      '.' +
      dateString.substring(5, 7) +
      '.' +
      dateString.substring(0, 4)
    );
  };

  const formatTwoDates = (dateString1, dateString2) => {
    const monthes = [
      'янв',
      'фев',
      'мар',
      'апр',
      'мая',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя',
      'дек'
    ];

    const date1 = parseDate(dateString1);
    const date2 = parseDate(dateString2);

    return (
      date1.getDate() +
      ' ' +
      monthes[date1.getMonth()] +
      ' - ' +
      date2.getDate() +
      ' ' +
      monthes[date2.getMonth()]
    );
  };

  const changeMonth = (offset) => {
    const result = getMonthYear(getMonth(), getYear(), offset);
    calendarNode.setAttribute('month', result.month);
    calendarNode.setAttribute('year', result.year);
  };

  const cleanClasses = (dayNodes) => {
    for (let i = 0; i < 42; i++) {
      dayNodes[i].classList.remove('calendar__day_not-required');
      dayNodes[i].classList.remove('calendar__day_in-this-month');
      dayNodes[i].classList.remove('calendar__day_current-day');
      dayNodes[i].classList.remove('calendar__day_start-day');
      dayNodes[i].classList.remove('calendar__day_end-day');
      dayNodes[i].classList.remove('calendar__day_edge-day');
      dayNodes[i].classList.remove('calendar__day_between-day');
    }
  };

  const setCurrentDate = (node, date, startDate, endDate, currentDate) => {
    if (
      date.getTime() === currentDate.getTime() &&
      (isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime()) ||
        date.getTime() < startDate.getTime() ||
        date.getTime() > endDate.getTime())
    ) {
      node.classList.add('calendar__day_current-day');
    }
  };

  const setRangeDates = (node, date, startDate, endDate) => {
    if (
      date.getTime() === startDate.getTime() ||
      date.getTime() === endDate.getTime()
    ) {
      node.classList.add('calendar__day_edge-day');
    }

    if (
      !isNaN(startDate.getTime()) &&
      !isNaN(startDate.getTime()) &&
      startDate.getTime() !== endDate.getTime()
    ) {
      if (
        date.getTime() > startDate.getTime() &&
        date.getTime() < endDate.getTime()
      ) {
        node.classList.add('calendar__day_between-day');
      }

      if (date.getTime() === startDate.getTime()) {
        node.classList.add('calendar__day_start-day');
      }

      if (date.getTime() === endDate.getTime()) {
        node.classList.add('calendar__day_end-day');
      }
    }
  };

  const setDateAttributes = (dayNodes, day) => {
    let currentDate = parseDate(calendarNode.getAttribute('current-date'));
    let startDate = parseDate(calendarNode.getAttribute('start-date'));
    let endDate = parseDate(calendarNode.getAttribute('end-date'));

    for (let i = 0; i < 42; i++) {
      dayNodes[i].setAttribute('date', day.toJSON().slice(0, 10));
      setCurrentDate(dayNodes[i], day, startDate, endDate, currentDate);
      setRangeDates(dayNodes[i], day, startDate, endDate);
      day.setDate(day.getDate() + 1);
    }
  };

  const printDayNumbers = (
    dayNodes,
    weekdayOfLastDay,
    daysInPrevMonth,
    daysInThisMonth
  ) => {
    for (let i = 1; i <= weekdayOfLastDay; i++) {
      dayNodes[i - 1].innerHTML = daysInPrevMonth - (weekdayOfLastDay - i);
    }

    for (let i = 1; i <= daysInThisMonth; i++) {
      dayNodes[weekdayOfLastDay + i - 1].innerHTML = i;
      dayNodes[weekdayOfLastDay + i - 1].classList.add(
        'calendar__day_in-this-month'
      );
    }

    let day = weekdayOfLastDay + daysInThisMonth;
    let i = 1;
    while (day < 42) {
      dayNodes[day].innerHTML = i;

      if (day > 34 && weekdayOfLastDay + daysInThisMonth <= 35) {
        dayNodes[day].classList.add('calendar__day_not-required');
      }

      day += 1;
      i += 1;
    }
  };

  const renderCaption = (month, year) => {
    const monthes = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    const caption = calendarNode.getElementsByClassName('calendar__caption')[0];
    caption.innerHTML = monthes[month - 1] + ' ' + year;
  };

  const renderDays = (month, year) => {
    const dayNodes = calendarNode.getElementsByClassName('calendar__day');

    const thisMonth = new Date(Date.UTC(year, month, 0));
    const daysInThisMonth = thisMonth.getDate();

    const prevMonthYear = getMonthYear(month, year, -1);
    const prevMonth = new Date(
      Date.UTC(prevMonthYear.year, prevMonthYear.month, 0)
    );
    const daysInPrevMonth = prevMonth.getDate();

    // 0 - Sunday, 6 - Saturday
    let weekdayOfLastDay = prevMonth.getDay();
    let calendarDay = new Date(prevMonth.getTime());
    calendarDay.setDate(calendarDay.getDate() - weekdayOfLastDay + 1);

    cleanClasses(dayNodes);
    printDayNumbers(
      dayNodes,
      weekdayOfLastDay,
      daysInPrevMonth,
      daysInThisMonth
    );
    setDateAttributes(dayNodes, calendarDay);
  };

  const renderInputs = () => {
    if (inputNodes.length == 1) {
      inputNodes[0].setAttribute(
        'value',
        formatTwoDates(
          calendarNode.getAttribute('start-date'),
          calendarNode.getAttribute('end-date')
        )
      );
    }

    if (inputNodes.length == 2) {
      inputNodes[0].setAttribute(
        'value',
        formatDate(calendarNode.getAttribute('start-date'))
      );
      inputNodes[1].setAttribute(
        'value',
        formatDate(calendarNode.getAttribute('end-date'))
      );
    }
  };

  const render = () => {
    const month = getMonth();
    const year = getYear();
    renderCaption(month, year);
    renderDays(month, year);
  };

  render();

  // Обработчики
  const nextMonthButton = calendarNode.getElementsByClassName(
    'calendar__next'
  )[0];
  const prevMonthButton = calendarNode.getElementsByClassName(
    'calendar__prev'
  )[0];
  const cleanButton = calendarNode.getElementsByClassName(
    'calendar__button-clean'
  )[0];
  const applyButton = calendarNode.getElementsByClassName(
    'calendar__button-apply'
  )[0];
  const dayNodes = calendarNode.getElementsByClassName('calendar__day');

  // Предыдущий месяц
  prevMonthButton.addEventListener('click', () => {
    changeMonth(-1);
    render();
  });

  // Следующий месяц
  nextMonthButton.addEventListener('click', () => {
    changeMonth(1);
    render();
  });

  // Кнопка Очистить
  cleanButton.addEventListener('click', () => {
    calendarNode.setAttribute('start-date', '');
    calendarNode.setAttribute('end-date', '');
    render();
    renderInputs();
  });

  // Кнопка Применить
  applyButton.addEventListener('click', () => {
    renderInputs();
  });

  // Нажатие на день
  Array.from(dayNodes).forEach((node) => {
    node.addEventListener('click', (e) => {
      const dayNode = e.target;
      const date = dayNode.getAttribute('date');

      if (
        calendarNode.getAttribute('start-date') == '' ||
        calendarNode.getAttribute('end-date') == '' ||
        calendarNode.getAttribute('start-date') !=
          calendarNode.getAttribute('end-date')
      ) {
        calendarNode.setAttribute('start-date', date);
      }

      calendarNode.setAttribute('end-date', date);

      const startDate = parseDate(calendarNode.getAttribute('start-date'));
      const endDate = parseDate(calendarNode.getAttribute('end-date'));

      if (startDate > endDate) {
        const temp = calendarNode.getAttribute('start-date');
        calendarNode.setAttribute(
          'start-date',
          calendarNode.getAttribute('end-date')
        );
        calendarNode.setAttribute('end-date', temp);
      }

      render();
    });
  });
}
