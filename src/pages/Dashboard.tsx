import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Coins, 
  Plus, 
  LogOut, 
  User, 
  Crown, 
  Globe, 
  Server, 
  Shield, 
  TrendingUp, 
  Clock, 
  Bell,
  Settings,
  BarChart3,
  Zap,
  Package,
  Heart,
  Star
} from 'lucide-react';
import logo from '@/assets/logo.png';

const Dashboard = () => {
  const { user, logout, updateCredits } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "แล้วพบกันใหม่!",
    });
  };

  const handleTopUp = (amount: number) => {
    if (user) {
      updateCredits(user.credits + amount);
      toast({
        title: "เติมเครดิตสำเร็จ",
        description: `เติม ${amount} เครดิต เครดิตรวม: ${user.credits + amount}`,
      });
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Modern Header */}
      <div className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 p-2 bg-gradient-primary rounded-xl shadow-lg">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ยินดีต้อนรับ, {user.name}
                </h1>
                <p className="text-sm text-muted-foreground">ระบบจัดการเว็บไซต์ของคุณ</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-card rounded-lg px-4 py-2 border border-primary/20">
                <Coins className="w-5 h-5 text-primary animate-bounce" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{user.credits}</div>
                  <div className="text-xs text-muted-foreground">เครดิต</div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="hover:bg-destructive/10">
                <Bell className="w-4 h-4 mr-2" />
                แจ้งเตือน
              </Button>
              
              <Button variant="outline" onClick={handleLogout} className="hover:bg-destructive/10">
                <LogOut className="w-4 h-4 mr-2" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">เว็บไซต์ที่เช่า</p>
                  <p className="text-3xl font-bold text-primary">3</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +1 เดือนนี้
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-accent/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">เซิร์ฟเวอร์ออนไลน์</p>
                  <p className="text-3xl font-bold text-accent">2</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <Shield className="w-3 h-3 mr-1" />
                    ปลอดภัย
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Server className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-success/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">เวลาใช้งาน</p>
                  <p className="text-3xl font-bold text-success">99.9%</p>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    30 วันที่แล้ว
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-warning/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">เครดิตคงเหลือ</p>
                  <p className="text-3xl font-bold text-warning">{user.credits}</p>
                  <Progress value={(user.credits / 1000) * 100} className="w-full mt-2 h-2" />
                </div>
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Coins className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  การดำเนินการด่วน
                </CardTitle>
                <CardDescription>
                  จัดการเว็บไซต์และเซิร์ฟเวอร์ของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button className="h-16 flex-col gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-glow">
                    <Globe className="h-6 w-6" />
                    <span>สร้างเว็บไซต์ใหม่</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-primary/10">
                    <Server className="h-6 w-6" />
                    <span>จัดการเซิร์ฟเวอร์</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-accent/10">
                    <Package className="h-6 w-6" />
                    <span>อัปเกรดแพ็คเกจ</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-secondary/10">
                    <Settings className="h-6 w-6" />
                    <span>ตั้งค่าระบบ</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Website Management */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  เว็บไซต์ของคุณ
                </CardTitle>
                <CardDescription>
                  จัดการเว็บไซต์ที่เช่าอยู่
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">FiveM Server #1</p>
                        <p className="text-sm text-muted-foreground">myserver.example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-success border-success/30">
                        ออนไลน์
                      </Badge>
                      <Button size="sm" variant="outline">
                        จัดการ
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Website Portfolio</p>
                        <p className="text-sm text-muted-foreground">myportfolio.example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-success border-success/30">
                        ออนไลน์
                      </Badge>
                      <Button size="sm" variant="outline">
                        จัดการ
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    เพิ่มเว็บไซต์ใหม่
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">สถานะ:</span>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">สมาชิกตั้งแต่:</span>
                    <span className="text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString('th-TH')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">คะแนนความพึงพอใจ:</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Top-up */}
            <Card className="bg-gradient-card border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-accent" />
                  เติมเครดิต
                </CardTitle>
                <CardDescription>
                  เลือกแพ็คเกจที่เหมาะกับคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleTopUp(100)} 
                    variant="outline" 
                    className="w-full justify-between hover:bg-primary/10 h-12"
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      <span>100 เครดิต</span>
                    </div>
                    <Badge variant="secondary">ฟรี</Badge>
                  </Button>
                  
                  <Button 
                    onClick={() => handleTopUp(500)} 
                    variant="outline" 
                    className="w-full justify-between hover:bg-accent/10 h-12"
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      <span>500 เครดิต</span>
                    </div>
                    <Badge variant="secondary">+50 โบนัส</Badge>
                  </Button>
                  
                  <Button 
                    onClick={() => handleTopUp(1000)} 
                    className="w-full justify-between bg-gradient-to-r from-primary to-accent h-12"
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      <span>1000 เครดิต</span>
                    </div>
                    <Badge variant="secondary">+200 โบนัส</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  กิจกรรมล่าสุด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>เว็บไซต์ออนไลน์</span>
                    <span className="text-muted-foreground ml-auto">2 นาทีที่แล้ว</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>เติมเครดิต 100</span>
                    <span className="text-muted-foreground ml-auto">1 ชั่วโมงที่แล้ว</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>อัปเดทระบบ</span>
                    <span className="text-muted-foreground ml-auto">3 ชั่วโมงที่แล้ว</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;