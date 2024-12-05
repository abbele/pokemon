import { defineStore } from 'pinia'
import { useToast } from 'primevue'

export interface INotification {
  message: string
  type: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined
}

export const useNotificationStore = defineStore('notification', () => {
  const toast = useToast()

  const addNotification = (notification: INotification) => {
    toast.add({
      closable: true,
      life: 3000,
      summary: notification.message,
      severity: notification.type,
    })
  }

  return {
    toast,
    addNotification,
  }
})
