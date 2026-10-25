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



function autoScrollProjects(containerId, intervalTime = 3000) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let scrollInterval = null;

    function startScrolling() {
        scrollInterval = setInterval(() => {
            const scrollAmount = 375; 
            
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, intervalTime);
    }

    startScrolling();

    container.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });

    container.addEventListener('mouseleave', () => {
        startScrolling();
    });
}

window.addEventListener('load', () => {
    autoScrollProjects('schoolProjectsScroll', 1000); 
    autoScrollProjects('homeProjectsScroll', 1000);   
});