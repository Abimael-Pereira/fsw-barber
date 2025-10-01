import { toast } from "sonner"

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  info: (message: string) => toast.info(message),

  booking: {
    created: () => toast.success("Agendamento confirmado!"),
    deleted: () => toast.success("Agendamento cancelado"),
    conflictError: () => toast.error("Horário já ocupado"),
    authError: () => toast.error("Faça login para agendar"),
    genericError: () => toast.error("Erro no agendamento. Tente novamente"),
  },

  auth: {
    loginRequired: () => toast.error("Login necessário"),
    loginSuccess: () => toast.success("Login realizado com sucesso"),
  },

  promise: <T>(
    promise: Promise<T>,
    loading: string,
    success: string,
    error: string,
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    })
  },
}

export const showTemporaryToast = (
  message: string,
  type: "success" | "error" | "info" = "info",
  duration = 3000,
) => {
  const toastId = showToast[type](message)
  setTimeout(() => toast.dismiss(toastId), duration)
  return toastId
}
