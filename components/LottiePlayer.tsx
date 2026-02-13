
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface Props {
  url: string;
  className?: string;
  loop?: boolean;
}

const LottiePlayer: React.FC<Props> = ({ url, className, loop = true }) => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading Lottie:", err));
  }, [url]);

  if (!animationData) return <div className={className} />;

  return (
    <Lottie 
      animationData={animationData} 
      className={className} 
      loop={loop}
    />
  );
};

export default LottiePlayer;
