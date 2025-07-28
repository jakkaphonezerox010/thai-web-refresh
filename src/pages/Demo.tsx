import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Package,
  BarChart3,
  Activity,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useState } from "react";
import logo from '@/assets/logo.png';

const Demo = () => {
  const [activeDemo, setActiveDemo] = useState("dashboard");

  const dailySummary = [
    { label: "เข้างานตรงเวลา", value: 42, color: "text-success" },
    { label: "ขาดงาน", value: 8, color: "text-destructive" },
    { label: "เข้างานสาย", value: 12, color: "text-warning" },
    { label: "ลาป่วย/กิจ", value: 5, color: "text-primary" },
  ];

  const recentActivities = [
    { time: "14:30", action: "สมาชิก 'แจ็ค' แจ้งลา", type: "leave", icon: Calendar },
    { time: "13:15", action: "ส่งของแก็งสำเร็จ", type: "delivery", icon: Package },
    { time: "12:45", action: "รีพอร์ตใหม่ถึงหัวหน้า", type: "report", icon: AlertTriangle },
    { time: "11:20", action: "สมาชิก 'โจ' เข้าสาย", type: "late", icon: Clock },
  ];

  const serverStats = [
    { label: "ผู้เล่นออนไลน์", value: "247", icon: Users, trend: "+5%" },
    { label: "ประสิทธิภาพ", value: "98%", icon: Activity, trend: "+2%" },
    { label: "การแบนวันนี้", value: "12", icon: Shield, trend: "-8%" },
    { label: "ผู้เล่นใหม่ (7 วัน)", value: "+15.2%", icon: TrendingUp, trend: "+3%" },
  ];

  const demoSections = [
    {
      id: "dashboard",
      name: "Dashboard หลัก",
      description: "หน้าจอควบคุมหลักที่แสดงข้อมูลสำคัญทั้งหมด",
    },
    {
      id: "leave",
      name: "แจ้งลา",
      description: "ระบบแจ้งลาที่ง่ายและรวดเร็ว",
    },
    {
      id: "delivery",
      name: "ส่งของแก็ง",
      description: "จัดการการส่งของและติดตามสถานะ",
    },
    {
      id: "report",
      name: "รีพอร์ตปัญหา",
      description: "แจ้งปัญหาถึงหัวหน้าหรือแอดมิน",
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
            ตัวอย่างการใช้งาน
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 thai-text">
            ดู{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dashboard จริง
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto thai-text">
            สัมผัสประสบการณ์การใช้งานจริงของระบบจัดการองค์กร Dobules Six
          </p>
        </div>

        {/* Interactive Demo Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demoSections.map((section) => (
            <Button
              key={section.id}
              variant={activeDemo === section.id ? "default" : "outline"}
              onClick={() => setActiveDemo(section.id)}
              className="thai-text"
            >
              {section.name}
            </Button>
          ))}
        </div>

        {/* Dashboard Demo */}
        {activeDemo === "dashboard" && (
          <div className="space-y-8 mb-16">
            {/* Server Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serverStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-success">{stat.trend}</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Main Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Daily Summary */}
              <Card className="lg:col-span-2 bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="thai-text">สรุปประจำวัน</CardTitle>
                  <CardDescription>สถิติการเข้างานของสมาชิกวันนี้</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {dailySummary.map((item, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-3xl font-bold ${item.color} mb-2`}>
                          {item.value}
                        </div>
                        <div className="text-sm text-muted-foreground thai-text">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Report Status */}
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="thai-text">สถานะรีพอร์ต</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">รีพอร์ตถึงหัวหน้าบ้าน</p>
                      <p className="text-lg font-semibold text-warning">3 รายการ</p>
                      <p className="text-xs text-muted-foreground">รอดำเนินการ</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-warning" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">รีพอร์ตถึงแอดมิน</p>
                      <p className="text-lg font-semibold text-success">1 รายการ</p>
                      <p className="text-xs text-muted-foreground">แก้ไขแล้ว</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    ดูรีพอร์ตทั้งหมด
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="thai-text">กิจกรรมล่าสุด</CardTitle>
                <CardDescription>กิจกรรมที่เกิดขึ้นในระบบ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="text-sm text-muted-foreground min-w-[50px]">
                          {activity.time}
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm thai-text">{activity.action}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Leave Demo */}
        {activeDemo === "leave" && (
          <Card className="max-w-2xl mx-auto bg-gradient-card border-primary/20 mb-16">
            <CardHeader>
              <CardTitle className="thai-text">แจ้งลา</CardTitle>
              <CardDescription>กรอกข้อมูลเพื่อแจ้งลา</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">ประเภทการลา</label>
                <select className="w-full mt-1 p-3 bg-input border border-border rounded-lg">
                  <option>ลาป่วย</option>
                  <option>ลากิจ</option>
                  <option>ลาพักผ่อน</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">วันที่เริ่ม</label>
                  <input type="date" className="w-full mt-1 p-3 bg-input border border-border rounded-lg" />
                </div>
                <div>
                  <label className="text-sm font-medium">วันที่สิ้นสุด</label>
                  <input type="date" className="w-full mt-1 p-3 bg-input border border-border rounded-lg" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">เหตุผล</label>
                <textarea 
                  className="w-full mt-1 p-3 bg-input border border-border rounded-lg h-24" 
                  placeholder="กรุณาระบุเหตุผลในการลา..."
                />
              </div>
              
              <Button variant="default" className="w-full">
                ส่งคำขอลา
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Delivery Demo */}
        {activeDemo === "delivery" && (
          <Card className="max-w-2xl mx-auto bg-gradient-card border-primary/20 mb-16">
            <CardHeader>
              <CardTitle className="thai-text">ส่งของแก็ง</CardTitle>
              <CardDescription>จัดการการส่งของภายในองค์กร</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">ผู้ส่ง</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 p-3 bg-input border border-border rounded-lg"
                    placeholder="ชื่อผู้ส่ง"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ผู้รับ</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 p-3 bg-input border border-border rounded-lg"
                    placeholder="ชื่อผู้รับ"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">รายการของ</label>
                <textarea 
                  className="w-full mt-1 p-3 bg-input border border-border rounded-lg h-24" 
                  placeholder="ระบุรายการของที่ต้องการส่ง..."
                />
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">สถานะการส่ง</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">เตรียมของ</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">กำลังส่ง</span>
                    <div className="h-4 w-4 rounded-full bg-warning animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">ส่งสำเร็จ</span>
                    <div className="h-4 w-4 rounded-full bg-muted" />
                  </div>
                </div>
              </div>
              
              <Button variant="default" className="w-full">
                ยืนยันการส่ง
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Report Demo */}
        {activeDemo === "report" && (
          <Card className="max-w-2xl mx-auto bg-gradient-card border-primary/20 mb-16">
            <CardHeader>
              <CardTitle className="thai-text">รีพอร์ตปัญหา</CardTitle>
              <CardDescription>แจ้งปัญหาถึงหัวหน้าหรือแอดมิน</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">รีพอร์ตถึง</label>
                <select className="w-full mt-1 p-3 bg-input border border-border rounded-lg">
                  <option>หัวหน้าบ้าน</option>
                  <option>แอดมิน</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">ประเภทปัญหา</label>
                <select className="w-full mt-1 p-3 bg-input border border-border rounded-lg">
                  <option>ปัญหาเทคนิค</option>
                  <option>ปัญหาสมาชิก</option>
                  <option>ปัญหาระบบ</option>
                  <option>อื่นๆ</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">รายละเอียดปัญหา</label>
                <textarea 
                  className="w-full mt-1 p-3 bg-input border border-border rounded-lg h-32" 
                  placeholder="อธิบายปัญหาที่พบอย่างละเอียด..."
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">ระดับความสำคัญ</label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="priority" className="text-primary" />
                    <span className="text-sm">ต่ำ</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="priority" className="text-primary" defaultChecked />
                    <span className="text-sm">ปานกลาง</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="priority" className="text-primary" />
                    <span className="text-sm">สูง</span>
                  </label>
                </div>
              </div>
              
              <Button variant="destructive" className="w-full">
                ส่งรีพอร์ต
              </Button>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <section className="text-center bg-gradient-card rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4 thai-text">
            ประทับใจกับระบบจัดการแล้วใช่ไหม?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto thai-text">
            เริ่มต้นใช้งานระบบจัดการองค์กรที่ทันสมัยนี้วันนี้ ทดลองใช้ฟรี 7 วัน
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="animate-glow">
              เริ่มทดลองใช้ฟรี 7 วัน
            </Button>
            <Button variant="outline" size="lg">
              ดูแพ็คเกจทั้งหมด
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;