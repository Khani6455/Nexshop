
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shield } from "lucide-react";

const adminLoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
});

type AdminLoginForm = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const { signIn, user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  useEffect(() => {
    if (isLoading) return;
    
    if (user) {
      setIsRedirecting(true);
      
      if (isAdmin) {
        console.log("User is admin, redirecting to admin page");
        toast.success("Welcome back, Admin!");
        navigate('/admin');
      } else {
        // If user is logged in but not an admin, show error and redirect to home
        console.log("User is not admin, redirecting to home");
        toast.error("Access Denied: You do not have admin privileges");
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate, isLoading]);

  const form = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AdminLoginForm) => {
    setLoginError("");
    console.log("Attempting admin login with:", values.email);
    const { error } = await signIn(values.email, values.password);
    if (error) {
      setLoginError(error.message || "Login failed. Please check your credentials.");
      return;
    }
    // Success case is handled in the useEffect above
  };

  if (isLoading) {
    return (
      <div className="container-custom max-w-md py-10">
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">Checking authentication status...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-custom max-w-md py-10">
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">Sign in to access the NexShop admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@nexshop.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {loginError && (
                <div className="text-destructive text-sm">{loginError}</div>
              )}
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isRedirecting}>
                {form.formState.isSubmitting || isRedirecting ? "Signing In..." : "Access Admin Panel"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 bg-primary/5">
          <p className="text-sm text-muted-foreground">
            Not an admin?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Regular Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
