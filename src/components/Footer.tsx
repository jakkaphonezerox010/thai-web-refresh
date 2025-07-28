import { Link } from "react-router-dom";
import { Gamepad2, Mail, MessageCircle, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-secondary border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                <Gamepad2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Dobules Six
                </span>
                <p className="text-xs text-muted-foreground">FiveM Management</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground thai-text">
              ระบบจัดการองค์กรที่ทันสมัยและครบครันสำหรับ FiveM พร้อมฟีเจอร์ขั้นสูงที่ตอบโจทย์ทุกความต้องการ
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">เมนูหลัก</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  ฟีเจอร์ทั้งหมด
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  แพ็คเกจราคา
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  ทดลองใช้งาน
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">การสนับสนุน</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Support 24/7</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Discord Community</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Email Support</span>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">สถิติ</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">องค์กรที่ใช้งาน</span>
                <span className="text-sm font-semibold text-success">150+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">สมาชิกทั้งหมด</span>
                <span className="text-sm font-semibold text-primary">50K+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">เวลาออนไลน์</span>
                <span className="text-sm font-semibold text-accent">24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Dobules Six. สงวนลิขสิทธิ์ทั้งหมด
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                เงื่อนไขการใช้งาน
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;