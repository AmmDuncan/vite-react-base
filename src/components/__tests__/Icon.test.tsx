import { render, screen } from '@testing-library/react';

import { Icon } from '../Icon';

describe('Icon', () => {
  it('should render', () => {
    render(<Icon name="Eye" />);
    expect(screen.getByTestId('icon-Eye')).toBeInTheDocument();
  });
});
