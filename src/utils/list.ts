export function getNextIndex<T>(list: T[], currentIdx: number): number {
  const next = currentIdx + 1;
  if (next >= list.length) {
    return 0;
  }

  return next;
}

export function getPrevIndex<T>(list: T[], currentIdx: number): number {
  const prev = currentIdx - 1;
  if (prev < 0) {
    return list.length - 1;
  }

  return prev;
}
