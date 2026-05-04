
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 编辑, Trash2 } from "lucide-react";
import { User } from "@/services/userService";

export interface UserTableProps {
  users: User[];
  onUserUpdate: (user: User) => void;
  onUser删除: (user: User) => void;
}

const UserTable = ({ users, onUserUpdate, onUser删除 }: UserTableProps) => {
  // Helper function to get the user's initials for the avatar fallback
  const getUserInitials = (user: User): string => {
    return (user.full_name || user.username || "").substring(0, 2).toUpperCase();
  };

  return (
    <div class名称="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>用户名</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>状态</TableHead>
            <TableHead class名称="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} class名称="text-center py-8">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell class名称="font-medium">
                  <div class名称="flex items-center gap-3">
                    <Avatar class名称="h-8 w-8">
                      {user.avatar ? (
                        <AvatarImage 
                          src={user.avatar} 
                          alt={user.full_name || user.username} 
                        />
                      ) : (
                        <AvatarFallback>
                          {getUserInitials(user)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span>{user.full_name || "-"}</span>
                  </div>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role || "user"}</TableCell>
                <TableCell>
                  {user.isActive !== false ? (
                    <Badge variant="outline" class名称="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" class名称="bg-red-50 text-red-700 border-red-200">
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell class名称="text-right space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    class名称="h-8 w-8 p-0"
                    onClick={() => onUserUpdate(user)}
                  >
                    <编辑 class名称="h-4 w-4" />
                    <span class名称="sr-only">编辑</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    class名称="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onUser删除(user)}
                  >
                    <Trash2 class名称="h-4 w-4" />
                    <span class名称="sr-only">删除</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
