'use client';
import { useEffect, useState } from 'react';
import TagList from './TagsComp';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../loading';
import { useSearchParams } from 'next/navigation';
import { Clock, Users, Star, ChefHat, Home, Filter, Grid3X3, List } from 'lucide-react';

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'time', 'calories'
  const tag = useSearchParams().get('tag') || null;

  const url = tag
    ? `${process.env.NEXT_PUBLIC_api}/tag/${tag}`
    : `${process.env.NEXT_PUBLIC_api}?limit=0`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        const tagres = await fetch(`${process.env.NEXT_PUBLIC_api}/tags`);
        const tagjson = await tagres.json();
        setTags(tagjson);
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tag, url]);

  const sortedRecipes = data?.recipes?.sort((a, b) => {
    switch (sortBy) {
      case 'time':
        return a.cookTimeMinutes - b.cookTimeMinutes;
      case 'calories':
        return a.caloriesPerServing - b.caloriesPerServing;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  }) || [];

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <Loader />
        <p className="text-slate-400 mt-4">Loading delicious recipes...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
                title="Go to Home"
              >
                <Home className="w-6 h-6 text-white" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {tag ? `${tag} Recipes` : 'Explore Recipes'}
                </h1>
                <p className="text-slate-400 text-sm">
                  {sortedRecipes.length} recipe{sortedRecipes.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  title="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name" className="bg-slate-800">Name</option>
                <option value="time" className="bg-slate-800">Cooking Time</option>
                <option value="calories" className="bg-slate-800">Calories</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar for tags */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-400" />
                  Filter by Category
                </h2>
                {tags.length > 0 && <TagList tags={tags} curr={tag}/>}
              </div>
            </div>
          </aside>

          {/* Main content for recipes */}
          <main className="lg:col-span-3">
            {sortedRecipes.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {sortedRecipes.map((rec) => (
                  <Link key={rec.id} href={`/searchresults/recipes/${rec.id}`}>
                    {viewMode === 'grid' ? (
                      <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                        {/* Recipe Image */}
                        <div className="relative overflow-hidden">
                          <Image
                            src={rec.image}
                            alt={rec.name}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Quick stats overlay */}
                          <div className="absolute top-4 right-4 space-y-2">
                            <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {rec.cookTimeMinutes}m
                            </div>
                            <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {rec.servings || 4}
                            </div>
                          </div>
                        </div>

                        {/* Recipe Details */}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                            {rec.name}
                          </h3>
                          
                          <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span>{rec.caloriesPerServing} cal</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{rec.rating || '4.5'}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          {rec.tags && rec.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="inline-block px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full mr-2 mb-2">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <Image
                          src={rec.image}
                          alt={rec.name}
                          width={120}
                          height={80}
                          className="w-20 h-20 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 mb-1">
                            {rec.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {rec.cookTimeMinutes} min
                            </div>
                            <div className="flex items-center gap-1">
                              <ChefHat className="w-4 h-4" />
                              {rec.caloriesPerServing} cal
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              {rec.rating || '4.5'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                  <ChefHat className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-slate-300">No recipes found</h3>
                <p className="text-slate-400 mb-6">Try selecting a different category or search term</p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Filter className="w-5 h-5" />
                  Search Recipes
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}