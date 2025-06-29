import React, { useState, useRef } from 'react'
import BuiltinCameraScanner from './builtin-camera-scanner'
import { Button } from '@/components/ui/button'

interface CodeScannerProps {
  key?: string
  // put some props here if needed
}

export default function CodeScanner({ key = 'code-scanner' }: CodeScannerProps) {
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [scannerError, setScannerError] = useState<string | Error | null>(null)
  const [showCameraScanner, setShowCameraScanner] = useState<boolean>(false)
  const [desktopScannerInput, setDesktopScannerInput] = useState<string>('')

  // ID for the QR code reader div element (for camera scanner) - NO LONGER USED HERE DIRECTLY
  // const qrcodeRegionId = 'html5qr-code-full-region'
  const desktopInputRef = useRef<HTMLInputElement>(null)

  // The useEffect for camera-based scanner is now handled inside MobileCodeScanner

  const handleStartCameraScanner = () => {
    setScanResult(null)
    setScannerError(null)
    setDesktopScannerInput('') // Clear desktop input if switching
    setShowCameraScanner(true)
  }

  const handleStopCameraScanner = () => {
    setShowCameraScanner(false)
    // Cleanup is handled by the MobileCodeScanner's useEffect return function
  }

  const handleMobileScanSuccess = (result: string) => {
    setScanResult(result)
    setScannerError(null)
    // Optionally stop the camera after a successful scan here if desired
    // setShowCameraScanner(false);
  }

  const handleMobileScanError = (error: string | Error) => {
    setScannerError(error)
    // setShowCameraScanner(false); // Consider closing camera on certain errors
  }

  // Handler for desktop scanner input field
  const handleDesktopInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesktopScannerInput(event.target.value)
  }

  // Handler for Enter key press in desktop scanner input
  const handleDesktopInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && desktopScannerInput.trim() !== '') {
      event.preventDefault() // Prevent form submission if it's in a form
      console.log(`Desktop Scan result: ${desktopScannerInput}`)
      setScanResult(desktopScannerInput.trim())
      setScannerError(null)
      setDesktopScannerInput('') // Clear input after processing
      setShowCameraScanner(false) // Hide camera scanner if it was open
    }
  }

  const copyToClipboard = (text: string | null) => {
    if (!text) return
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert('Copied to clipboard!')
        })
        .catch((err) => {
          console.error('Failed to copy with navigator.clipboard: ', err)
          fallbackCopyToClipboard(text)
        })
    } else {
      fallbackCopyToClipboard(text)
    }
  }

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = '0'
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      const successful = document.execCommand('copy')
      if (successful) {
        alert('Copied to clipboard (fallback)!')
      } else {
        alert('Failed to copy text (fallback).')
      }
    } catch (err) {
      console.error('Fallback copy to clipboard failed: ', err)
      alert('Failed to copy text (fallback).')
    }
    document.body.removeChild(textArea)
  }

  return (
    <div key={key} className="min-h-screen bg-gray-100 flex flex-col p-4 font-sans">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-primary mb-8">QR Code Scanner</h1>
          {!showCameraScanner && (
            <>
              {/* Desktop Scanner Input Section */}
              <div className="mb-6">
                <label
                  htmlFor="desktop-scanner-input"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Scan with Desktop Scanner:
                </label>
                <input
                  type="text"
                  id="desktop-scanner-input"
                  ref={desktopInputRef}
                  value={desktopScannerInput}
                  onChange={handleDesktopInputChange}
                  onKeyDown={handleDesktopInputKeyDown}
                  placeholder="Click here & scan with your device"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Ensure this field is focused before scanning. Press Enter or scan (most scanners
                  auto-submit).
                </p>
              </div>
              <div className="text-center my-4 text-gray-500 font-semibold">OR</div>
              {/* Camera Scanner Section */}
              <Button onClick={handleStartCameraScanner} className="w-full mb-4">
                Start Camera Scanner (Mobile/Webcam)
              </Button>
            </>
          )}
          {showCameraScanner && (
            // Render the Builtin Camera Scanner component
            <BuiltinCameraScanner
              onScanSuccess={handleMobileScanSuccess}
              onScanError={handleMobileScanError}
              onClose={handleStopCameraScanner}
            />
          )}
          {/* Displaying Errors */}
          {scannerError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-lg">
              <p className="font-semibold">Error:</p>
              <p>{scannerError instanceof Error ? scannerError.message : scannerError}</p>
            </div>
          )}
          {/* Displaying Scan Result */}
          {scanResult && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-400 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Scan Result:</h2>
              <p className="break-all font-mono bg-white p-2 rounded border border-green-300">
                {scanResult}
              </p>
              <Button onClick={() => copyToClipboard(scanResult)} size="sm" className="mt-3">
                Copy Result
              </Button>
            </div>
          )}
          {/* Initial state message */}
          {!showCameraScanner && !scanResult && !scannerError && !desktopScannerInput && (
            <div className="text-center text-gray-500 mt-6 p-4 border border-dashed rounded-md">
              <p>
                Use the input field above for your desktop scanner, or start the camera scanner.
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center text-gray-500 mt-8 text-sm">
        <p className="">
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
