export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { getUserById } from '@/database/database';
import PictureUploader from '@/components/dashboard/pictureUploader';
import styles from '@/styles/dashboard/profile.module.css';

import ProfileForm from '@/components/dashboard/editProfileForm';

export default async function Page() {
  const session = await auth();
  const user = session!.user;
  const userInfo = await getUserById(user!.id as string);

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>User Profile</h1>
      <div className={styles.profileDisplay}>
        {/* <form className={styles.pictureForm}>
          <Image
            src={userInfo?.profile_picture_url || '/icons/user.svg'}
            alt={`${userInfo?.first_name} photo`}
            width={250}
            height={250}
            className={styles.userPhoto}
          />
          <input type='file' name='file' accept='image/*' required />
          <Button
            buttonText='Change Photo'
            type='submit'
            className={styles.imageButton}
          />
        </form> */}

        <PictureUploader
          id={userInfo.id}
          name={userInfo.first_name}
          picture_url={userInfo.profile_picture_url}
          type='profile'
        />

        <div className={styles.profileSettings}>
          <ProfileForm userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}
