import footerStyles from './Footer.module.css';

import Link from "next/link";
import Image from "next/image";

import steam from '../../../../public/assets/icons/svg/steam.svg';
import facebook from '../../../../public/assets/icons/svg/Facebook.svg';
import epicgames from '../../../../public/assets/icons/svg/EpicGames.svg';
import instagram from '../../../../public/assets/icons/svg/Instagram.svg';
import twitter from '../../../../public/assets/icons/svg/twiter_ico.svg';
import forjaLogo from '../../../../public/assets/images/footer/Vector.png';
import smooooke from '../../../../public/assets/images/footer/smoke_element.svg';

const Footer = () => {
    return (
        <footer className={footerStyles.footer}>
            <div className={footerStyles.topButton}>
                <span className={footerStyles.topButtonText}>Back to Top</span>
            </div>
            <div className={footerStyles.content}>

                <div className={footerStyles.contentLogoImg}>
                    <Image src={forjaLogo} alt="Forja Logo" className={footerStyles.contentLogoImg}/>
                </div>

                <div className={footerStyles.contentMain}>
                    <nav className={footerStyles.nav}>
                        <Link href="#" className={footerStyles.navLink}>Privacy</Link>
                        <Link href="#" className={footerStyles.navLink}>Legal</Link>
                        <Link href="#" className={footerStyles.navLink}>Cookie Settings</Link>
                        <Link href="#" className={footerStyles.navLink}>Cookie Policy</Link>
                        <Link href="#" className={footerStyles.navLink}>Terms</Link>
                    </nav>
                    <div className={footerStyles.social}>
                        <Link href="#" className={footerStyles.socialLink}><Image src={steam} alt="Steam"/></Link>
                        <Link href="#" className={footerStyles.socialLink}><Image src={facebook} alt="Facebook"/></Link>
                        <Link href="#" className={footerStyles.socialLink}><Image src={epicgames}
                                                                                alt="Epic Games"/></Link>
                        <Link href="#" className={footerStyles.socialLink}><Image src={instagram} alt="Instagram"/></Link>
                        <Link href="#" className={footerStyles.socialLink}><Image src={twitter} alt="Twitter"/></Link>
                    </div>
                    <div className={footerStyles.info}>
                        <div className={footerStyles.section}>
                            <h4 className={footerStyles.sectionTitle}>Development:</h4>
                            <p className={footerStyles.sectionText}>Kirilchenko Grigory</p>
                            <p className={footerStyles.sectionText}>Cherneta Denis</p>
                        </div>
                        <div className={footerStyles.section}>
                            <h4 className={footerStyles.sectionTitle}>Content:</h4>
                            <p className={footerStyles.sectionText}>Daniil Korsunsky</p>
                            <p className={footerStyles.sectionText}>Rudenko Artem</p>
                        </div>
                        <div className={footerStyles.section}>
                            <h4 className={footerStyles.sectionTitle}>Security:</h4>
                            <p className={footerStyles.sectionText}>Damn Evgenia</p>
                        </div>
                    </div>
                </div>
                <div className={footerStyles.art}>
                    <Image src={smooooke} alt={"Smoke"} className={footerStyles.artSmoke}/>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
