import content from "./content.js";

const refs = {
    projectsList: document.querySelector('.projects-list'),
    lightbox: document.querySelector(".js-lightbox"),
    modal: document.querySelector("[data-modal]"),
    overlay: document.querySelector(".lightbox-overlay")
}

const makeList = content.map(createProjectButton).join('');
refs.projectsList.insertAdjacentHTML('beforeend', makeList);

const openModalBtn = document.querySelectorAll("[data-modal-open]")
openModalBtn.forEach(button => {
    button.addEventListener('click', openLightbox);
})

refs.overlay.addEventListener('click', onLightboxCloseClick);

function createProjectButton({ title, id }) {
    return `<button class="button" id=${id} data-modal-open>${title}</button>`;
}

function openLightbox(e) {
    e.preventDefault();
    window.addEventListener("keydown", onKeyClick);
    refs.lightbox.classList.add('is-open');

    const createModal = ({ title, link, section, technologies, libraries = 'no libraries', description }) => {
        const modal = `<div class="modal">
                            <p class='modal-item'><b>${section}</b>:
                                <a href="${link}" class="project-link" target="_blank" >${title}</a>
                            </p>
                            <p class='modal-item'><b>Technologies:</b> ${technologies}</p>
                            <p class='modal-item'><b>Libraries:</b> ${libraries}</p>
                            <p class='modal-item'><b>About project:</b> ${description}</p>
                            <button
                            type="button"
                            class="lightbox-button"
                            data-action="close-lightbox"
                        ></button>
                        </div>`;
        return modal;
    }

    const currentProject = content.find(item => item.id === Number(e.target.id));
    const modal = createModal(currentProject);
    refs.overlay.insertAdjacentHTML('beforeend', modal);
    const buttonClose = document.querySelector(".lightbox-button");
    buttonClose.addEventListener('click', closeLightbox);
}

function closeLightbox() {
    window.removeEventListener("keydown", onKeyClick);
    refs.lightbox.classList.remove('is-open');
    refs.overlay.innerHTML = '';
}

function onKeyClick(e) {
    if (e.code === 'Escape') {
        closeLightbox();
    }
}

function onLightboxCloseClick(e) {
    if (e.currentTarget === e.target) {
        closeLightbox();
    }
}
