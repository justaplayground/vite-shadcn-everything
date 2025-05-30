import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Maintenance() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="max-w-md w-full"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="text-center shadow-xl border-none rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="w-10 h-10 text-yellow-500" />
          <CardTitle className="text-xl">Under Maintenance</CardTitle>
          <CardDescription>
            This page is currently being updated. Please check back later.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex justify-center">
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
