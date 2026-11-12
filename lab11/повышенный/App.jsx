import { useState } from 'react';
import './App.css';

function RoomCard({ room, booked, onBook }) {
  return (
    <div className="room">
      <div>
        <h3>{room.name}</h3>
        <p>Вместимость: {room.capacity} человек</p>
        <p className={booked ? 'busy' : 'free'}>
          {booked ? 'Забронирована' : 'Свободна'}
        </p>
      </div>

      <button
        className={booked ? 'cancel' : 'book'}
        onClick={onBook}
      >
        {booked ? 'Отменить бронь' : 'Забронировать'}
      </button>
    </div>
  );
}

function RoomBooking() {
  const [bookedRooms, setBookedRooms] = useState([]);

  const rooms = [
    { id: 1, name: 'Аудитория 101', capacity: 25 },
    { id: 2, name: 'Аудитория 202', capacity: 30 },
    { id: 3, name: 'Аудитория 303', capacity: 20 },
    { id: 4, name: 'Аудитория 404', capacity: 35 }
  ];

  function toggleBooking(id) {
    setBookedRooms(prev =>
      prev.includes(id)
        ? prev.filter(roomId => roomId !== id)
        : [...prev, id]
    );
  }

  function cancelAll() {
    setBookedRooms([]);
  }

  return (
    <div className="card">
      <h2>Список аудиторий</h2>

      {rooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          booked={bookedRooms.includes(room.id)}
          onBook={() => toggleBooking(room.id)}
        />
      ))}

      <div className="summary">
        <h3>
          Забронировано: {bookedRooms.length}
        </h3>

        <button className="cancelAll" onClick={cancelAll}>
          Отменить все бронирования
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1>Бронирование аудиторий</h1>
      <p>Лабораторная работа №11</p>
      <RoomBooking />
    </div>
  );
}

export default App;
