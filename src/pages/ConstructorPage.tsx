import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import RoutePointForm from "@/components/RoutePointForm";
import {
  Tour,
  RoutePoint,
  TRANSPORT_LABELS,
  PageView,
} from "@/lib/types";
import { createEmptyPoint, createEmptyTour } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

interface ConstructorPageProps {
  editingTour: Tour | null;
  onSave: (tour: Tour) => void;
  onNavigate: (page: PageView) => void;
}

const transportIcons: Record<Tour["transport"], string> = {
  bus: "Bus",
  train: "TrainFront",
  plane: "Plane",
  ship: "Ship",
  car: "Car",
  mixed: "ArrowRightLeft",
};

const ConstructorPage = ({
  editingTour,
  onSave,
  onNavigate,
}: ConstructorPageProps) => {
  const [tour, setTour] = useState<Tour>(editingTour || createEmptyTour());
  const { toast } = useToast();

  const updateField = (field: keyof Tour, value: string) => {
    setTour((prev) => ({ ...prev, [field]: value }));
  };

  const updatePoint = (id: string, field: keyof RoutePoint, value: string) => {
    setTour((prev) => ({
      ...prev,
      points: prev.points.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const addPoint = () => {
    setTour((prev) => ({
      ...prev,
      points: [...prev.points, createEmptyPoint()],
    }));
  };

  const removePoint = (id: string) => {
    setTour((prev) => ({
      ...prev,
      points: prev.points.filter((p) => p.id !== id),
    }));
  };

  const handleSave = (status: Tour["status"]) => {
    if (!tour.name.trim()) {
      toast({
        title: "Укажите название тура",
        variant: "destructive",
      });
      return;
    }
    onSave({ ...tour, status });
    toast({ title: editingTour ? "Тур обновлён" : "Тур сохранён" });
    onNavigate("tours");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("tours")}
          className="gap-1.5 text-muted-foreground"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </Button>
        <div className="h-4 w-px bg-border" />
        <h1 className="text-2xl font-semibold text-foreground">
          {editingTour ? "Редактирование тура" : "Новый тур"}
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-border/60 p-6 mb-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-5">
          Основная информация
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Название тура
            </Label>
            <Input
              placeholder="Например: Классический Петербург"
              value={tour.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="text-lg h-12"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Направление
            </Label>
            <Input
              placeholder="Город или регион"
              value={tour.destination}
              onChange={(e) => updateField("destination", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Транспорт</Label>
            <Select
              value={tour.transport}
              onValueChange={(v) => updateField("transport", v)}
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Icon name={transportIcons[tour.transport]} size={15} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TRANSPORT_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Icon
                        name={transportIcons[value as Tour["transport"]]}
                        size={15}
                      />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Дата начала
            </Label>
            <Input
              type="date"
              value={tour.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Дата окончания
            </Label>
            <Input
              type="date"
              value={tour.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Маршрутные точки
          </h2>
          <span className="text-xs text-muted-foreground">
            {tour.points.length}{" "}
            {tour.points.length === 1
              ? "точка"
              : tour.points.length < 5
                ? "точки"
                : "точек"}
          </span>
        </div>

        <div className="space-y-3">
          {tour.points.map((point, index) => (
            <RoutePointForm
              key={point.id}
              point={point}
              index={index}
              total={tour.points.length}
              onChange={updatePoint}
              onRemove={removePoint}
            />
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 gap-2 border-dashed h-12 rounded-xl text-muted-foreground hover:text-primary hover:border-primary/40"
          onClick={addPoint}
        >
          <Icon name="Plus" size={16} />
          Добавить точку маршрута
        </Button>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border/40">
        <Button
          variant="outline"
          className="gap-2 rounded-xl"
          onClick={() => handleSave("draft")}
        >
          <Icon name="FileText" size={16} />
          Сохранить черновик
        </Button>
        <Button
          className="gap-2 rounded-xl"
          onClick={() => handleSave("active")}
        >
          <Icon name="Check" size={16} />
          Опубликовать тур
        </Button>
      </div>
    </div>
  );
};

export default ConstructorPage;
