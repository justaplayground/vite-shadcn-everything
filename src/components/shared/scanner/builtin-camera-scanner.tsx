import { useEffect, useState } from 'react'
import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
  Html5QrcodeSupportedFormats,
  type QrcodeSuccessCallback,
  type QrcodeErrorCallback,
} from 'html5-qrcode'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './scanner.css'

interface MobileCodeScannerProps {
  onScanSuccess: (result: string) => void
  onScanError: (error: string | Error) => void
  onClose: () => void
}

const cameraScannerConfig = {
  fps: 24,
  qrbox: { width: 250, height: 250 },
  rememberLastUsedCamera: true,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  formatsToSupport: [
    Html5QrcodeSupportedFormats.QR_CODE,
    Html5QrcodeSupportedFormats.AZTEC,
    Html5QrcodeSupportedFormats.CODABAR,
    Html5QrcodeSupportedFormats.CODE_39,
    Html5QrcodeSupportedFormats.CODE_93,
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.DATA_MATRIX,
    Html5QrcodeSupportedFormats.MAXICODE,
    Html5QrcodeSupportedFormats.ITF,
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8,
    Html5QrcodeSupportedFormats.PDF_417,
    Html5QrcodeSupportedFormats.RSS_14,
    Html5QrcodeSupportedFormats.RSS_EXPANDED,
    Html5QrcodeSupportedFormats.UPC_A,
    Html5QrcodeSupportedFormats.UPC_E,
    Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
  ],
}

export default function BuiltinCameraScanner({
  onScanSuccess,
  onScanError,
  onClose,
}: MobileCodeScannerProps) {
  const qrcodeRegionId = 'html5qr-code-full-region-mobile' // Unique ID for this instance
  const [scannerReady, setScannerReady] = useState(false) // To indicate scanner initialization status

  const destroyScanner = () => {
    // return the
    onClose()
  }

  useEffect(() => {
    const qrCodeRegion = document.getElementById(qrcodeRegionId)
    if (!qrCodeRegion) {
      console.error(`Camera scanner UI element (id: "${qrcodeRegionId}") not found.`)
      onScanError(`Camera scanner UI element (id: "${qrcodeRegionId}") not found in the DOM.`)
      onClose()
      return
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      cameraScannerConfig,
      false // verbose
    )

    const successCallback: QrcodeSuccessCallback = (decodedText, decodedResult) => {
      console.log(`Mobile Camera Scan result: ${decodedText}`, decodedResult)
      setScannerReady(true) // Set ready on first successful scan
      onScanSuccess(decodedText)
      // Optionally stop scanner after successful scan
      html5QrcodeScanner.clear().catch((err) => console.error('Error clearing camera scanner', err))
    }

    const errorCallback: QrcodeErrorCallback = (errorMessage) => {
      if (typeof errorMessage === 'string') {
        if (
          errorMessage.toLowerCase().includes('permission denied') ||
          errorMessage.toLowerCase().includes('notallowederror')
        ) {
          onScanError('Camera permission denied. Please allow camera access.')
          onClose() // Automatically close if permission denied
          setScannerReady(false) // Mark as not ready on permission error
        } else if (
          !errorMessage.toLowerCase().includes('qr code parse error') &&
          !errorMessage.toLowerCase().includes('not found')
        ) {
          // Log other types of errors, but don't necessarily set them in UI to avoid noise
          console.warn(`Mobile Camera scan error: ${errorMessage}`)
        }
      }
    }

    // Call render. Based on your provided TypeScript definition, it returns void.
    // We cannot chain .then() directly after this call.
    // We will rely on the `successCallback` to indicate readiness or `errorCallback` for failure.
    try {
      html5QrcodeScanner.render(successCallback, errorCallback)
    } catch (err) {
      console.error('Failed to start camera scanner during render call:', err)
      onScanError(
        'Failed to start camera scanner. ' + (err instanceof Error ? err.message : String(err))
      )
      onClose()
      setScannerReady(false) // Explicitly set to false on immediate error
    }

    return () => {
      // Ensure the scanner is cleared when the component unmounts
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner: ', error)
      })
    }
  }, [onScanError, onScanSuccess, onClose]) // Empty dependency array means this runs once on mount

  return (
    // Replaced Card with div for flexibility if shadcn/ui is not fully integrated
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Scan Code with Camera</CardTitle>
      </CardHeader>
      <CardContent>
        {!scannerReady && <p className="text-center text-gray-600 mb-4">Starting camera...</p>}
        <div
          id={qrcodeRegionId}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex flex-col items-center" // Added aspect-video for better mobile sizing
          style={{ minHeight: '200px' }} // Fallback min-height
        >
          {/* Camera feed injected here */}
        </div>
        <Button onClick={destroyScanner} variant="destructive" className="w-full mt-4">
          Stop Scanner
        </Button>
      </CardContent>
    </Card>
  )
}
