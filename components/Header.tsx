import NavBar from "./Navbar"

export default function Header({ categories }: { categories: { id: number; name: string }[] }) {

  return (
    <header>
      <NavBar categories={categories}/>
    </header>
  );
}
