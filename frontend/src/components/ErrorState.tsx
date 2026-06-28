interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center justify-between">
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 px-3 py-1 text-sm font-medium bg-red-100 hover:bg-red-200 rounded transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
