// Script to set up gallery collections
import clientPromise from "../lib/mongodb.js"

async function setupGalleryCollections() {
  try {
    const client = await clientPromise
    const db = client.db("school-website")

    // Create gallery collection with indexes
    const galleryCollection = db.collection("gallery")
    await galleryCollection.createIndex({ createdAt: -1 })
    await galleryCollection.createIndex({ category: 1 })
    await galleryCollection.createIndex({ title: "text", description: "text" })

    // Insert sample gallery data
    const sampleImages = [
      {
        title: "Interactive Learning",
        description: "Students engaged in collaborative learning activities",
        category: "Academic",
        url: "/classroom-learning.png",
        publicId: "sample-classroom",
        createdAt: new Date("2024-11-01"),
      },
      {
        title: "Science Experiments",
        description: "Advanced science laboratory with modern equipment",
        category: "Facilities",
        url: "/school-science-lab.png",
        publicId: "sample-science-lab",
        createdAt: new Date("2024-11-02"),
      },
      {
        title: "Creative Arts",
        description: "Students expressing creativity in art class",
        category: "Arts",
        url: "/school-art-class-painting.png",
        publicId: "sample-art-class",
        createdAt: new Date("2024-11-03"),
      },
      {
        title: "Modern Library",
        description: "State-of-the-art library with digital resources",
        category: "Facilities",
        url: "/school-library-reading.png",
        publicId: "sample-library",
        createdAt: new Date("2024-11-04"),
      },
      {
        title: "Graduation Day",
        description: "Celebrating our graduates' achievements",
        category: "Events",
        url: "/school-graduation.png",
        publicId: "sample-graduation",
        createdAt: new Date("2024-11-05"),
      },
      {
        title: "Music Performance",
        description: "School band performing at the annual concert",
        category: "Arts",
        url: "/school-music-band.png",
        publicId: "sample-music-band",
        createdAt: new Date("2024-11-06"),
      },
    ]

    const existingImages = await galleryCollection.countDocuments()
    if (existingImages === 0) {
      await galleryCollection.insertMany(sampleImages)
      console.log("Sample gallery images inserted")
    }

    console.log("Gallery collections setup completed successfully!")
  } catch (error) {
    console.error("Error setting up gallery collections:", error)
  }
}

setupGalleryCollections()
