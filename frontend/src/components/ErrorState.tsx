interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="bg-error-bg border border-error-border text-error-text p-4 rounded-xl flex items-center justify-between">
      <span className="text-sm">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 px-3 py-1 text-sm font-medium bg-error-border hover:bg-error-text hover:text-error-bg rounded-lg transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
