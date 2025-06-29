import { motion, type AnimationProps } from 'framer-motion'
import type { AnimationComponentProps } from '@/components/props'
import { deepMerge } from '@/lib/utils'

const defaultOptions: AnimationProps = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}
export const FadeDown: React.FC<AnimationComponentProps> = ({ children, options = {} }) => {
  const mergedOptions = deepMerge(defaultOptions, options)

  return <motion.div {...mergedOptions}>{children}</motion.div>
}
