"use client"

import Form from 'next/form'
import { handleSubmit } from './submit'
import Link from 'next/link'
import { Search, Home, ChefHat } from 'lucide-react'

export default function RecipeSearchForm({ 
  onSubmit = handleSubmit, 
  placeholder = "Search for delicious recipes...",
  className = ""
}) {
  return (
    <div className={`w-full ${className} px-4`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recipe Finder</h1>
            <p className="text-gray-600 text-sm">Discover amazing recipes for every occasion</p>
          </div>
        </div>
        
        <Link 
          href="/" 
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md"
          title="Go to Home"
        >
          <Home className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Home</span>
        </Link>
      </div>

      {/* Search Form */}
      <Form action={onSubmit} className="mb-8">
        <div className="relative max-w-4xl mx-auto">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-60"></div>
          
          {/* Main Search Container */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200/50 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              
              {/* Search Input Container */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  name="recipe"
                  id="recipe"
                  type="text"
                  placeholder={placeholder}
                  className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-gray-50 hover:bg-gray-100 focus:bg-white placeholder-gray-500 transition-all duration-200"
                />
              </div>
              
              {/* Search Button */}
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </Form>


    </div>
  )
}