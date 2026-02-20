import { Link } from "@tanstack/react-router";

interface SidebarItemProps {
  icon: React.ReactNode;
  to: string;
}

export const SidebarItem = ({ icon, to }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary [&.active]:bg-primary [&.active]:text-primary-foreground"
    >
      {icon}
    </Link>
  );
};
