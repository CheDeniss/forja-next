import styles from './Menu.module.scss';

export default function Menu({ sections, onSelect }) {
    return (
        <nav className={styles.menu}>
            {sections.map((section) => (
                <>
                    <div className={styles.hrline}></div>
                    <button key={section} onClick={() => onSelect(section)} className={styles.menuItem}>
                        {section}
                    </button>
                </>
            ))}
        </nav>
    );
}
