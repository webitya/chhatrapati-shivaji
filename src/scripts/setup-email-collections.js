// Script to set up email-related collections
import clientPromise from "../lib/mongodb.js"

async function setupEmailCollections() {
  try {
    const client = await clientPromise
    const db = client.db("school-website")

    // Create messages collection with indexes
    const messagesCollection = db.collection("messages")
    await messagesCollection.createIndex({ createdAt: -1 })
    await messagesCollection.createIndex({ status: 1 })
    await messagesCollection.createIndex({ email: 1 })

    console.log("Email collections setup completed successfully!")
    console.log("Messages collection created with proper indexes")
  } catch (error) {
    console.error("Error setting up email collections:", error)
  }
}

setupEmailCollections()
