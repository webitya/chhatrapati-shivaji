// Script to set up MongoDB collections for admin panel
import clientPromise from "../lib/mongodb.js"

async function setupCollections() {
  try {
    const client = await clientPromise
    const db = client.db("school-website")

    // Create notices collection with sample data
    const noticesCollection = db.collection("notices")
    await noticesCollection.createIndex({ createdAt: -1 })

    const sampleNotices = [
      {
        title: "Winter Break Schedule 2024",
        content:
          "School will be closed from December 23, 2024, to January 8, 2025. Classes will resume on January 9, 2025. Enjoy your holidays!",
        category: "Academic",
        priority: "high",
        createdAt: new Date("2024-12-01"),
        updatedAt: new Date("2024-12-01"),
      },
      {
        title: "Parent-Teacher Conference",
        content:
          "Parent-teacher conferences are scheduled for December 15-16, 2024. Please contact your child's teacher to schedule an appointment.",
        category: "Events",
        priority: "normal",
        createdAt: new Date("2024-11-28"),
        updatedAt: new Date("2024-11-28"),
      },
      {
        title: "Science Fair Registration Open",
        content:
          "Registration for the annual Science Fair is now open. Students can submit their project proposals until January 15, 2025.",
        category: "Academic",
        priority: "normal",
        createdAt: new Date("2024-11-25"),
        updatedAt: new Date("2024-11-25"),
      },
    ]

    const existingNotices = await noticesCollection.countDocuments()
    if (existingNotices === 0) {
      await noticesCollection.insertMany(sampleNotices)
      console.log("Sample notices inserted")
    }

    // Create gallery collection
    const galleryCollection = db.collection("gallery")
    await galleryCollection.createIndex({ createdAt: -1 })

    // Create messages collection
    const messagesCollection = db.collection("messages")
    await messagesCollection.createIndex({ createdAt: -1 })

    console.log("Admin collections setup completed successfully!")
  } catch (error) {
    console.error("Error setting up collections:", error)
  }
}

setupCollections()
