import React from 'react'

function RightSidebar() {
  const suggestions = [
    { id: 1, username: "john_doe", avatar: "https://via.placeholder.com/40", isFollowing: false },
    { id: 2, username: "jane_smith", avatar: "https://via.placeholder.com/40", isFollowing: false },
    { id: 3, username: "michael_89", avatar: "https://via.placeholder.com/40", isFollowing: true },
  ];

  return (
    <div className="py-5">
      <div>
        <h2 className="text-lg font-semibold text-[#20202033] mb-6">Suggested for you</h2>
        <div>
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={suggestion.avatar}
                  alt={suggestion.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-sm font-semibold">{suggestion.username}</p>
                </div>
              </div>
              <button
                className={`text-sm font-medium ${suggestion.isFollowing ? "text-gray-400" : "text-blue-500"}`}
              >
                {suggestion.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default RightSidebar