export default function LoadingSpinner({ size = "default", className = "" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div
      className={`animate-spin rounded-full border-2 border-muted border-t-primary ${sizeClasses[size]} ${className}`}
    />
  )
}
