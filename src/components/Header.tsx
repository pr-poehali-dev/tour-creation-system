import Icon from "@/components/ui/icon";
import { PageView } from "@/lib/types";

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const navItems: { page: PageView; label: string; icon: string }[] = [
  { page: "catalog", label: "Каталог", icon: "Globe" },
  { page: "constructor", label: "Конструктор", icon: "PlusCircle" },
  { page: "tours", label: "Мои туры", icon: "FolderOpen" },
  { page: "contacts", label: "Контакты", icon: "Phone" },
];

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("catalog")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Icon name="Map" size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            TourCraft
          </span>
        </button>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === item.page
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
