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

  repel(mouse, delta) {
    if (mouse.x === null || mouse.y === null) return;

    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = 100;

    if (dist < minDist && dist > 0.1) {
      const angle = Math.atan2(dy, dx);
      const force = (minDist - dist) / minDist;
      this.x += Math.cos(angle) * this.mag * force * 3 * delta;
      this.y += Math.sin(angle) * this.mag * force * 3 * delta;
    }
  }

  update(mouse, dir, delta) {
    this.repel(mouse, delta);

    this.x += Math.cos(dir) * this.mag * delta;
    this.y += Math.sin(dir) * this.mag * delta;

    if (this.alpha >= 1 || this.alpha <= 0.5) {
      this.alphaMult *= -1;
    }
    this.alpha += 0.04 * this.alphaMult * delta;

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

const STAR_COUNT = window.innerWidth < 1000 ? 100 : 400;

export default function Stars() {
  const canvasRef = useRef(null);

  const starsRef = useRef([]);

  const mouseRef = useRef({ x: null, y: null });

  const initialDirRef = useRef(Math.random() * 2 * Math.PI);

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    starsRef.current = Array.from(
      { length: STAR_COUNT },
      () => new Star(size.width, size.height)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    let dir = initialDirRef.current;
    let animationFrameId;
    let lastTime = null;

    // Original motion constants were tuned per-frame assuming ~60fps.
    // Normalizing by elapsed time keeps speed identical regardless of
    // the display's refresh rate, and a clamp avoids a big teleport-y
    // jump after a dropped frame or a backgrounded tab.
    const BASE_FRAME_MS = 1000 / 60;
    const MAX_DELTA = 4;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      starsRef.current.forEach((star) => {
        star.canvasWidth = window.innerWidth;
        star.canvasHeight = window.innerHeight;
      });
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("resize", handleResize);

    const handleVisibilityChange = () => {
      // Drop the stale timestamp so we don't compute a huge delta
      // (and a big jump) when the tab becomes visible again.
      if (document.hidden) lastTime = null;
    };

    const animate = (timestamp) => {
      if (lastTime === null) lastTime = timestamp;
      const delta = Math.min(
        (timestamp - lastTime) / BASE_FRAME_MS,
        MAX_DELTA
      );
      lastTime = timestamp;

      context.clearRect(0, 0, size.width, size.height);

      starsRef.current.forEach((star) => {
        star.update(mouseRef.current, dir, delta);
        star.draw(context);
      });

      dir += 0.0001 * delta;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [size.width, size.height]);

  return (
    <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
  );
}
