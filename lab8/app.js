"use strict";

// Безопасное чтение JSON из хранилища
function readStorage(storage, key, fallback) {
  try {
    const raw = storage.getItem(key);

    if (raw === null) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.warn("Ошибка чтения данных:", error);
    return fallback;
  }
}

// Сохранение данных в JSON
function writeStorage(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Ошибка сохранения:", error);
    alert("Не удалось сохранить данные. Проверьте настройки браузера.");
    return false;
  }
}

// Переключение вкладок
const tabButtons = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll(".panel");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    panels.forEach(panel => {
      panel.hidden = panel.id !== button.dataset.tab;
    });
  });
});

// ==========================================
// 1. ЧЕРНОВИК СООБЩЕНИЯ
// ==========================================

const DRAFT_KEY = "lab8_message_draft";

const draftText = document.querySelector("#draftText");
const draftStatus = document.querySelector("#draftStatus");

const savedDraft = readStorage(localStorage, DRAFT_KEY, "");

draftText.value =
  typeof savedDraft === "string" ? savedDraft : "";

draftText.addEventListener("input", () => {
  if (writeStorage(localStorage, DRAFT_KEY, draftText.value)) {
    draftStatus.textContent = "Черновик автоматически сохранён.";
  } else {
    draftStatus.textContent = "Не удалось сохранить черновик.";
  }
});

document.querySelector("#clearDraft").addEventListener("click", () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
    draftText.value = "";
    draftStatus.textContent = "Черновик удалён.";
  } catch (error) {
    draftStatus.textContent = "Ошибка удаления черновика.";
  }
});

// ==========================================
// 2. МИНИ-ДНЕВНИК
// ==========================================

const DIARY_KEY = "lab8_diary";

const diaryDate = document.querySelector("#diaryDate");
const diaryText = document.querySelector("#diaryText");
const diaryStatus = document.querySelector("#diaryStatus");
const entriesElement = document.querySelector("#entries");

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

diaryDate.value = getToday();

let entries = readStorage(localStorage, DIARY_KEY, []);

if (!Array.isArray(entries)) {
  entries = [];
}

// Проверяем структуру загруженных записей
entries = entries.filter(entry =>
  entry &&
  typeof entry === "object" &&
  typeof entry.date === "string" &&
  typeof entry.text === "string"
);

function saveEntries() {
  return writeStorage(localStorage, DIARY_KEY, entries);
}

function renderEntries() {
  entriesElement.replaceChildren();

  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Записей пока нет.";
    entriesElement.append(empty);
    return;
  }

  entries.forEach((entry, index) => {
    const card = document.createElement("article");
    card.className = "entry";

    const date = document.createElement("strong");
    date.textContent = entry.date;

    const text = document.createElement("p");
    text.textContent = entry.text;

    const remove = document.createElement("button");
    remove.className = "delete-entry";
    remove.textContent = "Удалить";

    remove.addEventListener("click", () => {
      const removed = entries.splice(index, 1);

      if (saveEntries()) {
        renderEntries();
        diaryStatus.textContent = "Запись удалена.";
      } else {
        entries.splice(index, 0, ...removed);
      }
    });

    card.append(date, text, remove);
    entriesElement.append(card);
  });
}

document.querySelector("#addEntry").addEventListener("click", () => {
  const date = diaryDate.value;
  const text = diaryText.value.trim();

  if (!date || !text) {
    diaryStatus.textContent = "Заполните дату и текст записи.";
    return;
  }

  entries.push({ date, text });

  if (saveEntries()) {
    diaryText.value = "";
    diaryStatus.textContent = "Запись сохранена.";
    renderEntries();
  } else {
    entries.pop();
  }
});

renderEntries();

// ==========================================
// 3. МАСТЕР ЗАПОЛНЕНИЯ ЗАЯВКИ
// ==========================================

const WIZARD_KEY = "lab8_application_draft";
const STEP_KEY = "lab8_application_step";
const APPS_KEY = "lab8_applications";

const nameInput = document.querySelector("#appName");
const groupInput = document.querySelector("#appGroup");
const purposeInput = document.querySelector("#appPurpose");
const wizardStatus = document.querySelector("#wizardStatus");

const steps = [
  document.querySelector("#step1"),
  document.querySelector("#step2"),
  document.querySelector("#step3")
];

// Восстановление черновика из sessionStorage
let applicationDraft = readStorage(
  sessionStorage,
  WIZARD_KEY,
  { name: "", group: "", purpose: "" }
);

if (
  !applicationDraft ||
  typeof applicationDraft !== "object" ||
  Array.isArray(applicationDraft)
) {
  applicationDraft = {
    name: "",
    group: "",
    purpose: ""
  };
}

nameInput.value =
  typeof applicationDraft.name === "string"
    ? applicationDraft.name
    : "";

groupInput.value =
  typeof applicationDraft.group === "string"
    ? applicationDraft.group
    : "";

purposeInput.value =
  typeof applicationDraft.purpose === "string"
    ? applicationDraft.purpose
    : "";

// Восстановление текущего шага
let currentStep = readStorage(sessionStorage, STEP_KEY, 0);

if (
  !Number.isInteger(currentStep) ||
  currentStep < 0 ||
  currentStep > 2
) {
  currentStep = 0;
}

// Загрузка отправленных заявок
let applications = readStorage(localStorage, APPS_KEY, []);

if (!Array.isArray(applications)) {
  applications = [];
}

applications = applications.filter(app =>
  app &&
  typeof app === "object" &&
  typeof app.name === "string" &&
  typeof app.group === "string" &&
  typeof app.purpose === "string"
);

function collectDraft() {
  applicationDraft = {
    name: nameInput.value.trim(),
    group: groupInput.value.trim(),
    purpose: purposeInput.value.trim()
  };
}

function saveDraft() {
  collectDraft();

  const draftSaved = writeStorage(
    sessionStorage,
    WIZARD_KEY,
    applicationDraft
  );

  const stepSaved = writeStorage(
    sessionStorage,
    STEP_KEY,
    currentStep
  );

  if (draftSaved && stepSaved) {
    wizardStatus.textContent =
      "Черновик сохранён в текущей сессии.";
  }
}

// Автосохранение полей формы
[nameInput, groupInput, purposeInput].forEach(input => {
  input.addEventListener("input", saveDraft);
});

function renderStep() {
  steps.forEach((step, index) => {
    step.hidden = index !== currentStep;
  });

  document.querySelector("#stepNumber").textContent =
    currentStep + 1;

  document.querySelector("#prevStep").disabled =
    currentStep === 0;

  document.querySelector("#nextStep").hidden =
    currentStep === 2;

  document.querySelector("#submitApp").hidden =
    currentStep !== 2;
}

// Переход к следующему шагу
document.querySelector("#nextStep").addEventListener("click", () => {
  collectDraft();

  if (currentStep === 0 && !applicationDraft.name) {
    wizardStatus.textContent = "Введите ФИО.";
    return;
  }

  if (currentStep === 1 && !applicationDraft.group) {
    wizardStatus.textContent = "Введите учебную группу.";
    return;
  }

  if (currentStep < 2) {
    currentStep++;
    saveDraft();
    renderStep();
  }
});

// Возврат к предыдущему шагу
document.querySelector("#prevStep").addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    saveDraft();
    renderStep();
  }
});

// Отображение отправленных заявок
function renderApplications() {
  const container = document.querySelector("#applications");
  container.replaceChildren();

  if (applications.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Отправленных заявок пока нет.";
    container.append(empty);
    return;
  }

  applications.forEach((app, index) => {
    const card = document.createElement("article");
    card.className = "application";

    const heading = document.createElement("strong");
    heading.textContent = app.name;

    const group = document.createElement("p");
    group.textContent = "Группа: " + app.group;

    const purpose = document.createElement("p");
    purpose.textContent = "Цель: " + app.purpose;

    const remove = document.createElement("button");
    remove.className = "delete-entry";
    remove.textContent = "Удалить заявку";

    remove.addEventListener("click", () => {
      const previous = applications;
      applications = applications.filter((_, i) => i !== index);

      if (writeStorage(localStorage, APPS_KEY, applications)) {
        renderApplications();
      } else {
        applications = previous;
      }
    });

    card.append(heading, group, purpose, remove);
    container.append(card);
  });
}

// Отправка готовой заявки
document.querySelector("#submitApp").addEventListener("click", () => {
  collectDraft();

  if (
    !applicationDraft.name ||
    !applicationDraft.group ||
    !applicationDraft.purpose
  ) {
    wizardStatus.textContent = "Заполните все поля заявки.";
    return;
  }

  const newApplication = {
    ...applicationDraft,
    createdAt: new Date().toISOString()
  };

  applications.push(newApplication);

  if (!writeStorage(localStorage, APPS_KEY, applications)) {
    applications.pop();
    return;
  }

  // Удаляем временный черновик после успешной отправки
  try {
    sessionStorage.removeItem(WIZARD_KEY);
    sessionStorage.removeItem(STEP_KEY);
  } catch (error) {
    console.warn("Не удалось очистить черновик:", error);
  }

  applicationDraft = {
    name: "",
    group: "",
    purpose: ""
  };

  nameInput.value = "";
  groupInput.value = "";
  purposeInput.value = "";

  currentStep = 0;

  renderStep();
  renderApplications();

  wizardStatus.textContent = "Заявка успешно сохранена!";
});

renderStep();
renderApplications();
