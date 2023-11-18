type DebouncedFunction<F extends (...args: any[]) => void> = (...args: Parameters<F>) => void

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): DebouncedFunction<F> {
  let timerId: NodeJS.Timeout

  return function (...args: Parameters<F>) {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      func(...args)
      timerId = null as any
    }, delay)
  }
}
