import React, { useState } from 'react';
import './InstagramUI.css';

// Types
interface Post {
  id: string;
  username: string;
  userAvatar: string;
  location: string;
  imageUrl: string;
  likes: string;
  caption: string;
  timeAgo: string;
  comments: Comment[];
  totalComments: number;
}

interface Comment {
  username: string;
  text: string;
}

// Sample Data
const MEMBER_PHOTOS = [
  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
  'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=400',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',
  'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=400',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400',
];

const POST_DATA: Post = {
  id: '1',
  username: 'frenchie_fry39',
  userAvatar: 'https://ui-avatars.com/api/?name=FF&background=e91e63&color=fff',
  location: 'via frenchie_fry39',
  imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
  likes: 'paisley.nntt.48 and 7 others',
  caption: 'Fresh shot on a sunny day! ☀️',
  timeAgo: 'July 31',
  comments: [
    { username: 'lil.syatt838', text: 'Awesome tones' },
    { username: 'pia.aia.94', text: 'Love it Gorg Love it ❤️' },
  ],
  totalComments: 2,
};

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

// Post Modal Component
interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, isOpen, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="post-modal">
        {/* Post Header */}
        <div className="post-header">
          <div className="post-user-info">
            <div className="user-avatar-ring">
              <img src={post.userAvatar} alt={post.username} className="user-avatar" />
            </div>
            <div className="user-details">
              <div className="post-username">{post.username}</div>
              <div className="post-location">{post.location}</div>
            </div>
          </div>
          <button className="header-btn">⋯</button>
        </div>

        {/* Post Image */}
        <div className="post-image-container">
          <img src={post.imageUrl} alt="Post" className="post-image" />
        </div>

        {/* Actions */}
        <div className="post-actions">
          <div className="post-actions-left">
            <button 
              className="action-btn" 
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
            <button className="action-btn">💬</button>
            <button className="action-btn">✈️</button>
          </div>
          <button 
            className="action-btn"
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? '🔖' : '⭐'}
          </button>
        </div>

        {/* Likes */}
        <div className="post-likes">
          <span className="likes-bold">Liked by </span>
          <span className="likes-bold">{post.likes}</span>
        </div>

        {/* Caption */}
        <div className="post-caption">
          <span className="caption-username">{post.username} </span>
          <span>{post.caption}</span>
        </div>

        {/* Comments */}
        <div className="post-comments">
          <div className="view-all-comments">View all {post.totalComments} comments</div>
          {post.comments.map((comment, idx) => (
            <div key={idx} className="comment-row">
              <span className="comment-username">{comment.username} </span>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>

        {/* Timestamp */}
        <div className="post-timestamp">{post.timeAgo.toUpperCase()}</div>
      </div>
    </Modal>
  );
};

// Main Instagram UI Component
const InstagramUI: React.FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsPostModalOpen(true);
  };

  return (
    <div className="phone-container">
      <div className="screen">
        {/* Header */}
        <div className="header">
          <button className="header-btn">←</button>
          <div className="header-center">
            <div className="header-title">Group Profile</div>
            <div className="header-subtitle">ootd_everyday</div>
          </div>
          <button className="header-btn">+</button>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          {/* Avatar and Stats */}
          <div className="avatar-stats-row">
            <div className="avatar">OO</div>
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-number">53</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">12</div>
                <div className="stat-label">Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1</div>
                <div className="stat-label">Admins</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bio-section">
            <div className="bio-username">OOTD Everyday</div>
            <div className="bio-text">Fit check 💅<br />You know we'll hype you up.</div>
          </div>

          {/* Member Button */}
          <button className="member-button">
            Member <span>▼</span>
          </button>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Photo Grid */}
        <div className="photo-grid">
          {MEMBER_PHOTOS.map((photo, index) => (
            <div
              key={index}
              className="grid-item"
              onClick={() => handlePhotoClick(index)}
            >
              <img src={photo} alt={`Photo ${index + 1}`} className="grid-image" />
            </div>
          ))}
        </div>

        {/* Bottom Tab Bar */}
        <div className="bottom-tab-bar">
          <button className="tab-btn active">🏠</button>
          <button className="tab-btn">🔍</button>
          <button className="tab-btn">➕</button>
          <button className="tab-btn">💬</button>
          <button className="tab-btn">👤</button>
        </div>
      </div>

      {/* Post Modal */}
      <PostModal
        post={POST_DATA}
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
};

export default InstagramUI;
