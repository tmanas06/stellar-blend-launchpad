
// IPFS storage utility using Pinata
// Load environment variables
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY || '';
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY || '';
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT || '';

const PINATA_BASE_URL = 'https://api.pinata.cloud';

// Validate required environment variables
if (!PINATA_JWT && (!PINATA_API_KEY || !PINATA_SECRET_KEY)) {
  console.warn('⚠️ Missing Pinata API credentials. Please set VITE_PINATA_JWT or both VITE_PINATA_API_KEY and VITE_PINATA_SECRET_KEY in your .env file');
}

export interface IPFSUploadResult {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export interface ProjectData {
  id?: number;
  name: string;
  description: string;
  category: string;
  targetAmount: number;
  apy: number;
  riskLevel: string;
  duration: number;
  minInvestment: number;
  teamSize: number;
  createdBy?: string;
  createdAt?: string;
}

// Upload JSON data to IPFS
export const uploadToIPFS = async (data: any, name?: string): Promise<IPFSUploadResult> => {
  try {
    const formData = new FormData();
    
    // Convert data to JSON blob
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    formData.append('file', jsonBlob);
    
    if (name) {
      formData.append('pinataMetadata', JSON.stringify({
        name: name,
        keyvalues: {
          type: 'project-data',
          timestamp: new Date().toISOString()
        }
      }));
    }

    // Use JWT if available, otherwise use API key/secret
    const headers: HeadersInit = {};
    
    if (PINATA_JWT) {
      headers['Authorization'] = `Bearer ${PINATA_JWT}`;
    } else if (PINATA_API_KEY && PINATA_SECRET_KEY) {
      headers['pinata_api_key'] = PINATA_API_KEY;
      headers['pinata_secret_api_key'] = PINATA_SECRET_KEY;
    } else {
      throw new Error('No valid Pinata authentication method found. Please check your environment variables.');
    }

    const response = await fetch(`${PINATA_BASE_URL}/pinning/pinFileToIPFS`, {
      method: 'POST',
      headers: headers,
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Data uploaded to IPFS:', result);
    
    return result;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

// Retrieve data from IPFS
export const getFromIPFS = async (hash: string): Promise<any> => {
  try {
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Data retrieved from IPFS:', data);
    
    return data;
  } catch (error) {
    console.error('Error retrieving from IPFS:', error);
    throw error;
  }
};

// Store project data to IPFS
export const storeProjectData = async (projectData: ProjectData): Promise<string> => {
  const result = await uploadToIPFS(projectData, `project-${projectData.name}`);
  return result.IpfsHash;
};

// Get project data from IPFS
export const getProjectData = async (hash: string): Promise<ProjectData> => {
  return await getFromIPFS(hash);
};

// List pinned files (optional utility)
export const listPinnedFiles = async (): Promise<any> => {
  try {
    const response = await fetch(`${PINATA_BASE_URL}/data/pinList?status=pinned`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to list files: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Pinned files:', result);
    
    return result;
  } catch (error) {
    console.error('Error listing pinned files:', error);
    throw error;
  }
};
