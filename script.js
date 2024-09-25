const max_height_image = 300; // Высота для привязки
const text_left_margin = 10; // Отступ текста от левой стороны

document.getElementById("uploadImage").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const imageElement = document.getElementById("backgroundImage");
    imageElement.src = event.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// Изменение шрифта текста
document.getElementById("fontSelect").addEventListener("change", function () {
  const selectedFont = this.value;
  document.getElementById("poemTitle").style.fontFamily = selectedFont;
  document.getElementById("poemText").style.fontFamily = selectedFont;
  document.getElementById("authorText").style.fontFamily = selectedFont;
});

// Исправление изменения цвета текста
document.getElementById("colorSelect").addEventListener("input", function () {
  const selectedColor = this.value;
  document
    .getElementById("poemTitle")
    .style.setProperty("color", selectedColor, "important");
  document
    .getElementById("poemText")
    .style.setProperty("color", selectedColor, "important");
  document
    .getElementById("authorText")
    .style.setProperty("color", selectedColor, "important");
});

// Сохранение иллюстрации
document.getElementById("saveButton").addEventListener("click", function () {
  const illustration = document.querySelector(".illustration");

  html2canvas(illustration, { allowTaint: true, useCORS: true }).then(
    (canvas) => {
      const link = document.createElement("a");
      link.download = "illustration.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  );
});

// Интерактивное перемещение изображения вверх и вниз
const backgroundImage = document.getElementById("backgroundImage");
let isDragging = false;
let startY;
let scrollTop;

backgroundImage.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY;
  scrollTop = backgroundImage.offsetTop;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaY = e.clientY - startY;
    const newTop = scrollTop + deltaY;
    backgroundImage.style.position = "relative";
    backgroundImage.style.top = `${newTop}px`;
  }
});

// Привязка названия стиха и основного текста к высоте
const poemTitle = document.getElementById("poemTitle");
const poemText = document.getElementById("poemText");
const authorText = document.getElementById("authorText");

// Функция для обновления позиции названия стиха
const updateTitlePosition = () => {
  const titleHeight = poemTitle.offsetHeight;
  if (titleHeight > max_height_image) {
    poemTitle.style.bottom = `${max_height_image}px`;
  } else {
    poemTitle.style.bottom = `${max_height_image + 10}px`;
  }
};

// Слушатель событий для изменения текста в названии
poemTitle.addEventListener("input", updateTitlePosition);
