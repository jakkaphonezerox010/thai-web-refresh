import React, { useState, useEffect } from 'react';
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
  Settings,
  BarChart3,
  Zap,
  Package,
  Heart,
  Star,
  Activity,
  Users,
  Database
} from 'lucide-react';
import logo from '@/assets/logo.png';
import { NotificationPanel } from '@/components/NotificationPanel';
import { CreditTopup } from '@/components/CreditTopup';
import { WebsiteCard } from '@/components/WebsiteCard';
import { CreateWebsite } from '@/components/CreateWebsite';
import { ServerManager } from '@/components/ServerManager';
import { PackageUpgrade } from '@/components/PackageUpgrade';
import { SystemSettings } from '@/components/SystemSettings';

const Dashboard = () => {
  const { user, logout, updateCredits } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCreateWebsiteOpen, setIsCreateWebsiteOpen] = useState(false);
  const [isServerManagerOpen, setIsServerManagerOpen] = useState(false);
  const [isPackageUpgradeOpen, setIsPackageUpgradeOpen] = useState(false);
  const [isSystemSettingsOpen, setIsSystemSettingsOpen] = useState(false);

  // อัพเดทเวลาทุกวินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ข้อมูลเว็บไซต์จำลอง
  const websites = [
    {
      id: '1',
      name: 'FiveM Server #1',
      domain: 'fivem-server1.myhost.com',
      status: 'online' as const,
      type: 'fivem' as const,
      players: 47,
      maxPlayers: 64,
      uptime: 99.8,
      lastSeen: '2 นาทีที่แล้ว'
    },
    {
      id: '2',
      name: 'Website Portfolio',
      domain: 'portfolio.myhost.com',
      status: 'online' as const,
      type: 'website' as const,
      uptime: 99.9,
      lastSeen: '1 นาทีที่แล้ว'
    },
    {
      id: '3',
      name: 'E-commerce Store',
      domain: 'shop.myhost.com',
      status: 'maintenance' as const,
      type: 'website' as const,
      uptime: 95.2,
      lastSeen: '30 นาทีที่แล้ว'
    }
  ];

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
      <div className="border-b bg-gradient-to-r from-card/95 to-primary/5 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur border border-primary/30 shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
                  ยินดีต้อนรับ, {user.name}
                </h1>
                <p className="text-muted-foreground font-medium">ระบบจัดการเว็บไซต์และเซิร์ฟเวอร์</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{currentTime.toLocaleString('th-TH')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl px-6 py-4 border border-primary/20 shadow-lg hover:shadow-primary/25 transition-all duration-300">
                <div className="relative">
                  <Coins className="w-6 h-6 text-primary animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {user.credits.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">เครดิตคงเหลือ</div>
                </div>
              </div>
              
              <NotificationPanel />
              
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-all duration-300 px-6 py-3 rounded-xl"
              >
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
                  <Button 
                    className="h-16 flex-col gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 hover:scale-105"
                    onClick={() => setIsCreateWebsiteOpen(true)}
                  >
                    <Globe className="h-6 w-6 animate-pulse" />
                    <span>สร้างเว็บไซต์ใหม่</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsServerManagerOpen(true)}
                  >
                    <Server className="h-6 w-6" />
                    <span>จัดการเซิร์ฟเวอร์</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2 hover:bg-accent/10 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsPackageUpgradeOpen(true)}
                  >
                    <Package className="h-6 w-6" />
                    <span>อัปเกรดแพ็คเกจ</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2 hover:bg-secondary/10 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsSystemSettingsOpen(true)}
                  >
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
                  {websites.map((website) => (
                    <WebsiteCard 
                      key={website.id} 
                      website={website} 
                      onManage={(site) => {
                        toast({
                          title: "เปิดหน้าจัดการ",
                          description: `กำลังเปิดหน้าจัดการสำหรับ ${site.name}`,
                        });
                      }} 
                    />
                  ))}

                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsCreateWebsiteOpen(true)}
                  >
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
            <CreditTopup />

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

      {/* Dialog Components */}
      <CreateWebsite isOpen={isCreateWebsiteOpen} onClose={() => setIsCreateWebsiteOpen(false)} />
      <ServerManager isOpen={isServerManagerOpen} onClose={() => setIsServerManagerOpen(false)} />
      <PackageUpgrade isOpen={isPackageUpgradeOpen} onClose={() => setIsPackageUpgradeOpen(false)} />
      <SystemSettings isOpen={isSystemSettingsOpen} onClose={() => setIsSystemSettingsOpen(false)} />
    </div>
  );
};

export default Dashboard;