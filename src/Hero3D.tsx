import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Spline scene="https://prod.spline.design/eCPaVYkkdUPNfSTx/scene.splinecode" />
    </div>
  );
}
