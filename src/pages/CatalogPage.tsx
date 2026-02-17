import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import TourCard from "@/components/TourCard";
import { Tour, PageView } from "@/lib/types";

interface CatalogPageProps {
  tours: Tour[];
  onEditTour: (tour: Tour) => void;
  onNavigate: (page: PageView) => void;
}

const CatalogPage = ({ tours, onEditTour, onNavigate }: CatalogPageProps) => {
  const activeTours = tours.filter((t) => t.status === "active");

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Конструктор
              <br />
              <span className="text-primary">туристических</span> маршрутов
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Создавайте детальные программы туров с маршрутными точками,
              контактами и расписанием — всё в одном месте.
            </p>
            <div className="flex gap-3 mt-8">
              <Button
                size="lg"
                className="gap-2 rounded-xl"
                onClick={() => onNavigate("constructor")}
              >
                <Icon name="PlusCircle" size={18} />
                Создать тур
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-xl"
                onClick={() => onNavigate("tours")}
              >
                <Icon name="FolderOpen" size={18} />
                Мои туры
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Активные туры
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {activeTours.length > 0
                ? `${activeTours.length} ${activeTours.length === 1 ? "тур" : "тура"} в работе`
                : "Нет активных туров"}
            </p>
          </div>
        </div>

        {activeTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onEdit={onEditTour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-border">
            <Icon
              name="Compass"
              size={48}
              className="mx-auto text-muted-foreground/40 mb-4"
            />
            <p className="text-muted-foreground">
              Пока нет активных туров.
            </p>
            <Button
              variant="link"
              className="mt-2"
              onClick={() => onNavigate("constructor")}
            >
              Создать первый тур →
            </Button>
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "Route",
              title: "Гибкий маршрут",
              desc: "Добавляйте любое количество точек: музеи, рестораны, отели",
            },
            {
              icon: "Users",
              title: "Контакты",
              desc: "Контактные лица и телефоны для каждой точки маршрута",
            },
            {
              icon: "Clock",
              title: "Расписание",
              desc: "Точное время начала для каждого мероприятия",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-border/60 p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={item.icon} size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
