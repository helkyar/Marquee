function getElement(selector, parent = document) {
  const element = parent.querySelector(selector);
  if (element) {
    return element;
  }
  throw new Error(`Check ${selector}, no such element exists`);
}
function getElements(selector, parent = document) {
  const element = parent.querySelectorAll(selector);
  if (element) {
    return element;
  }
  throw new Error(`Check ${selector}, no such element exists`);
}

class Gallery {
  list;
  modal;
  modalImg;
  modalImgs;
  modalClose;
  modalNext;
  modalPrev;
  source;

  constructor(node) {
    this.list = [...getElements("img", node)];
    this.modal = getElement(".modal");
    this.modalImg = getElement(".modal-main", this.modal);
    this.modalImgs = getElement(".modal-imgs img", this.modal);
    this.modalClose = getElement(".btn-close", this.modal);
    this.modalNext = getElement(".btn-next", this.modal);
    this.modalPrev = getElement(".btn-prev", this.modal);
    node.addEventListener("click", this.openModal.bind(this));
  }

  openModal() {
    console.log(this);
    this.modal.classList.add("open");
  }
}

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
