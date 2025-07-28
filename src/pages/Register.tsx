import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "รหัสผ่านไม่ตรงกัน",
        description: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "รหัสผ่านสั้นเกินไป",
        description: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        variant: "destructive"
      });
      return;
    }

    if (username.length < 3) {
      toast({
        title: "ชื่อผู้ใช้สั้นเกินไป",
        description: "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Use username as email for local storage
    const email = `${username}@local.com`;
    const success = await register(email, password, username);
    
    if (success) {
      toast({
        title: "สมัครสมาชิกสำเร็จ",
        description: "ยินดีต้อนรับสู่ระบบ!",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "สมัครสมาชิกไม่สำเร็จ",
        description: "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-primary/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Sparkle Effects */}
      <div className="absolute top-1/4 right-1/4 animate-pulse">
        <Sparkles className="w-6 h-6 text-primary/40" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-4 h-4 text-accent/40" />
      </div>
      <div className="absolute top-1/3 left-1/3 animate-pulse" style={{ animationDelay: '3s' }}>
        <Sparkles className="w-5 h-5 text-secondary/40" />
      </div>

      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl animate-fade-in">
        <CardHeader className="space-y-6 text-center relative">
          {/* Animated Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg shadow-primary/25 animate-glow">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain animate-spin-slow"
                  style={{ animation: 'spin 8s linear infinite' }}
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl opacity-30 blur animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              สมัครสมาชิก
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              เข้าร่วมกับเราและเริ่มต้นการเดินทางของคุณ
            </CardDescription>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-foreground/80">
                ชื่อผู้ใช้
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="ชื่อผู้ใช้ของคุณ"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-4 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground/80">
                รหัสผ่าน
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-4 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">
                ยืนยันรหัสผ่าน
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-4 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-primary via-accent to-secondary hover:shadow-lg hover:shadow-primary/25 transform hover:scale-[1.02] transition-all duration-300 font-medium text-white relative overflow-hidden"
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              <span className="relative z-10">สมัครสมาชิก</span>
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              มีบัญชีอยู่แล้ว?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-accent transition-colors duration-200 font-medium story-link"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;