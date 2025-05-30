import type { AnimationProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface GeneralProps {
  children: ReactNode
}

interface AnimationComponentProps extends GeneralProps {
  options?: AnimationProps
}

export type { GeneralProps, AnimationComponentProps }
