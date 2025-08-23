"use client";

import { useTransition } from "react";
import { MessageSquare } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  DialogBody,
  DialogClose,
  DialogFooter,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import z from "zod";
import { toast } from "sonner";
import { Alert, AlertIcon, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";

import { storeFeedback } from "@/server/user";
import { ModalProvider } from "./modal-provider";

interface UserFeedbackProps {
  email?: string;
}
const UserFeedback = ({ email }: UserFeedbackProps) => {
  const [isLoading, startTransition] = useTransition();
  const FormSchema = z.object({
    feedback: z
      .string()
      .min(1, "Feedback is required")
      .max(200, "Feedback cannot exceed 200 characters"),
    email: z.email().optional(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { feedback: "", email: email },
    mode: "onSubmit",
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const res = await storeFeedback(values.feedback, values.email);
      if (res.status) {
        toast.custom((t) => (
          <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
            <AlertIcon>
              <MessageSquare />
            </AlertIcon>
            <AlertTitle>Your feedback successfully submitted</AlertTitle>
          </Alert>
        ));
        form.reset();
      } else {
        toast.custom((t) => (
          <Alert
            variant="destructive"
            icon="primary"
            onClose={() => toast.dismiss(t)}
          >
            <AlertIcon>
              <MessageSquare />
            </AlertIcon>
            <AlertTitle>{res.message}</AlertTitle>
          </Alert>
        ));
      }
    });
  }
  return (
    <ModalProvider
      trigger={
        <SidebarMenuButton>
          <MessageSquare /> Feedback
        </SidebarMenuButton>
      }
      title="Feedback"
      description="We would love to hear your feedback!"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogBody className="space-y-2">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email?</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="email..."
                        {...field}
                        type="email"
                        autoComplete="on"
                        readOnly={email ? true : false}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us how we can improve our product"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please don’t include any sensitive information
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ModalProvider>
  );
};

export default UserFeedback;
