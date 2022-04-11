import throttle from "lodash/throttle";

class RevealOnScroll {
  constructor() {
    this.itemsToReveal = document.querySelectorAll(".feature-item");
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
    this.hideInitially();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
  }

  calcCaller() {
    this.itemsToReveal.forEach(el => {
      if (el.isRevealed == false) {
        this.checkIfScrolledTo(el);
      }
    });
  }

  checkIfScrolledTo(el) {
    let scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100;
    if (scrollPercent < 75) {
      el.classList.add("reveal-item--is-visible");
      el.isRevealed = true;
      if (el.isLastItem) {
        window.removeEventListener("scroll", this.scrollThrottle);
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add("reveal-item");
      el.isRevealed = false;
    });

    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

export default RevealOnScroll;
