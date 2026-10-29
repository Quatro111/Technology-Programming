const button = document.querySelector('#load');
const status = document.querySelector('#status');
const results = document.querySelector('#results');

async function loadPosts() {
  button.disabled = true;
  status.textContent = 'Загрузка...';
  results.replaceChildren();

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=10'
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const posts = await response.json();

    if (posts.length === 0) {
      status.textContent = 'Публикации не найдены.';
      return;
    }

    for (const post of posts) {
      const item = document.createElement('li');
      item.textContent = `${post.id}. ${post.title}`;
      results.append(item);
    }

    status.textContent = `Успешно загружено: ${posts.length}`;
  } catch (error) {
    status.textContent = `Ошибка загрузки: ${error.message}`;
  } finally {
    button.disabled = false;
  }
}

button.addEventListener('click', loadPosts);
