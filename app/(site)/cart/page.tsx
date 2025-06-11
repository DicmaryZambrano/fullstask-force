import CartWrapper from '@/components/shopping/cartWrapper';

export const metadata = {
  title: 'Your Cart - Handcrafted Haven',
  description: 'Marketplace for handmade treasures, Check out your shopping cart',
};


export default function CartPage() {
  return (
    <div className="container">
      <h1 className="homeTitles">Shopping Cart</h1>
      <CartWrapper />
    </div>
  );
}
