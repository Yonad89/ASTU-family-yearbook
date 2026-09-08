import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden flex items-center justify-center bg-[#0c0d0e] dark:bg-slate-900">
      <div className="w-full h-full transform-gpu">
        <Spline 
          scene="https://prod.spline.design/eCPaVYkkdUPNfSTx/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
