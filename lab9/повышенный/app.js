const button = document.querySelector('#load');
const status = document.querySelector('#status');
const results = document.querySelector('#results');

async function loadData() {
  button.disabled = true;
  status.textContent = 'Загрузка пользователей и публикаций...';
  results.replaceChildren();

  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts')
    ]);

    if (!usersResponse.ok || !postsResponse.ok) {
      throw new Error(
        `Ошибка HTTP: пользователи — ${usersResponse.status}, ` +
        `публикации — ${postsResponse.status}`
      );
    }

    const [users, posts] = await Promise.all([
      usersResponse.json(),
      postsResponse.json()
    ]);

    for (const user of users) {
      const count = posts.filter(
        post => post.userId === user.id
      ).length;

      const card = document.createElement('article');
      card.className = 'card';

      const name = document.createElement('h3');
      name.textContent = user.name;

      const email = document.createElement('p');
      email.textContent = `Email: ${user.email}`;

      const city = document.createElement('p');
      city.textContent = `Город: ${user.address.city}`;

      const postCount = document.createElement('p');
      postCount.textContent = `Количество публикаций: ${count}`;

      card.append(name, email, city, postCount);
      results.append(card);
    }

    status.textContent =
      `Успешно загружено пользователей: ${users.length}. ` +
      `Всего публикаций: ${posts.length}.`;
  } catch (error) {
    status.textContent = `Ошибка загрузки: ${error.message}`;
  } finally {
    button.disabled = false;
  }
}

button.addEventListener('click', loadData);
