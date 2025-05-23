'use client';

import styles from './403.module.scss';
import Link from 'next/link';
import LockIcon from '@mui/icons-material/Lock';

export default function ForbiddenPage() {
    return (
        <div className={styles.errorWrapper}>
            <div className={styles.errorCard}>
                <LockIcon className={styles.icon} />
                <h1 className={styles.title}>403 - Доступ заборонено</h1>
                <p className={styles.message}>У вас немає дозволу для перегляду цієї сторінки.</p>
                <Link href="/" className={styles.homeLink}>На головну</Link>
            </div>
        </div>
    );
}
