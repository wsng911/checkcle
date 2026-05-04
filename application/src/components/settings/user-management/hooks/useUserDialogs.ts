
import { useState } from "react";
import { User } from "@/services/userService";

export const useUserDialogs = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [is添加UserDialogOpen, setIs添加UserDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userTo删除, setUserTo删除] = useState<User | null>(null);
  const [is提交ting, setIs提交ting] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handle编辑User = (user: User, form: any) => {
    setUpdateError(null);
    setCurrentUser(user);
    form.reset({
      full_name: user.full_name || "",
      email: user.email,
      username: user.username,
      isActive: user.isActive !== undefined ? user.isActive : true,
      role: user.role || "user",
      avatar: user.avatar || "",
    });
    setIsDialogOpen(true);
  };

  const handle删除Prompt = (user: User) => {
    setUserTo删除(user);
    setIsDeleting(true);
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    is添加UserDialogOpen,
    setIs添加UserDialogOpen,
    isDeleting,
    setIsDeleting,
    is提交ting,
    setIs提交ting,
    updateError,
    setUpdateError,
    currentUser,
    setCurrentUser,
    userTo删除,
    setUserTo删除,
    handle编辑User,
    handle删除Prompt,
  };
};
