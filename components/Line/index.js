
import Spline from '@splinetool/react-spline';

export default function App() {
    return (
      <div style={{zIndex:-1, position: 'relative'}} >
        <Spline
          scene="https://prod.spline.design/ezzyfloSRqbCqSzy/scene.splinecode" 
        />
      </div>
    );
  }