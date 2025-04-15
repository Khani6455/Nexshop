
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type AdminLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const AdminLayout = ({ children, title = "Admin Dashboard" }: AdminLayoutProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="container-custom py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button onClick={() => navigate('/account')}>Back to Account</Button>
      </div>
      {children}
    </div>
  );
};
