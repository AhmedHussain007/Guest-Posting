import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ✅ RTK Query Mutation
import { useSendMessageMutation } from "@/apis/messageApi";

// ✅ Validation Schema
const formSchema = z.object({
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .nonempty("Subject is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .nonempty("Message is required"),
});

const ContactUs = () => {
  const form = useForm({
    defaultValues: { subject: "", message: "" },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // ✅ Hook from RTK Query
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const formValues = form.watch();
  const disableButton =
    !formValues.subject?.trim() ||
    !formValues.message?.trim() ||
    !form.formState.isValid;

  const onSubmit = async (data) => {
    const isValid = await form.trigger();
    toast.dismiss();
    if (!isValid) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      // 🚀 Call backend API with mutation
      await sendMessage(data).unwrap();

      toast.success("Message sent successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to send message. Try again later.");
    }
  };

  return (
    <div className="flex flex-col bg-black">
      <Header />
      {/* 🔹 Landing Section */}
      <section
        className="relative w-full h-[60vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-2xl px-6 lg:px-20 text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Have questions or need help? Send us a message and our team will get
            back to you soon.
          </p>
          <a href="#contact-form">
            <Button className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 transition">
              Get in Touch
            </Button>
          </a>
        </div>
      </section>

      {/* 🔹 Contact Form Section */}
      <section
        id="contact-form"
        className="flex items-center justify-center py-12 px-6"
      >
        <div className="max-w-lg w-full bg-white/5 p-8 rounded-xl shadow-lg backdrop-blur">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Send Us a Message
          </h2>

          <Form {...form}>
            <form
              className="space-y-6 bg-zinc-900/80 p-8 rounded-2xl shadow-lg border border-zinc-700"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter subject"
                        className="w-full bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger("subject");
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400">
                      {form.formState.errors.subject?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here..."
                        className="w-full min-h-[120px] bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                        onBlur={() => {
                          field.onBlur();
                          form.trigger("message");
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400">
                      {form.formState.errors.message?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="w-full flex justify-center">
                <LoadingButton
                  type="submit"
                  className="mx-auto bg-[linear-gradient(to_right,#fff2,transparent)] border-[1px] border-[#000] hover:bg-[#fff2] px-6 py-2 text-white rounded-lg transition shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                  isLoading={isLoading}
                  disabled={disableButton || isLoading}
                >
                  Send Message
                </LoadingButton>
              </div>
            </form>
          </Form>
        </div>
      </section>
      <Footer cond={true} />
    </div>
  );
};

export default ContactUs;
