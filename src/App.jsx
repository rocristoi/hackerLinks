import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import chalk from "chalk";
import { links,asciiArt, hiddenTitle, hiddenSubtitle, title } from "./constants";
import MatrixBackground from "./MatrixBackground";

const useDevToolsDetection = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    const checkDevTools = () => {
      const threshold = 160;
      const isOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;
      setIsDevToolsOpen(isOpen);
    };

    checkDevTools();
    window.addEventListener("resize", checkDevTools);

    return () => window.removeEventListener("resize", checkDevTools);
  }, []);

  return isDevToolsOpen;
};


const App = () => {
  const [isOnMobile, setIsOnMobile] =useState(false);
  const isDevToolsOpen = useDevToolsDetection();
  const baseText = hiddenTitle;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );
  useEffect(() => {
    const handleResize = () => {
      setIsOnMobile(window.innerWidth < 768); // Adjust breakpoint
    };
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (isDevToolsOpen || isOnMobile) {
      const controls = animate(count, baseText.length, {
        type: "tween",
        duration: 1,
        ease: "easeInOut",
      });
      return () => controls.stop();
    }
  }, [isDevToolsOpen, count, baseText.length]);


    
  const logData = () => {
 
 console.log(chalk.green(asciiArt));
  };

  useEffect(() => {
    if (isDevToolsOpen) {
      logData(); 
    }
  }, [isDevToolsOpen]);


  return (
    <div>
      <div className="hidden lg:block md:block" >
      {!isDevToolsOpen && (
       
       <div className="h-screen w-screen flex flex-col items-center justify-center">
       <h1 className="text-red-500 font-black">{title}</h1>

       
     </div>
      )}
      {isDevToolsOpen && (
           <div className="h-screen w-screen flex flex-col items-center justify-center ">
                                <MatrixBackground timeout={50} />

                                                  <motion.span
                    className="text-green-400 font-black text-[60px] md:text-[40px] text-center"
                    style={{
                      textShadow: '0 0 4px #0f0, 0 0 3px #0f0', // Neon glow effect
                    }}
                  >
                    {displayText}
                  </motion.span>

                <motion.div
                  className="mb-4 text-[24px] md:text-[30px] text-center leading-snug text-green-200"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 1.5 },
                    },
                  }}
                >
                  {hiddenSubtitle}
                </motion.div>



                          <motion.div
                  className="flex flex-col gap-2 "
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 2, // Delay parent animation
                        staggerChildren: 0.2, // Stagger each child
                        delayChildren: 0.6, // Delay before starting children
                      },
                    },
                  }}
                >
                  {links.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.link}
                      target="_blank"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    >
                <motion.button
                  className="w-[250px] rounded-full h-12 flex items-center justify-center "
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 1)', // Subtle dark gray
                    color: 'rgb(74, 222, 121)',
                  }}
                  whileHover={{
                    backgroundColor: 'rgb(74, 222, 121)',
                    color: 'rgb(0, 0, 0)',
                    transition: { duration: 0.3 },
                  }}
                >
                  {link.name}
                </motion.button>

                    </motion.a>
                  ))}
                </motion.div>
             </div>
      )}
      </div>
      <div className="block lg:hidden md:hidden" >
      <div className="h-screen w-screen flex flex-col items-center justify-center ">
                                <MatrixBackground timeout={50} />



                <motion.div
                  className="mb-4 text-[24px] md:text-[30px] text-center leading-snug text-green-200"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 1.5 },
                    },
                  }}
                >
                  {hiddenSubtitle}
                </motion.div>



                          <motion.div
                  className="flex flex-col gap-2 "
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 2, // Delay parent animation
                        staggerChildren: 0.2, // Stagger each child
                        delayChildren: 0.6, // Delay before starting children
                      },
                    },
                  }}
                >
                  {links.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.link}
                      target="_blank"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    >
                <motion.button
                  className="w-[250px] rounded-full h-12 flex items-center justify-center "
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 1)', // Subtle dark gray
                    color: 'rgb(74, 222, 121)',
                  }}
                  whileHover={{
                    backgroundColor: 'rgb(74, 222, 121)',
                    color: 'rgb(0, 0, 0)',
                    transition: { duration: 0.3 },
                  }}
                >
                  {link.name}
                </motion.button>

                    </motion.a>
                  ))}
                </motion.div>
             </div>

      </div>
    </div>
  );
};
export default App;
