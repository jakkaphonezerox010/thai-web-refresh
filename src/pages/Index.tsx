import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Users,
  Clock,
  Star,
  ArrowRight,
  Shield,
  Zap,
  Target,
  CheckCircle,
  TrendingUp,
  Calendar,
  Package,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

const Index = () => {
  const stats = [
    { label: "องค์กรที่ใช้งาน", value: "150+", icon: Users },
    { label: "สมาชิกที่จัดการ", value: "50K+", icon: Target },
    { label: "บริการตลอดเวลา", value: "24/7", icon: Clock },
  ];

  const features = [
    {
      icon: Calendar,
      title: "ระบบแจ้ง/ลา/สาย/ขาด",
      description: "จัดการการลาและการเข้างานอัตโนมัติ",
    },
    {
      icon: Package,
      title: "ระบบส่งของแก็ง",
      description: "ติดตามการส่งมอบไอเทมภายในองค์กร",
    },
    {
      icon: Users,
      title: "จัดการสมาชิก",
      description: "เพิ่ม ลบ แก้ไขข้อมูลสมาชิกได้ง่าย",
    },
    {
      icon: AlertTriangle,
      title: "ระบบรีพอร์ต",
      description: "แจ้งปัญหาถึงแอดมินและหัวหน้าบ้าน",
    },
    {
      icon: BarChart3,
      title: "Dashboard วิเคราะห์",
      description: "ติดตามสถิติและประสิทธิภาพ",
    },
    {
      icon: Shield,
      title: "ความปลอดภัยสูง",
      description: "ระบบรักษาความปลอดภัยขั้นสูง",
    },
  ];

  const testimonials = [
    {
      name: "แก็ง Dragon",
      role: "หัวหน้าแก็ง",
      content: "ระบบนี้ช่วยให้เราจัดการสมาชิกได้ง่ายขึ้นมาก การแจ้งลาและตรวจสอบการเข้างานสะดวกมาก",
      rating: 5,
    },
    {
      name: "หน่วยงาน EMS",
      role: "ผู้จัดการ",
      content: "Dashboard วิเคราะห์ช่วยให้เราติดตามประสิทธิภาพของทีมได้อย่างชัดเจน แนะนำเลยครับ",
      rating: 5,
    },
    {
      name: "ทีมแอดมิน ServerX",
      role: "หัวหน้าแอดมิน",
      content: "AI Moderation และระบบรีพอร์ตช่วยลดภาระงานของเราได้มาก มีประสิทธิภาพสูงมาก",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 animate-float">
              <Gamepad2 className="h-4 w-4 mr-2" />
              ระบบจัดการองค์กรสำหรับ FiveM
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 thai-text">
              ระบบเช่า{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                จัดการองค์กร
              </span>
              <br />
              สำหรับ FiveM
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 thai-text">
              ระบบจัดการครบวงจรสำหรับแก็ง ครอบครัว หน่วยงาน และทีมแอดมิน 
              พร้อมฟีเจอร์ แจ้ง/ลา/สาย/ขาด และระบบรีพอร์ต
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/register">
                <Button variant="hero" size="xl" className="animate-glow group">
                  เริ่มใช้งานฟรี
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/packages">
                <Button variant="outline" size="xl">
                  ดูแพ็คเกจ
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground thai-text">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Dobules Six Dashboard
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 thai-text">
              สัมผัสประสบการณ์{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                การจัดการที่ทันสมัย
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Server Status */}
            <Card className="lg:col-span-2 bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="thai-text flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span>สถานะเซิร์ฟเวอร์</span>
                  <Badge variant="outline" className="text-success border-success/30">
                    ดีเยี่ยม
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">247</div>
                    <div className="text-sm text-muted-foreground">ผู้เล่นออนไลน์</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-destructive mb-2">12</div>
                    <div className="text-sm text-muted-foreground">การแบนวันนี้</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <CheckCircle className="h-6 w-6 text-success" />
                      <span className="text-sm font-semibold text-success">AI Moderation</span>
                    </div>
                    <div className="text-sm text-muted-foreground">เปิดใช้งาน</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card className="bg-gradient-card border-accent/20 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="thai-text flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span>Premium Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-accent" />
                  <span className="text-sm">AI Analytics ขั้นสูง</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">Security 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">สมาชิกไม่จำกัด</span>
                </div>
                <Link to="/register">
                  <Button variant="outline" size="sm" className="w-full">
                    เริ่มใช้งาน
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 thai-text">
              ฟีเจอร์ครบครัน{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                สำหรับทุกองค์กร
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto thai-text">
              ระบบจัดการที่ตอบโจทย์ทุกความต้องการของแก็ง ครอบครัว หน่วยงาน และทีมแอดมิน FiveM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-card border-primary/20">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary group-hover:shadow-glow transition-all duration-300">
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg thai-text">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center thai-text">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/features">
              <Button variant="outline" size="lg">
                ดูฟีเจอร์ทั้งหมด
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 thai-text">
              ลูกค้าของเรา{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                พึงพอใจ
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-warning fill-current" />
                    ))}
                  </div>
                  <CardDescription className="thai-text text-base">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center bg-gradient-card rounded-2xl p-16 border border-primary/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 thai-text">
              พร้อมเริ่มต้น{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ใช่ไหม?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto thai-text">
              ทดลองใช้ระบบจัดการองค์กรที่ทันสมัยและครบครันนี้ฟรี 7 วัน
              ไม่มีค่าใช้จ่าย ไม่ต้องใส่บัตรเครดิต
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register">
                <Button variant="hero" size="xl" className="animate-glow group">
                  เริ่มใช้งานฟรี
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl">
                  ติดต่อเรา
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
