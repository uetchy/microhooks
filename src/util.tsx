export function timeoutThen(time: number): Promise<void> {
  return new Promise((resolve): number => setTimeout(resolve, time));
}
