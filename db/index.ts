import { Collection, Document, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import type { Shop } from '@/services/yelp';

const shopsCollectionName = 'shops';
const ratingsCollectionName = 'ratings';

type Collections = {
    shops: Collection<Shop>
    ratings: Collection<Document>
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
    const ratingsCollection = db.collection(ratingsCollectionName);

    shopsCollection.createIndex({
        'coordinates': '2dsphere'
    })

    collections = { shops: shopsCollection, ratings: ratingsCollection };

    // TODO: find some way to gracefully shutdown the mongodb server
}

export async function insertShops(shops: Shop[]) {
    await initdb();
    await collections?.shops.deleteMany({});
    
    await collections?.shops.insertMany(shops);
    // TODO: handle error conditions on insert
}

export async function getAllShops(): Promise<Shop[]> {
    await initdb();
    const cursor = await collections?.shops.find({});

    const shops = [] as Shop[];
    while (await cursor?.hasNext()) {
        const next = await cursor?.next();
        if (next) {
            shops.push(next);
        }
    }
    return shops;
}
