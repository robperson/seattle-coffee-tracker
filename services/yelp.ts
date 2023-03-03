type Coordinates = {
    latitude: number
    longitude: number
}

type Shop = {
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

export default async function fetchCoffeeShops(): Promise<Shop[]> {
    const uri: string = 'https://api.yelp.com/v3/businesses/search?location=Seattle&term=coffee&radius=40000&sort_by=best_match&limit=0';
    const auth: string = `Bearer ${process.env.YELP_API_KEY}`;

    const resp = await fetch(uri, {
        headers: {
            'Authorization': auth,
        },
    });

    const respJSON = await resp.json();
    const shops: Shop[] = [];
    // TODO: find a better way to transform the json response into a strongly type object. 
    // Underscores in field names make unmarshalling directly into a TS object harder.
    respJSON['businesses'].forEach((business: any) => {
        const shop: Shop = {
            id: business['id'],
            name: business['name'],
            imageURL: business['image_url'],
            URL: business['url'],
            reviewCount: business['review_count'],
            rating: business['rating'],
            coordinates: {
                latitude: business['coordinates']['latitude'],
                longitude: business['coordinates']['longitude'],
            },
            displayAddress: business['location']['display_address'],
            phone: business['phone']
        }

        shops.push(shop);
    });
    return shops;
}