import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'update';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'update',
      title: 'อัพเดทระบบ',
      message: 'เพิ่มฟีเจอร์ใหม่สำหรับจัดการโดเมน',
      time: '5 นาทีที่แล้ว',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: 'เว็บไซต์ออนไลน์',
      message: 'FiveM Server #1 เริ่มทำงานแล้ว',
      time: '15 นาทีที่แล้ว',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'การบำรุงรักษา',
      message: 'จะมีการบำรุงรักษาเซิร์ฟเวอร์ในวันอาทิตย์',
      time: '2 ชั่วโมงที่แล้ว',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'update': return <Zap className="w-4 h-4 text-primary" />;
      default: return <Info className="w-4 h-4 text-accent" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="hover:bg-primary/10 relative animate-pulse"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-4 h-4 mr-2" />
        แจ้งเตือน
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-xs animate-bounce">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-80 bg-card/95 backdrop-blur border-primary/20 shadow-glow z-50 animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">การแจ้งเตือน</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                  notification.read 
                    ? 'bg-background/50 border-border/50' 
                    : 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};