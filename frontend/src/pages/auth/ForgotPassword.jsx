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
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "@/apis/authApi";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .min(1, "Email is required"),
});

const ForgotPassword = () => {
  // 🔗 Hook into RTK Query
  const [forgotPassword, { isLoading, isError, error, isSuccess }] =
    useForgotPasswordMutation();

  const form = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const isValid = await form.trigger();
    toast.dismiss();

    if (!isValid) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      await forgotPassword(data.email).unwrap();
      toast.success("Password reset link sent to your email!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2 p-4">
        {/* LEFT SIDE - Illustration */}
        <div className="relative hidden lg:block rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg"
            alt="Forgot Password Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="max-w-xs m-auto w-full flex flex-col items-center">
          <p className="mt-4 text-xl font-bold tracking-tight">
            Forgot Password
          </p>

          <div className="my-7 w-full flex items-center justify-center overflow-hidden">
            <Separator />
            <span className="text-sm px-2">RESET</span>
            <Separator />
          </div>

          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          className="w-full pl-10"
                          disabled={isLoading}
                          {...field}
                          onBlur={() => {
                            field.onBlur();
                            form.trigger("email");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <LoadingButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Send Reset Link
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
    </div>
  );
};

export default ForgotPassword;
