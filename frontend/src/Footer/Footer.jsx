import styles from './Footer.module.css'
import our_instagram from './../img/our_instagram.png'
function Footer(){
    return(
        <div className={styles.footer}>
            <div className={styles.footer_image}>
                <a href="https://www.instagram.com/dima_.pos/" target="_blank" rel="noopener noreferrer">
                    <img src={our_instagram} alt="our_instagram" />
                </a>
            </div>
            <div className={styles.footer_text} id="Something">Life is healthier with KARA!</div>
        </div>
    )
}
export default Footer;