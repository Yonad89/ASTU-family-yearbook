import { useEffect } from 'react';

export default function Hero3D() {
  useEffect(() => {
    // Dynamically load the official Spline viewer script if not already present
    if (!document.querySelector('script[src*="spline-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 bg-[#0c0d0e] overflow-hidden">
      {/* @ts-ignore */}
      <spline-viewer 
        url="https://prod.spline.design/jnGeSPeYb0orxDYP/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
