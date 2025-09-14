import ErrorState from "../ErrorState";

export default function ErrorStateExample() {
  const handleRetry = () => {
    console.log("Retry clicked");
  };

  return (
    <div className="p-6 bg-card rounded-lg border">
      <ErrorState 
        message="Failed to load cryptocurrency data. Please check your connection and try again."
        onRetry={handleRetry}
      />
    </div>
  );
}