"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tellUsAboutSelf } from "../../schema/tell-about-self";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const TellAboutYourSelfForm = ({ setOpen }: Props) => {
  const form = useForm<z.infer<typeof tellUsAboutSelf>>({
    resolver: zodResolver(tellUsAboutSelf),
  });
  function onSubmit(values: z.infer<typeof tellUsAboutSelf>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    //complete this thing
    console.log(values);
    setOpen(false);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tell Your Experience</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border">
                      <SelectValue placeholder="Tell your experience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="No experience">No experience</SelectItem>
                    <SelectItem value="beginner">Bigginer</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your goal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border">
                      <SelectValue placeholder="What is your goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="find a job">Find a Job</SelectItem>
                    <SelectItem value="switch career">Swich Career</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="knowledge gap">Knowledge gap</SelectItem>
                    <SelectItem value="other">other</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About You</FormLabel>
                <FormControl>
                  <Textarea placeholder="About You" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About You</FormLabel>
                <FormControl>
                  <Textarea placeholder="Special Instructions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TellAboutYourSelfForm;
