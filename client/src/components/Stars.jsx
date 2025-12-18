import { useRef, useState, useEffect } from "react";

class Star {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.spawn();
  }

  spawn() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.radius = (Math.random() + 0.5) * 2;
    this.mag = 1 + 0.8 * this.radius;
    this.alpha = Math.min(1, Math.random() + 0.5);
    this.alphaMult = Math.floor(Math.random() + 0.5) === 0 ? -1 : 1;
  }

  repel(mouse) {
    if (mouse.x === null || mouse.y === null) return;

    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = 100;

    if (dist < minDist && dist > 0.1) {
      const angle = Math.atan2(dy, dx);
      const force = (minDist - dist) / minDist;
      this.x += Math.cos(angle) * this.mag * force * 3;
      this.y += Math.sin(angle) * this.mag * force * 3;
    }
  }

  update(mouse, dir) {
    this.repel(mouse);

    this.x += Math.cos(dir) * this.mag;
    this.y += Math.sin(dir) * this.mag;

    if (this.alpha >= 1 || this.alpha <= 0.5) {
      this.alphaMult *= -1;
    }
    this.alpha += 0.04 * this.alphaMult;

    if (this.x > this.canvasWidth) this.x = 0;
    if (this.x < 0) this.x = this.canvasWidth;
    if (this.y > this.canvasHeight) this.y = 0;
    if (this.y < 0) this.y = this.canvasHeight;
  }

  draw(context) {
    context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

const STAR_COUNT = 400;

export default function Stars() {
  const canvasRef = useRef(null);

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const mouseRef = useRef({ x: null, y: null });

  const initialDirRef = useRef(Math.random() * 2 * Math.PI);

  const generateStars = (width, height) => {
    return Array.from({ length: STAR_COUNT }, () => new Star(width, height));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    let stars = generateStars(size.width, size.height);
    let dir = initialDirRef.current;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      context.clearRect(0, 0, size.width, size.height);

      stars.forEach((star) => {
        star.update(mouseRef.current, dir);
        star.draw(context);
      });

      dir += 0.0001;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [size.width, size.height]);

  return (
    <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
  );
}
