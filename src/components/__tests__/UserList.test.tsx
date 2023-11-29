import { act, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { ENV_VARS } from '@/utils/constants';
import { resolveAsync } from '@/utils/helpers';

import { Providers } from '..';
import { UserList } from '../UserList';

const server = setupServer(
  ...[
    http.get(`${ENV_VARS.API_BASE_URL}/users/`, ({ request, params }) => {
      if (request && params) console.log('');

      return HttpResponse.json(
        Array.from({ length: 10 }, (_, index) => ({
          id: index,
          username: 'Ammiel',
          name: 'Ammiel Yawson',
        })),
      );
    }),
  ],
);

describe('UserList', () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    render(
      <Providers>
        <UserList />
      </Providers>,
    );
  });

  it('should render user list', async () => {
    await act(async () => resolveAsync(10));
    expect(screen.getAllByTestId('user-card')).toHaveLength(10);
  });

  afterAll(() => {
    server.close();
  });
});
