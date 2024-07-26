import React, {useState} from 'react'
import styles from "./Body.module.css"
import Parameters from "./Parameters/Parameters";
import Map from "./Map/map";


function Body(){
    const [sliderValue, setSlidervalue]=useState({
        movement_speed: '1',
        num_individuals:'100',
        infection_probability: '1',
        infection_radius: '25',
        probability_of_dying: '1',
        num_iterations: '10000',
    });
    const [responseData, setResponseData] = useState('');
    const [error, setError] = useState(null);
    const [websocket, setWebsocket]=useState(null);
    
    const submitHandler = async (e) => {
        console.log(e);
        let requiredDataString = JSON.stringify(sliderValue);
        console.log(requiredDataString);
        if (websocket) {
            websocket.close();
        }
        startWebSocket(requiredDataString); 
    };
    const startWebSocket = (requiredDataString) => {
        
        const webSocket = new WebSocket('ws://192.168.1.189:8080/'); // websocket endpoint on server
        webSocket.onopen = () => {
            console.log('Connected to server');
            webSocket.send(requiredDataString);
        };
        webSocket.onmessage = (event) => {
            //console.log("Received:", event.data); 
            let parsed_data=JSON.parse(event.data);
            //  console.log(parsed_data)
            setResponseData(parsed_data);
        };
        webSocket.onerror = (error) => {
            console.error("Error:", error);
            setError(error.message);
            alert("I am sorry, but server is not working now")
            webSocket.close();
        };
        setWebsocket(webSocket);
    };
    const Reset = () =>{
        if (websocket) {
            websocket.close();
        }
        setResponseData('');
    }
    
    return(
        <div className={styles.body}>
            <Parameters 
                responseData={responseData}
                sliderValue={sliderValue} 
                setSlidervalue={setSlidervalue}
                submitHandler={submitHandler}/>
            <Map responseData={responseData} resetFunc={Reset}/>
            
        </div>
    )
}
export default Body;