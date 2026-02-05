document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('alimp_user');
    const navUser = document.getElementById('nav-user');
    if (user && navUser) {
        navUser.textContent = user;
    }

    const modal = document.getElementById('threadModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    if (openBtn) {
        openBtn.onclick = () => { modal.style.display = 'flex'; };
    }

    if (closeBtn) {
        closeBtn.onclick = () => { modal.style.display = 'none'; };
    }

    window.onclick = (event) => {
        if (event.target == modal) { modal.style.display = 'none'; }
    };

    const createBtn = document.getElementById('createThreadBtn');
    if (createBtn) {
        createBtn.onclick = () => {
            const titleInput = document.getElementById('t-title');
            const textInput = document.getElementById('t-text');
            
            if (!titleInput.value.trim() || !textInput.value.trim()) {
                alert("Пожалуйста, заполните заголовок и текст!");
                return;
            }

            const threads = JSON.parse(localStorage.getItem('alimp_threads') || '[]');
            const newThread = {
                title: titleInput.value,
                text: textInput.value,
                author: user || 'Аноним',
                date: new Date().toLocaleDateString()
            };

            threads.push(newThread);
            localStorage.setItem('alimp_threads', JSON.stringify(threads));

            titleInput.value = '';
            textInput.value = '';
            modal.style.display = 'none';
            
            renderThreads();
        };
    }

    function renderThreads() {
        const list = document.getElementById('threadsList');
        if (!list) return;

        const threads = JSON.parse(localStorage.getItem('alimp_threads') || '[]');
        list.innerHTML = '';

        if (threads.length === 0) {
            list.innerHTML = '<p style="text-align:center; color:gray;">Пока тем нет. Будьте первым!</p>';
            return;
        }

        threads.reverse().forEach(t => {
            list.innerHTML += 
                <div class="card">
                    <span class="accent-text">${t.author} • ${t.date || ''}</span>
                    <h3>${t.title}</h3>
                    <p>${t.text}</p>
                </div>;
        });
    }

    renderThreads();

    const loginBtn = document.getElementById('loginActionBtn');
    if (loginBtn) {
        loginBtn.onclick = handleLogin;
    }
});

function handleLogin() {
    const name = document.getElementById('reg-username').value;
    if (!name.trim()) {
        alert("Введите ник!");
        return;
    }
    localStorage.setItem('alimp_user', name);
    window.location.href = 'index.html';
}