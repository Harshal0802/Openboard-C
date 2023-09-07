let optionContainer = document.querySelector(".options-container");
let toolsContainer = document.querySelector(".tools-container");
let pencilContainer = document.querySelector(".pencil-tool");
let eraserContainer = document.querySelector(".eraser-tool");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".notes");
let upload = document.querySelector(".upload");
let optionFlag = true;
let pencilFlag = false;
let eraserFlag = false;

optionContainer.addEventListener("click", (e) => {
  optionFlag = !optionFlag;

  if (optionFlag) {
    openTools();
  } else {
    closeTools();
  }
});

function openTools() {
  let iconElement = optionContainer.children[0];
  iconElement.classList.remove("fa-xmark");
  iconElement.classList.add("fa-bars");
  toolsContainer.style.display = "flex";
}

function closeTools() {
  let iconElement = optionContainer.children[0];
  iconElement.classList.add("fa-xmark");
  iconElement.classList.remove("fa-bars");
  toolsContainer.style.display = "none";
  pencilContainer.style.display = "none";
  eraserContainer.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;

  if (pencilFlag) {
    pencilContainer.style.display = "block";
  } else {
    pencilContainer.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;

  if (eraserFlag) {
    eraserContainer.style.display = "flex";
  } else {
    eraserContainer.style.display = "none";
  }
});

upload.addEventListener("click", (e) => {
  //open file explorer
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let sampleInnerHtml = `
    <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-container">
        <img src="${url}" />
    </div>
    `;
    createStickyNote(sampleInnerHtml);
  });
});

sticky.addEventListener("click", (e) => {
  let sampleInnerHtml = `
    <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-container">
        <textarea spellcheck="false"></textarea>
    </div>
    `;
  createStickyNote(sampleInnerHtml);
});

function createStickyNote(sampleInnerHtml) {
  let stickyContainer = document.createElement("div");
  stickyContainer.setAttribute("class", "sticky-notes-container");
  stickyContainer.innerHTML = sampleInnerHtml;

  document.body.appendChild(stickyContainer);

  let minimize = document.querySelector(".minimize");
  let remove = document.querySelector(".remove");

  noteAction(minimize, remove, stickyContainer);

  stickyContainer.onmousedown = function (event) {
    dragAndDrop(stickyContainer, event);
  };

  stickyContainer.ondragstart = function () {
    return false;
  };
}

function noteAction(minimize, remove, stickyContainer) {
  remove.addEventListener("click", (e) => {
    stickyContainer.remove();
  });

  minimize.addEventListener("click", (e) => {
    let noteContainer = stickyContainer.querySelector(".note-container");
    let display = getComputedStyle(noteContainer).getPropertyValue("display");
    if (display === "none") {
      noteContainer.style.display = "block";
    } else {
      noteContainer.style.display = "none";
    }
  });
}

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the element at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
