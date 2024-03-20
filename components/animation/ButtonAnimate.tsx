import { motion } from "framer-motion"
import React from "react"

const ButtonAnimate = ({children} : {children:React.ReactNode}) => {
  return (
    <motion.div whileTap={{scale:0.90}}>
        {children}
    </motion.div>
  )
}

export default ButtonAnimate