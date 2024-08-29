// TODO - delete file
import { useQuery } from '@tanstack/react-query';

import { useServices } from '@/hooks';
type DummyUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Geo = {
  lat: string;
  lng: string;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export function UserList() {
  const services = useServices();
  const { data, isLoading } = useQuery<DummyUser[], Error>({
    queryKey: ['user', 'list'],
    queryFn: () => services.sample.getUserList({}),
  });

  return (
    <div>
      {isLoading ? 'Loading...' : null}

      {data ? (
        <div className="container mx-auto px-8">
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <span className="self-center">Dummy API Call</span>
            {data?.map((obj) => (
              <div
                data-testid="user-card"
                key={obj.id}
                className="rounded border border-black/50 p-6 shadow-[6px_6px_0_0] shadow-success"
              >
                <div>{obj.username}</div>
                {obj.name}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
