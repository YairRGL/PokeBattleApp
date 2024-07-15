import React from "react";
import { useSpring, animated } from "@react-spring/web";
import "./LoadingAnimation.css";

const LoadingAnimation = () => {
  const springProps = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 300, friction: 20 },
    loop: true,
  });

  return (
    <div className="loading-animation">
      <animated.div style={springProps}>
        <div className="loading-spinner"></div>
      </animated.div>
    </div>
  );
};

export default LoadingAnimation;