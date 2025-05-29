import NavBar from './NavBar';
import SearchingBar from './SearchingBar';

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
