const files = [
  "a", "b", "c", "d", "e", "f", "g", "h"
];

const pieces = [
  "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"
];

const colors = [
  "black", "white"
];

const transparent = {
  src: "images/transparent.png",
  alt: "",
  style: "opacity:0"
};

const container = document.createElement("div");
container.classList.add("parent-container");
const mainContainer = document.createElement("div");
mainContainer.classList.add("main-container");


  for (let j = 0; j < 8; j++) {
    const fileContainer = document.createElement("div");
    fileContainer.classList.add("file-" + files[j], "files");

    for (let i = 8; i >= 1; i--) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.id = "p" + files[j] + i;

      if (i === 8) {
        square.innerHTML = `<img id="${files[j]}${i}" src="images/black/${pieces[j]}.png" alt=""/>${files[j]}${i}`;
      } else if (i === 1) {
        square.innerHTML = `<img id="${files[j]}${i}" src="images/white/${pieces[j]}.png" alt=""/>${files[j]}${i}`;
      }
       else if (i === 7) {
        square.innerHTML = `<img id="${files[j]}${i}" src="images/black/pawn.png" alt=""/>${files[j]}${i}`;
      } else if (i === 2) {
        square.innerHTML = `<img id="${files[j]}${i}" src="images/white/pawn.png" alt=""/>${files[j]}${i}`;
      } else {
        square.innerHTML = `<img id="${files[j]}${i}" src="${transparent.src}" alt="" style="${transparent.style}"/>${files[j]}${i}`;
      }

      fileContainer.appendChild(square);
    }

    mainContainer.appendChild(fileContainer);
  }

  container.appendChild(mainContainer);


document.body.appendChild(container);
