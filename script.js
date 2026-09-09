const form = document.querySelector('.contact-form');
const toast = document.getElementById('toast');

function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.backgroundColor = isError ? '#ff4d4d' : '#66FCF1';
    toast.style.color = isError ? '#ffffff' : '#1d1f29';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            showToast('Message sent successfully!');
            form.reset();
        } else {
            showToast('Something went wrong. Please try again.', true);
        }
    } catch (error) {
        showToast('An error occurred while sending your message.', true);
    }
});