import './__guests/room-form__guests.js';
import calendar from  '../calendar/calendar.js';

const roomForms =  document.getElementsByClassName('room-form');
Array.from(roomForms).forEach((roomForm) => {
    const calendarNode = roomForm.getElementsByClassName('room-form__calendar')[0];

    const checkinNode = roomForm.getElementsByClassName('room-form__checkin')[0];
    const checkinNodeInput = checkinNode.getElementsByClassName('buttonfield__input')[0];
    const checkinNodeButton = checkinNode.getElementsByClassName('buttonfield__button')[0];

    const checkoutNode = roomForm.getElementsByClassName('room-form__checkout')[0];
    const checkoutNodeInput = checkoutNode.getElementsByClassName('buttonfield__input')[0];
    const checkoutNodeButton = checkoutNode.getElementsByClassName('buttonfield__button')[0];

    const submitButton = roomForm.getElementsByClassName('room-form__button')[0];

    checkinNodeButton.addEventListener('click', () => {
        calendarNode.classList.toggle('calendar_active');
    });

    checkoutNodeButton.addEventListener('click', () => {
        calendarNode.classList.toggle('calendar_active');
    });

    submitButton.addEventListener('click', () => {
        roomForm.submit();
    });

    calendar(calendarNode, [checkinNodeInput, checkoutNodeInput], {});
});
