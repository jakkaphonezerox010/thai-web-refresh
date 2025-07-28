import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  Package,
  Users,
  AlertTriangle,
  BarChart3,
  UserCheck,
  Clock,
  Trophy,
  Shield,
  Bot,
  Settings,
  TrendingUp,
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: Calendar,
      title: "ระบบแจ้ง/ลา/สาย/ขาด",
      description: "จัดการการลา การแจ้งสาย และการขาดงานของสมาชิกอัตโนมัติ พร้อมระบบอนุมัติหลายขั้นตอน",
      tags: ["อัตโนมัติ", "แจ้งเตือน"],
    },
    {
      icon: Package,
      title: "ระบบส่งของแก็ง",
      description: "ตรวจสอบและจัดการการส่งมอบไอเทมภายในองค์กร ติดตามสถานะและประวัติการส่งของ",
      tags: ["ติดตาม", "จัดการ"],
    },
    {
      icon: Users,
      title: "ระบบจัดการบ้าน/กลุ่ม",
      description: "การจัดการสมาชิกและสิทธิ์ภายในบ้านหรือกลุ่ม กำหนดตำแหน่งและหน้าที่",
      tags: ["สิทธิ์", "ตำแหน่ง"],
    },
    {
      icon: AlertTriangle,
      title: "ระบบรีพอร์ต 2 ระดับ",
      description: "แจ้งปัญหาถึงแอดมินและหัวหน้าบ้านแยกกัน พร้อมระบบติดตามสถานะ",
      tags: ["รีพอร์ต", "ติดตาม"],
    },
    {
      icon: BarChart3,
      title: "Dashboard วิเคราะห์",
      description: "ติดตามการปรับ การลา การขาด และการสายประจำวัน ด้วยกราฟและสถิติแบบเรียลไทม์",
      tags: ["วิเคราะห์", "เรียลไทม์"],
    },
    {
      icon: UserCheck,
      title: "ระบบจัดการสมาชิก",
      description: "เพิ่ม ลบ แก้ไขข้อมูลสมาชิกและตำแหน่งงาน พร้อมระบบสิทธิ์แบบละเอียด",
      tags: ["จัดการ", "สิทธิ์"],
    },
    {
      icon: Clock,
      title: "ตารางเวลาการทำงาน",
      description: "กำหนดและติดตามตารางงานของแต่ละสมาชิก สร้างตารางเวรและแจ้งเตือนอัตโนมัติ",
      tags: ["ตารางเวร", "แจ้งเตือน"],
    },
    {
      icon: Trophy,
      title: "ระบบคะแนนประเมิน",
      description: "ประเมินผลการทำงานและให้คะแนนสมาชิก ติดตามประสิทธิภาพและความก้าวหน้า",
      tags: ["ประเมิน", "คะแนน"],
    },
  ];

  const advancedFeatures = [
    {
      icon: Bot,
      title: "Auto Moderation",
      description: "กรองแชทด้วย AI ตรวจจับสแปมและข้อความไม่เหมาะสมอัตโนมัติ",
      tags: ["AI", "ป้องกัน"],
    },
    {
      icon: Settings,
      title: "Server Scripts",
      description: "จัดการ Script FiveM ติดตั้งและอัปเดทสคริปต์ผ่านระบบ",
      tags: ["Script", "จัดการ"],
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "ข้อมูลเชิงลึกเซิร์ฟเวอร์ วิเคราะห์พฤติกรรมผู้เล่นและประสิทธิภาพ",
      tags: ["วิเคราะห์", "ข้อมูล"],
    },
    {
      icon: Shield,
      title: "Security",
      description: "เครื่องมือป้องกันขั้นสูง ระบบความปลอดภัยและการเข้ารหัสข้อมูล",
      tags: ["ความปลอดภัย", "เข้ารหัส"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            ฟีเจอร์ครบครัน
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 thai-text">
            ฟีเจอร์ครบครันสำหรับ{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              จัดการองค์กร
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto thai-text">
            ระบบจัดการที่ตอบโจทย์ทุกความต้องการของแก็ง ครอบครัว หน่วยงาน และทีมแอดมิน FiveM
          </p>
        </div>

        {/* Core Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 thai-text">ฟีเจอร์หลัก</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ฟีเจอร์พื้นฐานที่จำเป็นสำหรับการจัดการองค์กรอย่างมีประสิทธิภาพ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-card border-primary/20"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary group-hover:shadow-glow transition-all duration-300">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg thai-text">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4 thai-text">
                      {feature.description}
                    </CardDescription>
                    <div className="flex flex-wrap justify-center gap-2">
                      {feature.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 thai-text">ฟีเจอร์ขั้นสูง</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              เทคโนโลยีล้ำสมัยที่ช่วยยกระดับการจัดการให้ทันสมัยยิ่งขึ้น
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-card border-accent/20"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent group-hover:shadow-glow transition-all duration-300">
                      <Icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg thai-text">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4 thai-text">
                      {feature.description}
                    </CardDescription>
                    <div className="flex flex-wrap justify-center gap-2">
                      {feature.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs border-accent/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-card rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4 thai-text">
            พร้อมเริ่มต้นใช้งานแล้วใช่ไหม?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto thai-text">
            ทดลองใช้ระบบจัดการที่ทรงพลังนี้ฟรี 7 วัน ไม่มีค่าใช้จ่าย ไม่ต้องใส่บัตรเครดิต
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="animate-glow">
              ทดลองใช้ฟรี 7 วัน
            </Button>
            <Button variant="outline" size="lg">
              ดูตัวอย่างการใช้งาน
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;