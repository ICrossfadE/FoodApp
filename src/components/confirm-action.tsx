"use client";

import { Dialog } from "radix-ui";
import {
  IconArchive,
  IconTrash,
  IconX,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type Kind = "product" | "category" | "banner" | "order";
/** Діалог доступний із клавіатури; серверну дію навмисно не виконує. */
export function ConfirmAction({
  kind,
  name,
  occupied = false,
}: {
  kind: Kind;
  name: string;
  occupied?: boolean;
}) {
  const label =
    kind === "order"
      ? "Скасувати замовлення"
      : kind === "product"
        ? "Архівувати"
        : "Видалити";
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost" className="danger-action min-h-11">
          {kind === "product" ? (
            <IconArchive size={17} aria-hidden="true" />
          ) : (
            <IconTrash size={17} aria-hidden="true" />
          )}
          {label}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="dialog-icon">
            <IconAlertTriangle size={24} aria-hidden="true" />
          </div>
          <Dialog.Title>
            {label}: {name}?
          </Dialog.Title>
          <Dialog.Description>
            {occupied
              ? "Категорія містить товари. Спершу перенесіть їх або деактивуйте категорію."
              : kind === "product"
                ? "Товар буде приховано з меню. Історія оформлених замовлень залишиться."
                : "Перед виконанням ця дія потребуватиме підтвердження."}
          </Dialog.Description>
          {kind === "order" && (
            <label className="field">
              <span>Причина скасування *</span>
              <textarea placeholder="Вкажіть причину" />
            </label>
          )}
          <p className="dialog-demo">Демо-версія: зміни не зберігаються.</p>
          <div className="form-actions">
            <Dialog.Close asChild>
              <Button variant="outline" className="min-h-11">
                Повернутися
              </Button>
            </Dialog.Close>
            <Button disabled className="min-h-11">
              {occupied ? "Видалення недоступне" : "Підтвердити"}
            </Button>
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
              className="dialog-close"
              aria-label="Закрити діалог"
            >
              <IconX size={20} aria-hidden="true" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
