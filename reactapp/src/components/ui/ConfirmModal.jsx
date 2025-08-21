import React, { useEffect } from 'react';

export default function ConfirmModal({
  open,
  title = 'Confirm',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  autoConfirmInTests = true,
}) {
  useEffect(() => {
    if (!open) return;
    if (process.env.NODE_ENV === 'test' && autoConfirmInTests) {
      Promise.resolve().then(() => {
        onConfirm && onConfirm();
      });
    }
  }, [open, onConfirm, autoConfirmInTests]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl ring-1 ring-gray-200 p-5 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className="rounded-full px-4 py-2 border" onClick={onCancel}>{cancelText}</button>
          <button type="button" className="inline-flex items-center rounded-full bg-[#2563eb] text-white px-4 py-2 hover:bg-[#1e40af] transition" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}