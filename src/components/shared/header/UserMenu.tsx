"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutFunction } from "@/services/auth";
import { Edit, Edit2, ListOrderedIcon, LogOut } from "lucide-react";

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src="/images/avatar.jpg" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-2">
        <DropdownMenuLabel className="text-muted-foreground">
          Welcome back
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer gap-2">
          <ListOrderedIcon />
          My Orders
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-2">
          <Edit2 />
          Profile Info
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-2">
          <Edit />
          Update Password
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer gap-2 text-red-500"
          onClick={LogoutFunction}
        >
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
