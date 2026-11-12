import { useState } from 'react';
import './App.css';

function TabButton({ title, active, onClick }) {
  return (
    <button
      className={active ? 'active' : ''}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

function Tabs() {
  const [activeTab, setActiveTab] = useState('О нас');

  const content = {
    'О нас': 'Мы изучаем современные технологии программирования.',
    'React': 'React — библиотека JavaScript для создания интерфейсов.',
    'Контакты': 'Связаться с нами можно через электронную почту.'
  };

  return (
    <div className="card">
      <h2>Информационные вкладки</h2>

      <div className="tabs">
        {Object.keys(content).map(tab => (
          <TabButton
            key={tab}
            title={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      <div className="content">
        <h3>{activeTab}</h3>
        <p>{content[activeTab]}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1>Лабораторная работа №11</h1>
      <p>Задание №14 — Вкладки</p>
      <Tabs />
    </div>
  );
}

export default App;
