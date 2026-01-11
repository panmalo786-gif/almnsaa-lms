"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { createSchool } from "@/actions/schools";

const schoolSchema = z.object({
  name: z.string().min(1, "اسم المدرسة مطلوب").min(2, "يجب أن يكون الاسم على الأقل حرفين"),
  domain: z
    .string()
    .min(1, "النطاق مطلوب")
    .regex(/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, "صيغة النطاق غير صحيحة"),
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

interface SchoolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function SchoolModal({ open, onOpenChange, onSuccess }: SchoolModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  const onSubmit = async (data: SchoolFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createSchool(data);
      if (result.success) {
        form.reset();
        onOpenChange(false);
        onSuccess?.();
      } else {
        // Handle error - you might want to show a toast here
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة مدرسة جديدة</DialogTitle>
          <DialogDescription>
            أدخل معلومات المدرسة لإضافتها إلى النظام
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المدرسة</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: مدرسة النور" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>النطاق</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: alnoor.school" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
