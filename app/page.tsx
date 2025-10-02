'use client';

import { useState, useCallback } from 'react';
import { mockData, Post, ReplyOption, ThreadVariant } from '../data/mockData';

interface LogEntry {
  type: 'like' | 'open_reply' | 'post_reply';
  threadId: string;
  itemId?: string;
  parentId?: string;
  optionId?: string;
  tau?: number;
  epsilon?: number;
  opinion?: number;
  visibleIds?: string[];
  ts: number;
}

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onReply: () => void;
  isOP?: boolean;
  isLiked?: boolean;
}

function PostCard({ post, onLike, onReply, isOP = false, isLiked = false }: PostCardProps) {
  const getToneLabel = (tau: number) => {
    if (tau > 0.3) return '(harsh)';
    if (tau > 0.1) return '(assertive)';
    if (tau > -0.1) return '(neutral)';
    if (tau > -0.3) return '(polite)';
    return '(very polite)';
  };

  const getEngagementLabel = (epsilon: number) => {
    if (epsilon > 0.7) return '(high effort)';
    if (epsilon > 0.5) return '(medium effort)';
    if (epsilon > 0.3) return '(low effort)';
    return '(minimal effort)';
  };

  const getOpinionLabel = (opinion: number) => {
    if (opinion > 0.7) return '(strongly supporting)';
    if (opinion > 0.3) return '(supporting)';
    if (opinion > 0.1) return '(mildly supporting)';
    if (opinion > -0.1) return '(neutral)';
    if (opinion > -0.3) return '(mildly opposing)';
    if (opinion > -0.7) return '(opposing)';
    return '(strongly opposing)';
  };

  if (isOP) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            OP
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-gray-900">Original Post</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">Thread starter</span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                Tone: {post.tau.toFixed(2)} {getToneLabel(post.tau)}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                Engagement: {post.epsilon.toFixed(2)} {getEngagementLabel(post.epsilon)}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                Opinion: {post.opinion.toFixed(2)} {getOpinionLabel(post.opinion)}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-900 text-lg mb-4 leading-relaxed">{post.text}</p>

        <div className="flex items-center gap-6 text-gray-500">
          <button
            onClick={onLike}
            className={`flex items-center gap-2 transition-colors group ${
              isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
            }`}
          >
            <span className="text-lg group-hover:scale-110 transition-transform">
              {isLiked ? '❤️' : '🤍'}
            </span>
            <span className={`text-sm font-medium ${isLiked ? 'text-red-600' : 'text-gray-500'}`}>{post.likes}</span>
          </button>
          <button
            onClick={onReply}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <span className="text-lg">💬</span>
            <span className="text-sm font-medium">Reply</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-l-2 border-gray-100 pl-4 py-3 hover:bg-gray-50 transition-colors">
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
          R
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-900 text-sm">Reply</span>
            <span className="text-gray-400 text-xs">•</span>
            <div className="flex gap-1">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Tone: {post.tau.toFixed(2)} {getToneLabel(post.tau)}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Engagement: {post.epsilon.toFixed(2)} {getEngagementLabel(post.epsilon)}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Opinion: {post.opinion.toFixed(2)} {getOpinionLabel(post.opinion)}
              </span>
            </div>
          </div>

          <p className="text-gray-800 text-sm mb-3 leading-relaxed">{post.text}</p>

          <div className="flex items-center gap-4 text-gray-500">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 transition-colors text-xs group ${
                isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
              }`}
            >
              <span className="group-hover:scale-110 transition-transform">
                {isLiked ? '❤️' : '🤍'}
              </span>
              <span className={isLiked ? 'text-red-600' : 'text-gray-500'}>{post.likes}</span>
            </button>
            <button
              onClick={onReply}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors text-xs"
            >
              <span>💬</span>
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReplyChooserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: ReplyOption) => void;
  options: ReplyOption[];
}

function ReplyChooser({ isOpen, onClose, onSelect, options }: ReplyChooserProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Choose your reply:</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-blue-600">{option.label}</span>
              </div>
              <p className="text-gray-700 text-sm mb-3">{option.text}</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                  Tone: {option.tau.toFixed(2)} {(() => {
                    const tau = option.tau;
                    if (tau > 0.3) return '(harsh)';
                    if (tau > 0.1) return '(assertive)';
                    if (tau > -0.1) return '(neutral)';
                    if (tau > -0.3) return '(polite)';
                    return '(very polite)';
                  })()}
                </span>
                <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                  Engagement: {option.epsilon.toFixed(2)} {(() => {
                    const epsilon = option.epsilon;
                    if (epsilon > 0.7) return '(high effort)';
                    if (epsilon > 0.5) return '(medium effort)';
                    if (epsilon > 0.3) return '(low effort)';
                    return '(minimal effort)';
                  })()}
                </span>
                <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                  Opinion: {option.opinion.toFixed(2)} {(() => {
                    const opinion = option.opinion;
                    if (opinion > 0.7) return '(strongly supporting)';
                    if (opinion > 0.3) return '(supporting)';
                    if (opinion > 0.1) return '(mildly supporting)';
                    if (opinion > -0.1) return '(neutral)';
                    if (opinion > -0.3) return '(mildly opposing)';
                    if (opinion > -0.7) return '(opposing)';
                    return '(strongly opposing)';
                  })()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ThreadViewProps {
  threadData: ThreadVariant | { threadId: string; topic: string; variant?: string; description?: string; op: Post; seeded: Post[] };
  posts: Post[];
  userReplies: number;
  visibilityState: { showMore: boolean; showReplies: Record<string, boolean> };
  likedPosts: Set<string>;
  onLike: (postId: string) => void;
  onOpenReply: (parentId: string, variant?: 'A' | 'B') => void;
  onToggleShowMore: () => void;
  onToggleShowReplies: (postId: string) => void;
  isComparison?: boolean;
  side?: 'A' | 'B';
}

function ThreadView({
  threadData,
  posts,
  userReplies,
  visibilityState,
  likedPosts,
  onLike,
  onOpenReply,
  onToggleShowMore,
  onToggleShowReplies,
  isComparison = false,
  side
}: ThreadViewProps) {
  const topLevelPosts = posts.filter(post => post.depth <= 1);
  const sortedTopLevel = topLevelPosts.sort((a, b) => {
    if (a.depth === 0) return -1;
    if (b.depth === 0) return 1;
    // Sort by epsilon (engagement) and then by ID for stable order
    return b.epsilon - a.epsilon || a.id.localeCompare(b.id);
  });

  const visibleTopLevel = visibilityState.showMore ? sortedTopLevel : sortedTopLevel.slice(0, 7);
  const hiddenCount = sortedTopLevel.length - visibleTopLevel.length;

  const avgTau = posts.reduce((sum, post) => sum + post.tau, 0) / posts.length;
  const avgEpsilon = posts.reduce((sum, post) => sum + post.epsilon, 0) / posts.length;

  return (
    <div className={`${isComparison ? 'flex-1' : 'max-w-2xl mx-auto'}`}>
      {isComparison && (
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-700">
              Participant {side} View
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {threadData.description || `Standard view`}
            </p>
            <p className="text-xs text-gray-500">
              Avg Tone: {avgTau.toFixed(2)} | Avg Engagement: {avgEpsilon.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {visibleTopLevel.map((post) => (
          <div key={post.id} className="p-4">
            <PostCard
              post={post}
              onLike={() => onLike(post.id)}
              onReply={() => onOpenReply(post.id, side)}
              isOP={post.depth === 0}
              isLiked={likedPosts.has(post.id)}
            />

            {post.depth === 1 && (
              <div className="ml-8 mt-3">
                {(() => {
                  const children = posts.filter(p => p.parentId === post.id);
                  const visibleChildren = visibilityState.showReplies[post.id] ? children.slice(0, 3) : [];
                  const hiddenChildrenCount = children.length - visibleChildren.length;

                  return (
                    <>
                      {children.length > 0 && (
                        <button
                          onClick={() => onToggleShowReplies(post.id)}
                          className="text-sm text-blue-500 hover:text-blue-600 mb-3 font-medium"
                        >
                          {visibilityState.showReplies[post.id]
                            ? `Hide replies${hiddenChildrenCount > 0 ? ` (${hiddenChildrenCount} more)` : ''}`
                            : `Show replies (${children.length})`
                          }
                        </button>
                      )}

                      {visibleChildren.map((child) => (
                        <div key={child.id} className="mb-3 border-l-2 border-gray-50 pl-4">
                          <PostCard
                            post={child}
                            onLike={() => onLike(child.id)}
                            onReply={() => onOpenReply(child.id, side)}
                            isLiked={likedPosts.has(child.id)}
                          />
                        </div>
                      ))}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        ))}

        {hiddenCount > 0 && (
          <div className="p-4">
            <button
              onClick={onToggleShowMore}
              className="w-full py-3 text-blue-500 hover:text-blue-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors font-medium"
            >
              Show {hiddenCount} more replies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ToneEngagementExperiment() {
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [posts, setPosts] = useState<Record<string, Post[]>>(() => {
    const initial: Record<string, Post[]> = {};
    mockData.threads.forEach(thread => {
      initial[thread.threadId] = [thread.op, ...thread.seeded];
    });
    return initial;
  });
  const [variantPosts, setVariantPosts] = useState<Record<string, Record<'A' | 'B', Post[]>>>(() => {
    const initial: Record<string, Record<'A' | 'B', Post[]>> = {};
    mockData.threadVariants.forEach(variant => {
      if (!initial[variant.threadId]) {
        initial[variant.threadId] = { A: [], B: [] };
      }
      initial[variant.threadId][variant.variant] = [variant.op, ...variant.seeded];
    });
    return initial;
  });
  const [userReplies, setUserReplies] = useState<Record<string, number>>({});
  const [replyChooser, setReplyChooser] = useState<{
    isOpen: boolean;
    parentId: string | null;
    variant?: 'A' | 'B';
  }>({ isOpen: false, parentId: null });
  const [visibilityState, setVisibilityState] = useState<Record<string, { showMore: boolean; showReplies: Record<string, boolean> }>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const currentThread = mockData.threads[currentThreadIndex];
  const currentPosts = posts[currentThread.threadId] || [];
  const hasUserReplied = (userReplies[currentThread.threadId] || 0) > 0;

  // Get variant data for comparison mode
  const getVariantData = (threadId: string, variant: 'A' | 'B'): ThreadVariant => {
    return mockData.threadVariants.find(v => v.threadId === threadId && v.variant === variant)!;
  };

  const currentVariantPosts = variantPosts[currentThread.threadId] || { A: [], B: [] };

  const log = useCallback((entry: Omit<LogEntry, 'ts'>) => {
    const logEntry = { ...entry, ts: Date.now() };
    console.log('EXPERIMENT LOG:', logEntry);
  }, []);

  const getVisiblePostIds = useCallback(() => {
    const threadState = visibilityState[currentThread.threadId] || { showMore: false, showReplies: {} };
    const topLevelPosts = currentPosts.filter(post => post.depth <= 1);
    const sortedTopLevel = topLevelPosts.sort((a, b) => {
      if (a.depth === 0) return -1;
      if (b.depth === 0) return 1;
      // Sort by epsilon (engagement) and then by ID for stable order
      return b.epsilon - a.epsilon || a.id.localeCompare(b.id);
    });

    const visibleTopLevel = threadState.showMore ? sortedTopLevel : sortedTopLevel.slice(0, 7);
    const visibleIds = visibleTopLevel.map(post => post.id);

    visibleTopLevel.forEach(post => {
      if (post.depth === 1 && threadState.showReplies[post.id]) {
        const children = currentPosts.filter(p => p.parentId === post.id);
        visibleIds.push(...children.slice(0, 3).map(p => p.id));
      }
    });

    return visibleIds;
  }, [currentPosts, currentThread.threadId, visibilityState]);

  const handleLike = useCallback((postId: string) => {
    const isCurrentlyLiked = likedPosts.has(postId);

    setPosts(prev => ({
      ...prev,
      [currentThread.threadId]: prev[currentThread.threadId].map(post =>
        post.id === postId ? {
          ...post,
          likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1
        } : post
      )
    }));

    if (isComparisonMode) {
      setVariantPosts(prev => ({
        ...prev,
        [currentThread.threadId]: {
          A: prev[currentThread.threadId].A.map(post =>
            post.id === postId ? {
              ...post,
              likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1
            } : post
          ),
          B: prev[currentThread.threadId].B.map(post =>
            post.id === postId ? {
              ...post,
              likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1
            } : post
          )
        }
      }));
    }

    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyLiked) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });

    log({
      type: 'like',
      threadId: currentThread.threadId,
      itemId: postId,
      visibleIds: getVisiblePostIds()
    });
  }, [currentThread.threadId, log, getVisiblePostIds, likedPosts, isComparisonMode]);

  const handleOpenReply = useCallback((parentId: string, variant?: 'A' | 'B') => {
    setReplyChooser({ isOpen: true, parentId, variant });

    log({
      type: 'open_reply',
      threadId: currentThread.threadId,
      parentId,
      visibleIds: getVisiblePostIds()
    });
  }, [currentThread.threadId, log, getVisiblePostIds]);

  const getReplyOptions = useCallback(() => {
    if (!isComparisonMode) {
      // Use thread-specific reply options
      switch (currentThread.threadId) {
        case 't1': return mockData.replyOptionsT1;
        case 't2': return mockData.replyOptionsT2;
        case 't3': return mockData.replyOptionsT3;
        default: return mockData.replyOptions;
      }
    }

    // In comparison mode, use thread-specific options for the selected thread
    // but still distinguish between polite (A) and assertive (B) variants
    if (replyChooser.variant === 'A') {
      // For now, use thread-specific options for variant A
      switch (currentThread.threadId) {
        case 't1': return mockData.replyOptionsT1;
        case 't2': return mockData.replyOptionsT2;
        case 't3': return mockData.replyOptionsT3;
        default: return mockData.replyOptionsPolite;
      }
    } else if (replyChooser.variant === 'B') {
      // For now, use thread-specific options for variant B too
      switch (currentThread.threadId) {
        case 't1': return mockData.replyOptionsT1;
        case 't2': return mockData.replyOptionsT2;
        case 't3': return mockData.replyOptionsT3;
        default: return mockData.replyOptionsAssertive;
      }
    }

    return mockData.replyOptions; // Fallback
  }, [isComparisonMode, replyChooser.variant, currentThread.threadId]);

  const handleSelectReply = useCallback((option: ReplyOption) => {
    if (!replyChooser.parentId) return;

    const postsToUse = isComparisonMode ? currentVariantPosts.A : currentPosts;
    const parentPost = postsToUse.find(p => p.id === replyChooser.parentId);
    const newDepth = parentPost ? parentPost.depth + 1 : 1;

    const newPost: Post = {
      id: `${currentThread.threadId}-user-${Date.now()}`,
      parentId: replyChooser.parentId,
      text: option.text,
      tau: option.tau,
      epsilon: option.epsilon,
      opinion: option.opinion,
      likes: 0,
      depth: newDepth
    };

    if (isComparisonMode) {
      setVariantPosts(prev => ({
        ...prev,
        [currentThread.threadId]: {
          A: [...prev[currentThread.threadId].A, newPost],
          B: [...prev[currentThread.threadId].B, newPost]
        }
      }));
    } else {
      setPosts(prev => ({
        ...prev,
        [currentThread.threadId]: [...prev[currentThread.threadId], newPost]
      }));
    }

    setUserReplies(prev => ({
      ...prev,
      [currentThread.threadId]: (prev[currentThread.threadId] || 0) + 1
    }));

    log({
      type: 'post_reply',
      threadId: currentThread.threadId,
      parentId: replyChooser.parentId,
      optionId: option.id,
      tau: option.tau,
      epsilon: option.epsilon,
      opinion: option.opinion,
      visibleIds: getVisiblePostIds()
    });

    setReplyChooser({ isOpen: false, parentId: null });

    setTimeout(() => {
      if (currentThreadIndex < mockData.threads.length - 1) {
        setCurrentThreadIndex(prev => prev + 1);
      }
    }, 600);
  }, [replyChooser.parentId, currentPosts, currentVariantPosts, currentThread.threadId, currentThreadIndex, log, getVisiblePostIds, isComparisonMode]);

  const handleNextThread = useCallback(() => {
    if (hasUserReplied && currentThreadIndex < mockData.threads.length - 1) {
      setCurrentThreadIndex(prev => prev + 1);
    }
  }, [hasUserReplied, currentThreadIndex]);

  const toggleShowMore = useCallback(() => {
    setVisibilityState(prev => ({
      ...prev,
      [currentThread.threadId]: {
        ...prev[currentThread.threadId],
        showMore: !prev[currentThread.threadId]?.showMore
      }
    }));
  }, [currentThread.threadId]);

  const toggleShowReplies = useCallback((postId: string) => {
    setVisibilityState(prev => ({
      ...prev,
      [currentThread.threadId]: {
        ...prev[currentThread.threadId],
        showReplies: {
          ...prev[currentThread.threadId]?.showReplies,
          [postId]: !prev[currentThread.threadId]?.showReplies?.[postId]
        }
      }
    }));
  }, [currentThread.threadId]);

  const threadState = visibilityState[currentThread.threadId] || { showMore: false, showReplies: {} };

  return (
    <div className="min-h-screen bg-white">
      <div className={isComparisonMode ? 'max-w-6xl mx-auto' : 'max-w-2xl mx-auto'}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 mb-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Thread {currentThreadIndex + 1} of {mockData.threads.length}
                {isComparisonMode && ' - Comparison View'}
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-sm text-gray-600 capitalize">Topic: {currentThread.topic}</p>
                {!isComparisonMode && (
                  <p className="text-xs text-gray-500">
                    Avg Tone: {(currentPosts.reduce((sum, post) => sum + post.tau, 0) / currentPosts.length).toFixed(2)} |
                    Avg Engagement: {(currentPosts.reduce((sum, post) => sum + post.epsilon, 0) / currentPosts.length).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsComparisonMode(!isComparisonMode)}
                className="px-4 py-2 rounded-full font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {isComparisonMode ? 'Single View' : 'Compare Views'}
              </button>
              <button
                onClick={handleNextThread}
                disabled={!hasUserReplied || currentThreadIndex >= mockData.threads.length - 1}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  hasUserReplied && currentThreadIndex < mockData.threads.length - 1
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next Thread
              </button>
            </div>
          </div>
        </div>

        {isComparisonMode ? (
          <div className="flex divide-x divide-gray-200">
            <ThreadView
              threadData={getVariantData(currentThread.threadId, 'A')}
              posts={currentVariantPosts.A}
              userReplies={userReplies[currentThread.threadId] || 0}
              visibilityState={threadState}
              likedPosts={likedPosts}
              onLike={handleLike}
              onOpenReply={handleOpenReply}
              onToggleShowMore={toggleShowMore}
              onToggleShowReplies={toggleShowReplies}
              isComparison={true}
              side="A"
            />
            <ThreadView
              threadData={getVariantData(currentThread.threadId, 'B')}
              posts={currentVariantPosts.B}
              userReplies={userReplies[currentThread.threadId] || 0}
              visibilityState={threadState}
              likedPosts={likedPosts}
              onLike={handleLike}
              onOpenReply={handleOpenReply}
              onToggleShowMore={toggleShowMore}
              onToggleShowReplies={toggleShowReplies}
              isComparison={true}
              side="B"
            />
          </div>
        ) : (
          <ThreadView
            threadData={currentThread}
            posts={currentPosts}
            userReplies={userReplies[currentThread.threadId] || 0}
            visibilityState={threadState}
            likedPosts={likedPosts}
            onLike={handleLike}
            onOpenReply={handleOpenReply}
            onToggleShowMore={toggleShowMore}
            onToggleShowReplies={toggleShowReplies}
            isComparison={false}
          />
        )}

        <ReplyChooser
          isOpen={replyChooser.isOpen}
          onClose={() => setReplyChooser({ isOpen: false, parentId: null })}
          onSelect={handleSelectReply}
          options={getReplyOptions()}
        />
      </div>
    </div>
  );
}