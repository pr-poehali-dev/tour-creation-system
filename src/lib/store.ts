import { Tour, RoutePoint } from "./types";

const STORAGE_KEY = "tour-platform-tours";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function loadTours(): Tour[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDemoTours();
  } catch {
    return getDemoTours();
  }
}

export function saveTours(tours: Tour[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tours));
}

export function createEmptyPoint(): RoutePoint {
  return {
    id: generateId(),
    name: "",
    type: "other",
    address: "",
    contactPerson: "",
    contactPhone: "",
    startTime: "",
    notes: "",
  };
}

export function createEmptyTour(): Tour {
  return {
    id: generateId(),
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    transport: "bus",
    status: "draft",
    points: [createEmptyPoint()],
    createdAt: new Date().toISOString(),
  };
}

function getDemoTours(): Tour[] {
  return [
    {
      id: "demo-1",
      name: "Классический Петербург",
      destination: "Санкт-Петербург",
      startDate: "2026-03-15",
      endDate: "2026-03-20",
      transport: "train",
      status: "active",
      createdAt: "2026-02-01T10:00:00Z",
      points: [
        {
          id: "p1",
          name: "Эрмитаж",
          type: "museum",
          address: "Дворцовая площадь, 2",
          contactPerson: "Иванова М.А.",
          contactPhone: "+7 (812) 710-90-79",
          startTime: "10:00",
          notes: "Групповой билет на 20 человек",
        },
        {
          id: "p2",
          name: "Ресторан «Палкинъ»",
          type: "restaurant",
          address: "Невский проспект, 47",
          contactPerson: "Петров С.В.",
          contactPhone: "+7 (812) 703-53-71",
          startTime: "13:30",
          notes: "Бизнес-ланч, меню согласовано",
        },
        {
          id: "p3",
          name: "Петропавловская крепость",
          type: "excursion",
          address: "Заячий остров, 3",
          contactPerson: "Сидорова Е.П.",
          contactPhone: "+7 (812) 230-64-31",
          startTime: "15:30",
          notes: "Экскурсия 1.5 часа",
        },
      ],
    },
    {
      id: "demo-2",
      name: "Золотое кольцо: жемчужины",
      destination: "Золотое кольцо",
      startDate: "2026-04-10",
      endDate: "2026-04-17",
      transport: "bus",
      status: "draft",
      createdAt: "2026-02-10T14:30:00Z",
      points: [
        {
          id: "p4",
          name: "Троице-Сергиева Лавра",
          type: "excursion",
          address: "Сергиев Посад, Свято-Троицкая Сергиева Лавра",
          contactPerson: "Козлов А.И.",
          contactPhone: "+7 (496) 540-53-34",
          startTime: "09:00",
          notes: "Начало маршрута",
        },
        {
          id: "p5",
          name: "Гостиница «Переславль»",
          type: "hotel",
          address: "Переславль-Залесский, ул. Ростовская, 27",
          contactPerson: "Новикова Т.М.",
          contactPhone: "+7 (485) 353-91-00",
          startTime: "18:00",
          notes: "10 номеров, полупансион",
        },
      ],
    },
  ];
}
