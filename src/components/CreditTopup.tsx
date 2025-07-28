import React, { useState } from 'react';
import { Coins, QrCode, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  bonus: number;
  popular?: boolean;
}

const creditPackages: CreditPackage[] = [
  { id: '1', credits: 100, price: 50, bonus: 0 },
  { id: '2', credits: 500, price: 200, bonus: 50, popular: true },
  { id: '3', credits: 1000, price: 350, bonus: 200 },
  { id: '4', credits: 2000, price: 600, bonus: 500 }
];

export const CreditTopup = () => {
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'qr' | 'success'>('select');
  const { updateCredits, user } = useAuth();
  const { toast } = useToast();

  const handlePayment = async (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
    setPaymentStep('qr');
    setIsProcessing(true);

    // จำลองการสร้าง QR Code และรอการชำระเงิน
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');
      
      // อัพเดทเครดิต
      const totalCredits = pkg.credits + pkg.bonus;
      if (user) {
        updateCredits(user.credits + totalCredits);
      }
      
      toast({
        title: "เติมเครดิตสำเร็จ!",
        description: `ได้รับเครดิต ${totalCredits} เครดิต`,
      });

      // รีเซ็ตหลังจาก 3 วินาที
      setTimeout(() => {
        setPaymentStep('select');
        setSelectedPackage(null);
      }, 3000);
    }, 5000); // จำลองเวลารอ 5 วินาที
  };

  const generateQRData = () => {
    if (!selectedPackage) return '';
    return `promptpay://0123456789/${selectedPackage.price}`;
  };

  return (
    <Card className="bg-gradient-card border-accent/20 hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-accent animate-bounce" />
          เติมเครดิต
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {creditPackages.map((pkg) => (
            <Dialog key={pkg.id}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className={`h-auto p-4 flex flex-col gap-2 hover:shadow-md transition-all duration-200 hover:scale-105 ${
                    pkg.popular ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.popular && (
                    <Badge className="mb-1 bg-gradient-to-r from-primary to-accent text-white animate-pulse">
                      แนะนำ
                    </Badge>
                  )}
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-warning" />
                    <span className="font-bold">{pkg.credits.toLocaleString()}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">฿{pkg.price}</div>
                  {pkg.bonus > 0 && (
                    <Badge variant="secondary" className="animate-pulse">
                      +{pkg.bonus} โบนัส
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur border-primary/20">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {paymentStep === 'select' && <CreditCard className="w-5 h-5" />}
                    {paymentStep === 'qr' && <QrCode className="w-5 h-5" />}
                    {paymentStep === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
                    
                    {paymentStep === 'select' && 'ยืนยันการซื้อ'}
                    {paymentStep === 'qr' && 'สแกน QR Code เพื่อชำระเงิน'}
                    {paymentStep === 'success' && 'ชำระเงินสำเร็จ!'}
                  </DialogTitle>
                </DialogHeader>

                {paymentStep === 'select' && selectedPackage && (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-card rounded-lg border border-primary/20">
                      <div className="text-2xl font-bold text-primary">
                        {selectedPackage.credits.toLocaleString()} เครดิต
                      </div>
                      {selectedPackage.bonus > 0 && (
                        <div className="text-success">+ {selectedPackage.bonus} โบนัส</div>
                      )}
                      <div className="text-lg font-bold mt-2">฿{selectedPackage.price}</div>
                    </div>
                    
                    <Button 
                      onClick={() => handlePayment(selectedPackage)}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      ชำระด้วย QR Code
                    </Button>
                  </div>
                )}

                {paymentStep === 'qr' && selectedPackage && (
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-48 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-primary/20">
                      {isProcessing ? (
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">กำลังสร้าง QR Code...</p>
                        </div>
                      ) : (
                        <div className="text-center p-4">
                          <QrCode className="w-16 h-16 mx-auto mb-2 text-primary" />
                          <p className="text-xs text-gray-600">QR Code จะแสดงที่นี่</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-medium">จำนวน: ฿{selectedPackage.price}</p>
                      <p className="text-sm text-muted-foreground">
                        สแกน QR Code ด้วยแอพธนาคารของคุณ
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-warning">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        รอการชำระเงิน...
                      </div>
                    </div>
                  </div>
                )}

                {paymentStep === 'success' && selectedPackage && (
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-success animate-bounce" />
                    </div>
                    
                    <div>
                      <p className="font-bold text-success">ชำระเงินสำเร็จ!</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        ได้รับ {selectedPackage.credits + selectedPackage.bonus} เครดิต
                      </p>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};