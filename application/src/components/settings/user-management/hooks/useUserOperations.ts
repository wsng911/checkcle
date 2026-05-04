import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { userService, User, UpdateUserData, 创建UserData } from "@/services/userService";
import { UserFormValues, NewUserFormValues } from "../userForms";
import { avatarOptions } from "../avatarOptions";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";

export const useUserOperations = (
  fetchUsers: () => Promise<void>,
  setIsDialogOpen: (isOpen: boolean) => void,
  setIs添加UserDialogOpen: (isOpen: boolean) => void,
  setIs提交ting: (is提交ting: boolean) => void,
  setIsDeleting: (isDeleting: boolean) => void,
  setUpdateError: (error: string | null) => void,
  newUserFormReset: (values: any) => void
) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handle删除User = async (userTo删除: User | null) => {
    if (!userTo删除) return;

    try {
      const success = await userService.deleteUser(userTo删除.id);
      if (success) {
        toast({
          title: "User deleted",
          description: `${userTo删除.full_name || userTo删除.username} has been deleted.`,
        });
        fetchUsers();
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not delete user. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const on提交 = async (data: UserFormValues, currentUser: User | null) => {
    if (!currentUser) return;
    setIs提交ting(true);
    setUpdateError(null);

    try {
      // Get current logged-in user to check if we're editing ourselves
      const loggedInUser = authService.getCurrentUser();
      const is编辑ingSelf = loggedInUser?.id === currentUser.id;
      const is邮箱Changed = data.email !== currentUser.email;
      
      // 创建 update object with only the fields we want to update
      const updateData: UpdateUserData = {
        full_name: data.full_name,
        email: data.email,
        username: data.username,
        role: data.role,
        isActive: data.isActive,
      };
      
      // For avatar, only include if it's different from current one
      if (data.avatar && data.avatar !== currentUser.avatar) {
        updateData.avatar = data.avatar;
      }

      console.log("提交ting user update with data:", updateData);
      
      await userService.updateUser(currentUser.id, updateData);
      
      // Handle email change for current user
      if (is编辑ingSelf && is邮箱Changed) {
        toast({
          title: "邮箱 changed successfully",
          description: "You will be logged out for security reasons. Please log in again with your new email.",
          variant: "default",
        });
        
        setIsDialogOpen(false);
        
        // Auto-logout after 2 seconds if editing own email
        setTimeout(() => {
          authService.logout();
          navigate("/login");
        }, 2000);
        
        return; // Don't continue with normal flow
      }
      
      // Normal success flow for other users or non-email changes
      toast({
        title: "User updated",
        description: `${data.full_name || data.username}'s profile has been updated.`,
      });
      
      setIsDialogOpen(false);
      await fetchUsers();
    } catch (error: any) {
      console.error("Error updating user:", error);
      let errorMessage = "Failed to update user. Please check your inputs and try again.";
      
      if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setUpdateError(errorMessage);
      toast({
        title: "Error updating user",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIs提交ting(false);
    }
  };

  const onImpersonate = async (
    data: UserFormValues & { durationSeconds?: number },
    currentUser: User | null
  ): Promise<string | undefined> => {
    const loggedInUser = authService.getCurrentUser();
    if (!currentUser) return;

    try {
      const token = await authService.impersonateUser(currentUser.id, data?.durationSeconds ?? 3600);

      toast({
        title: "Impersonation token generated",
        description: `Token generated for ${currentUser.full_name || currentUser.username}.`,
      });

      return token;
    } catch (error) {
      let description = "Error impersonating user.";
      if (loggedInUser?.role !== "superadmin") {
        description = "Only superadmin users can impersonate other users.";
      }

      toast({
        title: "Error impersonating user",
        description,
        variant: "destructive",
      });

      throw error;
    }
  };

  const on添加User = async (data: NewUserFormValues) => {
    setIs提交ting(true);
    try {
      const newUserData: 创建UserData = {
        username: data.username,
        email: data.email,
        password: data.password,
        password确认: data.password确认,
        full_name: data.full_name,
        role: data.role,
        isActive: data.isActive,
        avatar: data.avatar,
        emailVisibility: true,
      };

      await userService.createUser(newUserData);
      
      toast({
        title: "User created",
        description: `${data.full_name || data.username} has been added successfully.`,
      });
      
      setIs添加UserDialogOpen(false);
      newUserFormReset({
        full_name: "",
        email: "",
        username: "",
        password: "",
        password确认: "",
        isActive: true,
        role: "user",
        avatar: avatarOptions[0].url,
      });
      await fetchUsers();
    } catch (error: any) {
      let errorMessage = "Could not create user. Please try again later.";
      
      if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error creating user",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIs提交ting(false);
    }
  };

  return {
    handle删除User,
    on提交,
    onImpersonate,
    on添加User,
  };
};