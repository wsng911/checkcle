import { useUsersList } from "./useUsersList";
import { useUserForm } from "./useUserForm";
import { useUserDialogs } from "./useUserDialogs";
import { useUserOperations } from "./useUserOperations";
import { User } from "@/services/userService";
import { UserFormValues, NewUserFormValues } from "../userForms";
import { useState } from "react";

export const useUserManagement = () => {
  const { users, loading, error, fetchUsers } = useUsersList();
  const { form, newUserForm } = useUserForm();
  const {
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
    handle编辑User: baseHandle编辑User,
    handle删除Prompt,
  } = useUserDialogs();

  const {
    handle删除User: baseHandle删除User,
    on提交: baseOn提交,
    on添加User: baseOn添加User,
    onImpersonate: baseOnImpersonate,
  } = useUserOperations(
    fetchUsers,
    setIsDialogOpen,
    setIs添加UserDialogOpen,
    setIs提交ting,
    setIsDeleting,
    setUpdateError,
    newUserForm.reset
  );

  const [impersonationToken, setImpersonationToken] = useState<string | null>(null);
  const [isImpersonationTokenDialogOpen, setIsImpersonationTokenDialogOpen] = useState(false);

  // Wrapper functions to provide the needed arguments
  const handle编辑User = (user: User) => {
    baseHandle编辑User(user, form);
  };

  const handle删除User = async () => {
    await baseHandle删除User(userTo删除);
    setUserTo删除(null);
  };

  const on提交 = (data: UserFormValues) => {
    baseOn提交(data, currentUser);
  };

  const onImpersonate = async (data: UserFormValues) => {
    const token = await baseOnImpersonate(data, currentUser);

    if (token) {
      setImpersonationToken(token);
      setIsImpersonationTokenDialogOpen(true);
    }
  };

  const on添加User = (data: NewUserFormValues) => {
    baseOn添加User(data);
  };

  return {
    users,
    loading,
    error,
    isDialogOpen,
    setIsDialogOpen,
    is添加UserDialogOpen,
    setIs添加UserDialogOpen,
    isDeleting,
    setIsDeleting,
    is提交ting,
    updateError,
    form,
    newUserForm,
    currentUser,
    userTo删除,
    fetchUsers,
    handle编辑User,
    handle删除Prompt,
    handle删除User,
    on提交,
    onImpersonate,
    on添加User,
    impersonationToken,
    isImpersonationTokenDialogOpen,
    setIsImpersonationTokenDialogOpen,
  };
};
