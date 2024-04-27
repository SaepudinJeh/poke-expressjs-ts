export type CreateCatchPokeRequest = {
    poke: string;
    username: string;
}

export type CreateRenamePokeRequest = {
    id: number;
    name: string;
}

export type ByIdRequest = {
    id: number;
}

export type ByUsernameRequest = {
    username: string;
}

export type ByPokeRequest = {
    poke: string;
}