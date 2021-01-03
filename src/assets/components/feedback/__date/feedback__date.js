import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addDefaultLocale(ru);
const timeAgo = new TimeAgo('ru');

const dates = document.getElementsByClassName('feedback__date');

Array.from(dates).forEach((e) => {
    const dayCount = parseInt(e.getAttribute('value'));
    e.innerHTML = timeAgo.format(Date.now() - 1000 * 60 * 60 * 24 * dayCount)
});
