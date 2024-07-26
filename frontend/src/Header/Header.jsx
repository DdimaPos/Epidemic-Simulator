import logo from "./../img/log.jpg"
import styles from "./Header.module.css"
function Header(){
    return(
    <div className={styles.panel}>
        <img src={logo} alt="log" />
        <div className={styles.header_text} id="text">KARA</div>
    </div>)
}
export default Header;