import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 bg-[#0c0d0e] dark:bg-slate-900 overflow-hidden">
      {/* Background Secondary Scene */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-70">
        <Spline 
          scene="https://prod.spline.design/jnGeSPeYb0orxDYP/scene.splinecode" 
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        />
      </div>

      {/* Foreground Primary Scene */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <Spline 
          scene="https://prod.spline.design/eCPaVYkkdUPNfSTx/scene.splinecode" 
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        />
      </div>
    </div>
  );
}
