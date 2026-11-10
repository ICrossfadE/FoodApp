import { StoreShell } from "@/components/store-shell";
import { Empty } from "@/components/mock-ui";
export default function NotFound() {
  return (
    <StoreShell>
      <Empty
        title="Сторінку не знайдено"
        description="Поверніться на головну або перегляньте меню ресторану."
        href="/"
        action="На головну"
      />
    </StoreShell>
  );
}
