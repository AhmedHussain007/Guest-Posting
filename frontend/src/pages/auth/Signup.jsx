import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
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
import { DobPicker } from "@/components/dobPicker";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";


const formSchema = z.object({
  firstName: z.string().min(3, "First name too short").max(50, "First name is too long"),
  lastName: z.string().min(3, "Last name too short").max(50, "Last name is too long"),
  email: z.string().email("Please enter a valid email").min(5, "Email too short"),
  password: z.string().min(8, "Must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
    .nonempty("Password is required"),
  dob: z.date().refine(val => !!val, { message: "Date of birth is required" }),
});
import { useSignupUserMutation } from "@/apis/authApi";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [signupUser, { isLoading: signupIsLoading }] = useSignupUserMutation();
  const form = useForm({
    defaultValues: { firstName: "", lastName: "", email: "", password: "", dob: undefined },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formValues = form.watch();
  const disableButton =
    signupIsLoading ||
    !formValues.firstName?.trim() ||
    !formValues.lastName?.trim() ||
    !formValues.email?.trim() ||
    !formValues.password?.trim() ||
    !formValues.dob ||
    !form.formState.isValid;

  const onSubmit = async (data) => {
    const isValid = await form.trigger();
    toast.dismiss();
    if (!isValid) {
      toast.error("Please fix the errors in the form");
      return;
    }
    try {
      // Convert dob to ISO string if needed
      const payload = { ...data, dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob };
      await signupUser(payload).unwrap();
      navigate('/')
      toast.success("Account created successfully! Welcome to Zikrly!");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="h-screen m-0 p-0 flex items-center justify-center">
      <div className="m-0 p-0 w-full h-full grid lg:grid-cols-2 max-h-screen">
        {/* LEFT SIDE - Form */}
        <div className="max-w-xs m-auto w-full flex flex-col items-center">
          <p className="mt-4 text-xl font-bold tracking-tight">Signup to Zikrly</p>

          <Button className="mt-8 w-full gap-3">
            <GoogleLogo />
            Continue with Google
          </Button>

          <div className="my-7 w-full flex items-center justify-center overflow-hidden">
            <Separator />
            <span className="text-sm px-2">OR</span>
            <Separator />
          </div>

          <Form {...form}>
            <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name fields */}
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="John"
                            className="w-full pl-10"
                            disabled={signupIsLoading}
                            {...field}
                            onBlur={() => {
                              field.onBlur();
                              form.trigger("firstName");
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{form.formState.errors.firstName?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Doe"
                            className="w-full pl-10"
                            disabled={signupIsLoading}
                            {...field}
                            onBlur={() => {
                              field.onBlur();
                              form.trigger("lastName");
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage>{form.formState.errors.lastName?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
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
                          disabled={signupIsLoading}
                          {...field}
                          onBlur={() => {
                            field.onBlur();
                            form.trigger("email");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        {
                          (hide) ? (
                            <EyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground" onClick={() => setHide(false)} />
                          ) : (
                            <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground" onClick={() => setHide(true)} />
                          )
                        }
                        <Input
                          type={hide ? "password" : "text"}
                          placeholder="Enter your password"
                          className="w-full pl-10"
                          disabled={signupIsLoading}
                          {...field}
                          onBlur={() => {
                            field.onBlur();
                            form.trigger("password");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* DOB */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <FormControl>
                      <DobPicker date={field.value} setDate={field.onChange} disabled={signupIsLoading} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.dob?.message}</FormMessage>
                    <p className="text-xs text-muted-foreground mt-1">
                      This will not be shown publicly. Confirm your own age.
                    </p>
                  </FormItem>
                )}
              />

              <LoadingButton type="submit" className="w-full" isLoading={signupIsLoading} disabled={disableButton}>
                Create Account
              </LoadingButton>

              <p className="mt-5 text-sm text-center">
                Already have an account? <a href="/login" className="ml-1 underline text-muted-foreground">Log in</a>
              </p>
            </form>
          </Form>
        </div>

        {/* RIGHT SIDE - Image */}
        <div className="relative hidden lg:block rounded-lg overflow-hidden h-full">
          <img src="/placeholder.svg" alt="Signup Illustration" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
};

const GoogleLogo = () => (
  <svg
    width="1.2em"
    height="1.2em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block shrink-0 align-sub text-[inherit] size-lg"
  >
    <g clipPath="url(#clip0)">
      <path d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z" fill="#4285F4" />
      <path d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z" fill="#34A853" />
      <path d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z" fill="#FBBC04" />
      <path d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z" fill="#EA4335" />
    </g>
    <defs>
      <clipPath id="clip0"><rect width="15.6825" height="16" fill="white" /></clipPath>
    </defs>
  </svg>
);

export default SignUpPage;
