// src/components/WelcomePopup/WelcomePopup.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import Lottie from 'lottie-react';
import animationData from '../../../public/assets/img/lotti/welcome.json'; // adjust path
import styles from './WelcomePopup.module.css';

const WelcomePopup = ({ username, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();

  const handleContinue = () => {
    setShowConfetti(false); // hide confetti when continuing
    onClose(); // navigate to dashboard
  };

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.overlay}
      >
        <div className={styles.container}>
          <button className={styles.close} onClick={handleContinue}>×</button>

          <div className={styles.curve}>
            <span>🎊 W E L C O M E 🎊</span>
          </div>

          <div className={styles.lottieWrapper}>
            <Lottie 
              animationData={animationData} 
              loop 
              className={styles.lottieSmall}
            />
          </div>

          <div className={styles.user}>
          Hello <span className={styles.username}><strong>{username} !😄</strong></span>
        </div>


          <div className={styles.subtext}>
            So happy to see you. Let’s make today amazing!
          </div>

          <button className={styles.button} onClick={handleContinue}>
            Continue
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default WelcomePopup;
