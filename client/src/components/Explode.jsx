import { useRef, useState, useEffect } from "react";

export default function Explode() {
  const canvasRef = useRef(null);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const resizeCanvas = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const generateStars = (width, height) => {
    let particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        radius: Math.random() * 3 + 1,
        mag: (Math.random() + 0.2) * 20,
        dir: Math.random() * 2 * Math.PI,
        speedX: (Math.random() - 0.5) * 30,
        speedY: (Math.random() - 0.5) * 5,
        alpha: 1,
      });
    }
    return particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    let stars = generateStars(size.width, size.height);
    let animationFrameId;

    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      context.clearRect(0, 0, size.width, size.height);
      stars.forEach((s) => {
        s.x += s.mag * Math.cos(s.dir) * 2;
        s.y += s.mag * Math.sin(s.dir);
        s.alpha -= 0.015;

        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        context.fill();
      });

      stars = stars.filter((s) => s.alpha > 0);
      if (stars.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [size.width, size.height]);

  return (
    <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
  );
}
