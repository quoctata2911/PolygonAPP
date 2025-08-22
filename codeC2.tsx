type Point3D = { x: number; y: number; z: number };

function rotateAroundZ(point: Point3D, alpha: number): Point3D {
  const cosAlpha = Math.cos(alpha);
  const sinAlpha = Math.sin(alpha);
  
  const rotatedX = point.x * cosAlpha - point.y * sinAlpha;
  const rotatedY = point.x * sinAlpha + point.y * cosAlpha;
  
  return {
    x: rotatedX,
    y: rotatedY,
    z: point.z // Trục z không đổi
  };
}