import React, { useState, useRef } from 'react'
import { QrCode, Copy } from 'lucide-react'

import { useIsMobile } from '@/lib/hooks/use-mobile'
import BuiltinCameraScanner from './builtin-camera-scanner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CodeScannerProps {
  key?: string
  onCodeScanned?: (code: string) => void
}

export default function CodeScanner({ key = 'code-scanner', onCodeScanned }: CodeScannerProps) {
  // A single state now holds the result from any scan type.
  const [scannedCode, setScannedCode] = useState('')
  const [scannerError, setScannerError] = useState<string | Error | null>(null)
  const [showCameraScanner, setShowCameraScanner] = useState<boolean>(false)

  const desktopInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()

  const handleStartCameraScanner = () => {
    setScannerError(null)
    setShowCameraScanner(true)
  }

  const handleStopCameraScanner = () => {
    setShowCameraScanner(false)
  }

  // This function now autofills the input by setting the unified state.
  const handleMobileScanSuccess = (result: string) => {
    setScannedCode(result)
    setScannerError(null)
    setShowCameraScanner(false)
    if (onCodeScanned) {
      onCodeScanned(result)
    }
  }

  const handleMobileScanError = (error: string | Error) => {
    setScannerError(error)
  }

  // Handles manual typing or pasting into the input field.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScannedCode(event.target.value)
  }

  // Handles submission from a desktop scanner (which emulates 'Enter').
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && scannedCode.trim() !== '') {
      event.preventDefault()
      const finalResult = scannedCode.trim()
      setScannedCode(finalResult)
      setScannerError(null)
      if (onCodeScanned) {
        onCodeScanned(finalResult)
      }
    }
  }

  const copyToClipboard = (text: string) => {
    if (!text) return
    navigator.clipboard.writeText(text).catch((err) => {
      console.error('Failed to copy to clipboard: ', err)
    })
  }

  // The camera scanner now renders as an overlay.
  if (showCameraScanner) {
    return (
      <BuiltinCameraScanner
        onScanSuccess={handleMobileScanSuccess}
        onScanError={handleMobileScanError}
        onClose={handleStopCameraScanner}
      />
    )
  }

  // The main component view.
  return (
    <div key={key} className="min-h-screen bg-gray-100 flex flex-col p-4 font-sans">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-primary mb-8">QR Code Scanner</h1>

          <div className="mb-6">
            <label
              htmlFor="scanner-input"
              className={isMobile ? 'sr-only' : 'block text-sm font-medium text-gray-700 mb-2'}
            >
              Scanned Code
            </label>
            <div className="relative flex items-center">
              <Input
                id="scanner-input"
                type="text"
                ref={desktopInputRef}
                value={scannedCode}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder={isMobile ? 'Tap icon to scan...' : 'Scan or input code here...'}
                className="pr-20" // Extra padding for the icons on the right
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                {scannedCode && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(scannedCode)}
                    className="h-8 w-8 text-gray-500 hover:text-primary"
                    aria-label="Copy code"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleStartCameraScanner}
                  className="h-8 w-8 text-gray-500 hover:text-primary"
                  aria-label="Start Camera Scanner"
                >
                  <QrCode className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {scannerError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-lg">
              <p className="font-semibold">Error:</p>
              <p>{scannerError instanceof Error ? scannerError.message : scannerError}</p>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center text-gray-500 mt-8 text-sm">
        <p>
          Camera scanning powered by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/mebjas/html5-qrcode"
            className="text-primary hover:underline"
          >
            html5-qrcode
          </a>
          .
        </p>
      </footer>
    </div>
  )
}
