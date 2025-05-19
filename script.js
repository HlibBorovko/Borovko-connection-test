// ===== Borovko Connection — Уніфікований JS =====

document.addEventListener("DOMContentLoaded", function () {
  // ===== Темна/Світла тема =====
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    const icon = toggleBtn.querySelector(".icon");
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme");
      icon.textContent = "☀️";
    }
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      icon.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ===== Аккордеон (index.html) =====
  const accordionBtn = document.querySelector(".accordion-toggle");
  const accordionContent = document.querySelector(".accordion-content");
  if (accordionBtn && accordionContent) {
    accordionBtn.addEventListener("click", () => {
      const isOpen = accordionContent.style.maxHeight && accordionContent.style.maxHeight !== "0px";
      accordionContent.style.maxHeight = isOpen ? "0px" : accordionContent.scrollHeight + "px";
      accordionBtn.textContent = isOpen ? "Показати деталі ⬇" : "Сховати деталі ⬆";
    });
  }

  // ===== Тарифи — вкладки (tariffs.html) =====
  const tariffTabs = document.querySelectorAll(".tariff-tab");
  const tariffGroups = document.querySelectorAll(".tariff-group");
  if (tariffTabs.length && tariffGroups.length) {
    function activateTariffTab(targetId) {
      tariffTabs.forEach(t => t.classList.toggle("active", t.dataset.target === targetId));
      tariffGroups.forEach(g => g.classList.toggle("active", g.id === targetId));
    }
    tariffTabs.forEach(tab => {
      tab.addEventListener("click", () => activateTariffTab(tab.dataset.target));
    });
    const initialHash = location.hash.replace("#", "");
    if (initialHash && document.getElementById(initialHash)) activateTariffTab(initialHash);
  }

  // ===== Модалка тарифів (tariffs.html) =====
  const modal = document.getElementById('modal');
  const modalForm = document.getElementById('modal-form');
  const modalTitle = modal?.querySelector('h2');
  const modalClose = document.querySelector('.close-btn');
  const connectButtons = document.querySelectorAll('.connect-btn');
  if (modal && modalForm && modalTitle && connectButtons.length) {
    connectButtons.forEach(button => {
      button.addEventListener('click', () => {
        modalTitle.textContent = `Заявка на підключення: ${button.dataset.tariff || 'Тариф'}`;
        modal.classList.add('active');
      });
    });
    modalClose?.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Вашу заявку відправлено! Очікуйте дзвінка.");
      modalForm.reset();
      modal.classList.remove('active');
    });
  }

  // ===== Кабінет: перемикач вкладок =====
  const tabButtons = document.querySelectorAll(".cabinet-tabs .tab");
  const tabContents = document.querySelectorAll(".tab-content");
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        tabContents.forEach(content => content.classList.remove("active"));
        document.getElementById(target)?.classList.add("active");
      });
    });
  }

  // ===== Кабінет: динамічне заповнення тарифів по секціях з іконками =====
  const tariffData = {
  "Тарифи для квартир": ["Лайт", "Базовий", "Комфорт", "Оптимум", "Максимум", "Гіга"],
  "Тарифи для приватного сектору": ["Домашній", "Плюс", "Потужний", "4К-стрім", "Приват MAX"],
  "Бізнес тарифи": ["Start Biz", "Biz Net", "Office 500", "Gigabit Pro", "Fiber Connect", "Корпоративний"]
};

const iconMap = {
  "Тарифи для квартир": "building",
  "Тарифи для приватного сектору": "home",
  "Бізнес тарифи": "briefcase"
};


  const tariffModal = document.getElementById('tariff-modal');
  const tariffContainer = tariffModal?.querySelector('.tariff-options');

  if (tariffModal && tariffContainer) {
    for (const [sectionTitle, tariffs] of Object.entries(tariffData)) {
      const section = document.createElement('div');
      const heading = document.createElement('h4');
      const icon = iconMap[sectionTitle] || "list";
      const cleanTitle = sectionTitle.replace(/^[^a-zA-ZА-Яа-яҐґІіЇїЄє0-9\s]+/, '').trim();
      heading.innerHTML = `<i data-lucide="${icon}" class="lucide"></i> ${cleanTitle}`;
      heading.style.marginTop = "1.5rem";
      section.appendChild(heading);

      tariffs.forEach(tariff => {
  const label = document.createElement('label');
  label.classList.add('tariff-item');

 const span = document.createElement('span');
span.textContent = tariff;

const inputWrapper = document.createElement('div');
inputWrapper.classList.add('radio-wrapper');

const input = document.createElement('input');
input.type = 'radio';
input.name = 'tariff';
input.value = tariff;

inputWrapper.appendChild(input);

label.appendChild(span);
label.appendChild(inputWrapper);
  section.appendChild(label);
});


      tariffContainer.appendChild(section);
    }
  }

  // ===== lucide icons =====
  if (window.lucide) lucide.createIcons();
});

// ===== Кабінет: логіка авторизації та дій =====
function loginUser() {
  const login = document.getElementById('login')?.value;
  const password = document.getElementById('password')?.value;
  if (login && password) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('cabinet').style.display = 'block';
  } else {
    alert('Заповніть поля логіна та пароля');
  }
}

function showRegisterForm() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

function registerUser() {
  const login = document.getElementById('reg-login')?.value;
  const email = document.getElementById('reg-email')?.value;
  const password = document.getElementById('reg-password')?.value;
  const passwordConfirm = document.getElementById('reg-password-confirm')?.value;

  if (!login || !email || !password || !passwordConfirm) {
    alert('Всі поля мають бути заповнені');
    return;
  }
  if (password !== passwordConfirm) {
    alert('Паролі не співпадають');
    return;
  }

  alert('Реєстрація успішна!');
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('cabinet').style.display = 'block';
}

function openTariffModal() {
  document.getElementById('tariff-modal').classList.add('active');
}
function closeTariffModal() {
  document.getElementById('tariff-modal').classList.remove('active');
}

function changeTariff() {
  const selected = document.querySelector('input[name="tariff"]:checked');
  if (selected) {
    document.getElementById('current-tariff').textContent = selected.value;
    alert(`Тариф змінено на: ${selected.value}`);
    closeTariffModal();
  } else {
    alert('Будь ласка, оберіть тариф.');
  }
}

function openTopUpModal() {
  document.getElementById('topup-modal').classList.add('active');
}
function closeTopUpModal() {
  document.getElementById('topup-modal').classList.remove('active');
}

function topUpBalance() {
  const input = document.getElementById('topup-amount');
  const amount = parseFloat(input.value);
  if (isNaN(amount) || amount <= 0) {
    alert('Введіть коректну суму');
    return;
  }
  const balanceSpan = document.getElementById('balance');
  const current = parseFloat(balanceSpan.textContent);
  const updated = current + amount;
  balanceSpan.textContent = updated.toFixed(2);
  alert(`Рахунок поповнено на ${amount.toFixed(2)} грн`);
  input.value = '';
  closeTopUpModal();
}
