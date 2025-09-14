import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ 
  message = "An error occurred while loading the forecast data.", 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Forecast Generation Failed</h3>
        <p className="text-sm text-muted-foreground max-w-md" data-testid="text-error-message">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          data-testid="button-retry"
          className="mt-4"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}