import React, { useState } from 'react';
import { Coins, QrCode, CreditCard, CheckCircle, Loader2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [paymentStep, setPaymentStep] = useState<'select' | 'method' | 'qr' | 'truemoney' | 'success'>('select');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'truemoney'>('qr');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [envelopeCode, setEnvelopeCode] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { updateCredits, user } = useAuth();
  const { toast } = useToast();

  const handlePayment = async () => {
    if (paymentMethod === 'qr') {
      setPaymentStep('qr');
    } else {
      setPaymentStep('truemoney');
    }
    setIsProcessing(true);

    // จำลองการสร้าง QR Code และรอการชำระเงิน
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');
      
      // อัพเดทเครดิต
      const credits = selectedPackage ? selectedPackage.credits + selectedPackage.bonus : parseInt(customAmount) || 0;
      if (user) {
        updateCredits(user.credits + credits);
      }
      
      toast({
        title: "เติมเครดิตสำเร็จ!",
        description: `ได้รับเครดิต ${credits} เครดิต`,
      });

      // รีเซ็ตหลังจาก 3 วินาที
      setTimeout(() => {
        setPaymentStep('select');
        setSelectedPackage(null);
        setCustomAmount('');
        setEnvelopeCode('');
        setIsDialogOpen(false);
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full h-16 bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 hover:scale-105"
              onClick={() => setIsDialogOpen(true)}
            >
              <Coins className="w-6 h-6 mr-2 animate-bounce" />
              <span className="text-lg font-bold">เติมเครดิต</span>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur border-primary/20">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {paymentStep === 'select' && <Coins className="w-5 h-5 text-primary" />}
                {paymentStep === 'method' && <CreditCard className="w-5 h-5 text-primary" />}
                {paymentStep === 'qr' && <QrCode className="w-5 h-5 text-primary" />}
                {paymentStep === 'truemoney' && <Wallet className="w-5 h-5 text-primary" />}
                {paymentStep === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
                
                {paymentStep === 'select' && 'เลือกจำนวนเครดิต'}
                {paymentStep === 'method' && 'เลือกช่องทางชำระเงิน'}
                {paymentStep === 'qr' && 'สแกน QR Code เพื่อชำระเงิน'}
                {paymentStep === 'truemoney' && 'ใส่รหัสซองของขวัญ TrueMoney'}
                {paymentStep === 'success' && 'ชำระเงินสำเร็จ!'}
              </DialogTitle>
            </DialogHeader>

            {paymentStep === 'select' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {creditPackages.map((pkg) => (
                    <Button
                      key={pkg.id}
                      variant={selectedPackage?.id === pkg.id ? "default" : "outline"}
                      className={`h-auto p-4 flex flex-col gap-2 hover:shadow-md transition-all duration-200 hover:scale-105 ${
                        pkg.popular ? 'border-primary bg-primary/10' : ''
                      }`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      {pkg.popular && (
                        <Badge className="mb-1 bg-gradient-to-r from-primary to-accent text-white animate-pulse">
                          แนะนำ
                        </Badge>
                      )}
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-warning" />
                        <span className="font-bold">{pkg.credits.toLocaleString()}</span>
                      </div>
                      <div className="text-xl font-bold text-primary">฿{pkg.price}</div>
                      {pkg.bonus > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          +{pkg.bonus} โบนัส
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-amount">หรือใส่จำนวนเครดิตที่ต้องการ</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="จำนวนเครดิต"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPackage(null);
                    }}
                    className="text-center"
                  />
                  {customAmount && (
                    <p className="text-sm text-muted-foreground text-center">
                      ราคา: ฿{parseInt(customAmount) || 0} (1 เครดิต = 1 บาท)
                    </p>
                  )}
                </div>
                
                <Button 
                  onClick={() => setPaymentStep('method')}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                  disabled={!selectedPackage && !customAmount}
                >
                  ดำเนินการต่อ
                </Button>
              </div>
            )}

            {paymentStep === 'method' && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-card rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">
                    {selectedPackage ? 
                      `${selectedPackage.credits.toLocaleString()} เครดิต` : 
                      `${customAmount} เครดิต`
                    }
                  </div>
                  {selectedPackage?.bonus && selectedPackage.bonus > 0 && (
                    <div className="text-success">+ {selectedPackage.bonus} โบนัส</div>
                  )}
                  <div className="text-lg font-bold mt-2">
                    ฿{selectedPackage ? selectedPackage.price : (parseInt(customAmount) || 0)}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant={paymentMethod === 'qr' ? 'default' : 'outline'}
                    className="w-full justify-start h-16"
                    onClick={() => setPaymentMethod('qr')}
                  >
                    <QrCode className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <div className="font-bold">QR Code (PromptPay)</div>
                      <div className="text-sm text-muted-foreground">สแกนด้วยแอพธนาคาร</div>
                    </div>
                  </Button>

                  <Button
                    variant={paymentMethod === 'truemoney' ? 'default' : 'outline'}
                    className="w-full justify-start h-16"
                    onClick={() => setPaymentMethod('truemoney')}
                  >
                    <Wallet className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <div className="font-bold">TrueMoney Wallet</div>
                      <div className="text-sm text-muted-foreground">ใช้รหัสซองของขวัญ</div>
                    </div>
                  </Button>
                </div>

                <Button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                >
                  ชำระเงิน
                </Button>
              </div>
            )}

            {paymentStep === 'qr' && (
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
                      <p className="text-xs text-gray-600">QR Code PromptPay</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">
                    จำนวน: ฿{selectedPackage ? selectedPackage.price : (parseInt(customAmount) || 0)}
                  </p>
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

            {paymentStep === 'truemoney' && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-card rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">
                    {selectedPackage ? 
                      `${selectedPackage.credits.toLocaleString()} เครดิต` : 
                      `${customAmount} เครดิต`
                    }
                  </div>
                  <div className="text-lg font-bold mt-2">
                    ฿{selectedPackage ? selectedPackage.price : (parseInt(customAmount) || 0)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="envelope-code">รหัสซองของขวัญ TrueMoney</Label>
                  <Input
                    id="envelope-code"
                    type="text"
                    placeholder="ใส่รหัสซองของขวัญ 14 หลัก"
                    value={envelopeCode}
                    onChange={(e) => setEnvelopeCode(e.target.value)}
                    maxLength={14}
                    className="text-center text-lg font-mono"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    รหัสซองของขวัญ TrueMoney ประกอบด้วยตัวเลข 14 หลัก
                  </p>
                </div>

                {isProcessing ? (
                  <div className="text-center space-y-2">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground">กำลังตรวจสอบรหัสซอง...</p>
                  </div>
                ) : (
                  <Button 
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                    disabled={envelopeCode.length !== 14}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    ใช้รหัสซองของขวัญ
                  </Button>
                )}
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success animate-bounce" />
                </div>
                
                <div>
                  <p className="font-bold text-success">ชำระเงินสำเร็จ!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ได้รับ {selectedPackage ? 
                      selectedPackage.credits + selectedPackage.bonus : 
                      parseInt(customAmount) || 0
                    } เครดิต
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};