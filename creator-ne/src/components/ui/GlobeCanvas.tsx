"use client";

import { useEffect, useRef } from "react";

// World map land mass dots [lat, lon] in degrees
// Sampled from actual world map outlines for a recognizable result
const WORLD_DOTS: [number, number][] = [
  // --- North America ---
  [60,-140],[62,-138],[64,-136],[66,-134],[68,-140],[70,-130],[72,-120],[70,-110],[68,-100],
  [65,-95],[60,-95],[58,-92],[56,-88],[55,-80],[58,-75],[62,-70],[65,-65],[60,-65],[55,-60],
  [50,-55],[47,-53],[45,-60],[45,-65],[45,-70],[44,-75],[43,-79],[42,-82],[42,-86],[42,-90],
  [42,-95],[42,-100],[40,-100],[38,-100],[36,-100],[35,-100],[34,-100],[33,-100],[32,-100],
  [30,-98],[28,-97],[26,-97],[25,-97],[24,-104],[26,-108],[28,-110],[30,-110],[32,-114],
  [34,-118],[36,-120],[38,-122],[40,-124],[42,-124],[44,-124],[46,-124],[48,-124],[50,-126],
  [52,-128],[54,-130],[56,-132],[58,-135],[60,-138],[62,-136],[64,-130],[66,-128],[68,-120],
  [70,-115],[72,-108],[70,-100],[68,-95],[65,-85],[60,-70],[55,-55],[50,-55],[48,-53],
  [46,-60],[44,-65],[42,-70],[40,-74],[38,-75],[36,-76],[34,-77],[32,-80],[30,-81],[28,-81],
  [26,-80],[25,-81],[28,-96],[30,-90],[32,-90],[34,-86],[36,-84],[38,-84],[40,-83],
  [48,-120],[46,-116],[44,-116],[42,-112],[40,-105],[38,-105],[36,-106],[34,-108],[32,-106],
  [55,-75],[57,-76],[59,-78],[61,-80],[63,-82],[65,-84],[67,-86],[69,-88],[71,-90],
  [50,-65],[52,-66],[54,-68],[56,-72],[58,-74],[60,-76],[62,-74],[64,-72],[66,-70],
  // Canada north
  [72,-95],[74,-90],[76,-85],[78,-80],[80,-85],[78,-90],[76,-95],[74,-100],[72,-105],
  [70,-105],[68,-110],[72,-115],[74,-120],[76,-115],[78,-110],[80,-100],
  // Greenland
  [76,-20],[78,-25],[80,-30],[82,-35],[84,-30],[82,-25],[80,-20],[78,-15],[76,-20],
  [72,-25],[70,-22],[68,-20],[66,-18],[68,-15],[70,-18],[72,-20],
  // Alaska
  [60,-160],[62,-158],[64,-160],[66,-162],[64,-164],[62,-165],[60,-162],
  [58,-155],[56,-155],[58,-150],[60,-148],[62,-145],[64,-143],[66,-141],

  // --- South America ---
  [10,-75],[8,-72],[6,-70],[4,-68],[2,-68],[0,-70],[-2,-70],[-4,-68],[-6,-68],
  [-8,-70],[-10,-70],[-12,-70],[-14,-72],[-16,-74],[-18,-70],[-20,-70],[-22,-42],
  [-24,-44],[-26,-48],[-28,-50],[-30,-51],[-32,-52],[-34,-53],[-36,-56],[-38,-57],
  [-40,-62],[-42,-64],[-44,-65],[-46,-67],[-48,-66],[-50,-68],[-52,-70],[-54,-68],
  [-52,-72],[-50,-74],[-48,-75],[-46,-74],[-44,-73],[-42,-72],[-40,-72],[-38,-70],
  [-36,-57],[-34,-53],[-32,-52],[-30,-51],[-28,-48],[-26,-48],[-24,-43],[-22,-41],
  [-20,-40],[-18,-38],[-16,-38],[-14,-38],[-12,-38],[-10,-37],[-8,-35],[-6,-35],
  [-4,-36],[-2,-40],[0,-50],[2,-52],[4,-52],[6,-52],[8,-60],[10,-63],
  [12,-70],[10,-68],[8,-66],[6,-62],[4,-60],[2,-58],[0,-52],[-2,-50],
  [12,-72],[14,-74],[10,-75],[8,-77],[6,-77],[4,-77],[2,-77],[0,-78],
  [-2,-80],[-4,-80],[-6,-78],[-8,-77],[-10,-76],[-12,-76],[-14,-74],[-16,-74],
  [0,-66],[2,-64],[4,-62],[6,-60],[8,-62],[10,-64],[6,-76],[4,-74],[2,-72],[0,-70],

  // --- Europe ---
  [60,10],[58,8],[56,8],[54,8],[52,5],[50,4],[48,2],[46,0],[44,-2],[42,0],
  [40,0],[38,0],[36,2],[36,6],[36,10],[38,14],[40,16],[42,14],[44,12],[46,14],
  [48,16],[50,18],[52,20],[54,20],[56,22],[58,24],[60,26],[62,26],[64,24],[65,22],
  [66,20],[68,18],[70,24],[72,28],[70,30],[68,30],[66,28],[64,26],[62,24],[60,24],
  [58,22],[56,22],[54,18],[52,16],[50,14],[48,10],[46,8],[44,8],[42,4],[40,2],
  [38,2],[36,4],[38,8],[40,12],[42,12],[44,10],[46,6],[48,4],[50,8],[52,12],
  [54,14],[56,14],[58,16],[60,18],[62,20],[64,22],[66,24],[68,26],[70,28],
  [44,26],[46,28],[48,28],[50,30],[52,24],[54,24],[56,24],[58,26],[60,28],
  [62,28],[64,30],[66,28],[65,14],[63,14],[61,12],[59,10],[57,10],[55,10],
  [53,10],[51,10],[49,8],[47,8],[45,8],[43,6],[41,4],[39,4],[37,4],[36,6],
  // UK/Ireland
  [60,-1],[58,-2],[56,-4],[54,-4],[52,-4],[50,-4],[52,-1],[54,0],[56,0],[58,-2],
  [54,-6],[55,-7],[53,-7],[51,-6],[53,-4],
  // Scandinavia
  [70,18],[72,22],[74,26],[72,28],[70,26],[68,28],[66,26],[64,24],[62,26],[60,24],
  [58,22],[56,20],[54,18],[56,16],[58,14],[60,12],[62,10],[64,12],[66,14],[68,18],
  [65,16],[63,16],[61,14],[59,12],[57,12],[55,12],[53,12],

  // --- Africa ---
  [36,10],[34,10],[32,12],[30,12],[28,14],[26,14],[24,14],[22,12],[20,12],[18,14],
  [16,14],[14,14],[12,14],[10,14],[8,14],[6,12],[4,10],[2,10],[0,10],
  [-2,10],[-4,10],[-6,12],[-8,14],[-10,14],[-12,14],[-14,12],[-16,12],
  [-18,14],[-20,14],[-22,14],[-24,16],[-26,16],[-28,16],[-30,17],[-32,18],
  [-34,18],[-34,20],[-32,22],[-30,24],[-28,26],[-26,28],[-24,32],[-22,34],
  [-20,36],[-18,36],[-16,36],[-14,36],[-12,36],[-10,38],[-8,40],[-6,40],
  [-4,38],[-2,36],[0,34],[2,34],[4,36],[6,38],[8,40],[10,40],[12,40],
  [14,40],[16,40],[18,38],[20,36],[22,36],[24,34],[26,32],[28,30],[30,28],
  [32,26],[34,22],[36,14],[34,12],[32,14],[30,14],[28,16],[26,16],[24,16],
  [22,16],[20,16],[18,16],[16,16],[14,16],[12,16],[10,16],[8,16],[6,14],
  [4,12],[2,14],[0,14],[0,24],[2,26],[4,28],[6,30],[8,32],[10,34],[12,36],
  [14,38],[16,38],[18,38],[20,38],[22,38],[24,36],[26,34],[28,32],[30,30],
  [32,28],[34,26],[36,18],[35,12],[33,12],[31,14],[29,14],[27,16],[25,14],
  [24,24],[22,28],[20,32],[18,34],[16,36],[14,36],[10,36],[8,36],[6,36],
  [4,34],[2,34],[0,30],[0,20],[2,20],[4,20],[6,20],[8,20],[10,20],[12,20],
  [14,20],[16,20],[18,20],[20,20],[22,20],[24,20],[26,20],[28,20],[30,20],

  // --- Asia ---
  // Middle East
  [36,36],[34,36],[32,36],[30,34],[28,34],[26,36],[24,36],[22,36],[20,40],[22,44],
  [24,46],[26,48],[28,50],[30,50],[32,48],[34,46],[36,40],[38,38],[40,36],[38,44],
  [36,44],[34,44],[32,42],[30,40],[28,42],[26,44],[24,44],[22,44],
  // Turkey/Caucasus
  [40,30],[42,30],[44,32],[46,36],[44,38],[42,40],[40,40],[38,40],[36,38],[36,30],
  [38,30],[40,32],[42,34],[44,36],[46,38],[48,40],[46,44],[44,44],[42,44],[40,44],
  // Central Asia
  [40,52],[42,54],[44,56],[46,58],[48,60],[50,62],[52,64],[54,66],[52,60],[50,56],
  [48,52],[46,50],[44,50],[42,50],[40,50],[38,48],[36,46],[40,46],[42,48],[44,50],
  [46,52],[48,56],[50,58],[52,62],[54,64],[56,66],[58,68],[60,70],[62,72],
  [64,70],[66,68],[68,66],[70,64],[72,66],[74,68],[72,72],[70,72],[68,72],
  [66,72],[64,74],[62,74],[60,72],[58,70],[56,68],[54,66],[52,64],[50,60],
  // Russia/Siberia
  [55,80],[57,82],[59,84],[61,86],[63,88],[65,90],[67,92],[69,94],[71,96],
  [69,98],[67,100],[65,98],[63,96],[61,94],[59,92],[57,90],[55,88],[53,88],
  [51,86],[50,82],[52,80],[54,78],[56,76],[58,74],[60,76],[62,78],[64,80],
  [66,82],[68,84],[70,86],[72,88],[74,90],[76,92],[74,96],[72,98],[70,100],
  [68,102],[66,104],[64,106],[62,108],[60,110],[58,110],[56,108],[54,106],
  [52,104],[50,102],[48,100],[46,100],[48,106],[50,108],[52,110],[54,112],
  [56,114],[58,116],[60,118],[62,120],[64,120],[66,118],[68,116],[70,118],
  [72,120],[74,122],[72,124],[70,126],[68,128],[66,130],[64,132],[62,134],
  [60,136],[58,138],[56,140],[58,142],[60,144],[62,146],[64,148],[66,150],
  [68,152],[70,154],[70,160],[68,158],[66,156],[64,154],[62,152],[60,150],
  [58,148],[56,146],[54,144],[52,142],[50,140],[48,138],[46,136],[44,134],
  [42,132],[40,130],[42,128],[44,130],[46,132],[48,134],[50,136],[52,138],
  // China/East Asia
  [40,110],[42,112],[44,114],[42,116],[40,118],[38,118],[36,118],[34,118],
  [32,118],[30,116],[28,116],[26,114],[24,112],[22,110],[20,110],[22,108],
  [24,106],[26,108],[28,110],[30,112],[32,114],[34,112],[36,112],[38,110],
  [40,108],[42,106],[44,108],[46,110],[48,112],[50,114],[52,116],[50,118],
  [48,120],[46,120],[44,122],[42,124],[44,126],[46,128],[48,130],[50,132],
  [30,120],[32,120],[34,120],[36,120],[38,122],[36,122],[34,122],[32,122],
  [30,122],[28,120],[26,120],[24,118],[22,114],[20,112],[22,112],[24,114],
  [26,112],[28,114],[30,114],[32,116],[24,102],[26,104],[28,106],[30,108],
  // India
  [28,72],[26,74],[24,74],[22,72],[20,72],[18,74],[16,74],[14,76],[12,76],
  [10,76],[8,78],[8,80],[10,80],[12,80],[14,80],[16,80],[18,84],[20,86],
  [22,88],[24,88],[26,86],[28,80],[30,76],[28,74],[26,76],[24,76],[22,76],
  [20,76],[18,76],[16,78],[14,78],[12,78],[10,78],[8,76],[8,74],[10,74],
  [12,74],[14,74],[16,74],[18,72],[20,74],[22,74],[24,72],[26,72],[28,70],
  // Southeast Asia
  [22,100],[20,100],[18,100],[16,100],[14,100],[12,102],[10,104],[8,100],
  [6,100],[4,100],[2,102],[0,104],[-2,108],[-4,110],[-2,112],[0,110],[2,108],
  [4,106],[6,104],[8,104],[10,104],[12,104],[14,104],[16,104],[18,104],
  [20,104],[22,104],[24,100],[22,98],[20,98],[18,96],[16,96],[14,96],[12,98],
  [10,98],[8,96],[6,100],[4,102],[2,104],[0,106],[-2,106],[-4,108],
  [4,114],[6,116],[8,118],[6,120],[4,118],[2,116],[0,114],[-2,112],
  // Japan/Korea
  [34,130],[36,130],[38,128],[40,128],[42,130],[44,132],[42,134],[40,136],
  [38,138],[36,138],[34,136],[32,130],[34,132],[36,132],[38,132],[40,130],
  [35,136],[36,138],[37,140],[38,142],[36,140],[34,138],[32,132],[34,130],

  // --- Australia ---
  [-16,130],[-18,132],[-20,130],[-22,130],[-24,130],[-26,128],[-28,130],
  [-30,130],[-32,130],[-34,130],[-36,148],[-34,150],[-32,152],[-30,152],
  [-28,152],[-26,152],[-24,150],[-22,148],[-20,148],[-18,146],[-16,145],
  [-14,144],[-12,142],[-14,136],[-12,134],[-14,130],[-16,128],[-18,126],
  [-20,118],[-22,114],[-24,114],[-26,114],[-28,114],[-30,115],[-32,116],
  [-34,118],[-36,136],[-34,138],[-32,138],[-30,138],[-28,138],[-26,136],
  [-24,136],[-22,136],[-20,136],[-18,136],[-16,136],[-14,136],
  [-25,120],[-27,122],[-29,124],[-31,126],[-33,128],[-35,130],
  [-28,120],[-26,120],[-24,120],[-22,120],[-20,122],[-18,124],[-16,126],
  // New Zealand
  [-36,174],[-38,176],[-40,176],[-42,174],[-44,170],[-46,170],[-44,168],
  [-42,172],[-40,174],[-38,174],[-36,174],

  // --- Japan islands extra ---
  [32,130],[34,134],[36,136],[38,140],[40,142],[42,140],[44,142],[42,144],[40,146],

  // --- Philippines ---
  [18,122],[16,120],[14,120],[12,122],[10,124],[8,124],[10,122],[12,124],[14,122],
  [16,122],[18,124],[10,126],[12,126],[14,126],

  // --- Indonesia ---
  [0,108],[-2,112],[-4,114],[-6,112],[-6,108],[-4,106],[-2,108],[0,110],
  [-8,118],[-8,122],[-6,124],[-4,120],[-6,116],[-8,116],[-8,120],
];

interface GlobeCanvasProps {
  size?: number;
}

export function GlobeCanvas({ size = 680 }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.40;

    const toRad = (d: number) => (d * Math.PI) / 180;

    // Define geographical curves (arcs) connecting regions
    const ARCS = [
      { latA: 40, lonA: -74, latB: 48, lonB: 2, color: "rgba(168, 85, 247, 0.4)", pulseColor: "rgba(233, 213, 255, 1)", speed: 0.006 }, // NY to Paris
      { latA: 9, lonA: 40, latB: 20, lonB: 78, color: "rgba(6, 182, 212, 0.4)", pulseColor: "rgba(207, 250, 254, 1)", speed: 0.005 },   // East Africa to India
      { latA: 34, lonA: 118, latB: -25, lonB: 130, color: "rgba(16, 185, 129, 0.4)", pulseColor: "rgba(209, 250, 229, 1)", speed: 0.007 }, // China to Australia
      { latA: 62, lonA: -120, latB: 10, lonB: -70, color: "rgba(236, 72, 153, 0.4)", pulseColor: "rgba(251, 207, 232, 1)", speed: 0.004 },  // Canada to North SA
    ];

    // -1 means waiting to spawn.
    const pulseProgressions = [-1, -1, -1, -1];

    function drawFrame(rotation: number) {
      ctx!.clearRect(0, 0, size, size);

      // ── Sphere gradient fill ──
      // Removed intense glow inside so only dots appear glowing
      const sphereGrad = ctx!.createRadialGradient(
        cx, cy, radius * 0.5,
        cx, cy, radius
      );
      sphereGrad.addColorStop(0, "rgba(5, 0, 15, 0.2)");
      sphereGrad.addColorStop(1, "rgba(0, 0, 0, 0.6)");

      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.fillStyle = sphereGrad;
      ctx!.fill();

      // ── Dots ──
      for (const [lat, lon] of WORLD_DOTS) {
        const phi = toRad(90 - lat);
        const theta = toRad(lon) + rotation;

        const x3 = Math.sin(phi) * Math.sin(theta);
        const y3 = Math.cos(phi);
        const z3 = Math.sin(phi) * Math.cos(theta);

        // Only front hemisphere
        if (z3 < -0.05) continue;

        const px = cx + radius * x3;
        const py = cy - radius * y3;

        // Depth-based brightness & size
        const depth = (z3 + 1) / 2; // 0..1
        const dotRadius = 1.4 + depth * 1.4;
        const alpha = 0.35 + depth * 0.65;

        // Color shift: bright center → dimmer edge
        const r = Math.round(190 + depth * 65);
        const g = Math.round(100 + depth * 80);
        const b = 255;

        ctx!.beginPath();
        ctx!.arc(px, py, dotRadius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.fill();
      }

      // ── Glowing Connecting Arcs ──
      ARCS.forEach((arc, index) => {
        if (pulseProgressions[index] < 0) return; // Hide completely when not active or during cooldown

        const segments = 35;
        let first = true;
        let visibleCount = 0;

        ctx!.beginPath();
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const lat = arc.latA + (arc.latB - arc.latA) * t;
          const lon = arc.lonA + (arc.lonB - arc.lonA) * t;
          const h = 1.0 + Math.sin(t * Math.PI) * 0.18; // Curve height factor (made bigger)

          const phi = toRad(90 - lat);
          const theta = toRad(lon) + rotation;

          const x3 = Math.sin(phi) * Math.sin(theta) * h;
          const y3 = Math.cos(phi) * h;
          const z3 = Math.sin(phi) * Math.cos(theta) * h;

          if (z3 < -0.1) {
            first = true;
            continue;
          }

          const px = cx + radius * x3;
          const py = cy - radius * y3;

          if (first) {
            ctx!.moveTo(px, py);
            first = false;
          } else {
            ctx!.lineTo(px, py);
          }
          visibleCount++;
        }

        if (visibleCount > 1) {
          // Glowing border (outer line)
          ctx!.strokeStyle = arc.pulseColor.replace(", 1)", ", 0.8)");
          ctx!.lineWidth = 3.5;
          ctx!.stroke();

          // Black inner line
          ctx!.strokeStyle = "rgba(0, 0, 0, 1)";
          ctx!.lineWidth = 1.5;
          ctx!.stroke();
        }

        // Draw stationary glowing endpoints
        const drawEndpoint = (lat: number, lon: number) => {
          const phiE = toRad(90 - lat);
          const thetaE = toRad(lon) + rotation;
          const x3E = Math.sin(phiE) * Math.sin(thetaE);
          const y3E = Math.cos(phiE);
          const z3E = Math.sin(phiE) * Math.cos(thetaE);
          
          if (z3E >= -0.1) {
            const pxE = cx + radius * x3E;
            const pyE = cy - radius * y3E;
            
            ctx!.beginPath();
            ctx!.arc(pxE, pyE, 2.5, 0, Math.PI * 2);
            ctx!.fillStyle = arc.pulseColor;
            ctx!.fill();
            
            const glowE = ctx!.createRadialGradient(pxE, pyE, 0, pxE, pyE, 10);
            glowE.addColorStop(0, arc.pulseColor.replace(", 1)", ", 0.8)"));
            glowE.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx!.beginPath();
            ctx!.arc(pxE, pyE, 10, 0, Math.PI * 2);
            ctx!.fillStyle = glowE;
            ctx!.fill();
          }
        };
        drawEndpoint(arc.latA, arc.lonA);
        drawEndpoint(arc.latB, arc.lonB);

        // Draw animated pulse dot
        const tPulse = pulseProgressions[index];
        const latP = arc.latA + (arc.latB - arc.latA) * tPulse;
        const lonP = arc.lonA + (arc.lonB - arc.lonA) * tPulse;
        const hP = 1.0 + Math.sin(tPulse * Math.PI) * 0.18; // Match curve height factor

        const phiP = toRad(90 - latP);
        const thetaP = toRad(lonP) + rotation;

        const x3P = Math.sin(phiP) * Math.sin(thetaP) * hP;
        const y3P = Math.cos(phiP) * hP;
        const z3P = Math.sin(phiP) * Math.cos(thetaP) * hP;

        if (z3P >= -0.1) {
          const pxP = cx + radius * x3P;
          const pyP = cy - radius * y3P;

          // Calculate next point to find tangent/direction for the arrow
          const tNext = Math.min(tPulse + 0.02, 1);
          const latNext = arc.latA + (arc.latB - arc.latA) * tNext;
          const lonNext = arc.lonA + (arc.lonB - arc.lonA) * tNext;
          const hNext = 1.0 + Math.sin(tNext * Math.PI) * 0.18;
          const phiNext = toRad(90 - latNext);
          const thetaNext = toRad(lonNext) + rotation;
          const x3Next = Math.sin(phiNext) * Math.sin(thetaNext) * hNext;
          const y3Next = Math.cos(phiNext) * hNext;
          const pxNext = cx + radius * x3Next;
          const pyNext = cy - radius * y3Next;
          
          const angle = Math.atan2(pyNext - pyP, pxNext - pxP);

          // Outer flare glow behind the arrow
          const flareGlow = ctx!.createRadialGradient(pxP, pyP, 0, pxP, pyP, 15);
          flareGlow.addColorStop(0, arc.pulseColor.replace(", 1)", ", 0.9)"));
          flareGlow.addColorStop(0.4, arc.pulseColor.replace(", 1)", ", 0.3)"));
          flareGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx!.beginPath();
          ctx!.arc(pxP, pyP, 15, 0, Math.PI * 2);
          ctx!.fillStyle = flareGlow;
          ctx!.fill();

          // Draw the arrowhead pointing along the path
          ctx!.save();
          ctx!.translate(pxP, pyP);
          ctx!.rotate(angle);
          
          ctx!.beginPath();
          ctx!.moveTo(6, 0);     // Tip of arrow
          ctx!.lineTo(-4, 5);    // Bottom right
          ctx!.lineTo(-1, 0);    // Back center (indent)
          ctx!.lineTo(-4, -5);   // Bottom left
          ctx!.closePath();
          
          ctx!.fillStyle = arc.pulseColor;
          ctx!.fill();
          
          // Add a glowing stroke to the arrow for extra pop
          ctx!.strokeStyle = "white";
          ctx!.lineWidth = 1;
          ctx!.stroke();
          
          ctx!.restore();
        }
      });

      // ── Super Glowing Corona (Fading Outwards) ──
      const coronaGrad = ctx!.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.22);
      coronaGrad.addColorStop(0, "rgba(168, 85, 247, 0)");
      coronaGrad.addColorStop(0.12, "rgba(220, 150, 255, 0.95)"); // Intense peak at the rim boundary
      coronaGrad.addColorStop(0.3, "rgba(168, 85, 247, 0.65)");
      coronaGrad.addColorStop(0.65, "rgba(147, 51, 234, 0.28)");
      coronaGrad.addColorStop(1, "rgba(147, 51, 234, 0)"); // Smooth fade-out

      ctx!.beginPath();
      ctx!.arc(cx, cy, radius * 1.22, 0, Math.PI * 2);
      ctx!.fillStyle = coronaGrad;
      ctx!.fill();

      // ── Atmospheric rim glow (Stronger Glow) ──
      const rimGrad = ctx!.createRadialGradient(cx, cy, radius * 0.78, cx, cy, radius * 1.12);
      rimGrad.addColorStop(0, "rgba(160, 70, 255, 0)");
      rimGrad.addColorStop(0.5, "rgba(160, 70, 255, 0.05)");
      rimGrad.addColorStop(0.85, "rgba(180, 80, 255, 0.75)");
      rimGrad.addColorStop(1, "rgba(210, 130, 255, 0)");

      ctx!.beginPath();
      ctx!.arc(cx, cy, radius * 1.12, 0, Math.PI * 2);
      ctx!.fillStyle = rimGrad;
      ctx!.fill();

      // Removed Inner atmospheric highlight to ensure only dots glow

      // ── Sharp neon rim circle (Stronger Glow) ──
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(200, 120, 255, 0.9)";
      ctx!.lineWidth = 2.0;
      ctx!.stroke();

      // ── Outer glow ring (Stronger Glow) ──
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius + 4, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(160, 60, 240, 0.55)";
      ctx!.lineWidth = 12;
      ctx!.stroke();

      // Second outer glow ring for intense layer
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius + 8, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(160, 60, 240, 0.25)";
      ctx!.lineWidth = 20;
      ctx!.stroke();
    }

    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollSpeed = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      scrollSpeed += diff * 0.008; // Add scroll velocity
      lastScrollY = currentScrollY;
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    function animate() {
      // Damping physics: slow down scroll speed contribution smoothly
      scrollSpeed *= 0.95;

      // Base speed + scroll velocity
      rotationRef.current += 0.0075 + scrollSpeed * 0.015;
      
      // Update each arc's progression
      ARCS.forEach((arc, i) => {
        if (pulseProgressions[i] <= -1) {
          if (pulseProgressions[i] < -1) {
            pulseProgressions[i] += 1; // Cool down timer ticking up to -1
          } else {
            // Ready to spawn
            const phi = (90 - arc.latA) * Math.PI / 180;
            const theta = (arc.lonA * Math.PI / 180) + rotationRef.current;
            const z3 = Math.sin(phi) * Math.cos(theta);
            
            if (z3 >= -0.1) {
              // Spawn organically (chance per frame) so they stagger naturally when multiple are visible
              if (Math.random() > 0.95) {
                pulseProgressions[i] = 0;
              }
            }
          }
        } else {
          // It is actively playing
          const pulseBoost = 1.0 + scrollSpeed * 0.6;
          pulseProgressions[i] += arc.speed * pulseBoost;
          
          if (pulseProgressions[i] > 1.05) {
            // Apply a random cooldown (e.g. 90 to 200 frames = 1.5 to 3.5 seconds) to keep it hidden
            pulseProgressions[i] = -(90 + Math.random() * 110); 
          }
        }
      });

      drawFrame(rotationRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="block"
    />
  );
}
