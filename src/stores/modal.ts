import { ref, type Component } from 'vue'
import { defineStore } from 'pinia'

interface IModalState {
  component: Component | null
  componentProps?: Record<string, unknown>
  open?: boolean
}

export const useModalStore = defineStore('modal', () => {
  const initialState = {
    component: null,
    componentProps: {},
    open: false,
  }

  const state = ref<IModalState>({ ...initialState })

  const open = (newState: IModalState) => {
    Object.assign(state.value, { ...newState, open: true })
  }

  function close() {
    Object.assign(state.value, initialState)
  }

  return {
    state,
    open,
    close,
  }
})
