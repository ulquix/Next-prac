"use client"

import Form from 'next/form'
import { handleSubmit } from './submit'

export default function RecipeSearch({ 
  onSubmit = handleSubmit, 
  placeholder = "Search for delicious recipes...",
  className = ""
}) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 ${className}`}>


      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              Find Your Next
              <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
                Favorite Recipe
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover thousands of delicious recipes from around the world. From quick weeknight dinners to special occasion treats.
            </p>
          </div>

          {/* Search Form */}
          <Form action={onSubmit} className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-2">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <input
                      name="recipe"
                      id="recipe"
                      type="text"
                      placeholder={placeholder}
                      className="w-full px-6 py-4 pl-12 text-lg border-0 rounded-xl focus:outline-none focus:ring-0 bg-transparent placeholder-gray-500"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </Form>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            <button className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="text-3xl mb-2">🍕</div>
              <div className="text-sm font-semibold text-gray-700">Italian</div>
            </button>
            <button className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="text-3xl mb-2">🥘</div>
              <div className="text-sm font-semibold text-gray-700">Indian</div>
            </button>
            <button className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="text-3xl mb-2">🍜</div>
              <div className="text-sm font-semibold text-gray-700">Asian</div>
            </button>
            <button className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="text-3xl mb-2">🥗</div>
              <div className="text-sm font-semibold text-gray-700">Healthy</div>
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick & Easy</h3>
              <p className="text-gray-600">Find recipes that fit your schedule, from 15-minute meals to weekend projects.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized</h3>
              <p className="text-gray-600">Save your favorites and get recommendations based on your taste preferences.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Step-by-Step</h3>
              <p className="text-gray-600">Clear instructions and helpful tips to make cooking enjoyable and successful.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  )
}