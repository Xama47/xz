// Дожидаемся загрузки Telegram WebApp
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    const user = tg.initDataUnsafe?.user;

    if (user) {
        const displayName = user.username ? @${user.username} : user.first_name;
        const nameEl = document.getElementById('user-name');
        if (nameEl) nameEl.innerText = displayName;

        // Запрос к бэкенду
        fetch(/api/user-info?init_data=${encodeURIComponent(tg.initData)})
            .then(response => response.json())
            .then(data => {
                if (data.balance !== undefined) {
                    const balEl = document.getElementById('user-balance');
                    if (balEl) balEl.innerText = ${parseFloat(data.balance).toFixed(2)}$;
                }
                if (data.avatar_url) {
                    const avatarImg = document.getElementById('user-avatar');
                    if (avatarImg) {
                        avatarImg.src = data.avatar_url;
                        avatarImg.style.display = "inline-block";
                    }
                }
            })
            .catch(err => console.error("Ошибка API:", err));
    } else {
        const nameEl = document.getElementById('user-name');
        if (nameEl) nameEl.innerText = "Гость";
    }
} else {
    console.warn("Telegram WebApp не обнаружен. Открыто не в Telegram?");
    // Можно поставить заглушку для тестов в браузере:
    const nameEl = document.getElementById('user-name');
    if (nameEl) nameEl.innerText = "Тестовый Юзер";
}