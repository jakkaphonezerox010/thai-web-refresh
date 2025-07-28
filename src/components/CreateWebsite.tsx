import React, { useState } from 'react';
import { Globe, Server, Package, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface WebsiteTemplate {
  id: string;
  name: string;
  type: 'business' | 'portfolio' | 'ecommerce' | 'blog' | 'fivem';
  price: number;
  features: string[];
  popular?: boolean;
}

const templates: WebsiteTemplate[] = [
  {
    id: '1',
    name: 'Business Website',
    type: 'business',
    price: 50,
    features: ['หน้าแรก', 'เกี่ยวกับ', 'บริการ', 'ติดต่อ'],
  },
  {
    id: '2',
    name: 'Portfolio',
    type: 'portfolio',
    price: 30,
    features: ['แกลเลอรี่', 'ผลงาน', 'ประวัติ'],
    popular: true,
  },
  {
    id: '3',
    name: 'E-commerce',
    type: 'ecommerce',
    price: 100,
    features: ['ร้านค้า', 'ตะกร้า', 'ชำระเงิน', 'จัดการสินค้า'],
  },
  {
    id: '4',
    name: 'FiveM Server',
    type: 'fivem',
    price: 80,
    features: ['Discord Bot', 'แผนที่', 'ระบบงาน', 'ระบบเศรษฐกิจ'],
  },
];

interface CreateWebsiteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWebsite: React.FC<CreateWebsiteProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'template' | 'details' | 'processing' | 'success'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<WebsiteTemplate | null>(null);
  const [websiteName, setWebsiteName] = useState('');
  const [domain, setDomain] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, updateCredits } = useAuth();
  const { toast } = useToast();

  const handleCreateWebsite = async () => {
    if (!selectedTemplate || !user) return;

    if (user.credits < selectedTemplate.price) {
      toast({
        title: "เครดิตไม่เพียงพอ",
        description: `ต้องการ ${selectedTemplate.price} เครดิต แต่คุณมี ${user.credits} เครดิต`,
        variant: "destructive",
      });
      return;
    }

    setStep('processing');
    setIsProcessing(true);

    // จำลองการสร้างเว็บไซต์
    setTimeout(() => {
      updateCredits(user.credits - selectedTemplate.price);
      setIsProcessing(false);
      setStep('success');
      
      toast({
        title: "สร้างเว็บไซต์สำเร็จ!",
        description: `${websiteName} ถูกสร้างแล้ว`,
      });

      // รีเซ็ตหลังจาก 3 วินาที
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 5000);
  };

  const handleClose = () => {
    setStep('template');
    setSelectedTemplate(null);
    setWebsiteName('');
    setDomain('');
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 'template' && <Globe className="w-5 h-5 text-primary" />}
            {step === 'details' && <Server className="w-5 h-5 text-primary" />}
            {step === 'processing' && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
            {step === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
            
            {step === 'template' && 'เลือกเทมเพลต'}
            {step === 'details' && 'รายละเอียดเว็บไซต์'}
            {step === 'processing' && 'กำลังสร้างเว็บไซต์...'}
            {step === 'success' && 'สร้างเว็บไซต์สำเร็จ!'}
          </DialogTitle>
        </DialogHeader>

        {step === 'template' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedTemplate?.id === template.id 
                      ? 'border-primary bg-primary/10' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {template.popular && (
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                          แนะนำ
                        </Badge>
                      )}
                      <h3 className="font-bold text-lg">{template.name}</h3>
                      <p className="text-2xl font-bold text-primary">{template.price} เครดิต</p>
                      <div className="space-y-1">
                        {template.features.map((feature, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={() => setStep('details')}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow"
              disabled={!selectedTemplate}
            >
              เลือกเทมเพลตนี้
            </Button>
          </div>
        )}

        {step === 'details' && selectedTemplate && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-card rounded-lg border border-primary/20">
              <h3 className="font-bold text-lg">{selectedTemplate.name}</h3>
              <p className="text-primary font-bold">{selectedTemplate.price} เครดิต</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website-name">ชื่อเว็บไซต์</Label>
                <Input
                  id="website-name"
                  placeholder="ใส่ชื่อเว็บไซต์ของคุณ"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">โดเมน</Label>
                <div className="flex">
                  <Input
                    id="domain"
                    placeholder="mydomain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="rounded-r-none"
                  />
                  <div className="bg-muted border border-l-0 rounded-r-md px-3 flex items-center text-sm text-muted-foreground">
                    .myhost.com
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setStep('template')}
                className="flex-1"
              >
                ย้อนกลับ
              </Button>
              <Button 
                onClick={handleCreateWebsite}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                disabled={!websiteName || !domain}
              >
                สร้างเว็บไซต์
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center space-y-4 py-8">
            <Loader2 className="w-16 h-16 animate-spin mx-auto text-primary" />
            <div>
              <p className="font-bold">กำลังสร้างเว็บไซต์...</p>
              <p className="text-sm text-muted-foreground mt-1">
                กรุณารอสักครู่ ระบบกำลังติดตั้งเว็บไซต์ของคุณ
              </p>
            </div>
          </div>
        )}

        {step === 'success' && selectedTemplate && (
          <div className="text-center space-y-4 py-8">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success animate-bounce" />
            </div>
            
            <div>
              <p className="font-bold text-success">สร้างเว็บไซต์สำเร็จ!</p>
              <p className="text-sm text-muted-foreground mt-1">
                {websiteName} พร้อมใช้งานแล้วที่ {domain}.myhost.com
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                ใช้เครดิต {selectedTemplate.price} เครดิต
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};