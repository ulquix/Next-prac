"use client";

import React, { useState } from 'react'
import Image from 'next/image';
import { BookMarked, Bookmark, Loader, Clock, ChefHat, Users, Zap, Star, Utensils } from 'lucide-react';

const Frontend = ({ data, saved, isLoggedIn }) => {
  const [isSaved, setIsSaved] = useState(saved.includes(data.id))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const add = async (id) => {
    setIsSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_meri}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) setIsSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false)
    }
  };

  const remove = async (id) => {
    setIsSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_meri}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) setIsSaved(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false)
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2 leading-tight">
              {data.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {data.cuisine}
              </span>
              <span className={`px-3 py-1 rounded-full font-medium ${getDifficultyColor(data.difficulty)}`}>
                {data.difficulty}
              </span>
            </div>
          </div>
          
          {isLoggedIn && (
            <div className="flex items-center gap-2">
              {isSubmitting ? (
                <div className="p-3 bg-gray-100 rounded-full">
                  <Loader className="w-6 h-6 animate-spin text-gray-600" />
                </div>
              ) : (
                <button
                  disabled={isSubmitting}
                  onClick={() => isSaved ? remove(data.id) : add(data.id)}
                  className={`p-3 rounded-full transition-all duration-200 hover:scale-105 ${
                    isSaved 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isSaved ? (
                    <BookMarked className="w-6 h-6" />
                  ) : (
                    <Bookmark className="w-6 h-6" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
        <Image
          src={data.image}
          alt={data.name}
          width={1200}
          height={600}
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard 
          icon={<Clock className="w-5 h-5 text-blue-600" />}
          label="Prep Time"
          value={`${data.prepTimeMinutes} min`}
          color="blue"
        />
        <StatCard 
          icon={<ChefHat className="w-5 h-5 text-orange-600" />}
          label="Cook Time"
          value={`${data.cookTimeMinutes} min`}
          color="orange"
        />
        <StatCard 
          icon={<Users className="w-5 h-5 text-green-600" />}
          label="Servings"
          value={data.servings}
          color="green"
        />
        <StatCard 
          icon={<Zap className="w-5 h-5 text-yellow-600" />}
          label="Calories"
          value={`${data.caloriesPerServing}`}
          color="yellow"
        />
        <StatCard 
          icon={<Utensils className="w-5 h-5 text-purple-600" />}
          label="Meal Type"
          value={Array.isArray(data.mealType) ? data.mealType[0] : "N/A"}
          color="purple"
        />
        <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {getRatingStars(data.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {data.rating} ({data.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Ingredients */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">🥬</span>
              </div>
              Ingredients
            </h2>
            <div className="space-y-3">
              {data.ingredients.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">📝</span>
              </div>
              Instructions
            </h2>
            <div className="space-y-4">
              {data.instructions.map((step, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tags and Footer */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200 hover:bg-gray-100 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500">Recipe ID: {data.id}</p>
      </div>
    </main>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <div className="text-lg font-bold text-gray-900">{value}</div>
  </div>
);

export default Frontend;