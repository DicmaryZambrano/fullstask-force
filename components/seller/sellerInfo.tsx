import styles from '@/styles/seller/sellerInfo.module.css';
import { UserProfile } from '@/types/types'
import Image from 'next/image';


export default function SellerInfo(seller: UserProfile) {
  return (
    <div className={styles.sellerInfo}>
      <Image 
        src={seller.profile_picture_url}
        alt={`${seller.first_name} ${seller.last_name}`}
        width={100}
        height={100}
      />
      <h1 className="homeTitles">Seller: {seller.first_name} {seller.last_name}</h1>
      <p>
        {seller.email}
      </p>
      <p>
        {seller.phone_number}
      </p>
      <p>
        {seller.address}
      </p>
    </div>
  );
}