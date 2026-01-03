import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    angle: number;
    opacity: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const stars: Star[] = [];
        const shootingStars: ShootingStar[] = [];
        const mouseRadius = 150;

        // Theme detection
        const isDark = () => document.documentElement.classList.contains('dark') ||
            !document.documentElement.classList.contains('light');

        const getColors = () => {
            if (isDark()) {
                return {
                    starCore: 'rgba(255, 255, 255,',
                    starGlow: 'rgba(224, 231, 255,',
                    nebulaPrimary: 'rgba(139, 92, 246,',
                    nebulaSecondary: 'rgba(59, 130, 246,',
                    nebulaSolar: 'rgba(245, 158, 11,',
                    constellation: 'rgba(139, 92, 246,',
                };
            } else {
                return {
                    starCore: 'rgba(124, 58, 237,',
                    starGlow: 'rgba(139, 92, 246,',
                    nebulaPrimary: 'rgba(124, 58, 237,',
                    nebulaSecondary: 'rgba(37, 99, 235,',
                    nebulaSolar: 'rgba(217, 119, 6,',
                    constellation: 'rgba(124, 58, 237,',
                };
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createStar = (): Star => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            return {
                x,
                y,
                baseX: x,
                baseY: y,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
            };
        };

        const createShootingStar = (): ShootingStar => ({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height / 2),
            length: Math.random() * 80 + 40,
            speed: Math.random() * 15 + 10,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
            opacity: 1,
        });

        const init = () => {
            stars.length = 0;
            const count = window.innerWidth < 768 ? 80 : 200;
            for (let i = 0; i < count; i++) {
                stars.push(createStar());
            }
        };

        const drawStar = (star: Star, time: number) => {
            const colors = getColors();
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
            const opacity = star.opacity * twinkle;

            // Star glow
            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.size * 3
            );
            gradient.addColorStop(0, `${colors.starGlow}${opacity})`);
            gradient.addColorStop(0.3, `${colors.nebulaPrimary}${opacity * 0.5})`);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Star core
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `${colors.starCore}${opacity})`;
            ctx.fill();
        };

        const drawShootingStar = (star: ShootingStar) => {
            if (star.opacity <= 0) return;
            const colors = getColors();

            const endX = star.x + Math.cos(star.angle) * star.length;
            const endY = star.y + Math.sin(star.angle) * star.length;

            const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
            gradient.addColorStop(0, `${colors.starCore}${star.opacity})`);
            gradient.addColorStop(0.3, `${colors.nebulaPrimary}${star.opacity * 0.8})`);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `${colors.starCore}${star.opacity})`;
            ctx.fill();
        };

        const updateStars = () => {
            const mouse = mouseRef.current;

            for (const star of stars) {
                const dx = mouse.x - star.x;
                const dy = mouse.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    star.x = star.baseX - Math.cos(angle) * force * 30;
                    star.y = star.baseY - Math.sin(angle) * force * 30;
                } else {
                    star.x += (star.baseX - star.x) * 0.05;
                    star.y += (star.baseY - star.y) * 0.05;
                }
            }
        };

        const updateShootingStars = () => {
            if (Math.random() < 0.005 && shootingStars.length < 3) {
                shootingStars.push(createShootingStar());
            }

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.opacity -= 0.01;

                if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
                    shootingStars.splice(i, 1);
                }
            }
        };

        const drawNebula = () => {
            const colors = getColors();
            const dark = isDark();
            const baseOpacity = dark ? 1 : 0.5;

            const nebula1 = ctx.createRadialGradient(
                canvas.width * 0.2, canvas.height * 0.3, 0,
                canvas.width * 0.2, canvas.height * 0.3, 300
            );
            nebula1.addColorStop(0, `${colors.nebulaPrimary}${0.08 * baseOpacity})`);
            nebula1.addColorStop(0.5, `${colors.nebulaPrimary}${0.03 * baseOpacity})`);
            nebula1.addColorStop(1, 'transparent');
            ctx.fillStyle = nebula1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const nebula2 = ctx.createRadialGradient(
                canvas.width * 0.8, canvas.height * 0.7, 0,
                canvas.width * 0.8, canvas.height * 0.7, 400
            );
            nebula2.addColorStop(0, `${colors.nebulaSecondary}${0.06 * baseOpacity})`);
            nebula2.addColorStop(0.5, `${colors.nebulaSecondary}${0.02 * baseOpacity})`);
            nebula2.addColorStop(1, 'transparent');
            ctx.fillStyle = nebula2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Mouse glow
            const mouse = mouseRef.current;
            if (mouse.x > 0 && mouse.y > 0) {
                const mouseGlow = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, 200
                );
                mouseGlow.addColorStop(0, `${colors.nebulaPrimary}${0.08 * baseOpacity})`);
                mouseGlow.addColorStop(0.5, `${colors.nebulaSecondary}${0.04 * baseOpacity})`);
                mouseGlow.addColorStop(1, 'transparent');
                ctx.fillStyle = mouseGlow;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        };

        const drawConstellations = () => {
            const colors = getColors();
            const mouse = mouseRef.current;
            const nearbyStars = stars.filter(star => {
                const dx = mouse.x - star.x;
                const dy = mouse.y - star.y;
                return Math.sqrt(dx * dx + dy * dy) < 200;
            });

            if (nearbyStars.length > 1) {
                for (let i = 0; i < nearbyStars.length - 1; i++) {
                    for (let j = i + 1; j < nearbyStars.length; j++) {
                        const dx = nearbyStars[i].x - nearbyStars[j].x;
                        const dy = nearbyStars[i].y - nearbyStars[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(nearbyStars[i].x, nearbyStars[i].y);
                            ctx.lineTo(nearbyStars[j].x, nearbyStars[j].y);
                            ctx.strokeStyle = `${colors.constellation}${0.3 - distance / 400})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }
        };

        let time = 0;
        const animate = () => {
            time += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawNebula();
            updateStars();
            drawConstellations();
            stars.forEach(star => drawStar(star, time));
            updateShootingStars();
            shootingStars.forEach(drawShootingStar);

            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        resize();
        init();
        animate();

        window.addEventListener('resize', () => {
            resize();
            init();
        });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="particles-canvas"
        />
    );
}
