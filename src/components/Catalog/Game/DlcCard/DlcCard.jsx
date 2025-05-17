import React from 'react';
import styles from './DlcCard.module.scss';
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import PriceBuyBlock from "@/components/Catalog/Game/PriceBuyBlock/PriceBuyBlock.jsx";


// TODO:  БЕК - зробити повернення одного останнього повного аддона, переробити компонент під розширені дані??.

const DlcCard = ({ latestDlc }) => {
    if (!latestDlc) return <div className={styles.empty}>No DLC available</div>;

    return (
        <div className={styles.container}>
            <div className={styles.blockName}>
                DLC
            </div>
            <div className={styles.dlcCard}>
                <div className={styles.imageSection}>
                        <MinioImage
                            filled
                            src={latestDlc.logoUrl}
                            alt={latestDlc.title}
                        />
                    </div>

                    <div className={styles.contentSection}>
                        <div className={styles.textSection}>
                            <span className={styles.title}>{latestDlc.title}</span>
                            <span className={styles.description}>{latestDlc.shortDescription}</span>
                        </div>

                        <div className={styles.priceSection}>
                            {/*<CustomButtonOther>Add to Wishlist</CustomButtonOther>*/}
                            <PriceBuyBlock productPrice={latestDlc.price}
                                           onBuyClick={null}
                                           discountValue={latestDlc.discounts?.[0]?.discountValue ?? ''}
                                           left={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default DlcCard;
