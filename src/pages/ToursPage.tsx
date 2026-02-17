import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import TourCard from "@/components/TourCard";
import { Tour, STATUS_LABELS, PageView } from "@/lib/types";

interface ToursPageProps {
  tours: Tour[];
  onEditTour: (tour: Tour) => void;
  onDeleteTour: (id: string) => void;
  onNavigate: (page: PageView) => void;
}

const ToursPage = ({
  tours,
  onEditTour,
  onDeleteTour,
  onNavigate,
}: ToursPageProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = tours.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Мои туры</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {tours.length}{" "}
            {tours.length === 1
              ? "тур"
              : tours.length < 5
                ? "тура"
                : "туров"}{" "}
            в системе
          </p>
        </div>
        <Button
          className="gap-2 rounded-xl"
          onClick={() => onNavigate("constructor")}
        >
          <Icon name="PlusCircle" size={16} />
          Новый тур
        </Button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Поиск по названию или направлению..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Все статусы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tour) => (
            <div key={tour.id} className="relative group">
              <TourCard tour={tour} onEdit={onEditTour} />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTour(tour.id);
                }}
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
          <Icon
            name="Search"
            size={48}
            className="mx-auto text-muted-foreground/30 mb-4"
          />
          <p className="text-muted-foreground">
            {search || statusFilter !== "all"
              ? "Ничего не найдено"
              : "У вас пока нет туров"}
          </p>
          {!search && statusFilter === "all" && (
            <Button
              variant="link"
              className="mt-2"
              onClick={() => onNavigate("constructor")}
            >
              Создать первый тур →
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ToursPage;
