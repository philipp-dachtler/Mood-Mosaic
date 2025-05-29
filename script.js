const calendar = document.getElementById('calendar');
const monthDisplay = document.getElementById('current-month');
const addBtn = document.getElementById('add-event');
const eventTitleInput = document.getElementById('event-title');
const eventDateInput = document.getElementById('event-date');
const sound = document.getElementById('notification-sound');

let events = JSON.parse(localStorage.getItem('events')) || {};
let currentDate = new Date();

function renderCalendar() {
  calendar.innerHTML = '';
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  monthDisplay.textContent = currentDate.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    const hasEvent = events[dateKey];
    calendar.innerHTML += `<div class="day ${hasEvent ? 'has-event' : ''}" data-date="${dateKey}">${d}</div>`;
  }

  document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', e => {
      const date = e.currentTarget.dataset.date;
      if (events[date]) {
        alert(`📌 Ereignis am ${date}: ${events[date]}`);
        sound.play();
      }
    });
  });
}

addBtn.addEventListener('click', () => {
  const date = eventDateInput.value;
  const title = eventTitleInput.value;
  if (date && title) {
    events[date] = title;
    localStorage.setItem('events', JSON.stringify(events));
    renderCalendar();
    eventTitleInput.value = '';
  }
});

document.getElementById('prev-month').onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};
document.getElementById('next-month').onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
