const loreButton = document.getElementById('loreButton');
const loreModalOverlay = document.getElementById('loreModalOverlay');
const closeLoreButton = document.getElementById('closeLoreButton');
const whatIsThisButton = document.getElementById('whatIsThisButton');
const whatIsThisModalOverlay = document.getElementById('whatIsThisModalOverlay');
const closeWhatIsThisButton = document.getElementById('closeWhatIsThisButton');

function openModal(modalOverlay) {
    modalOverlay.style.display = 'flex';
    modalOverlay.classList.remove('hidden');
}

function closeModal(modalOverlay) {
    modalOverlay.classList.add('hidden');
    setTimeout(() => {
        modalOverlay.style.display = 'none';
    }, 300);
}

loreButton.addEventListener('click', () => openModal(loreModalOverlay));
closeLoreButton.addEventListener('click', () => closeModal(loreModalOverlay));
loreModalOverlay.addEventListener('click', (event) => {
    if (event.target === loreModalOverlay) {
        closeModal(loreModalOverlay);
    }
});

whatIsThisButton.addEventListener('click', () => openModal(whatIsThisModalOverlay));
closeWhatIsThisButton.addEventListener('click', () => closeModal(whatIsThisModalOverlay));
whatIsThisModalOverlay.addEventListener('click', (event) => {
    if (event.target === whatIsThisModalOverlay) {
        closeModal(whatIsThisModalOverlay);
    }
});
