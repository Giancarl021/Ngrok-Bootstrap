const context = {};

function seconds(n) {
    return n * 1000;
}

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
    const $btn = document.querySelector('button');

    const response = await get('/status');
    $status.innerHTML = '<b>Status atual:</b> ' + response.message;

    $btn.style.display = 'block';

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

async function main() {
    setInterval(updateStatus, seconds(10));
    await updateStatus();
}

document.addEventListener('DOMContentLoaded', main);
