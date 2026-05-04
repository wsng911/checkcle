import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";

// 密码 change form schema
const passwordFormSchema = z.object({
  current密码: z.string().min(1, "Current password is required"),
  new密码: z.string().min(8, "密码 must be at least 8 characters"),
  confirm密码: z.string().min(8, "确认 password is required"),
}).refine((data) => data.new密码 === data.confirm密码, {
  message: "密码s don't match",
  path: ["confirm密码"],
});

type 密码FormValues = z.infer<typeof passwordFormSchema>;

interface Change密码FormProps {
  userId: string;
}

export function Change密码Form({ userId }: Change密码FormProps) {
  const [is提交ting, setIs提交ting] = useState(false);
  const [showCurrent密码, setShowCurrent密码] = useState(false);
  const [showNew密码, setShowNew密码] = useState(false);
  const [show确认密码, setShow确认密码] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<密码FormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      current密码: "",
      new密码: "",
      confirm密码: "",
    },
  });

  // Function to determine which collection the user belongs to
  const getUserCollection = async (userId: string): Promise<string> => {
    try {
      // First try to find the user in the regular users collection
      await pb.collection('users').getOne(userId);
      return 'users';
    } catch (error) {
      try {
        // If not found, try the superadmin collection
        await pb.collection('_superusers').getOne(userId);
        return '_superusers';
      } catch (error) {
        throw new Error('User not found in any collection');
      }
    }
  };

  async function on提交(data: 密码FormValues) {
    setIs提交ting(true);
    
    try {
      console.log("Starting password change for user:", userId);
      
      // Determine which collection the user belongs to
      const collection = await getUserCollection(userId);
      console.log("User found in collection:", collection);
      
      // PocketBase requires the old password along with the new one
      await pb.collection(collection).update(userId, {
        old密码: data.current密码,
        password: data.new密码,
        password确认: data.confirm密码,
      });

      // Refresh auth data to ensure token remains valid
      await authService.refreshUserData();
      
      toast({
        title: "密码 updated",
        description: "Your password has been changed successfully. You will be logged out in 3 seconds for security.",
      });
      
      // Reset the form
      form.reset();
      
      // Auto logout after successful password change
      setTimeout(() => {
        console.log("Auto logout after password change");
        authService.logout();
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      console.error("密码 change error:", error);
      
      let errorMessage = "Failed to update password. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("Failed to authenticate")) {
          errorMessage = "Current password is incorrect. Please try again.";
        } else if (error.message.includes("User not found")) {
          errorMessage = "User account not found. Please contact your administrator.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "密码 change failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIs提交ting(false);
    }
  }

  return (
    <Form {...form}>
      <form on提交={form.handle提交(on提交)} class名称="space-y-6">
        <FormField
          control={form.control}
          name="current密码"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current 密码</FormLabel>
              <FormControl>
                <div class名称="relative">
                  <Input
                    type={showCurrent密码 ? "text" : "password"}
                    placeholder="Your current password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    class名称="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setShowCurrent密码(!showCurrent密码)}
                  >
                    {showCurrent密码 ? <EyeOff class名称="h-4 w-4" /> : <Eye class名称="h-4 w-4" />}
                    <span class名称="sr-only">
                      {showCurrent密码 ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="new密码"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New 密码</FormLabel>
              <FormControl>
                <div class名称="relative">
                  <Input
                    type={showNew密码 ? "text" : "password"}
                    placeholder="New password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    class名称="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setShowNew密码(!showNew密码)}
                  >
                    {showNew密码 ? <EyeOff class名称="h-4 w-4" /> : <Eye class名称="h-4 w-4" />}
                    <span class名称="sr-only">
                      {showNew密码 ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm密码"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认 密码</FormLabel>
              <FormControl>
                <div class名称="relative">
                  <Input
                    type={show确认密码 ? "text" : "password"}
                    placeholder="确认 new password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    class名称="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setShow确认密码(!show确认密码)}
                  >
                    {show确认密码 ? <EyeOff class名称="h-4 w-4" /> : <Eye class名称="h-4 w-4" />}
                    <span class名称="sr-only">
                      {show确认密码 ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={is提交ting}>
          {is提交ting ? "Updating..." : "Change 密码"}
        </Button>
      </form>
    </Form>
  );
}