import {useEffect, useState } from 'react'
import './App.css'
import Header from './Header/Header.jsx'
import Body from './Body/Body.jsx'
import Footer from './Footer/Footer.jsx'
function SplashScreen({ duration }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) {
    return null;
  }

  return (
    <div className="splash-screen">
      <div className="content"></div>
      <div className="overlay"></div>
      <div className='KARA'>K</div>
      <div className='KARA'>A</div>
      <div className='KARA'>R</div>
      <div className='KARA'>A</div>

      
    </div>
  );
  
}

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className="body">
        <SplashScreen duration={2800} />
        <Header/>
        <Body />
        <Footer/>
      </div>
    </>
  )
}

export default App
