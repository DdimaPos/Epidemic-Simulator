import styles from "./Parameters.module.css"
import Slider from "./Slider/Slider"
import {useEffect, useState, useRef} from 'react'
import * as d3 from "d3"

export default function Parameters({responseData, sliderValue, setSlidervalue, submitHandler}){
    const [selectedPreset, setSelectedPreset]=useState('');
    const [countAll, setCountAll]=useState([[]])
    const [count_dead, setCount_dead]=useState([0, 0]);
    const [count_infected, setCount_infected]=useState([0, 0]);
    
    const infectionPresets=[
        {name:"Custom",infection_probability:'50', infection_radius:'50', movement_speed: '5', probability_of_dying:'50'},
        {name:"Covid-19",infection_probability:'50', infection_radius:'70', movement_speed: '5', probability_of_dying:'30'},
        {name:"EBOLA",infection_probability:'40', infection_radius:'70', movement_speed: '6', probability_of_dying:'80'},
        {name:"HIV",infection_probability:'20', infection_radius:'70', movement_speed: '3', probability_of_dying:'50'},
    ]
    const sliderNames = ["Movement speed","Number of individuals", "Number of iterations", "Infection Radius", "Infection probability", "Dying probability"];
    
    /////canvas handling
    const canvasRef=useRef(null);

    function resetCanvas(){
        setCount_dead([0,0]);
        setCount_infected([0,0]);
    }
    
    useEffect(()=>{
        //performing operations to count the number of individuals of each state
        let dead_counter=0;
        let infected_counter=0;
        for(let i=0; i<responseData.length; i++){
            if(responseData[i].is_infected) infected_counter++;
            if(!responseData[i].is_infected && !responseData[i].alive) dead_counter++; 
        }
        setCount_dead([...count_dead, dead_counter]);
        setCount_infected([...count_infected, (infected_counter+dead_counter)]);
        setCountAll([count_dead, count_infected]);

        const canvas=canvasRef.current;
        //get the displaying width and height on page
        //console.log(canvas.getBoundingClientRect())
        const { width, height } = canvas.getBoundingClientRect();
        const marginTop = 20
        const marginBottom = 20
        const marginRight = 20
        const marginLeft = 25

        const innerWidth = width - marginLeft - marginRight;
        const innerHeight = height - marginTop -  marginBottom;

        const data = countAll;
                
        const series = d3.stack().keys(d3.range(data.length))(d3.transpose(data));
        //delete previous data
        d3.select(canvas).selectAll('*').remove();
        
        const xScale = d3.scaleLinear()
            .domain([0, data[0].length - 1])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([innerHeight, 0]);

        //define the axis
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        let svg = d3.select(canvas)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${marginLeft}, ${marginTop})`)

        const colors = ["grey","red", "blue"]

        // Create the area generator
        const area = d3.area()
            .x((d, i) => xScale(i))
            .y0(d => yScale(d[0]))
            .y1(d => yScale(d[1]))
            .curve(d3.curveMonotoneX); // Smooth the line

        // Create the stacked areas
        svg.selectAll("path")
            .data(series)
            .enter().append("path")
            .attr("fill", (d, i) => colors[i])
            .attr("d", area);

        //call the axis
        svg.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis);
        svg.append("g")
            .call(yAxis)
        
        
    },[responseData]);
    
    
    //////////

    function handlePresetsOnChange(e){
        setSelectedPreset(e.target.value)
        const selectedPreset = selectObjectByName(e.target.value);
        setSlidervalue({
            ...sliderValue,
            movement_speed: selectedPreset.movement_speed,
            infection_probability: selectedPreset.infection_probability,
            infection_radius: selectedPreset.infection_radius,
            probability_of_dying: selectedPreset.probability_of_dying,
        });
    }
    function selectObjectByName(name) {
        return infectionPresets.find(preset => preset.name === name);
    }
    function handleParam(e){
        if(e.target.value<parseInt(e.target.min) || e.target.value>parseInt(e.target.max)){
            return;
        }
        setSlidervalue({...sliderValue,[e.target.name]: e.target.value,});
        setSelectedPreset('Custom');
    }
    
    return(
        <div className={styles.wrapper}>
            <div className={styles.graph}>
                <svg ref={canvasRef} className={styles.canvas} >
                </svg>
            </div>
            <div className={styles.settings}>
                <div className={styles.buttons}>
                    <p>Presets</p>
                    <select onChange={handlePresetsOnChange} value={selectedPreset}>
                        <option value="Custom">Custom</option>
                        <option value="Covid-19">Covid-19</option>
                        <option value="EBOLA">EBOLA</option>
                        <option value="HIV">HIV</option>
                    </select>
                    <button onClick={() => { submitHandler(); resetCanvas(); }}>Start</button>
                </div>
                <div className={styles.sliders}>
                    <Slider minmax={['1','10']} onChange={handleParam} sliderValue={sliderValue.movement_speed} name="movement_speed" prop_name={sliderNames[0]}/>
                    <Slider minmax={['1','200']} onChange={handleParam} sliderValue={sliderValue.num_individuals} name="num_individuals" prop_name={sliderNames[1]}/>
                    <Slider minmax={['1','10000']} onChange={handleParam} sliderValue={sliderValue.num_iterations} name="num_iterations" prop_name={sliderNames[2]}/>
                    <Slider minmax={['1','100']} onChange={handleParam} sliderValue={sliderValue.infection_probability} name="infection_probability" prop_name={sliderNames[4]}/>                
                    <Slider minmax={['1','100']} onChange={handleParam} sliderValue={sliderValue.probability_of_dying} name="probability_of_dying" prop_name={sliderNames[5]}/>  
                </div>
            </div>
        </div>
    )
}