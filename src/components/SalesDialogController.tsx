import { useEffect, useState } from "react";
import { TalkToSalesDialog } from "@/components/TalkToSalesDialog";

export interface OpenSalesDetail {
  selectedModules?: string[];
  scope?: "individual" | "institution";
}

export const SALES_DIALOG_EVENT = "perfy:open-sales-dialog";

export const openSalesDialog = (detail: OpenSalesDetail = {}) => {
  window.dispatchEvent(new CustomEvent<OpenSalesDetail>(SALES_DIALOG_EVENT, { detail }));
};

/**
 * Mount once at the app root. Any "Contact" / "Talk to Sales" button can
 * trigger it via openSalesDialog() or by dispatching the SALES_DIALOG_EVENT.
 */
export const SalesDialogController = () => {
  const [open, setOpen] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [scope, setScope] = useState<"individual" | "institution">("individual");

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<OpenSalesDetail>;
      setSelectedModules(ce.detail?.selectedModules ?? []);
      setScope(ce.detail?.scope ?? "individual");
      setOpen(true);
    };
    window.addEventListener(SALES_DIALOG_EVENT, handler);
    return () => window.removeEventListener(SALES_DIALOG_EVENT, handler);
  }, []);

  return (
    <TalkToSalesDialog
      open={open}
      onOpenChange={setOpen}
      selectedModules={selectedModules}
      scope={scope}
    />
  );
};
