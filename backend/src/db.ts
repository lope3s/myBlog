import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { join } from 'path';

config({path: join(__dirname, '../.env')})

const dbUri = String(process.env.MONGO_URI)

export const client = new MongoClient(dbUri)

export const main = async () => {
    try {
        await client.connect()
        .then(_res => console.log("\nDb connected"))
        .catch(err => {
            console.log(err)
            console.log('\n\nFailed to connect to db.\n\n')
        })
        return
    } catch (err) {
        console.log(err)
        return
    }
}