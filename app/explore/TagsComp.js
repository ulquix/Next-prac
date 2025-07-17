import Link from "next/link";

export default function TagList({ tags, curr }) {
  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filter by Tags</h3>
        <span className="text-sm text-gray-500">{tags.length} tags</span>
      </div>
      
      {/* Scrollable tag container */}
      <div className="overflow-y-auto max-h-80 bg-gradient-to-br from-gray-50 to-white shadow-lg rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {/* All tags link */}
          <Link 
            href="/explore/?tag=" 
            className={`
              inline-flex items-center px-4 py-2 text-sm font-medium rounded-full
              transition-all duration-200 transform hover:scale-105
              ${!curr || curr === '' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            All
          </Link>
          
          {/* Individual tags */}
          {tags.map((tag, index) => {
            const isActive = curr === tag;
            return (
              <Link 
                href={`/explore/?tag=${encodeURIComponent(tag)}`}
                key={index}
                className={`
                  inline-flex items-center px-4 py-2 text-sm font-medium rounded-full
                  transition-all duration-200 transform hover:scale-105
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }
                `}
              >
                <span className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-white' : 'bg-gray-400'}`}></span>
                {tag}
              </Link>
            );
          })}
        </div>
        
        {/* Empty state */}
        {tags.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p className="text-sm">No tags available</p>
          </div>
        )}
      </div>
      
      {/* Subtle scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white via-white to-transparent pointer-events-none rounded-b-xl"></div>
    </div>
  );
}