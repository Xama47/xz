// Дожидаемся загрузки Telegram WebApp
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const user = tg.initDataUnsafe?.user;

if (user) {
    document.getElementById('user-name').innerText = user.username ? @${user.username} : user.first_name;

    // ВАЖНО: Вставь сюда URL своего хостинга (VPS), где работает бот
    const SERVER_URL = "https://твой-хостинг.com"; 

    fetch(${SERVER_URL}/api/user-info?init_data=${encodeURIComponent(tg.initData)})
        .then(res => res.json())
        .then(data => {
            document.getElementById('user-balance').innerText = ${parseFloat(data.balance).toFixed(2)}$;
            if (data.avatar_url) {
                const img = document.getElementById('user-avatar');
                img.src = data.avatar_url;
                img.style.display = "inline-block";
            }
        })
        .catch(e => console.error("Ошибка:", e));
}
