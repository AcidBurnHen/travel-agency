class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector(".site-header__menu-icon");
  }

  events() {
    this.menuIcon.addEventListener("click", () => this.toggleMenu());
  }

  toggleMenu() {
    alert("uwu");
  }
}

export default MobileMenu;
