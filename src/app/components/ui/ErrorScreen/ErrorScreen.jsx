'use client';

import styles from './ErrorScreen.module.scss';
import Link from 'next/link';
import ErrorIcon from '@mui/icons-material/Error';
import CustomButtonOther from "@/app/components/ui/CustomButtonOther/CustomButtonOther.jsx";

export default function ErrorScreen({ error, reset }) {
  return (
      <div className={styles.errorWrapper}>
        <div className={styles.errorCard}>
          <ErrorIcon className={styles.icon} sx=
                     {{
                       fontSize: '100px',
                     }}/>
          <h1 className={styles.title}>Щось пішло не так!</h1>
          <p className={styles.message}>{error?.message || 'Невідома помилка'}</p>

          <div className={styles.actions}>
            <CustomButtonOther>
              Перезавантажити сторінку
            </CustomButtonOther>
            <Link href="/" className={styles.homeLink}>
              На головну
            </Link>
          </div>
        </div>
      </div>
  );
}
