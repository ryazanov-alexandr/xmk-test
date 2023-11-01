function showThanksModal(modalDialogSelector, modalSelector, message) {
    const prevModalDialog = document.querySelector(`.${modalDialogSelector}`);
    prevModalDialog.classList.add('hide');

    const thanksModal = document.createElement('div');
    thanksModal.classList.add(modalDialogSelector);
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector(modalSelector).append(thanksModal);

    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
    }, 2000);
}

export {showThanksModal};