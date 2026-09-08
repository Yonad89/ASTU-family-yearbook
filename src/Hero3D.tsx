import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden">
      <Spline 
        scene="https://prod.spline.design/eCPaVYkkdUPNfSTx/scene.splinecode" 
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}
