const ANIMATION_DURATION_MS = 200;

const tile = document.querySelectorAll(".tiles-nav__item")[1];

let mouseEnterFlag = false;

tile.addEventListener("mousemove", (event) => {
  if (mouseEnterFlag) {
    return;
  }

  const isHovered = isDOMElementHovered(tile);

  if (!isHovered) {
    return;
  }

  const direction = getMousemoveDirection(event);

  mouseEnterFlag = true;

  createAndInsertHoverElem({ direction, parentElem: tile });
});

tile.addEventListener("mouseleave", () => {
  mouseEnterFlag = false;

  const hoverElem = tile.querySelector(".tile__hover-elem");
  hoverElem.classList.remove("js-visible");
  setTimeout(() => {
    hoverElem.remove();
  }, ANIMATION_DURATION_MS);
});

function getMousemoveDirection(event) {
  let direction = "";

  if (
    event.movementY > 0 &&
    (Math.abs(event.movementY) > Math.abs(event.movementX) ||
      event.movementY === event.movementX)
  ) {
    direction = "down";
  }

  if (
    event.movementY < 0 &&
    (Math.abs(event.movementY) > Math.abs(event.movementX) ||
      event.movementY === event.movementX)
  ) {
    direction = "up";
  }

  if (
    event.movementX > 0 &&
    Math.abs(event.movementX) > Math.abs(event.movementY)
  ) {
    direction = "right";
  }

  if (
    event.movementX < 0 &&
    Math.abs(event.movementX) > Math.abs(event.movementY)
  ) {
    direction = "left";
  }

  return direction;
}

function createAndInsertHoverElem({ direction, parentElem }) {
  const hoverElem = document.createElement("div");
  hoverElem.classList.add("tile__hover-elem");
  hoverElem.classList.add(`tile__hover-elem--${direction}`);
  hoverElem.style.transitionDuration = `${ANIMATION_DURATION_MS}ms`;
  parentElem.appendChild(hoverElem);
  setTimeout(() => {
    hoverElem.classList.add("js-visible");
  }, 10);

  return hoverElem;
}

function isDOMElementHovered(DOMElem) {
  const {
    left: DOMElemXLeft,
    right: DOMElemXRight,
    top: DOMElemYTop,
    bottom: DOMElemYBottom
  } = DOMElem.getBoundingClientRect();

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  const isHovered =
    cursorX >= DOMElemXLeft &&
    cursorX <= DOMElemXRight &&
    cursorY >= DOMElemYTop &&
    cursorY <= DOMElemYBottom;

  return isHovered;
}
