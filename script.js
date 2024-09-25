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

document.getElementById("fontSelect").addEventListener("change", function () {
  const selectedFont = this.value;
  document.getElementById("poemTitle").style.fontFamily = selectedFont;
  document.getElementById("poemText").style.fontFamily = selectedFont;
  document.getElementById("authorText").style.fontFamily = selectedFont;
});

document.getElementById("saveButton").addEventListener("click", function () {
  const illustration = document.querySelector(".illustration");

  html2canvas(illustration).then((canvas) => {
    const link = document.createElement("a");
    link.download = "illustration.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});
