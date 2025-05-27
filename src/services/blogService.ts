import { BlogPost, Destination } from '../types';

export class BlogService {
    private static posts: BlogPost[] = [
        {
            id: '1',
            title: '在京都探索古老的寺庙',
            content: '京都是日本的古都，拥有超过2000座寺庙和神社。漫步在清水寺的木制走廊上，俯瞰整个城市的美景，是一次难忘的体验。',
            destination: '京都',
            country: '日本',
            imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
            tags: ['文化', '历史', '寺庙'],
            publishedAt: new Date('2024-01-15'),
            featured: true
        },
        {
            id: '2',
            title: '巴黎的浪漫日落',
            content: '在埃菲尔铁塔下观看日落是巴黎最浪漫的体验之一。金色的阳光洒在塞纳河上，整个城市都沐浴在温暖的光芒中。',
            destination: '巴黎',
            country: '法国',
            imageUrl: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
            tags: ['浪漫', '城市', '日落'],
            publishedAt: new Date('2024-02-10'),
            featured: false
        },
        {
            id: '3',
            title: '马尔代夫的天堂海滩',
            content: '马尔代夫的白沙滩和清澈的海水让人仿佛置身天堂。在水上别墅中醒来，直接跳入温暖的印度洋，是最奢华的度假体验。',
            destination: '马累',
            country: '马尔代夫',
            imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
            tags: ['海滩', '度假', '奢华'],
            publishedAt: new Date('2024-03-05'),
            featured: true
        }
    ];

    private static destinations: Destination[] = [
        {
            id: '1',
            name: '京都',
            country: '日本',
            description: '日本的古都，拥有丰富的文化遗产和美丽的寺庙',
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
            postCount: 1
        },
        {
            id: '2',
            name: '巴黎',
            country: '法国',
            description: '浪漫之都，艺术和美食的天堂',
            imageUrl: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
            postCount: 1
        },
        {
            id: '3',
            name: '马累',
            country: '马尔代夫',
            description: '热带天堂，拥有世界上最美丽的海滩',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            postCount: 1
        }
    ];

    public static getAllPosts(): BlogPost[] {
        return this.posts.sort((a, b) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }

    public static getFeaturedPosts(): BlogPost[] {
        return this.posts.filter(post => post.featured);
    }

    public static getPostById(id: string): BlogPost | undefined {
        return this.posts.find(post => post.id === id);
    }

    public static getPostsByDestination(destination: string): BlogPost[] {
        return this.posts.filter(post => 
            post.destination.toLowerCase().includes(destination.toLowerCase())
        );
    }

    public static getAllDestinations(): Destination[] {
        return this.destinations;
    }

    public static getDestinationById(id: string): Destination | undefined {
        return this.destinations.find(dest => dest.id === id);
    }

    public static searchPosts(query: string): BlogPost[] {
        const lowerQuery = query.toLowerCase();
        return this.posts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.content.toLowerCase().includes(lowerQuery) ||
            post.destination.toLowerCase().includes(lowerQuery) ||
            post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }
}
