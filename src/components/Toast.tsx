import { useToastStore } from '../stores/toastStore';

export function Toast() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  const typeStyles = {
    success: 'bg-green-500/10 border-green-500 text-green-400',
    error: 'bg-red-500/10 border-red-500 text-red-400',
    warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
    info: 'bg-blue-500/10 border-blue-500 text-blue-400',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} border rounded-lg p-4 shadow-lg backdrop-blur-sm`}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg font-bold">{icons[toast.type]}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}