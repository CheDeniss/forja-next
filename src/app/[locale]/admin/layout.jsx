import styles from '@/app/[locale]/admin/GlobalAdmin.module.scss';

export default function AdminLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
}
