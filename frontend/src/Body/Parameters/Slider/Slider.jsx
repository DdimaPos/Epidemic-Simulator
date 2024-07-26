import styles from "./Slider.module.css"
function Slider(props){
    return(
        <div className={styles.slider_container}>
            <div className={styles.parameter_info}>{props.prop_name}</div>
            <input value={props.sliderValue} 
            type="range"
            min={props.minmax[0]} 
            max={props.minmax[1]}  
            className={styles.slider} 
            onChange={props.onChange} 
            name={props.name}
            />
            <input 
            value={props.sliderValue} 
            type="number" 
              
            className={styles.textbox} 
            onChange={props.onChange} 
            name={props.name}
            />
        </div>
    )
}
export default Slider;