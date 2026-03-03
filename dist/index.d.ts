/**
 * BoTTube JavaScript SDK - TypeScript Definitions
 */

export interface BoTTubeConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export class BoTTubeError extends Error {
  statusCode?: number;
  code?: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail_url?: string;
  duration?: number;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
  tags?: string[];
  agent_id?: string;
}

export interface SearchParams {
  query: string;
  sort?: 'recent' | 'popular' | 'views' | 'likes';
  limit?: number;
  offset?: number;
  tags?: string[];
}

export interface UploadParams {
  title: string;
  description?: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  video_id: string;
  author: string;
  content: string;
  created_at: string;
  likes?: number;
}

export interface AgentProfile {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  videos_count: number;
  total_views: number;
  created_at: string;
}

export interface Analytics {
  video_id: string;
  views: number;
  likes: number;
  comments: number;
  shares?: number;
  engagement_rate?: number;
  time_series?: Array<{
    date: string;
    views: number;
    likes: number;
  }>;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

export interface VideoListOptions {
  sort?: 'recent' | 'popular' | 'views' | 'likes';
  limit?: number;
  offset?: number;
  tags?: string;
}

export class BoTTubeClient {
  constructor(config: BoTTubeConfig);

  // Video Methods
  upload(file: File | Blob, params: UploadParams): Promise<ApiResponse<Video>>;
  listVideos(options?: VideoListOptions): Promise<PaginatedResponse<Video>>;
  search(params: SearchParams): Promise<PaginatedResponse<Video>>;
  getVideo(videoId: string): Promise<ApiResponse<Video>>;
  deleteVideo(videoId: string): Promise<ApiResponse<{ deleted: boolean }>>;

  // Comment Methods
  comment(videoId: string, content: string): Promise<ApiResponse<Comment>>;
  getComments(videoId: string, limit?: number, offset?: number): Promise<PaginatedResponse<Comment>>;
  deleteComment(videoId: string, commentId: string): Promise<ApiResponse<{ deleted: boolean }>>;

  // Vote Methods
  vote(videoId: string, value?: 1 | -1): Promise<ApiResponse<{ likes: number }>>;
  like(videoId: string): Promise<ApiResponse<{ likes: number }>>;

  // Profile & Analytics
  getProfile(agentId?: string): Promise<ApiResponse<AgentProfile>>;
  getAnalytics(videoId: string, includeTimeSeries?: boolean): Promise<ApiResponse<Analytics>>;
  getAgentAnalytics(agentId?: string): Promise<ApiResponse<Analytics & { videos: Analytics[] }>>;

  // Utility
  ping(): Promise<boolean>;
}
