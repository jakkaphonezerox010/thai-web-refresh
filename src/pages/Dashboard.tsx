import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Coins, Plus, LogOut, User } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">แดชบอร์ด</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {user.credits} เครดิต
              </Badge>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                ข้อมูลผู้ใช้
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">ชื่อ</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">อีเมล</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">สมาชิกตั้งแต่</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credits Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                เครดิตคงเหลือ
              </CardTitle>
              <CardDescription>
                ใช้เครดิตเพื่อเข้าถึงบริการต่างๆ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-4">
                {user.credits} เครดิต
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>สถานะ:</span>
                  <Badge variant={user.credits > 0 ? "default" : "destructive"}>
                    {user.credits > 0 ? "ใช้งานได้" : "หมดเครดิต"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Up Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                เติมเครดิต
              </CardTitle>
              <CardDescription>
                เลือกแพ็คเกจเครดิตที่ต้องการ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  onClick={() => handleTopUp(50)} 
                  variant="outline" 
                  className="w-full justify-between"
                >
                  <span>50 เครดิต</span>
                  <span className="text-muted-foreground">ฟรี</span>
                </Button>
                <Button 
                  onClick={() => handleTopUp(100)} 
                  variant="outline" 
                  className="w-full justify-between"
                >
                  <span>100 เครดิต</span>
                  <span className="text-muted-foreground">ฟรี</span>
                </Button>
                <Button 
                  onClick={() => handleTopUp(200)} 
                  variant="outline" 
                  className="w-full justify-between"
                >
                  <span>200 เครดิต</span>
                  <span className="text-muted-foreground">ฟรี</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">บริการ</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>บริการ A</CardTitle>
                <CardDescription>ค่าใช้จ่าย: 10 เครดิต</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  รายละเอียดบริการ A
                </p>
                <Button className="w-full" disabled={user.credits < 10}>
                  {user.credits < 10 ? "เครดิตไม่เพียงพอ" : "ใช้บริการ"}
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>บริการ B</CardTitle>
                <CardDescription>ค่าใช้จ่าย: 25 เครดิต</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  รายละเอียดบริการ B
                </p>
                <Button className="w-full" disabled={user.credits < 25}>
                  {user.credits < 25 ? "เครดิตไม่เพียงพอ" : "ใช้บริการ"}
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>บริการ C</CardTitle>
                <CardDescription>ค่าใช้จ่าย: 50 เครดิต</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  รายละเอียดบริการ C
                </p>
                <Button className="w-full" disabled={user.credits < 50}>
                  {user.credits < 50 ? "เครดิตไม่เพียงพอ" : "ใช้บริการ"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;