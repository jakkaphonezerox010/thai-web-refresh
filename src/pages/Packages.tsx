import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Crown, Star, Users } from "lucide-react";

const Packages = () => {
  const packages = [
    {
      name: "แพ็คเกจแก็ง/ครอบครัว",
      description: "เหมาะสำหรับแก็งและครอบครัวขนาดเล็กถึงกลาง",
      price: "299",
      period: "/เดือน",
      badge: "ยอดนิยม",
      badgeVariant: "default" as const,
      icon: Users,
      features: [
        "ระบบแจ้ง/ลา/สาย/ขาด",
        "ระบบส่งของแก็ง",
        "จัดการสมาชิกได้ 50 คน",
        "Dashboard รายวัน",
        "ระบบรีพอร์ตหัวหน้าบ้าน",
        "ตารางเวลาการทำงาน",
        "ระบบคะแนนประเมิน",
        "บันทึกข้อมูล 30 วัน",
      ],
      buttonText: "เริ่มใช้งาน",
      buttonVariant: "default" as const,
    },
    {
      name: "แพ็คเกจหน่วยงาน",
      description: "สำหรับหน่วยงานภาครัฐและธุรกิจขนาดใหญ่",
      price: "599",
      period: "/เดือน",
      badge: "แนะนำ",
      badgeVariant: "secondary" as const,
      icon: Star,
      features: [
        "ฟีเจอร์แพ็คเกจแก็ง/ครอบครัว ทั้งหมด",
        "จัดการสมาชิกได้ 200 คน",
        "ระบบแผนก/ฝ่ายงาน",
        "รายงานขั้นสูง",
        "ระบบอนุมัติ 3 ขั้นตอน",
        "API Integration",
        "บันทึกข้อมูล 90 วัน",
        "การสำรองข้อมูลอัตโนมัติ",
      ],
      buttonText: "เริ่มใช้งาน",
      buttonVariant: "secondary" as const,
    },
    {
      name: "แพ็คเกจทีมแอดมิน",
      description: "สำหรับทีมผู้ดูแลเซิร์ฟเวอร์และแอดมิน",
      price: "999",
      period: "/เดือน",
      badge: "Premium",
      badgeVariant: "destructive" as const,
      icon: Crown,
      features: [
        "ฟีเจอร์แพ็คเกจหน่วยงาน ทั้งหมด",
        "จัดการสมาชิกไม่จำกัด",
        "ระบบแอดมินหลายระดับ",
        "ตรวจสอบ Server ตลอด 24/7",
        "AI Analytics ขั้นสูง",
        "Custom Dashboard",
        "บันทึกข้อมูลไม่จำกัด",
        "Support 24/7 Priority",
      ],
      buttonText: "เริ่มใช้งาน",
      buttonVariant: "destructive" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            แพ็คเกจราคา
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 thai-text">
            เลือกแพ็คเกจที่{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              เหมาะกับคุณ
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto thai-text">
            แพ็คเกจที่ออกแบบมาเพื่อตอบสนองความต้องการเฉพาะของแต่ละประเภทองค์กร
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <Card 
                key={index} 
                className={`relative group hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-card border-primary/20 ${
                  pkg.badge === "แนะนำ" ? "scale-105 shadow-glow border-accent/40" : ""
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant={pkg.badgeVariant} className="px-4 py-1">
                      {pkg.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-primary group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl thai-text">{pkg.name}</CardTitle>
                  <CardDescription className="thai-text">{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">฿{pkg.price}</span>
                    <span className="text-muted-foreground">{pkg.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <Button 
                    variant={pkg.buttonVariant} 
                    className="w-full" 
                    size="lg"
                  >
                    {pkg.buttonText}
                  </Button>
                  
                  <div className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm thai-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Note */}
        <div className="text-center mb-12">
          <div className="bg-gradient-card rounded-xl p-8 border border-primary/20">
            <h3 className="text-xl font-semibold mb-4 thai-text">
              ทุกแพ็คเกจรวม
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-success" />
                <span>ทดลองใช้ฟรี 7 วัน</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-success" />
                <span>ยกเลิกได้ตลอดเวลา</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-success" />
                <span>รองรับการชำระเงินผ่าน TrueMoney Wallet</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 thai-text">
            คำถามที่พบบ่อย
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg thai-text">
                  สามารถเปลี่ยนแพ็คเกจได้ไหม?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground thai-text">
                  สามารถอัปเกรดหรือดาวน์เกรดแพ็คเกจได้ตลอดเวลา ค่าใช้จ่ายจะถูกปรับตามสัดส่วน
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg thai-text">
                  มีส่วนลดสำหรับการจ่ายรายปีไหม?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground thai-text">
                  มีส่วนลด 20% สำหรับการจ่ายแบบรายปี ติดต่อทีมขายเพื่อรับข้อมูลเพิ่มเติม
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg thai-text">
                  ข้อมูลปลอดภัยแค่ไหน?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground thai-text">
                  ข้อมูลทั้งหมดถูกเข้ารหัสและจัดเก็บอย่างปลอดภัย มีการสำรองข้อมูลอัตโนมัติ
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg thai-text">
                  ต้องการแพ็คเกจพิเศษ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground thai-text">
                  เรามีแพ็คเกจแบบกำหนดเองสำหรับองค์กรขนาดใหญ่ ติดต่อเราเพื่อรับใบเสนอราคา
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <section className="text-center bg-gradient-card rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4 thai-text">
            พร้อมเริ่มต้นแล้วใช่ไหม?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto thai-text">
            เริ่มต้นด้วยการทดลองใช้ฟรี 7 วัน ไม่มีค่าใช้จ่าย ไม่ต้องใส่บัตรเครดิต
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="animate-glow">
              ทดลองใช้ฟรีเลย
            </Button>
            <Button variant="outline" size="lg">
              ติดต่อทีมขาย
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Packages;