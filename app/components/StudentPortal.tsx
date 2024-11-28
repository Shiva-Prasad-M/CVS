'use client'

import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Certificate {
  certificateId: string
  studentName: string
  internshipDomain: string
  startDate: string
  endDate: string
}

export default function StudentPortal() {
  const [certificateId, setCertificateId] = useState('')
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    if (!certificateId) {
      toast.error('Please enter a certificate ID')
      return
    }

    setSearching(true)
    try {
      const response = await fetch(`/api/certificates?id=${certificateId}`)
      if (!response.ok) {
        throw new Error('Certificate not found')
      }
      const data = await response.json()
      setCertificate(data)
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Certificate not found')
      setCertificate(null)
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Student Portal</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="Enter Certificate ID"
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </div>
      {certificate && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Certificate Details</h3>
          <p><strong>Student Name:</strong> {certificate.studentName}</p>
          <p><strong>Internship Domain:</strong> {certificate.internshipDomain}</p>
          <p><strong>Start Date:</strong> {new Date(certificate.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(certificate.endDate).toLocaleDateString()}</p>
          <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Download Certificate
          </button>
        </div>
      )}
    </div>
  )
}

