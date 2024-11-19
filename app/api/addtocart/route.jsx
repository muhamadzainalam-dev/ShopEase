import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const MONGODB_URI =
  "mongodb+srv://Digital_Monster:Zain-03120014927@karedoorpehnowebsitedat.qpyve.mongodb.net/?retryWrites=true&w=majority&appName=KaredoOrPehnoWebsiteData";
const MONGODB_DB = "User-Data";
const COLLECTION_NAME = "User-Product";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function POST(request) {
  try {
    const { sku, name, salePrice, image } = await request.json();

    const { db } = await connectToDatabase();

    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { sku },
        { $setOnInsert: { sku, name, salePrice, image } },
        { upsert: true }
      );

    const message = result.upsertedCount
      ? "Product added to cart successfully"
      : "Product already in cart";

    return new Response(
      JSON.stringify({
        message,
        sku: result.sku || sku,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("MongoDB Insert Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to add to cart",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get("sku");

    let products;

    if (sku) {
      products = await db.collection(COLLECTION_NAME).findOne({ sku });
      if (!products) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      products = await db.collection(COLLECTION_NAME).find().toArray();
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MongoDB Fetch Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch products",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request) {
  try {
    const { sku } = await request.json();

    const { db } = await connectToDatabase();
    const result = await db.collection(COLLECTION_NAME).deleteOne({ sku });

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: "Product deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("MongoDB Delete Error:", error);
    return NextResponse.json(
      { error: "Failed to delete product", details: error.message },
      { status: 500 }
    );
  }
}
