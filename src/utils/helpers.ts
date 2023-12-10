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

export function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
export function kebabToPascalCase(str: string): string {
  return str
    .replace(/-./g, (match) => match[1].toUpperCase())
    .replace(/^[a-z]/, (match) => match.toUpperCase());
}
