export default function (calendarNode, inputNodes, options) {

    const getMonth = () => {
        return parseInt(calendarNode.getAttribute('month'));
    }

    const getYear = () => {
        return parseInt(calendarNode.getAttribute('year'));
    }

    const changeMonth = (offset) => {
        const month = getMonth();
        const year = getYear();

        const total = 12 * year + (month-1) + offset;

        calendarNode.setAttribute('month', total % 12 + 1);
        calendarNode.setAttribute('year', Math.floor(total/12));
    }

    const renderHeader = (month, year) => {
        const monthes = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        
        const caption = calendarNode.getElementsByClassName('calendar__caption')[0];
        caption.innerHTML = monthes[month-1] + ' ' + year;
    }

    const render = () => {
        renderHeader(getMonth(), getYear());
    }

    render();

    // Обработчики
    const nextMonthButton = calendarNode.getElementsByClassName('calendar__next')[0];
    const prevMonthButton = calendarNode.getElementsByClassName('calendar__prev')[0];

    prevMonthButton.addEventListener('click', () => {
        changeMonth(-1);
        render();
    });

    nextMonthButton.addEventListener('click', () => {
        changeMonth(1);
        render();
    });

}