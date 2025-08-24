import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LockKeyholeIcon, Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "@/apis/authApi";
import { useState } from "react";
// Zod validation schema
const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


const ResetPassword = () => {
  const location = useLocation();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const token = new URLSearchParams(location.search).get("token");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const isValid = await form.trigger();
    toast.dismiss();
    if (!isValid) return;

    try {
      await resetPassword({ token, password: data.password }).unwrap();
      toast.success("Password reset successfully! You can now login.");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-xs w-full flex flex-col items-center">
        <p className="mt-4 text-xl font-bold tracking-tight">Reset Password</p>

        <div className="my-7 w-full flex items-center justify-center overflow-hidden">
          <span className="text-sm px-2">RESET</span>
        </div>

        <Form {...form}>
          <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyholeIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      {
                        hidePassword ? (
                          <EyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={() => setHidePassword(false)} />
                        ) : (
                          <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={() => setHidePassword(true)} />
                        )
                      }
                      <Input
                        type={hidePassword ? "password" : "text"}
                        placeholder="Enter new password"
                        className="w-full pl-10"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyholeIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      {
                        hideConfirmPassword ? (
                          <EyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={() => setHideConfirmPassword(false)} />
                        ) : (
                          <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer" onClick={() => setHideConfirmPassword(true)} />
                        )
                      }
                      <Input
                        type={hideConfirmPassword ? "password" : "text"}
                        placeholder="Confirm new password"
                        className="w-full pl-10"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                </FormItem>
              )}
            />

            <LoadingButton type="submit" className="w-full" isLoading={isLoading}>
              Reset Password
            </LoadingButton>
          </form>
        </Form>

        <p className="mt-5 text-sm text-center">
          Back to{" "}
          <Link to="/login" className="ml-1 underline text-muted-foreground">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
