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
    
    /*useEffect(() => {//function only to see if canvas works
        setResponseData([
            { id: 1, position: [10,10], infected: true, alive: false }, 
            
        ]);
    }, []);    */
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
        
        const webSocket = new WebSocket('ws://192.168.1.196:8080/'); // websocket endpoint on server
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
            webSocket.close();
        };
        setWebsocket(webSocket);
    };
    
    return(
        <div className={styles.body}>
            <Parameters 
                responseData={responseData}
                sliderValue={sliderValue} 
                setSlidervalue={setSlidervalue}
                submitHandler={submitHandler}/>
            <Map responseData={responseData}/>
            
        </div>
    )
}
export default Body;