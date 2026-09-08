import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 bg-[#0c0d0e] dark:bg-slate-900 overflow-hidden pointer-events-none">
      {/* Ambient Glowing CSS Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main 3D Animation */}
      <div className="relative z-10 w-full h-full">
        <Spline 
          scene="https://prod.spline.design/eCPaVYkkdUPNfSTx/scene.splinecode" 
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>
    </div>
  );
}
