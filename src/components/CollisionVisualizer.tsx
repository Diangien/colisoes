import React, { useEffect, useRef } from 'react';
import { CollisionInputs, CollisionResults, CollisionType } from '../types/physics';

interface CollisionVisualizerProps {
  inputs: CollisionInputs;
  results: CollisionResults | null;
  collisionType: CollisionType;
  isCalculated: boolean;
}

export const CollisionVisualizer: React.FC<CollisionVisualizerProps> = ({
  inputs,
  results,
  collisionType,
  isCalculated
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Canvas setup and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Scale factors to fit objects on canvas
    const scale = width / 20; // 20 meters wide canvas
    const centerY = height / 2;
    
    // Object properties
    const radius1 = Math.sqrt(inputs.mass1) * 10 + 10;
    const radius2 = Math.sqrt(inputs.mass2) * 10 + 10;
    
    // Initial positions (start with some distance between objects)
    const initialPos1 = width / 2 - 150;
    const initialPos2 = width / 2 + 150;
    
    // Calculate time until collision
    const relativeVelocity = (inputs.velocity1 - inputs.velocity2) * scale;
    const distance = initialPos2 - initialPos1 - radius1 - radius2;
    const timeToCollision = relativeVelocity !== 0 ? Math.abs(distance / relativeVelocity) : Infinity;
    
    const finalVel1 = isCalculated && results ? results.finalVelocity1 : inputs.velocity1;
    const finalVel2 = isCalculated && results ? results.finalVelocity2 : inputs.velocity2;
    
    // Animation function
    const animate = (timestamp: number) => {
      if (!timeRef.current) {
        timeRef.current = timestamp;
      }
      
      const elapsedTime = (timestamp - timeRef.current) / 1000; // seconds
      timeRef.current = timestamp;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid line at center
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      
      // Animation time counter (reset after 10 seconds)
      const animTime = (timestamp / 1000) % 10;
      
      // Calculate positions based on time
      let x1, x2;
      
      if (isCalculated) {
        // After collision calculation
        const collisionTime = 5; // Fixed collision at 5 seconds
        
        if (animTime < collisionTime) {
          // Before collision
          x1 = initialPos1 + inputs.velocity1 * scale * animTime;
          x2 = initialPos2 + inputs.velocity2 * scale * animTime;
        } else {
          // After collision
          const timeSinceCollision = animTime - collisionTime;
          x1 = initialPos1 + inputs.velocity1 * scale * collisionTime + finalVel1 * scale * timeSinceCollision;
          x2 = initialPos2 + inputs.velocity2 * scale * collisionTime + finalVel2 * scale * timeSinceCollision;
        }
        
        // Draw collision point indicator
        if (Math.abs(animTime - collisionTime) < 0.1) {
          ctx.fillStyle = 'rgba(255, 165, 0, 0.5)';
          ctx.beginPath();
          ctx.arc((x1 + radius1 + x2 - radius2) / 2, centerY, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Before calculation - simple animation
        x1 = initialPos1 + inputs.velocity1 * scale * animTime;
        x2 = initialPos2 + inputs.velocity2 * scale * animTime;
      }
      
      // Draw objects
      // Object 1
      const gradient1 = ctx.createRadialGradient(
        x1, centerY, 0,
        x1, centerY, radius1
      );
      gradient1.addColorStop(0, '#60A5FA');
      gradient1.addColorStop(1, '#2563EB');
      
      ctx.fillStyle = gradient1;
      ctx.beginPath();
      ctx.arc(x1, centerY, radius1, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '14px Arial';
      ctx.fillText('m₁', x1, centerY);
      
      // Object 2
      const gradient2 = ctx.createRadialGradient(
        x2, centerY, 0,
        x2, centerY, radius2
      );
      gradient2.addColorStop(0, '#34D399');
      gradient2.addColorStop(1, '#059669');
      
      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.arc(x2, centerY, radius2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.fillText('m₂', x2, centerY);
      
      // Draw velocity vectors
      // Object 1 velocity
      const vel1 = animTime < 5 || !isCalculated ? inputs.velocity1 : finalVel1;
      if (vel1 !== 0) {
        drawArrow(ctx, x1, centerY - radius1 - 10, x1 + vel1 * 15, centerY - radius1 - 10, 
                 vel1 > 0 ? '#3B82F6' : '#EF4444');
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.abs(vel1.toFixed(1))} m/s`, x1 + vel1 * 7.5, centerY - radius1 - 25);
      }
      
      // Object 2 velocity
      const vel2 = animTime < 5 || !isCalculated ? inputs.velocity2 : finalVel2;
      if (vel2 !== 0) {
        drawArrow(ctx, x2, centerY - radius2 - 10, x2 + vel2 * 15, centerY - radius2 - 10, 
                 vel2 > 0 ? '#3B82F6' : '#EF4444');
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.abs(vel2.toFixed(1))} m/s`, x2 + vel2 * 7.5, centerY - radius2 - 25);
      }
      
      // Add animation timeline
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(width / 2 - 200, height - 20, 400, 5);
      ctx.fillStyle = '#10B981';
      ctx.fillRect(width / 2 - 200, height - 20, animTime * 40, 5);
      
      // Loop the animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Helper function to draw arrows
    function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, 
                      toX: number, toY: number, color: string) {
      const headLength = 10;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);
      
      // Line
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      
      // Arrowhead
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), 
                toY - headLength * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), 
                toY - headLength * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
    }
    
    // Start the animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inputs, results, isCalculated, collisionType]);

  return (
    <div className="flex flex-col items-center">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300} 
        className="w-full h-auto bg-blue-950/60 rounded-lg border border-blue-800/50"
      />
      <p className="text-sm text-blue-300 mt-2 text-center">
        {isCalculated 
          ? "A animação mostra velocidades pré-colisão e pós-colisão" 
          : "Introduza os valores e clique em Calcular para ver a animação da colisão"}
      </p>
    </div>
  );
};