import Button from "../../UI/Button/Button.jsx";

import styles from './Empty.module.css';

export const Empty = ({
                          Icon,
                          title,
                          description,
                          actionText,
                          actionTo
                      }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {Icon && (
                    <div className={styles.iconWrapper}>
                        <Icon size={80} strokeWidth={1.5}/>
                    </div>
                )}
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>

                {actionTo && (
                    <div className={styles.action}>
                        <Button to={actionTo} variant="full" size="md">
                            {actionText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};