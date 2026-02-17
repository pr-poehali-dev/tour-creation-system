import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { RoutePoint, POINT_TYPE_LABELS } from "@/lib/types";

interface RoutePointFormProps {
  point: RoutePoint;
  index: number;
  total: number;
  onChange: (id: string, field: keyof RoutePoint, value: string) => void;
  onRemove: (id: string) => void;
}

const typeIcons: Record<RoutePoint["type"], string> = {
  restaurant: "UtensilsCrossed",
  museum: "Landmark",
  hotel: "BedDouble",
  excursion: "Camera",
  transport: "Bus",
  other: "MapPin",
};

const RoutePointForm = ({
  point,
  index,
  total,
  onChange,
  onRemove,
}: RoutePointFormProps) => {
  return (
    <div className="relative bg-white rounded-2xl border border-border/60 p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
            {index + 1}
          </div>
          <h4 className="text-sm font-medium text-foreground">
            Точка маршрута
          </h4>
        </div>
        {total > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(point.id)}
            className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Название</Label>
          <Input
            placeholder="Например: Эрмитаж"
            value={point.name}
            onChange={(e) => onChange(point.id, "name", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Тип</Label>
          <Select
            value={point.type}
            onValueChange={(v) => onChange(point.id, "type", v)}
          >
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Icon name={typeIcons[point.type]} size={14} />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(POINT_TYPE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <Icon
                      name={typeIcons[value as RoutePoint["type"]]}
                      size={14}
                    />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Время начала</Label>
          <Input
            type="time"
            value={point.startTime}
            onChange={(e) => onChange(point.id, "startTime", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Адрес</Label>
          <Input
            placeholder="Улица, дом"
            value={point.address}
            onChange={(e) => onChange(point.id, "address", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">
            Контактное лицо
          </Label>
          <Input
            placeholder="ФИО"
            value={point.contactPerson}
            onChange={(e) => onChange(point.id, "contactPerson", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Телефон</Label>
          <Input
            placeholder="+7 (___) ___-__-__"
            value={point.contactPhone}
            onChange={(e) => onChange(point.id, "contactPhone", e.target.value)}
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <Label className="text-xs text-muted-foreground">Заметки</Label>
          <Textarea
            placeholder="Дополнительная информация..."
            value={point.notes}
            onChange={(e) => onChange(point.id, "notes", e.target.value)}
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default RoutePointForm;
