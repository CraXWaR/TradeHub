import {Link} from 'react-router-dom';
import {FaFacebookF, FaInstagram, FaTiktok} from 'react-icons/fa';

import styles from './Footer.module.css';

const Footer = () => {
    const handleDisableLink = (e) => {
        e.preventDefault();
        alert('Coming Soon! We\'re still fueling up this section. Stay tuned! 🚀');
    };

    return (<footer className={styles.footer}>
        <div className={styles.container}>
            {/* Brand Section */}
            <div className={styles.brandSection}>
                <Link to={'/'} className={`${styles.logoWrapper} group`}>
                    <span className="text-2xl">🚀</span>
                    <span
                        className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent text-xl font-bold group-hover:scale-105 transition-transform duration-200">
                          TradeHub
                        </span>
                </Link>
                <p className={styles.description}>
                    Your destination for quality goods and lightning-fast delivery. Shop smart, live better.
                </p>
            </div>

            {/* Quick Links */}
            <div className={styles.column}>
                <h4>Shop</h4>
                <ul className={styles.list}>
                    <li><Link to="/products" className={styles.link}>All Products</Link></li>
                    <li><Link to="#" onClick={handleDisableLink} className={styles.link}>Hot Deals</Link></li>
                    <li><Link to="#" onClick={handleDisableLink} className={styles.link}>New Arrivals</Link></li>
                </ul>
            </div>

            {/* Customer Support */}
            <div className={styles.column}>
                <h4>Help</h4>
                <ul className={styles.list}>
                    <li><Link to="#" onClick={handleDisableLink} className={styles.link}>Shipping Info</Link></li>
                    <li><Link to="#" onClick={handleDisableLink} className={styles.link}>Returns & Refunds</Link>
                    </li>
                    <li><Link to="#" onClick={handleDisableLink} className={styles.link}>Contact Us</Link></li>
                </ul>
            </div>

            {/* Legal */}
            <div className={styles.column}>
                <h4>Information</h4>
                <ul className={styles.list}>
                    <li><Link to="#" onClick={handleDisableLink} className={styles.link}>Terms & Conditions</Link>
                    </li>
                    <li><Link to="#" onClick={handleDisableLink} className={styles.link}>Privacy Policy</Link></li>
                    <li><Link to="#" onClick={handleDisableLink} className={styles.link}>FAQ</Link></li>
                </ul>
            </div>
        </div>

        <div className={styles.bottomBar}>
            <p>© {new Date().getFullYear()} TradeHub. All rights reserved.</p>
            <div className={styles.socials}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialIcon}
                   aria-label="Facebook">
                    <FaFacebookF/>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialIcon}
                   aria-label="Instagram">
                    <FaInstagram/>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className={styles.socialIcon}
                   aria-label="TikTok">
                    <FaTiktok/>
                </a>
            </div>
        </div>
    </footer>);
};

export default Footer;