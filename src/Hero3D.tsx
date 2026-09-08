import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 bg-[#0c0d0e] dark:bg-slate-900 overflow-hidden">
      <Spline 
        scene="https://prod.spline.design/jnGeSPeYb0orxDYP/scene.splinecode" 
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}
