import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun, SunMoon } from "lucide-react";

export const ThemeSwitcher = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="focus-visible:ring-0">
          <SunMoon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 mx-2">
        <DropdownMenuLabel className="text-muted-foreground">
          Theme:
          <span className="text-foreground font-medium"></span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2">
          <SunMoon />
          System
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <Moon />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
