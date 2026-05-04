
import { User } from "@/services/userService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, User as UserIcon } from "lucide-react";

interface UserProfileDetailsProps {
  user: User;
}

export function UserProfileDetails({ user }: UserProfileDetailsProps) {
  // Format dates
  const createdDate = new Date(user.created).toLocaleDateString();
  
  // Get avatar or initials
  const getInitials = () => {
    if (user.full_name) {
      return user.full_name.split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    return user.username[0].toUpperCase();
  };

  // Determine if the user is active based on the status field
  const isActive = user.status === "Active";

  return (
    <div class名称="flex flex-col items-center space-y-4">
      <Avatar class名称="h-32 w-32">
        {user.avatar ? (
          <AvatarImage src={user.avatar} alt={user.full_name || user.username} />
        ) : (
          <AvatarFallback class名称="text-3xl bg-primary/20 text-primary">
            {getInitials()}
          </AvatarFallback>
        )}
      </Avatar>

      <div class名称="space-y-1 text-center">
        <h2 class名称="text-xl font-bold">{user.full_name || user.username}</h2>
        <div class名称="flex items-center justify-center text-sm text-muted-foreground gap-1">
          <Mail class名称="h-3 w-3" />
          <span>{user.email}</span>
        </div>
        <div class名称="flex items-center justify-center text-sm text-muted-foreground gap-1">
          <UserIcon class名称="h-3 w-3" />
          <span>@{user.username}</span>
        </div>
      </div>

      <div class名称="w-full pt-2">
        <div class名称="flex flex-wrap justify-center gap-2 pt-2">
          {user.role && (
            <Badge variant="secondary" class名称="px-2 py-1">
              {user.role}
            </Badge>
          )}
          <Badge variant={isActive ? "default" : "outline"} class名称="px-2 py-1">
            {user.status || (isActive ? "Active" : "Inactive")}
          </Badge>
          {user.verified && (
            <Badge class名称="bg-green-600 hover:bg-green-700 px-2 py-1">
              Verified
            </Badge>
          )}
        </div>

        <div class名称="border-t border-border mt-4 pt-4">
          <p class名称="text-sm text-muted-foreground">
            Member since: {createdDate}
          </p>
        </div>
      </div>
    </div>
  );
}