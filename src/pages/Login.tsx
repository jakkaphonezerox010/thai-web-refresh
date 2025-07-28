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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "ยินดีต้อนรับกลับมา!",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
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
      
      {/* Sparkle Effects */}
      <div className="absolute top-1/4 right-1/4 animate-pulse">
        <Sparkles className="w-6 h-6 text-primary/40" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-4 h-4 text-accent/40" />
      </div>

      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl animate-fade-in">
        <CardHeader className="space-y-6 text-center relative">
          {/* Animated Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 animate-pulse">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              เข้าสู่ระบบ
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              กรอกข้อมูลเพื่อเข้าสู่ระบบ
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground/80">อีเมล</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="อีเมลของคุณ"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-4 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground/80">รหัสผ่าน</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="รหัสผ่านของคุณ"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <span className="relative z-10">เข้าสู่ระบบ</span>
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              ยังไม่มีบัญชี?{' '}
              <Link 
                to="/register" 
                className="text-primary hover:text-accent transition-colors duration-200 font-medium story-link"
              >
                สมัครสมาชิก
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;