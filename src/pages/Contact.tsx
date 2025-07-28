import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Mail,
  MessageCircle,
  Phone,
  Clock,
  MapPin,
  Send,
  Headphones,
  Zap,
} from "lucide-react";
import logo from '@/assets/logo.png';

const Contact = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Discord",
      description: "เข้าร่วมชุมชนและพูดคุยกับทีมงานโดยตรง",
      detail: "discord.gg/dobules-six",
      badge: "ตอบเร็วที่สุด",
      badgeVariant: "default" as const,
    },
    {
      icon: Mail,
      title: "Email",
      description: "ส่งคำถามหรือปัญหาทางอีเมล",
      detail: "support@dobules-six.com",
      badge: "ภายใน 24 ชม.",
      badgeVariant: "secondary" as const,
    },
    {
      icon: Phone,
      title: "โทรศัพท์",
      description: "ติดต่อทีมงานโดยตรง (ลูกค้า Premium เท่านั้น)",
      detail: "02-xxx-xxxx",
      badge: "Premium",
      badgeVariant: "destructive" as const,
    },
  ];

  const supportHours = [
    { day: "จันทร์ - ศุกร์", time: "09:00 - 18:00 น." },
    { day: "เสาร์ - อาทิตย์", time: "10:00 - 16:00 น." },
    { day: "Discord Support", time: "24/7" },
  ];

  const faqs = [
    {
      question: "ระบบสามารถใช้งานกับเซิร์ฟเวอร์ที่มีอยู่แล้วได้ไหม?",
      answer: "ได้ครับ ระบบของเราออกแบบมาให้ทำงานร่วมกับเซิร์ฟเวอร์ FiveM ที่มีอยู่แล้วได้ทันที ไม่ต้องเปลี่ยนแปลงโครงสร้างเดิม",
    },
    {
      question: "มีการฝึกอบรมการใช้งานให้ไหม?",
      answer: "มีครับ เรามีคู่มือการใช้งาน วิดีโอสอน และทีมงานที่พร้อมช่วยเหลือตลอด 24 ชั่วโมง",
    },
    {
      question: "ข้อมูลจะปลอดภัยแค่ไหน?",
      answer: "ข้อมูลทั้งหมดถูกเข้ารหัสและจัดเก็บบนเซิร์ฟเวอร์ที่ปลอดภัย มีการสำรองข้อมูลอัตโนมัติทุกวัน",
    },
    {
      question: "สามารถยกเลิกการใช้งานได้ไหม?",
      answer: "ได้ครับ สามารถยกเลิกได้ตลอดเวลาโดยไม่มีค่าปรับ และข้อมูลจะถูกส่งออกให้ก่อนลบ",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Animated Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg shadow-primary/25 animate-glow">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain animate-pulse"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl opacity-30 blur animate-pulse"></div>
            </div>
          </div>
          
          <Badge variant="secondary" className="mb-4">
            ติดต่อเรา
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 thai-text">
            พร้อม{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ช่วยเหลือคุณ
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto thai-text">
            ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาและช่วยเหลือคุณตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-card border-primary/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-primary group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <CardTitle className="text-xl thai-text">{method.title}</CardTitle>
                      <Badge variant={method.badgeVariant} className="text-xs">
                        {method.badge}
                      </Badge>
                    </div>
                    <CardDescription className="thai-text">
                      {method.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-mono text-primary mb-4">{method.detail}</p>
                  <Button variant="outline" className="w-full">
                    ติดต่อเลย
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Form & Support Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="thai-text flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>ส่งข้อความถึงเรา</span>
              </CardTitle>
              <CardDescription>
                กรอกข้อมูลและเราจะติดต่อกลับไปโดยเร็วที่สุด
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">ชื่อ</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 p-3 bg-input border border-border rounded-lg"
                    placeholder="ชื่อของคุณ"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">นามสกุล</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 p-3 bg-input border border-border rounded-lg"
                    placeholder="นามสกุลของคุณ"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">อีเมล</label>
                <input 
                  type="email" 
                  className="w-full mt-1 p-3 bg-input border border-border rounded-lg"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">หัวข้อ</label>
                <select className="w-full mt-1 p-3 bg-input border border-border rounded-lg">
                  <option>สอบถามข้อมูลทั่วไป</option>
                  <option>ปัญหาการใช้งาน</option>
                  <option>สอบถามแพ็คเกจ</option>
                  <option>ขอใบเสนอราคา</option>
                  <option>อื่นๆ</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">ข้อความ</label>
                <textarea 
                  className="w-full mt-1 p-3 bg-input border border-border rounded-lg h-32" 
                  placeholder="บอกเราว่าเราสามารถช่วยคุณได้อย่างไร..."
                />
              </div>
              
              <Button variant="default" className="w-full" size="lg">
                <Send className="h-4 w-4 mr-2" />
                ส่งข้อความ
              </Button>
            </CardContent>
          </Card>

          {/* Support Hours & Info */}
          <div className="space-y-8">
            {/* Support Hours */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="thai-text flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>เวลาให้บริการ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportHours.map((hours, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{hours.day}</span>
                    <span className="text-sm text-muted-foreground">{hours.time}</span>
                  </div>
                ))}
                <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-success">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-medium">การตอบกลับเฉลี่ย: 15 นาที</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="thai-text flex items-center space-x-2">
                  <Headphones className="h-5 w-5" />
                  <span>บริการสนับสนุน</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">การตั้งค่าระบบฟรี</p>
                    <p className="text-xs text-muted-foreground">ทีมงานจะช่วยตั้งค่าระบบให้ฟรี</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">การฝึกอบรมฟรี</p>
                    <p className="text-xs text-muted-foreground">สอนการใช้งานให้กับทีมของคุณ</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">การย้ายข้อมูลฟรี</p>
                    <p className="text-xs text-muted-foreground">ย้ายข้อมูลจากระบบเดิมมาใหม่</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 thai-text">คำถามที่พบบ่อย</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              คำตอบสำหรับคำถามที่ลูกค้าถามบ่อยที่สุด
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg thai-text">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground thai-text">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Location & Additional Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="thai-text flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>ที่อยู่บริษัท</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">Dobules Six Co., Ltd.</p>
                <p className="text-muted-foreground text-sm">
                  123/45 ถนนเทคโนโลยี แขวงนวัตกรรม<br />
                  เขตดิจิทัล กรุงเทพมหานคร 10400
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>เลขประจำตัวผู้เสียภาษี:</strong> 0123456789012
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="thai-text">ช่องทางอื่นๆ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Line Official</span>
                <span className="text-sm text-primary font-mono">@dobules-six</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Facebook</span>
                <span className="text-sm text-primary font-mono">DoubulesSixTH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Website</span>
                <span className="text-sm text-primary font-mono">dobules-six.com</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <section className="text-center bg-gradient-card rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4 thai-text">
            ยังมีคำถามอีกไหม?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto thai-text">
            อย่าลังเลที่จะติดต่อเรา ทีมงานยินดีให้คำปรึกษาและตอบคำถามทุกเรื่อง
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="animate-glow">
              ติดต่อผ่าน Discord
            </Button>
            <Button variant="outline" size="lg">
              ส่งอีเมลหาเรา
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;