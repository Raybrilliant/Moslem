import React from 'react'
import { motion } from 'framer-motion'

const PageAnimate = ({children} : {children:React.ReactNode}) => {
  return (
    <motion.div initial={{translateX:'10vh'}} animate={{translateX:'0'}} exit={{translateX:'10vh'}}>
        {children}
    </motion.div>
  )
}

export default PageAnimate