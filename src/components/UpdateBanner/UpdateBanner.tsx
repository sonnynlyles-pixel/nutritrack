import { useEffect, useState } from 'react';

export default function UpdateBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    // Fires when a new service worker takes control (after skipWaiting)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        setShow(true);
      }
    });
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-600 text-white px-4 py-3 flex items-center justify-between gap-3 shadow-xl">
      <span className="text-sm font-medium">NutriTrack has been updated!</span>
      <button
        onClick={() => window.location.reload()}
        className="shrink-0 bg-white text-emerald-700 font-bold px-4 py-1.5 rounded-full text-sm"
      >
        Reload
      </button>
    </div>
  );
}
