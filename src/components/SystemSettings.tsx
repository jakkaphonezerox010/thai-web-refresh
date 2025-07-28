import React, { useState } from 'react';
import { Settings, User, Shield, Bell, Palette, Save, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface SystemSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Profile Settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    language: 'th',
  });
  
  // Security Settings
  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    loginAlerts: true,
  });
  
  // Notification Settings
  const [notificationData, setNotificationData] = useState({
    emailUpdates: true,
    systemAlerts: true,
    marketingEmails: false,
    mobileNotifications: true,
  });
  
  // Appearance Settings
  const [appearanceData, setAppearanceData] = useState({
    theme: 'system',
    language: 'th',
    timezone: 'Asia/Bangkok',
  });

  const handleSaveProfile = () => {
    toast({
      title: "บันทึกข้อมูลส่วนตัวสำเร็จ",
      description: "ข้อมูลโปรไฟล์ของคุณได้รับการอัปเดตแล้ว",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "บันทึกการตั้งค่าความปลอดภัยสำเร็จ",
      description: "การตั้งค่าความปลอดภัยได้รับการอัปเดตแล้ว",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "บันทึกการตั้งค่าการแจ้งเตือนสำเร็จ",
      description: "การตั้งค่าการแจ้งเตือนได้รับการอัปเดตแล้ว",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "บันทึกการตั้งค่าการแสดงผลสำเร็จ",
      description: "การตั้งค่าการแสดงผลได้รับการอัปเดตแล้ว",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-card/95 backdrop-blur border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            ตั้งค่าระบบ
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              โปรไฟล์
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              ความปลอดภัย
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              การแจ้งเตือน
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              การแสดงผล
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลส่วนตัว</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ชื่อ</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">อีเมล</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="0xx-xxx-xxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">ภาษา</Label>
                    <Select value={profileData.language} onValueChange={(value) => setProfileData(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="th">ไทย</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-primary to-accent hover:shadow-glow">
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกข้อมูล
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ความปลอดภัย</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การยืนยันตัวตนแบบ 2 ขั้นตอน</Label>
                    <p className="text-sm text-muted-foreground">เพิ่มความปลอดภัยด้วยการยืนยันผ่าน SMS หรือแอพ</p>
                  </div>
                  <Switch
                    checked={securityData.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, twoFactorEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>แจ้งเตือนทางอีเมล</Label>
                    <p className="text-sm text-muted-foreground">รับการแจ้งเตือนเมื่อมีการเข้าสู่ระบบ</p>
                  </div>
                  <Switch
                    checked={securityData.emailNotifications}
                    onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การแจ้งเตือนการเข้าสู่ระบบ</Label>
                    <p className="text-sm text-muted-foreground">แจ้งเตือนเมื่อมีการเข้าสู่ระบบจากอุปกรณ์ใหม่</p>
                  </div>
                  <Switch
                    checked={securityData.loginAlerts}
                    onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, loginAlerts: checked }))}
                  />
                </div>

                <Button onClick={handleSaveSecurity} className="bg-gradient-to-r from-primary to-accent hover:shadow-glow">
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกการตั้งค่า
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>การแจ้งเตือน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>อัปเดตทางอีเมล</Label>
                    <p className="text-sm text-muted-foreground">รับข่าวสารและการอัปเดตทางอีเมล</p>
                  </div>
                  <Switch
                    checked={notificationData.emailUpdates}
                    onCheckedChange={(checked) => setNotificationData(prev => ({ ...prev, emailUpdates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การแจ้งเตือนระบบ</Label>
                    <p className="text-sm text-muted-foreground">รับการแจ้งเตือนเกี่ยวกับระบบและการบำรุงรักษา</p>
                  </div>
                  <Switch
                    checked={notificationData.systemAlerts}
                    onCheckedChange={(checked) => setNotificationData(prev => ({ ...prev, systemAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>อีเมลการตลาด</Label>
                    <p className="text-sm text-muted-foreground">รับข้อเสนอพิเศษและโปรโมชั่น</p>
                  </div>
                  <Switch
                    checked={notificationData.marketingEmails}
                    onCheckedChange={(checked) => setNotificationData(prev => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การแจ้งเตือนมือถือ</Label>
                    <p className="text-sm text-muted-foreground">รับการแจ้งเตือนผ่านอุปกรณ์มือถือ</p>
                  </div>
                  <Switch
                    checked={notificationData.mobileNotifications}
                    onCheckedChange={(checked) => setNotificationData(prev => ({ ...prev, mobileNotifications: checked }))}
                  />
                </div>

                <Button onClick={handleSaveNotifications} className="bg-gradient-to-r from-primary to-accent hover:shadow-glow">
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกการตั้งค่า
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>การแสดงผล</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">ธีม</Label>
                    <Select value={appearanceData.theme} onValueChange={(value) => setAppearanceData(prev => ({ ...prev, theme: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">สว่าง</SelectItem>
                        <SelectItem value="dark">มืด</SelectItem>
                        <SelectItem value="system">ตามระบบ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appearance-language">ภาษา</Label>
                    <Select value={appearanceData.language} onValueChange={(value) => setAppearanceData(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="th">ไทย</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">เขตเวลา</Label>
                  <Select value={appearanceData.timezone} onValueChange={(value) => setAppearanceData(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Bangkok">เวลาไทย (UTC+7)</SelectItem>
                      <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveAppearance} className="bg-gradient-to-r from-primary to-accent hover:shadow-glow">
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกการตั้งค่า
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};