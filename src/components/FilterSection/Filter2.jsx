import React, { useEffect, useRef, useState } from 'react';

export default function Filter2() {
  const sketchRef = useRef();
  const containerRef = useRef();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
    if (isClient) {
      import('p5').then((p5) => {
        const sketch = (s) => {
          let video;

          s.setup = () => {
            const { offsetWidth: w, offsetHeight: h } = containerRef.current;
            s.createCanvas(w, h);
            video = s.createCapture(s.VIDEO);
            video.size(w, h);
            video.hide();
          };

          s.draw = () => {
            s.background(255);
            const gridSize = s.int(s.map(s.mouseX, 0, s.width, 15, 50));
            video.loadPixels();

            for (let y = 0; y < video.height; y += gridSize) {
              for (let x = 0; x < video.width; x += gridSize) {
                let index = (y * video.width + x) * 4;
                let r = video.pixels[index];
                let dia = s.map(r, 0, 255, gridSize, 2);
                s.fill(0);
                s.noStroke();
                s.circle(x + gridSize / 2, y + gridSize / 2, dia);
              }
            }
          };
        };

        new p5.default(sketch, sketchRef.current);
      });
    }
  }, [isClient]);

  return (
    <div className="filter-container" ref={containerRef}>
      <div ref={sketchRef}></div>
    </div>
  );
}
