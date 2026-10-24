const copyEmailButton = document.querySelector('.copy-email');
const copyEmailStatus = document.querySelector('.copy-status');

if (copyEmailButton && copyEmailStatus) {
    copyEmailButton.addEventListener('click', async () => {
        const email = copyEmailButton.dataset.email;

        if (!email) {
            copyEmailStatus.textContent = 'No email address is configured.';
            return;
        }

        try {
            await navigator.clipboard.writeText(email);
            copyEmailStatus.textContent = 'Email address copied.';
        } catch {
            const temporaryInput = document.createElement('textarea');
            temporaryInput.value = email;
            temporaryInput.setAttribute('readonly', '');
            temporaryInput.style.position = 'fixed';
            temporaryInput.style.opacity = '0';
            document.body.append(temporaryInput);
            temporaryInput.select();
            const copied = document.execCommand('copy');
            temporaryInput.remove();
            copyEmailStatus.textContent = copied
                ? 'Email address copied.'
                : 'Copy failed. Select the email address and copy it manually.';
        }
    });
}
