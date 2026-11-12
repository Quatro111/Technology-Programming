
import { useState } from 'react';
import './App.css';

function LikeButton({ title, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <div className="card">
      <h2>{title}</h2>

      <p>Количество лайков: ❤️ {likes}</p>

      <button onClick={() => setLikes(likes + 1)}>
        Нравится
      </button>

      <button onClick={() => setLikes(initialLikes)}>
        Сброс
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <h1>Счётчик лайков</h1>

      <LikeButton
        title="Моя публикация"
        initialLikes={0}
      />
    </div>
  );
}
