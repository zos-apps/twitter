import { useState } from 'react';

interface TwitterProps {
  onClose: () => void;
}

interface Tweet {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  time: string;
  verified: boolean;
}

const mockTweets: Tweet[] = [
  { id: '1', author: 'Tech News', handle: 'technews', avatar: '📱', content: 'Breaking: New AI model achieves state-of-the-art performance on major benchmarks 🤖', likes: 4521, retweets: 1203, replies: 342, time: '2h', verified: true },
  { id: '2', author: 'Developer Daily', handle: 'devdaily', avatar: '💻', content: 'Hot take: Rust will replace C++ within 10 years.\n\nAgree or disagree? 👇', likes: 892, retweets: 234, replies: 567, time: '4h', verified: false },
  { id: '3', author: 'Startup Founder', handle: 'founder', avatar: '🚀', content: 'Just shipped! After 6 months of work, our product is finally live.\n\nThread on what we learned 🧵👇', likes: 2341, retweets: 456, replies: 89, time: '6h', verified: true },
  { id: '4', author: 'Design Tips', handle: 'designtips', avatar: '🎨', content: 'Design principle: If you have to explain how the UI works, you need to redesign it.', likes: 5678, retweets: 2345, replies: 123, time: '8h', verified: false },
];

const formatCount = (n: number) => {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
};

const Twitter: React.FC<TwitterProps> = ({ onClose: _onClose }) => {
  const [tweets] = useState(mockTweets);
  const [tab, setTab] = useState<'for-you' | 'following'>('for-you');
  const [newTweet, setNewTweet] = useState('');

  return (
    <div className="h-full flex bg-black text-white">
      {/* Sidebar */}
      <div className="w-16 border-r border-white/10 flex flex-col items-center py-4 gap-6">
        <span className="text-2xl font-bold">𝕏</span>
        <button className="text-2xl hover:bg-white/10 p-2 rounded-full">🏠</button>
        <button className="text-2xl hover:bg-white/10 p-2 rounded-full">🔍</button>
        <button className="text-2xl hover:bg-white/10 p-2 rounded-full">🔔</button>
        <button className="text-2xl hover:bg-white/10 p-2 rounded-full">✉️</button>
        <button className="text-2xl hover:bg-white/10 p-2 rounded-full">👤</button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10">
          <h1 className="px-4 py-3 text-xl font-bold">Home</h1>
          <div className="flex">
            {(['for-you', 'following'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-medium transition-colors relative
                  ${tab === t ? 'text-white' : 'text-gray-500 hover:text-white/80'}
                `}
              >
                {t === 'for-you' ? 'For you' : 'Following'}
                {tab === t && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Compose */}
        <div className="border-b border-white/10 p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
              Z
            </div>
            <div className="flex-1">
              <textarea
                value={newTweet}
                onChange={e => setNewTweet(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-transparent text-lg resize-none focus:outline-none placeholder:text-gray-600"
                rows={2}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2 text-blue-500">
                  <button className="hover:bg-blue-500/20 p-2 rounded-full">🖼️</button>
                  <button className="hover:bg-blue-500/20 p-2 rounded-full">📊</button>
                  <button className="hover:bg-blue-500/20 p-2 rounded-full">😊</button>
                </div>
                <button
                  disabled={!newTweet.trim()}
                  className="px-4 py-1.5 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/50 disabled:text-white/50 rounded-full font-bold text-sm transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-auto">
          {tweets.map(tweet => (
            <div key={tweet.id} className="border-b border-white/10 p-4 hover:bg-white/5 transition-colors">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl shrink-0">
                  {tweet.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold truncate">{tweet.author}</span>
                    {tweet.verified && <span className="text-blue-500">✓</span>}
                    <span className="text-gray-500">@{tweet.handle}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500">{tweet.time}</span>
                  </div>
                  <p className="mt-1 whitespace-pre-line">{tweet.content}</p>
                  <div className="flex justify-between mt-3 max-w-md text-gray-500">
                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                      💬 <span className="text-sm">{formatCount(tweet.replies)}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                      🔄 <span className="text-sm">{formatCount(tweet.retweets)}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                      ❤️ <span className="text-sm">{formatCount(tweet.likes)}</span>
                    </button>
                    <button className="hover:text-blue-500 transition-colors">📤</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Twitter;
