export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    youtubeUrl?: string;
    sourceUrl?: string;
    liveUrl?: string;
    downloadUrl?: string;
    detailedDescription?: Array<{
        title: string;
        content: string;
    }>;
}
