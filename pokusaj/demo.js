const { MongoClient, ServerApiVersion } = require('mongodb');

async function main(){
    const uri = "mongodb+srv://aljosa:aljosa@cluster0.yckse6h.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try{
        await client.connect();
        await createUser(client,{
            name: req.body.username,
            password: "tvojamama",
            pol: "M"
        })
    }catch(e){
        console.error(e);
    }finally{
        await client.close();   
    }

}


async function createUser(client, newUser){
    const result = await client.db("login").collection("user").insertOne(newUser);
    
    console.log(`New user id: ${result.insertedId}`);
}

main().catch(console.error);


async function listDatabases(client){
   const databaseslist = await client.db().admin().listDatabases();

   console.log("Databases:");
   databaseslist.databases.forEach(db => {
        console.log(`- ${db.name}`);
   });
}