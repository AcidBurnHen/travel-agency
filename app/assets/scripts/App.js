import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

let stickyHeader = new StickyHeader();
let mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"));
new RevealOnScroll(document.querySelectorAll(".testimonial"));

if (module.hot) {
  module.hot.accept();
}
