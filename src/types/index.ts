export interface Request extends Express.Request {
  // 自定义请求属性可以在这里添加
}

export interface Response extends Express.Response {
  // 自定义响应属性可以在这里添加
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    destination: string;
    country: string;
    imageUrl?: string;
    tags: string[];
    publishedAt: Date;
    featured: boolean;
}

export interface Destination {
    id: string;
    name: string;
    country: string;
    description: string;
    imageUrl?: string;
    postCount: number;
}

export interface Comment {
    id: string;
    postId: string;
    author: string;
    content: string;
    createdAt: Date;
}