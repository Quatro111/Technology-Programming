const button = document.querySelector('#load');
const search = document.querySelector('#search');
const status = document.querySelector('#status');
const results = document.querySelector('#results');

let allPosts = [];

function renderPosts(posts) {
  results.replaceChildren();

  for (const post of posts) {
    const item = document.createElement('li');
    item.textContent = `${post.id}. ${post.title}`;
    results.append(item);
  }
}

function filterPosts() {
  const query = search.value.trim().toLowerCase();

  const filtered = allPosts.filter(post =>
    post.title.toLowerCase().includes(query)
  );

  renderPosts(filtered);
  status.textContent = `Найдено публикаций: ${filtered.length}`;
}

async function loadPosts() {
  button.disabled = true;
  search.disabled = true;
  status.textContent = 'Загрузка...';
  results.replaceChildren();

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    allPosts = await response.json();

    search.disabled = false;
    filterPosts();
  } catch (error) {
    allPosts = [];
    status.textContent = `Ошибка загрузки: ${error.message}`;
  } finally {
    button.disabled = false;
  }
}

button.addEventListener('click', loadPosts);
search.addEventListener('input', filterPosts);
