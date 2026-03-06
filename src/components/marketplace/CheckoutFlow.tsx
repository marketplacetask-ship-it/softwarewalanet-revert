'use client'
import React, { useState } from 'react'
import { usePayU } from '@/hooks/usePayU'
import { useUPI } from '@/hooks/useUPI'
import { usePayPal } from '@/hooks/usePayPal'
import './CheckoutFlow.css'

interface CheckoutProps {
  productId: string
  productName: string
  price: number
  onSuccess: (orderId: string, licenseKey: string) => void
}

export const CheckoutFlow: React.FC<CheckoutProps> = ({
  productId,
  productName,
  price,
  onSuccess,
}) => {
  const [step, setStep] = useState<'method' | 'payment' | 'success'>('method')
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [orderId, setOrderId] = useState('')
  const [licenseKey, setLicenseKey] = useState('')

  const payU = usePayU()
  const upi = useUPI()
  const paypal = usePayPal()

  const handlePayU = async () => {
    const result = await payU.initiatePayment({
      amount: price,
      productId,
      productName,
    })
    if (result.success) {
      setOrderId(result.orderId)
      setLicenseKey(result.licenseKey)
      setStep('success')
      onSuccess(result.orderId, result.licenseKey)
    }
  }

  const handleUPI = async () => {
    const result = await upi.initiatePayment({
      amount: price,
      productId,
    })
    if (result.success) {
      setOrderId(result.orderId)
      setLicenseKey(result.licenseKey)
      setStep('success')
      onSuccess(result.orderId, result.licenseKey)
    }
  }

  const handlePayPal = async () => {
    const result = await paypal.initiatePayment({
      amount: price,
      productId,
      productName,
    })
    if (result.success) {
      setOrderId(result.orderId)
      setLicenseKey(result.licenseKey)
      setStep('success')
      onSuccess(result.orderId, result.licenseKey)
    }
  }

  return (
    <div className="checkout-modal">
      <div className="checkout-card">
        {step === 'method' && (
          <>
            <h2>Checkout - {productName}</h2>
            <div className="price-display">₹{price.toLocaleString()}</div>
            
            <div className="payment-methods">
              <button
                className="method-btn"
                onClick={() => {
                  setSelectedMethod('payu')
                  handlePayU()
                }}
              >
                💳 PayU
              </button>
              <button
                className="method-btn"
                onClick={() => {
                  setSelectedMethod('upi')
                  handleUPI()
                }}
              >
                📱 UPI
              </button>
              <button
                className="method-btn"
                onClick={() => {
                  setSelectedMethod('paypal')
                  handlePayPal()
                }}
              >
                🅿️ PayPal
              </button>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <div className="success-icon">✅</div>
            <h2>Payment Successful!</h2>
            <div className="order-details">
              <p><strong>Order ID:</strong> {orderId}</p>
              <p><strong>License Key:</strong> {licenseKey}</p>
            </div>
            <button className="btn-close" onClick={() => window.location.reload()}>
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  )
}
