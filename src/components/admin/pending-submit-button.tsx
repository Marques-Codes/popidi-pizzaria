"use client";

import { useFormStatus } from "react-dom";

type PendingSubmitButtonProps = {
  children: string;
  pendingText?: string;
  className?: string;
};

export function PendingSubmitButton({
  children,
  pendingText = "Salvando, aguarde...",
  className,
}: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={className}
    >
      {pending ? pendingText : children}
    </button>
  );
}
