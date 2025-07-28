import React, { useState } from 'react';
import { Package, Crown, Zap, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface PackagePlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
  recommended?: boolean;
  current?: boolean;
}

const packages: PackagePlan[] = [
  {
    id: '1',
    name: 'Basic',
    price: 99,
    duration: 'monthly',
    features: ['1 เว็บไซต์', '10 GB Storage', '1 GB RAM', 'SSL Certificate'],
    current: true,
  },
  {
    id: '2',
    name: 'Pro',
    price: 299,
    duration: 'monthly',
    features: ['5 เว็บไซต์', '50 GB Storage', '4 GB RAM', 'SSL Certificate', 'Premium Support'],
    recommended: true,
  },
  {
    id: '3',
    name: 'Enterprise',
    price: 599,
    duration: 'monthly',
    features: ['ไม่จำกัดเว็บไซต์', '200 GB Storage', '8 GB RAM', 'SSL Certificate', 'Premium Support', 'Custom Domain'],
  },
  {
    id: '4',
    name: 'Pro (Yearly)',
    price: 2990,
    duration: 'yearly',
    features: ['5 เว็บไซต์', '50 GB Storage', '4 GB RAM', 'SSL Certificate', 'Premium Support', '2 เดือนฟรี'],
  },
];

interface PackageUpgradeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PackageUpgrade: React.FC<PackageUpgradeProps> = ({ isOpen, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState<PackagePlan | null>(null);
  const [step, setStep] = useState<'select' | 'confirm' | 'processing' | 'success'>('select');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, updateCredits } = useAuth();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    if (!selectedPackage || !user) return;

    if (user.credits < selectedPackage.price) {
      toast({
        title: "เครดิตไม่เพียงพอ",
        description: `ต้องการ ${selectedPackage.price} เครดิต แต่คุณมี ${user.credits} เครดิต`,
        variant: "destructive",
      });
      return;
    }

    setStep('processing');
    setIsProcessing(true);

    // จำลองการอัปเกรด
    setTimeout(() => {
      updateCredits(user.credits - selectedPackage.price);
      setIsProcessing(false);
      setStep('success');
      
      toast({
        title: "อัปเกรดแพ็คเกจสำเร็จ!",
        description: `อัปเกรดเป็น ${selectedPackage.name} แล้ว`,
      });

      // รีเซ็ตหลังจาก 3 วินาที
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 3000);
  };

  const handleClose = () => {
    setStep('select');
    setSelectedPackage(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl bg-card/95 backdrop-blur border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 'select' && <Package className="w-5 h-5 text-primary" />}
            {step === 'confirm' && <Crown className="w-5 h-5 text-primary" />}
            {step === 'processing' && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
            {step === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
            
            {step === 'select' && 'เลือกแพ็คเกจ'}
            {step === 'confirm' && 'ยืนยันการอัปเกรด'}
            {step === 'processing' && 'กำลังอัปเกรดแพ็คเกจ...'}
            {step === 'success' && 'อัปเกรดสำเร็จ!'}
          </DialogTitle>
        </DialogHeader>

        {step === 'select' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <Card 
                  key={pkg.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    pkg.current ? 'border-success bg-success/5' :
                    selectedPackage?.id === pkg.id ? 'border-primary bg-primary/10' : 
                    'hover:border-primary/50'
                  }`}
                  onClick={() => !pkg.current && setSelectedPackage(pkg)}
                >
                  <CardHeader className="text-center">
                    <div className="space-y-2">
                      {pkg.current && (
                        <Badge className="bg-success text-white">แพ็คเกจปัจจุบัน</Badge>
                      )}
                      {pkg.recommended && (
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                          แนะนำ
                        </Badge>
                      )}
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <div className="space-y-1">
                        <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                        <p className="text-sm text-muted-foreground">
                          เครดิต / {pkg.duration === 'monthly' ? 'เดือน' : 'ปี'}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={() => setStep('confirm')}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow"
              disabled={!selectedPackage}
            >
              <Zap className="w-4 h-4 mr-2" />
              อัปเกรดแพ็คเกจ
            </Button>
          </div>
        )}

        {step === 'confirm' && selectedPackage && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-card rounded-lg border border-primary/20 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">{selectedPackage.name}</h3>
              <p className="text-3xl font-bold text-primary mb-2">{selectedPackage.price} เครดิต</p>
              <p className="text-muted-foreground">
                / {selectedPackage.duration === 'monthly' ? 'เดือน' : 'ปี'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold">คุณจะได้รับ:</h4>
              {selectedPackage.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={() => setStep('select')}
                className="flex-1"
              >
                ย้อนกลับ
              </Button>
              <Button 
                onClick={handleUpgrade}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                disabled={!user || user.credits < selectedPackage.price}
              >
                <Crown className="w-4 h-4 mr-2" />
                ยืนยันการอัปเกรด
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center space-y-4 py-8">
            <Loader2 className="w-16 h-16 animate-spin mx-auto text-primary" />
            <div>
              <p className="font-bold">กำลังอัปเกรดแพ็คเกจ...</p>
              <p className="text-sm text-muted-foreground mt-1">
                กรุณารอสักครู่ ระบบกำลังอัปเกรดแพ็คเกจของคุณ
              </p>
            </div>
          </div>
        )}

        {step === 'success' && selectedPackage && (
          <div className="text-center space-y-4 py-8">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success animate-bounce" />
            </div>
            
            <div>
              <p className="font-bold text-success">อัปเกรดแพ็คเกจสำเร็จ!</p>
              <p className="text-sm text-muted-foreground mt-1">
                คุณได้อัปเกรดเป็น {selectedPackage.name} แล้ว
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                ใช้เครดิต {selectedPackage.price} เครดิต
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};