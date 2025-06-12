import Lottie from "lottie-react";
import loading from '../loading.json'
const LoadingComponent = () => {
    return <div>
        <Lottie animationData={loading} loop={true} />
    </div>
}

export default LoadingComponent;