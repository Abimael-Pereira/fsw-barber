import { cn } from "../../_lib/utils"

interface LoadingProps {
  text?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export const Loading = ({
  text = "Carregando...",
  size = "md",
  className,
}: LoadingProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-b-2 border-primary",
          sizeClasses[size],
        )}
      />
      {text && (
        <span className="ml-2 text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  )
}

// Variações específicas para casos comuns
export const LoadingSpinner = ({
  size = "md",
}: {
  size?: "sm" | "md" | "lg"
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-b-2 border-primary",
        sizeClasses[size],
      )}
    />
  )
}

export const LoadingButton = () => (
  <div className="flex items-center">
    <LoadingSpinner size="sm" />
    <span className="ml-2">Processando...</span>
  </div>
)
