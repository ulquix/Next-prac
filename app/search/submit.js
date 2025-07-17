"use server"

import { redirect } from 'next/navigation'

export async function handleSubmit(formData) {
  const query = formData.get('recipe')
  
  if (query && query.trim()) {
    redirect(`/searchresults?query=${encodeURIComponent(query.trim())}`)
  }
}