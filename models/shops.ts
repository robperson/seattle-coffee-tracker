export type Coordinates = {
    longitude: number
    latitude: number
}

export type Shop = {
    id: string
    name: string
    imageURL: string
    URL: string
    reviewCount: number
    rating: number
    coordinates: Coordinates
    displayAddress: string[]
    phone: string
}