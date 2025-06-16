import { getCollectionsBySellerId } from '@/database/database';
import { auth } from '@/auth';
import Link from 'next/link';
import Button from '@/components/actionButton';

export default async function CollectionList() {
  const session = await auth();
  const user = session!.user;

  const collections = await getCollectionsBySellerId(user!.id as string);

  return (
    <ul>
      {collections.map((collection) => (
        <li key={collection.id}>
          <div>
            <div>
              <h3>Collection Name</h3>
              <p>{collection.name}</p>
            </div>

            <div>
              <h3>Collection Description</h3>
              <p>{collection.description}</p>
            </div>
          </div>

          <div>
            <Link href={`./collections/edit/${collection.id}`}>
              <Button buttonText='Edit' type='button' />
            </Link>

            <Button buttonText='Delete' type='button' />
          </div>
        </li>
      ))}
    </ul>
  );
}
