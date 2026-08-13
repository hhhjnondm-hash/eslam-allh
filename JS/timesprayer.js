let fajr= document.getElementById("fajr-time")
let sunrise= document.getElementById("sunrise-time")
let dhuhr= document.getElementById("dhuhr-time")
let asr= document.getElementById("asr-time")
let maghrib= document.getElementById("maghrib-time")
let isha= document.getElementById("isha-time")



const citySelect = document.getElementById("city");
const prayerList = document.getElementById("prayer-times");
const dateDiv = document.getElementById("date");
const citty = document.getElementById("citty");
let countdownInterval;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  const timeStr = `${hours}:${minutes}:${seconds} ${ampm} : الوقت الأن`;
  document.getElementById("clock").textContent = timeStr;
}

updateClock();
setInterval(updateClock, 1000);

function convertTo12Hour(time) {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "م" : "ص";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

function translatePrayer(name) {
  const names = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  };
  return names[name] || name;
}

function translateCity(name) {
  const cities = {
    Cairo: "القاهرة",
    Giza: "الجيزة",
    Alexandria: "الإسكندرية",
    Dakahlia: "الدقهلية",
    RedSea: "البحر الأحمر",
    Beheira: "البحيرة",
    Fayoum: "الفيوم",
    Gharbia: "الغربية",
    Ismailia: "الإسماعيلية",
    Menoufia: "المنوفية",
    Minya: "المنيا",
    Qalyubia: "القليوبية",
    NewValley: "الوادي الجديد",
    Suez: "السويس",
    Aswan: "أسوان",
    Assiut: "أسيوط",
    BeniSuef: "بني سويف",
    PortSaid: "بورسعيد",
    Damietta: "دمياط",
    SouthSinai: "جنوب سيناء",
    KafrElSheikh: "كفر الشيخ",
    Matrouh: "مطروح",
    Luxor: "الأقصر",
    Qena: "قنا",
    Sharqia: "الشرقية",
    NorthSinai: "شمال سيناء",
    Sohag: "سوهاج",
  };
  return cities[name] || name;
}

function convertTo12HourFormat(time) {
    // Split the time string into hours and minutes
    let [hours, minutes] = time.split(':').map(Number);
    
    // Determine if it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    if (hours === 0) hours = 12; // Handle midnight case
    
    // Format and return the time
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

async function fetchPrayerTimes(city) {
  try {
    // Try using the new API source (timesprayer.com based)
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=egypt&method=5`
    );
    const data = await response.json();

    const timings = data.data.timings;
    const date = data.data.date;

    const dayName = getArabicDayName(date.gregorian.weekday.en);
    dateDiv.textContent = `${dayName} ${date.hijri.date} هـ / ${date.gregorian.date} م`;

    fajr.innerHTML = convertTo12HourFormat(timings.Fajr);
    sunrise.innerHTML = convertTo12HourFormat(timings.Sunrise);
    dhuhr.innerHTML = convertTo12HourFormat(timings.Dhuhr);
    asr.innerHTML = convertTo12HourFormat(timings.Asr);
    maghrib.innerHTML = convertTo12HourFormat(timings.Maghrib);
    isha.innerHTML = convertTo12HourFormat(timings.Isha);

    citty.textContent = translateCity(city);
    getNextPrayer(timings);
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    // Fallback to timesprayer.com if API fails
    dateDiv.textContent = "تعذر تحميل مواقيت الصلاة من API، يرجى المحاولة لاحقاً";
  }
}
// ------------------------------------------------------
function getNextPrayer(timings) {
  clearInterval(countdownInterval);
  const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const now = new Date();

  for (let name of prayerOrder) {
    const [hour, minute] = timings[name].split(":").map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hour, minute, 0, 0);

    if (prayerTime > now) {
      const arabicName = translatePrayer(name);

      function updateCountdown() {
        const now = new Date();
        let diffMs = prayerTime - now;

        if (diffMs <= 0) {
          document.getElementById("next-prayer").textContent =
            `حان الآن وقت ${arabicName}`;
          clearInterval(countdownInterval);
          return;
        }

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        const hoursText = diffHours > 0 ? `${diffHours} ${diffHours === 1 ? "ساعة" : "ساعات"}` : "";
        const minutesText = diffMinutes > 0 ? `${diffMinutes} دقيقة` : "";
        const secondsText = `${diffSeconds} ثانية`;
        const separator1 = hoursText && minutesText ? " و " : "";
        const separator2 = (hoursText || minutesText) ? " و " : "";

        document.getElementById("next-prayer").textContent =
          `وقت الصلاة التالي: ${arabicName} بعد ${hoursText}${separator1}${minutesText}${separator2}${secondsText}`;
      }

      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
      break;
    }
  }
}

citySelect.addEventListener("change", () => {
  fetchPrayerTimes(citySelect.value);
});

fetchPrayerTimes(citySelect.value);


// ---------------------------------------------------
function getArabicDayName(day) {
    const days = {
      Sunday: "الأحد",
      Monday: "الإثنين",
      Tuesday: "الثلاثاء",
      Wednesday: "الأربعاء",
      Thursday: "الخميس",
      Friday: "الجمعة",
      Saturday: "السبت",
    };
    return days[day] || day;
  }
  