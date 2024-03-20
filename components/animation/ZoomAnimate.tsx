import React from 'react'
import { motion } from "framer-motion"

const ZoomAnimate = ({children}:{children:React.ReactNode}) => {
  return (
    <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
        {children}
    </motion.div>
  )
}

export default ZoomAnimate