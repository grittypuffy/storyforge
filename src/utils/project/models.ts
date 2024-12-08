export interface Project {
    name: string,
    genre?: string,
    category: "Novel" | "Children's Book",
    deadline?: string,
    created_at: string,
    recently_updated: string,
    synopsis?: string,
    outline?: string,
    characters?: Character[]
}

export interface Character {
    name?: string,
    personality?: string,
    background?: string,
    gender?: "M" | "F" | "O",
    age?: number,
    role?: string
}