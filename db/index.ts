import { Shop } from '@/models/shops';
import { Rating } from '@/models/ratings';
import { Collection, Document, FindCursor, MongoClient, WithId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const shopsCollectionName = 'shops';
const ratingsCollectionName = 'ratings';

type Collections = {
    shops: Collection<Shop>
    ratings: Collection<Rating>
}

let collections: Collections | undefined;

async function initdb() {
    if (collections) {
        // return if the collections container is already initialized
        return;
    }
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    const mongod = await MongoMemoryServer.create();

    // connect client to server
    const uri = mongod.getUri();
    const mongoClient = await MongoClient.connect(uri, {});
    const db = mongoClient.db(process.env.DB_NAME)

    // setup collections and indexes
    const shopsCollection = db.collection<Shop>(shopsCollectionName);
    const ratingsCollection = db.collection<Rating>(ratingsCollectionName);

    shopsCollection.createIndex({
        'coordinates': '2dsphere'
    });

    ratingsCollection.createIndex({'shopID': 1});

    collections = { shops: shopsCollection, ratings: ratingsCollection };

    // TODO: find some way to gracefully shutdown the mongodb server
}

export async function insertShops(shops: Shop[]) {
    await initdb();
    await collections?.shops.deleteMany({});
    
    await collections?.shops.insertMany(shops);
    // TODO: handle error conditions on insert
}

export async function getAllShops(lat?: number, lng?: number, radius?: number, limit?: number): Promise<Shop[]> {
    await initdb();
    let cursor: FindCursor<WithId<Shop>> | undefined;
    if (lat && lng && radius) {
        cursor = await collections?.shops.find({
            coordinates: {
                '$near': {
                    '$geometry': {
                        'type': "Point" ,
                        'coordinates': [ lng , lat ]
                     },
                     '$maxDistance': radius,
                     '$minDistance': 5,
                },
            }
        })
    } else {
        cursor = await collections?.shops.find({});
    }
    
    if (limit) {
        cursor?.limit(limit);
    }
    const shops = [] as Shop[];
    while (await cursor?.hasNext()) {
        const next = await cursor?.next();
        if (next) {
            shops.push(next);
        }
    }
    return shops;
}

export async function insertRating(rating: Rating) {
    await initdb();    
    await collections?.ratings.insertOne(rating);
    // TODO: handle error conditions on insert
}

export async function getRatingsForShop(shopID: string): Promise<Rating[]> {
    await initdb();
    const cursor = await collections?.ratings.find({
        shopID: {'$eq': shopID},
    });

    const ratings = [] as Rating[];
    while (await cursor?.hasNext()) {
        const next = await cursor?.next();
        if (next) {
            ratings.push(next);
        }
    }
    return ratings;
}
