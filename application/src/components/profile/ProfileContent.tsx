
import { useState, useEffect } from "react";
import { Card, CardContent, Card描述, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/services/userService";
import { UserProfileDetails } from "./UserProfileDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Change密码Form } from "./Change密码Form";
import { UpdateProfileForm } from "./UpdateProfileForm";

interface ProfileContentProps {
  currentUser: User | null;
  onUserUpdated?: () => Promise<void>;
}

export function ProfileContent({ currentUser, onUserUpdated }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState("details");

  // When active tab changes, refresh user data if needed
  useEffect(() => {
    if (activeTab === "details" && onUserUpdated) {
      onUserUpdated();
    }
  }, [activeTab, onUserUpdated]);

  if (!currentUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <Card描述>Your profile information could not be loaded</Card描述>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <div class名称="space-y-6">
      <div class名称="flex justify-between items-center">
        <h1 class名称="text-3xl font-bold">My Profile</h1>
      </div>

      <div class名称="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile summary card */}
        <Card class名称="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <UserProfileDetails user={currentUser} />
          </CardContent>
        </Card>

        {/* Right column - Profile tabs for edit and password change */}
        <Card class名称="md:col-span-2">
          <CardHeader>
            <CardTitle>My Account</CardTitle>
            <Card描述>Manage your account settings</Card描述>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} class名称="w-full">
              <TabsList class名称="grid grid-cols-2 w-full">
                <TabsTrigger value="details">Profile Details</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" class名称="pt-4">
                <UpdateProfileForm user={currentUser} />
              </TabsContent>
              
              <TabsContent value="security" class名称="pt-4">
                <Change密码Form userId={currentUser.id} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter class名称="text-sm text-muted-foreground">
            Last updated: {new Date(currentUser.updated).toLocaleString()}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}