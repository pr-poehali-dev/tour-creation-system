import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Tour, TRANSPORT_LABELS, STATUS_LABELS } from "@/lib/types";

interface TourCardProps {
  tour: Tour;
  onEdit: (tour: Tour) => void;
}

const statusColors: Record<Tour["status"], string> = {
  draft: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const transportIcons: Record<Tour["transport"], string> = {
  bus: "Bus",
  train: "TrainFront",
  plane: "Plane",
  ship: "Ship",
  car: "Car",
  mixed: "ArrowRightLeft",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

const TourCard = ({ tour, onEdit }: TourCardProps) => {
  return (
    <Card
      className="group p-5 hover-scale cursor-pointer border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
      onClick={() => onEdit(tour)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate mb-1">
            {tour.name || "Без названия"}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Icon name="MapPin" size={13} />
            {tour.destination || "Направление не указано"}
          </p>
        </div>
        <Badge className={`${statusColors[tour.status]} border-0 text-xs font-medium`}>
          {STATUS_LABELS[tour.status]}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 pt-3 border-t border-border/40">
        <span className="flex items-center gap-1.5">
          <Icon name="Calendar" size={13} />
          {formatDate(tour.startDate)} — {formatDate(tour.endDate)}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name={transportIcons[tour.transport]} size={13} />
          {TRANSPORT_LABELS[tour.transport]}
        </span>
        <span className="flex items-center gap-1.5 ml-auto">
          <Icon name="MapPin" size={13} />
          {tour.points.length} {tour.points.length === 1 ? "точка" : tour.points.length < 5 ? "точки" : "точек"}
        </span>
      </div>
    </Card>
  );
};

export default TourCard;
