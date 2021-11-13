(() => {
    const menuButton = document.querySelectorAll("[data-menu-button]");

    menuButton.forEach(button => {
        button.addEventListener("click", () => {
            const expanded = button.getAttribute("aria-expanded") === "true" || false;
            button.setAttribute("aria-expanded", !expanded);
            button.nextElementSibling.classList.toggle("is-open");
        });
    })

})();

