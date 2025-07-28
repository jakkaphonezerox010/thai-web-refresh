import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
              <AlertTriangle className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">404</h1>
            <p className="text-xl text-muted-foreground mb-4 thai-text">ขออภัย! ไม่พบหน้าที่คุณต้องการ</p>
            <p className="text-muted-foreground mb-8 thai-text">
              หน้าที่คุณเข้าถึงอาจถูกย้ายหรือไม่มีอยู่จริง
            </p>
          </div>
          <div className="space-y-4">
            <Link to="/">
              <Button variant="hero" size="lg" className="w-full">
                <Home className="h-5 w-5 mr-2" />
                กลับสู่หน้าหลัก
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full">
                แจ้งปัญหา
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
