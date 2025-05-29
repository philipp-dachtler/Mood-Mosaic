const moods = ["😊", "😐", "😢", "😠", "😴"];
const calendar = document.getElementById("calendar");
const daysInMonth = new Date().getDate();

function getSavedMood(day) {
  return localStorage.getItem("mood-" + day) || "🟨";
}

function saveMood(day, mood) {
  localStorage.setItem("mood-" + day, mood);
}

function drawCalendar() {
  calendar.innerHTML = "";
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 1; i <= totalDays; i++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = getSavedMood(i);
    cell.title = `Tag ${i}`;
    cell.addEventListener("click", () => {
      const mood = prompt(`Stimmung für Tag ${i}:\n😊 Glücklich\n😐 Neutral\n😢 Traurig\n😠 Genervt\n😴 Müde`);
      if (moods.includes(mood)) {
        saveMood(i, mood);
        drawCalendar();
      }
    });
    calendar.appendChild(cell);
  }
}

drawCalendar(); 
