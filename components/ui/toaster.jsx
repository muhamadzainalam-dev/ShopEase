"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="bg-orange-500 text-white rounded-md shadow-lg"
          >
            <div className="grid gap-2">
              {title && (
                <ToastTitle className="font-semibold text-white text-lg">
                  {title}
                </ToastTitle>
              )}
              {action}
            </div>
            <ToastClose className="mt-2 text-white hover:text-gray-200" />
          </Toast>
        );
      })}
      <ToastViewport className="fixed bottom-4 right-4 w-80 max-w-full" />
    </ToastProvider>
  );
}
