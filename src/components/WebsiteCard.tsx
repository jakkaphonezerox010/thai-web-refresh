import React, { useState } from 'react';
import { Globe, Server, Settings, Activity, ExternalLink, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Website {
  id: string;
  name: string;
  domain: string;
  status: 'online' | 'offline' | 'maintenance';
  type: 'fivem' | 'website';
  players?: number;
  maxPlayers?: number;
  uptime: number;
  lastSeen: string;
}

interface WebsiteCardProps {
  website: Website;
  onManage: (website: Website) => void;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onManage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success border-success/30 bg-success/10';
      case 'offline': return 'text-destructive border-destructive/30 bg-destructive/10';
      case 'maintenance': return 'text-warning border-warning/30 bg-warning/10';
      default: return 'text-muted-foreground border-border';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'ออนไลน์';
      case 'offline': return 'ออฟไลน์';
      case 'maintenance': return 'บำรุงรักษา';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const handleAction = async (action: string) => {
    setIsLoading(true);
    
    // จำลองการทำงาน
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `${action} สำเร็จ`,
        description: `ดำเนินการ ${action} สำหรับ ${website.name} เรียบร้อยแล้ว`,
      });
    }, 2000);
  };

  return (
    <Card className="bg-background/50 border border-primary/20 rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-105">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse">
              {website.type === 'fivem' ? (
                <Server className="w-5 h-5 text-white" />
              ) : (
                <Globe className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <p className="font-medium">{website.name}</p>
              <p className="text-sm text-muted-foreground">{website.domain}</p>
              {website.type === 'fivem' && (
                <p className="text-xs text-muted-foreground">
                  ผู้เล่น: {website.players}/{website.maxPlayers}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right mr-2">
              <Badge variant="outline" className={getStatusColor(website.status)}>
                <Activity className="w-3 h-3 mr-1" />
                {getStatusText(website.status)}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                Uptime: {website.uptime}%
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:bg-primary/10 transition-all duration-200"
                >
                  จัดการ
                </Button>
              </DialogTrigger>
              
              <DialogContent className="bg-card/95 backdrop-blur border-primary/20">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    จัดการ {website.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">สถานะ</label>
                      <Badge className={getStatusColor(website.status)}>
                        {getStatusText(website.status)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">เวลาทำงาน</label>
                      <p className="text-sm">{website.uptime}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">โดเมน</label>
                    <div className="flex items-center gap-2">
                      <p className="text-sm flex-1">{website.domain}</p>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleAction('รีสตาร์ท')}
                      disabled={isLoading}
                    >
                      {website.status === 'online' ? (
                        <Pause className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {website.status === 'online' ? 'หยุด' : 'เริ่ม'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleAction('รีสตาร์ท')}
                      disabled={isLoading}
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      รีสตาร์ท
                    </Button>
                    
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-accent"
                      onClick={() => onManage(website)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      ตั้งค่า
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};