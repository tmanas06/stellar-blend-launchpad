
// IPFS storage utility using Pinata
const PINATA_API_KEY = '0bef2f837138d54e5e34';
const PINATA_SECRET_KEY = '31b0f6471d3f74d21678dbf703b93cb4ad574af4eb18b3e1f7f07bab8f35b75e';
const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2YzY1MjM1Yy00NmU4LTRmYmUtODkzNy00MGM4OTk4ZDVlNDgiLCJlbWFpbCI6IjIyMTAwMzAwMDNjc2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjBiZWYyZjgzNzEzOGQ1NGU1ZTM0Iiwic2NvcGVkS2V5U2VjcmV0IjoiMzFiMGY2NDcxZDNmNzRkMjE2NzhkYmY3MDNiOTNjYjRhZDU3NGFmNGViMThiM2UxZjdmMDdiYWI4ZjM1Yjc1ZSIsImV4cCI6MTc4MzI3MDU4M30.cNGTz1zZV7SBT8Y_7VRbqtEXNVGG0wdq-yXylJVdn18';

const PINATA_BASE_URL = 'https://api.pinata.cloud';

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

    const response = await fetch(`${PINATA_BASE_URL}/pinning/pinFileToIPFS`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`
      },
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
