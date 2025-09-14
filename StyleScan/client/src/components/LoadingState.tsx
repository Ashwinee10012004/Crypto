export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-lg font-semibold">Generating Forecast...</h3>
        <p className="text-sm text-muted-foreground">Loading Prophet ML predictions</p>
      </div>
    </div>
  );
}