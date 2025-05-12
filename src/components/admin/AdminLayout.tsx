
import { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type AdminLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const AdminLayout = ({ children, title = "Admin Dashboard" }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  
  useEffect(() => {
    // Check admin status once loading is complete
    if (!isLoading && !isAdmin) {
      toast.error("Access denied: Admin privileges required");
      navigate('/');
    }
  }, [isAdmin, isLoading, navigate]);
  
  // Show loading or redirect if not admin
  if (isLoading) {
    return <div className="container-custom py-10">Loading admin access...</div>;
  }
  
  if (!isAdmin) {
    return null; // Will redirect via the useEffect
  }
  
  return (
    <div className="container-custom py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button onClick={() => navigate('/account')}>Back to Account</Button>
        </div>
      </div>
      {children}
    </div>
  );
};
