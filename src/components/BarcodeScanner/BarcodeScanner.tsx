import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface Props {
  onScan: (barcode: string) => void;
  onError?: () => void;
}

export default function BarcodeScanner({ onScan }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'barcode-reader',
      { fps: 10, qrbox: { width: 250, height: 150 } },
      false
    );
    scannerRef.current = scanner;
    scanner.render(
      (result) => { scanner.clear(); onScan(result); },
      () => {}
    );
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [onScan]);

  return <div id="barcode-reader" ref={divRef} className="w-full" />;
}
