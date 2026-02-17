import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CatalogPage from "@/pages/CatalogPage";
import ConstructorPage from "@/pages/ConstructorPage";
import ToursPage from "@/pages/ToursPage";
import ContactsPage from "@/pages/ContactsPage";
import { Tour, PageView } from "@/lib/types";
import { loadTours, saveTours } from "@/lib/store";

const Index = () => {
  const [page, setPage] = useState<PageView>("catalog");
  const [tours, setTours] = useState<Tour[]>([]);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  useEffect(() => {
    setTours(loadTours());
  }, []);

  useEffect(() => {
    if (tours.length > 0) {
      saveTours(tours);
    }
  }, [tours]);

  const handleSaveTour = (tour: Tour) => {
    setTours((prev) => {
      const exists = prev.find((t) => t.id === tour.id);
      if (exists) {
        return prev.map((t) => (t.id === tour.id ? tour : t));
      }
      return [tour, ...prev];
    });
    setEditingTour(null);
  };

  const handleEditTour = (tour: Tour) => {
    setEditingTour(tour);
    setPage("constructor");
  };

  const handleDeleteTour = (id: string) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (target: PageView) => {
    if (target === "constructor" && page !== "constructor") {
      setEditingTour(null);
    }
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={page} onNavigate={handleNavigate} />

      {page === "catalog" && (
        <CatalogPage
          tours={tours}
          onEditTour={handleEditTour}
          onNavigate={handleNavigate}
        />
      )}

      {page === "constructor" && (
        <ConstructorPage
          editingTour={editingTour}
          onSave={handleSaveTour}
          onNavigate={handleNavigate}
        />
      )}

      {page === "tours" && (
        <ToursPage
          tours={tours}
          onEditTour={handleEditTour}
          onDeleteTour={handleDeleteTour}
          onNavigate={handleNavigate}
        />
      )}

      {page === "contacts" && <ContactsPage />}
    </div>
  );
};

export default Index;
