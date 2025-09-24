// This should match the storage from receive-data.js
let deviceData = [];
let smsData = [];

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
    // Return actual stored data with stats
    const stats = {
      total_devices: deviceData.length,
      today_installs: deviceData.filter(d => {
        const today = new Date().toDateString();
        const deviceDate = new Date(d.created_at).toDateString();
        return today === deviceDate;
      }).length,
      total_sms: smsData.length,
      active_now: deviceData.filter(d => d.status === 'active').length
    };
    
    const response = {
      stats: stats,
      devices: deviceData.slice(0, 20), // Last 20 devices
      recent_sms: smsData.slice(-50) // Last 50 SMS messages
    };
    
    res.status(200).json(response);
    
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      message: error.message 
    });
  }
}
