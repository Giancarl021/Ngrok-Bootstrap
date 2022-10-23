const context = {};

async function get(endpoint) {
    const response = await fetch(endpoint);
    return await response.json();
}

async function toggleNgrok() {
    if (context.status === 'stopped') await get('/start');
    else if (context.status === 'running') await get('/stop');

    updateStatus();
}

async function updateStatus() {
    const $status = document.querySelector('h2');
    
    const response = await get('/status');
    $status.innerHTML = '<b>Status atual:</b> ' + response.message;

    const $btn = document.querySelector('button');
    switch (response.status) {
        case 'running':
            $btn.textContent = 'Parar';
            $btn.classList.remove('is-success');
            $btn.classList.add('is-danger');
            break;
        case 'stopped':
            document.querySelector('button').textContent = 'Iniciar';
            $btn.classList.remove('is-danger');
            $btn.classList.add('is-success');
            break;
        default:
            $btn.style.display = 'none';
    }

    context.status = response.status;
}

document.addEventListener('DOMContentLoaded', updateStatus);
