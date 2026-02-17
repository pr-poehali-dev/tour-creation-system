import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const ContactsPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Сообщение отправлено", description: "Мы свяжемся с вами в ближайшее время" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-foreground">Контакты и поддержка</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Свяжитесь с нами по любым вопросам
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-border/60 p-6">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-5">
            Напишите нам
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Имя</Label>
                <Input placeholder="Ваше имя" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Email</Label>
                <Input type="email" placeholder="email@example.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Тема</Label>
              <Input placeholder="О чём хотите написать?" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Сообщение</Label>
              <Textarea placeholder="Опишите ваш вопрос..." rows={5} />
            </div>
            <Button type="submit" className="gap-2 rounded-xl">
              <Icon name="Send" size={16} />
              Отправить
            </Button>
          </form>
        </div>

        <div className="space-y-5">
          {[
            {
              icon: "Phone",
              title: "Телефон",
              value: "+7 (800) 123-45-67",
              desc: "Пн–Пт, 9:00–18:00",
            },
            {
              icon: "Mail",
              title: "Email",
              value: "info@tourcraft.ru",
              desc: "Ответим в течение 24 часов",
            },
            {
              icon: "MapPin",
              title: "Офис",
              value: "Москва, ул. Тверская, 1",
              desc: "Приём по предварительной записи",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-border/60 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name={item.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-foreground mt-0.5">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/60 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="HelpCircle" size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Частые вопросы</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="ChevronRight" size={14} className="mt-0.5 text-primary shrink-0" />
                Как создать тур с несколькими маршрутными точками?
              </li>
              <li className="flex items-start gap-2">
                <Icon name="ChevronRight" size={14} className="mt-0.5 text-primary shrink-0" />
                Можно ли редактировать уже опубликованный тур?
              </li>
              <li className="flex items-start gap-2">
                <Icon name="ChevronRight" size={14} className="mt-0.5 text-primary shrink-0" />
                Как добавить контактное лицо к точке маршрута?
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
