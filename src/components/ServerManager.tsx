import React, { useState } from 'react';
import { Server, Play, Square, RotateCcw, Settings, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface ServerStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  cpu: number;
  memory: number;
  players?: number;
  maxPlayers?: number;
  uptime: string;
}

const mockServers: ServerStatus[] = [
  {
    id: '1',
    name: 'FiveM Server #1',
    status: 'online',
    cpu: 45,
    memory: 67,
    players: 47,
    maxPlayers: 64,
    uptime: '2d 14h 23m'
  },
  {
    id: '2',
    name: 'Web Server #1',
    status: 'online',
    cpu: 23,
    memory: 34,
    uptime: '7d 2h 15m'
  },
  {
    id: '3',
    name: 'Database Server',
    status: 'maintenance',
    cpu: 0,
    memory: 12,
    uptime: '0h 0m'
  }
];

interface ServerManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServerManager: React.FC<ServerManagerProps> = ({ isOpen, onClose }) => {
  const [servers, setServers] = useState<ServerStatus[]>(mockServers);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  const handleServerAction = async (serverId: string, action: 'start' | 'stop' | 'restart') => {
    setIsProcessing(serverId);
    
    // จำลองการดำเนินการ
    setTimeout(() => {
      setServers(prev => prev.map(server => 
        server.id === serverId 
          ? { 
              ...server, 
              status: action === 'stop' ? 'offline' : 'online' as const 
            }
          : server
      ));
      
      setIsProcessing(null);
      
      const actionText = {
        start: 'เริ่มต้น',
        stop: 'หยุด',
        restart: 'รีสตาร์ท'
      };
      
      toast({
        title: `${actionText[action]}เซิร์ฟเวอร์สำเร็จ`,
        description: `เซิร์ฟเวอร์ ${servers.find(s => s.id === serverId)?.name} ถูก${actionText[action]}แล้ว`,
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-destructive';
      case 'maintenance': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-success/10 text-success border-success/20">ออนไลน์</Badge>;
      case 'offline': return <Badge className="bg-destructive/10 text-destructive border-destructive/20">ออฟไลน์</Badge>;
      case 'maintenance': return <Badge className="bg-warning/10 text-warning border-warning/20">บำรุงรักษา</Badge>;
      default: return <Badge>ไม่ทราบ</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-card/95 backdrop-blur border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            จัดการเซิร์ฟเวอร์
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {servers.map((server) => (
            <Card key={server.id} className="bg-gradient-card border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{server.name}</CardTitle>
                  {getStatusBadge(server.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">CPU</p>
                    <div className="space-y-1">
                      <Progress value={server.cpu} className="h-2" />
                      <p className="text-xs text-muted-foreground">{server.cpu}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Memory</p>
                    <div className="space-y-1">
                      <Progress value={server.memory} className="h-2" />
                      <p className="text-xs text-muted-foreground">{server.memory}%</p>
                    </div>
                  </div>
                  
                  {server.players !== undefined && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">ผู้เล่น</p>
                      <p className="text-lg font-bold text-primary">
                        {server.players}/{server.maxPlayers}
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="text-sm font-medium">{server.uptime}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {server.status === 'offline' ? (
                    <Button
                      size="sm"
                      onClick={() => handleServerAction(server.id, 'start')}
                      disabled={isProcessing === server.id}
                      className="bg-success hover:bg-success/90"
                    >
                      {isProcessing === server.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      เริ่มต้น
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleServerAction(server.id, 'stop')}
                      disabled={isProcessing === server.id}
                    >
                      {isProcessing === server.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Square className="w-4 h-4 mr-2" />
                      )}
                      หยุด
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleServerAction(server.id, 'restart')}
                    disabled={isProcessing === server.id}
                  >
                    {isProcessing === server.id ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RotateCcw className="w-4 h-4 mr-2" />
                    )}
                    รีสตาร์ท
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "เปิดหน้าตั้งค่า",
                        description: `กำลังเปิดหน้าตั้งค่าสำหรับ ${server.name}`,
                      });
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    ตั้งค่า
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};