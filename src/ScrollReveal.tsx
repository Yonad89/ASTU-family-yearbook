import React, { useMemo, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.15,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
}) => {
  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/\s+/);
  }, [children]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
      y: 6,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className={`my-5 ${containerClassName}`}>
      <motion.p
        className={`text-[clamp(1.2rem,2.5vw,1.8rem)] leading-[1.6] ${textClassName}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.28em] transform-gpu"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default ScrollReveal;
