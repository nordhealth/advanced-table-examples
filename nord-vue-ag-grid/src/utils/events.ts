import { onMounted, onUnmounted } from "vue";

type Listenable = {
  addEventListener: (type: string, listener: (e: Event) => void) => void;
  removeEventListener: (type: string, listener: (e: Event) => void) => void;
};

export function useEventListener(
  target: Listenable,
  event: string,
  callback: (event: Event) => void
) {
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
