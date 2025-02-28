import { useState } from "react";

export default function RoutePlanner() {
  const [startRoom, setStartRoom] = useState("");
  const [endRoom, setEndRoom] = useState("");

  const handleRoute = () => {
    if (startRoom && endRoom) {
      alert(`Маршрут: ${startRoom} ➝ ${endRoom}`);
    } else {
      alert("Пожалуйста, укажите начальную и конечную аудиторию!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Навигация по университету</h2>

      <label className="block mb-2 font-medium">Начальная аудитория</label>
      <input
        type="text"
        value={startRoom}
        onChange={(e) => setStartRoom(e.target.value)}
        placeholder="Введите номер аудитории"
        className="w-full p-2 border rounded-lg mb-4"
      />

      <label className="block mb-2 font-medium">Конечная аудитория</label>
      <select
        value={endRoom}
        onChange={(e) => setEndRoom(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value="">Выберите аудиторию</option>
        <option value="1001">1001</option>
        <option value="2002">2002</option>
        <option value="3003">3003</option>
        <option value="4004">4004</option>
      </select>

      <button
        onClick={handleRoute}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Построить маршрут
      </button>
    </div>
  );
}
