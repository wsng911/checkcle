
import * as z from "zod";

// Define the available roles
export const userRoles = [
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "superadmin" }
];

export const userFormSchema = z.object({
  full_name: z.string().min(2, {
    message: "名称 must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z.string().min(3, {
    message: "用户名 must be at least 3 characters.",
  }),
  isActive: z.boolean().optional(),
  role: z.string().min(1, {
    message: "Please select a role",
  }),
  avatar: z.string().optional(),
});

export const newUserFormSchema = userFormSchema.extend({
  password: z.string().min(8, {
    message: "密码 must be at least 8 characters.",
  }),
  password确认: z.string().min(8, {
    message: "密码 confirmation must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.password确认, {
  message: "密码s don't match",
  path: ["password确认"],
});

export type UserFormValues = z.infer<typeof userFormSchema>;
export type NewUserFormValues = z.infer<typeof newUserFormSchema>;