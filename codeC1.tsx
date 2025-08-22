type Point = { x: number; y: number };
type Rect = [Point, Point, Point, Point];

// Chuyển đổi từ 4 điểm sang tọa độ min/max
function getRectBounds(rect: Rect): { minX: number; minY: number; maxX: number; maxY: number } {
  const allX = rect.map(p => p.x);
  const allY = rect.map(p => p.y);
  
  const minX = Math.min(...allX);
  const minY = Math.min(...allY);
  const maxX = Math.max(...allX);
  const maxY = Math.max(...allY);
  
  return { minX, minY, maxX, maxY };
}

function isIntersecting(rect1: Rect, rect2: Rect): boolean {
  // Lấy tọa độ min/max cho cả hai hình chữ nhật
  const bounds1 = getRectBounds(rect1);
  const bounds2 = getRectBounds(rect2);
  
  // Kiểm tra điều kiện "không giao nhau"
  const noIntersection = 
    bounds1.maxX < bounds2.minX || // rect1 bên trái rect2
    bounds1.minX > bounds2.maxX || // rect1 bên phải rect2
    bounds1.maxY < bounds2.minY || // rect1 ở trên rect2
    bounds1.minY > bounds2.maxY;    // rect1 ở dưới rect2
    
  // Nếu chúng không giao nhau, hàm trả về false.
  // Ngược lại, chúng giao nhau, hàm trả về true.
  return !noIntersection;
}