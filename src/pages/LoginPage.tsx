
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

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  useEffect(() => {
    if (user) {
      setIsRedirecting(true);
      
      if (isAdmin) {
        toast.success("Welcome back, Admin!");
        navigate('/admin');
      } else {
        toast.success("Welcome back!");
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setLoginError("");
    const { error } = await signIn(values.email, values.password);
    if (error) {
      setLoginError(error.message || "Login failed. Please check your credentials.");
      return;
    }
    // Success case is handled in the useEffect above
  };

  return (
    <div className="container-custom max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your NexShop account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
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
                {form.formState.isSubmitting || isRedirecting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
          
          <div className="text-xs text-muted-foreground text-center w-full border-t pt-4 mt-2">
            <p>
              Are you an admin?{" "}
              <Link to="/admin-login" className="text-primary hover:underline">
                Admin Login
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
