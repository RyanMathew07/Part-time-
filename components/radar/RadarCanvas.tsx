'use client';

import React, { useRef, useEffect } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { JobShift } from '@/types';
import { sounds } from '@/lib/soundEngine';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import { Compass01Icon, Navigation01Icon } from '@hugeicons/core-free-icons';

export function RadarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { jobs, selectedJob, setSelectedJob, radarRadiusKm } = useMarketplace();

  // Draw animated concentric radar grid and sweep line on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const centerX = w / 2;
      const centerY = h / 2;
      const maxRadius = Math.min(centerX, centerY) * 0.92;

      ctx.clearRect(0, 0, w, h);

      // Clean flat monochrome radar background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Concentric circles (rings representing distance)
      const ringCount = 4;
      for (let i = 1; i <= ringCount; i++) {
        const r = (maxRadius / ringCount) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle =
          i === ringCount
            ? 'rgba(255, 255, 255, 0.22)'
            : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash(i % 2 === 0 ? [3, 4] : []);
        ctx.stroke();
        ctx.setLineDash([]);

        // Ring distance labels
        const ringDist = ((radarRadiusKm / ringCount) * i).toFixed(1);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(`${ringDist}km`, centerX + 4, centerY - r + 12);
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Diagonal cross-ticks
      const diagDist = maxRadius * 0.7;
      ctx.beginPath();
      ctx.moveTo(centerX - diagDist, centerY - diagDist);
      ctx.lineTo(centerX + diagDist, centerY + diagDist);
      ctx.moveTo(centerX - diagDist, centerY + diagDist);
      ctx.lineTo(centerX + diagDist, centerY - diagDist);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.stroke();

      // Radar sweep sector (flat monochrome opacity, no gradient)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, angle - 0.35, angle);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fill();

      // Leading edge of sweep
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * maxRadius,
        centerY + Math.sin(angle) * maxRadius
      );
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Center User Beacon
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      angle += 0.02;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [radarRadiusKm]);

  const handlePinClick = (job: JobShift) => {
    sounds.playTap();
    setSelectedJob(job);
  };

  return (
    <div className="relative w-full h-full min-h-[360px] bg-black rounded-2xl overflow-hidden border border-[#efefef] dark:border-[#282828] select-none shadow-sm">
      {/* Background Canvas for Radar Scanning Animation (radar-sweep) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Cardinal Direction Compass Markers */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] font-mono font-medium text-[#afafaf] tracking-widest pointer-events-none">
        <HugeiconsIcon icon={Compass01Icon} className="w-3 h-3 text-white" /> N
      </div>
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-medium text-[#5e5e5e] tracking-widest pointer-events-none">
        S
      </div>
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium text-[#5e5e5e] tracking-widest pointer-events-none">
        W
      </div>
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium text-[#5e5e5e] tracking-widest pointer-events-none">
        E
      </div>

      {/* "You are here" User Beacon Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/20 animate-ping absolute" />
          <div className="w-4 h-4 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-md">
            <HugeiconsIcon icon={Navigation01Icon} className="w-2.5 h-2.5 text-black fill-black transform -rotate-45" />
          </div>
        </div>
        <Badge className="mt-1 px-2 py-0.5 rounded-full bg-black/90 text-[9px] font-mono font-medium text-white border border-white/20 whitespace-nowrap shadow-sm">
          You are here
        </Badge>
      </div>

      {/* Interactive Geo-Tagged Wage Pins */}
      {jobs.map((job) => {
        const isSelected = selectedJob?.id === job.id;

        return (
          <Button
            key={job.id}
            variant="ghost"
            onClick={() => handlePinClick(job)}
            style={{
              left: `${job.coords.x}%`,
              top: `${job.coords.y}%`,
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform duration-150 ease-out z-10 active:scale-90 p-0 h-auto border-0 bg-transparent hover:bg-transparent ${
              isSelected ? 'scale-110 z-20' : 'hover:scale-105'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium shadow-md transition-colors duration-150 ease-out ${
                isSelected
                  ? 'bg-black text-white border-2 border-white ring-2 ring-black/20'
                  : 'bg-white text-black border border-[#efefef] hover:bg-[#efefef] dark:bg-[#1a1a1a] dark:text-white dark:border-[#282828] dark:hover:bg-[#242424]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-white' : 'bg-black dark:bg-white'
                }`}
              />
              <span>{formatCurrency(job.wage)}</span>
            </div>

            {/* Tooltip on Hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out pointer-events-none whitespace-nowrap bg-black px-3 py-1 rounded-full border border-white/20 text-xs text-white shadow-md z-30 font-medium">
              <span className="text-white">{job.employer}</span>
              <span className="text-[#afafaf] ml-1.5 font-normal">• {job.title}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
