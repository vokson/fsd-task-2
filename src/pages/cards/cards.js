import '@components/room-form/room-form.js';
import calendar from '@components/calendar/calendar.js';


const nonAttachedCalendar = document.getElementsByClassName('block-3__calendar')[0];
calendar(nonAttachedCalendar, [], {});