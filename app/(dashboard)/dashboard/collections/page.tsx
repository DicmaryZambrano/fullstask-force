import CollectionList from '@/components/dashboard/collections/collectionList';
import Button from '@/components/actionButton';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div>
        <h1>Seller Collections</h1>
        <Link href={'/dashboard/collections/create'}>
          <Button buttonText='Add new' />
        </Link>
      </div>
      <CollectionList />
    </>
  );
}
