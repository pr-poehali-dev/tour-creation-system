export interface RoutePoint {
  id: string;
  name: string;
  type: "restaurant" | "museum" | "hotel" | "excursion" | "transport" | "other";
  address: string;
  contactPerson: string;
  contactPhone: string;
  startTime: string;
  notes: string;
}

export interface Tour {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  transport: "bus" | "train" | "plane" | "ship" | "car" | "mixed";
  status: "draft" | "active" | "completed" | "cancelled";
  points: RoutePoint[];
  createdAt: string;
}

export type PageView = "catalog" | "constructor" | "tours" | "contacts";

export const TRANSPORT_LABELS: Record<Tour["transport"], string> = {
  bus: "Автобус",
  train: "Поезд",
  plane: "Самолёт",
  ship: "Теплоход",
  car: "Автомобиль",
  mixed: "Комбинированный",
};

export const POINT_TYPE_LABELS: Record<RoutePoint["type"], string> = {
  restaurant: "Ресторан",
  museum: "Музей",
  hotel: "Отель",
  excursion: "Экскурсия",
  transport: "Транспорт",
  other: "Другое",
};

export const STATUS_LABELS: Record<Tour["status"], string> = {
  draft: "Черновик",
  active: "Активный",
  completed: "Завершён",
  cancelled: "Отменён",
};
