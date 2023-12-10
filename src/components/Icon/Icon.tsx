import React from 'react';

// import { ErrorBoundary } from 'react-error-boundary';
import cx from 'classnames';

import { DeepReadonly } from '@/types';
import { toKebabCase } from '@/utils/helpers';

type Props = React.ComponentProps<'svg'> &
  DeepReadonly<{ className?: string; name: string }>;
type IconModules = Record<string, { default: React.FC }>;

const modules = import.meta.glob('@/assets/icons/*.svg', {
  eager: true,
}) as IconModules;

export function Icon({ className, name, ...otherProps }: Props) {
  const Icon = React.useMemo(
    () => modules[`/src/assets/icons/${toKebabCase(name)}.svg`]?.default,
    [name],
  );

  return (
    <span className={cx(className)} data-testid={`icon-${name}`}>
      {Icon ? <Icon {...otherProps} /> : null}
    </span>
  );
}
