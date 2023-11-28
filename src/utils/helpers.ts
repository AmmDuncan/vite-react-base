export const resolveAsync = async (timer = 0) =>
  new Promise((resolve) => setTimeout(resolve, timer));

export function getTarget(
  inputObj: Record<string, any>,
  path: string | string[],
): any {
  const pathArr = Array.isArray(path) ? path : path?.split('.');
  return pathArr.reduce(
    (target, currentPath) => target?.[currentPath],
    inputObj,
  );
}
