import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { User } from "@/payload-types";
import Link from "next/link";

interface NavBarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavBarItem[];
  open: boolean;
  user: User | null | undefined;
  logout: () => void;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
  items,
  open,
  logout,
  onOpenChange,
  user,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          {user ? (
            <div className="border-t">
              <Link
                href="/admin"
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  onOpenChange(false);
                }}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium bg-transparent border-none outline-none"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="border-t">
              <Link
                href="/sign-in"
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              >
                Start Selling
              </Link>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
