export interface ProjectDetails {
    id: string,
    name: string,
    genre?: string,
    category: "Novel" | "Children's Book",
    deadline?: string,
    created_at: string,
    recently_updated: string,
    synopsis?: string
}

export interface ProjectExtras {
    outline?: string,
    characters?: Character[],
    images?: string[]
}

export interface Character {
    name?: string,
    personality?: string,
    background?: string,
    gender?: "M" | "F" | "O",
    age?: number,
    role?: string,
    image?: string
}

export interface ProjectModel {
    id: string,
    profile_id: string,
    name: string,
    genre?: string,
    category: "Novel" | "Children's Book",
    deadline?: string,
    created_at: string,
    recently_updated: string,
    synopsis?: string
}