import { useState } from 'react';
import './App.css';

// Định nghĩa kiểu dữ liệu cho một điểm
interface Point {
  x: number;
  y: number;
}

// Hàm tính khoảng cách giữa hai điểm
const calculateDistance = (p1: Point, p2: Point): number => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Hàm chính để tính độ dài các cạnh của polygon
const calculatePolygonEdges = (points: Point[]): number[] => {
  if (points.length < 2) {
    return [];
  }

  const edgeLengths: number[] = [];
  // Tính độ dài các cạnh nối liên tiếp các điểm
  for (let i = 0; i < points.length - 1; i++) {
    const distance = calculateDistance(points[i], points[i + 1]);
    edgeLengths.push(distance);
  }
  // Nối điểm cuối với điểm đầu để đóng đa giác
  const lastEdgeDistance = calculateDistance(points[points.length - 1], points[0]);
  edgeLengths.push(lastEdgeDistance);

  return edgeLengths;
};

function App() {
  const [input, setInput] = useState<string>('');
  const [edgeLengths, setEdgeLengths] = useState<number[]>([]);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      // Chuyển đổi chuỗi JSON từ textarea thành mảng các điểm
      const points: Point[] = JSON.parse(input);
      
      // Kiểm tra định dạng đầu vào có phải là mảng và các phần tử có đúng kiểu không
      if (!Array.isArray(points) || points.some(p => typeof p.x !== 'number' || typeof p.y !== 'number')) {
        setError('Dữ liệu không hợp lệ. Vui lòng nhập mảng các đối tượng {x, y}.');
        setEdgeLengths([]);
        return;
      }

      setError('');
      // Gọi hàm tính toán
      const result = calculatePolygonEdges(points);
      setEdgeLengths(result);
    } catch (e) {
      setError('Định dạng JSON không hợp lệ. Vui lòng kiểm tra lại cú pháp.');
      setEdgeLengths([]);
    }
  };

  return (
    <div className="App">
      <h1>Tính độ dài cạnh của Polygon</h1>
      <textarea
        placeholder='Nhập dữ liệu, ví dụ: [{ "x": 0, "y": 0 }, { "x": 3, "y": 0 }, { "x": 3, "y": 4 }]'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleCalculate}>Tính toán</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {edgeLengths.length > 0 && (
        <div className="results">
          <h2>Kết quả:</h2>
          <ul>
            {edgeLengths.map((length, index) => (
              <li key={index}>Cạnh {index + 1}: {length.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;