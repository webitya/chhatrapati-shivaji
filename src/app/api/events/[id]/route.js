import dbConnect from "@/lib/db";
import Event from "@/models/Event";

// UPDATE an event
export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const updated = await Event.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

// DELETE an event
export async function DELETE(req, { params }) {
  await dbConnect();
  await Event.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
