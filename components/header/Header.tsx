import NavBar from '@/components/header/NavBar';
import SearchingBar from '@/components/header/SearchingBar';

export default function Header({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  return (
    <header>
      <SearchingBar />
      <NavBar categories={categories} />
    </header>
  );
}
