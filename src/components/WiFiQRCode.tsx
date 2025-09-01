import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Wifi } from 'lucide-react';

interface WiFiQRCodeProps {
  ssid: string;
  password: string;
  className?: string;
}

export const WiFiQRCode = ({ ssid, password, className = "" }: WiFiQRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (canvasRef.current) {
        // WiFi QR code format: WIFI:T:WPA;S:SSID;P:Password;H:false;;
        const wifiString = `WIFI:T:WPA;S:${ssid};P:${password};H:false;;`;
        
        try {
          await QRCode.toCanvas(canvasRef.current, wifiString, {
            width: 200,
            margin: 2,
            color: {
              dark: '#FFFFFF',
              light: '#000000'
            }
          });
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQRCode();
  }, [ssid, password]);

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-white">
        <Wifi className="h-6 w-6" />
        <h3 className="text-2xl font-bold">WiFi Access</h3>
      </div>
      
      <div className="bg-white p-4 rounded-lg">
        <canvas ref={canvasRef} />
      </div>
      
      <div className="text-center text-white space-y-2">
        <div className="text-lg">
          <span className="text-white/70">Network:</span>
          <div className="font-semibold">{ssid}</div>
        </div>
        <div className="text-lg">
          <span className="text-white/70">Password:</span>
          <div className="font-semibold">{password}</div>
        </div>
      </div>
    </div>
  );
};