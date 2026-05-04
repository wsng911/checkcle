import React from "react";
import UserTable from "./UserTable";
import 添加UserDialog from "./添加UserDialog";
import 编辑UserDialog from "./编辑UserDialog";
import 删除UserDialog from "./删除UserDialog";
import ImpersonationTokenDialog from "./ImpersonationTokenDialog";
import { useUserManagement } from "./hooks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UserCog, Loader2, AlertCircle, Info, Users, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, Alert描述 } from "@/components/ui/alert";
import { authService } from "@/services/authService";
import { useLanguage }  from "@/contexts/LanguageContext.tsx";

const UserManagement = () => {
  const { t } = useLanguage();
  const {
    users,
    loading,
    error,
    newUserForm,
    is添加UserDialogOpen,
    setIs添加UserDialogOpen,
    isDialogOpen,
    setIsDialogOpen,
    isDeleting,
    setIsDeleting,
    is提交ting,
    updateError,
    form,
    currentUser,
    userTo删除,
    handle编辑User,
    handle删除Prompt,
    handle删除User,
    on提交,
    onImpersonate,
    on添加User,
    fetchUsers,
    impersonationToken,
    isImpersonationTokenDialogOpen,
    setIsImpersonationTokenDialogOpen,
  } = useUserManagement();

  // Get the current logged in user to check their role
  const loggedInUser = authService.getCurrentUser();
  const isSuperAdmin = loggedInUser?.role === "superadmin";
  return <div class名称="space-y-4">
      <Accordion type="single" collapsible class名称="w-full" defaultValue="user-management">
        <AccordionItem value="user-management">
          <AccordionTrigger class名称="py-4 px-5 bg-card hover:bg-card/90 hover:no-underline rounded-lg text-lg font-medium flex items-center w-full">
            <div class名称="flex items-center">
              <UserCog class名称="h-5 w-5 mr-2 text-green-500" />
              <span>{t("userManagement")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent class名称="p-4 pt-6 bg-background rounded-b-lg">
            <div class名称="flex justify-between items-center mb-6">
              <h2 class名称="text-2xl font-bold">{t("userManagement")}</h2>
              {isSuperAdmin && <button onClick={() => setIs添加UserDialogOpen(true)} class名称="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center">
                  <span class名称="mr-1">+</span> {t("addUser")}
                </button>}
            </div>

            {!isSuperAdmin && <Alert class名称="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <ShieldAlert class名称="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <Alert描述 class名称="text-blue-700 dark:text-blue-300">
                  <span class名称="font-medium">{t("permissionNotice")}</span> As an admin user, you have access to view and modify existing user details. However, only Super Admins have permission to create new user accounts. Contact your Super Admin if you need to add a new user.
                </Alert描述>
              </Alert>}

            {loading ? <div class名称="p-8 flex flex-col items-center justify-center text-center">
                <Loader2 class名称="h-8 w-8 animate-spin mb-2 text-primary" />
                <p class名称="text-muted-foreground">Loading users...</p>
              </div> : error ? <div class名称="p-8 flex flex-col items-center justify-center text-center">
                <AlertCircle class名称="h-8 w-8 text-destructive mb-2" />
                <p class名称="text-destructive font-medium mb-2">Failed to load users</p>
                <p class名称="text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchUsers} variant="outline">
                  Retry
                </Button>
              </div> : <UserTable users={users} onUserUpdate={handle编辑User} onUser删除={handle删除Prompt} />}

            <添加UserDialog isOpen={is添加UserDialogOpen && isSuperAdmin} setIsOpen={setIs添加UserDialogOpen} form={newUserForm} on提交={on添加User} is提交ting={is提交ting} />

            <编辑UserDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} form={form} user={currentUser} onImpersonate={onImpersonate} on提交={on提交} is提交ting={is提交ting} error={updateError} />

            <ImpersonationTokenDialog
              open={isImpersonationTokenDialogOpen}
              onOpenChange={setIsImpersonationTokenDialogOpen}
              token={impersonationToken}
              impersonatedUserLabel={currentUser?.full_name || currentUser?.username}
            />

            <删除UserDialog isOpen={isDeleting} setIsOpen={setIsDeleting} user={userTo删除} on删除={handle删除User} isDeleting={is提交ting} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>;
};
export default UserManagement;

