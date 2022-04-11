import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class RevealOnScroll {
  constructor(elements) {
    this.itemsToReveal = elements;
    this.browserHeight = window.innerHeight;
    this.scrollThrottle = throttle(this.checkCaller, 200).bind(this);
    this.events();
    this.hideInitially();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener(
      "resize",
      debounce(() => {
        this.browserHeight = window.innerHeight;
      }, 350)
    );
  }

  checkCaller() {
    this.itemsToReveal.forEach(el => {
      if (el.isRevealed == false) {
        this.checkIfScrolledTo(el);
      }
    });
  }

  checkIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;
      if (scrollPercent < 75) {
        el.classList.add("reveal-item--is-visible");
        el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle);
        }
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
