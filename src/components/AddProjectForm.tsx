
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { storeProjectData } from "@/utils/ipfsStorage";
import { getFreighterPublicKey } from "@/utils/freighterWallet";

interface AddProjectFormProps {
  onClose: () => void;
}

const AddProjectForm = ({ onClose }: AddProjectFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    targetAmount: "",
    apy: "",
    riskLevel: "",
    duration: "",
    minInvestment: "",
    teamSize: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get connected wallet public key
      const publicKey = await getFreighterPublicKey();
      
      // Prepare project data for IPFS
      const projectData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        targetAmount: parseInt(formData.targetAmount),
        apy: parseFloat(formData.apy),
        riskLevel: formData.riskLevel,
        duration: parseInt(formData.duration),
        minInvestment: parseInt(formData.minInvestment),
        teamSize: parseInt(formData.teamSize),
        createdBy: publicKey || 'anonymous',
        createdAt: new Date().toISOString()
      };

      console.log("Storing project data to IPFS:", projectData);
      
      // Store to IPFS
      const ipfsHash = await storeProjectData(projectData);
      
      console.log("Project stored on IPFS with hash:", ipfsHash);
      
      toast({
        title: "Project Submitted Successfully!",
        description: `Your project has been stored on IPFS (${ipfsHash.slice(0, 8)}...) and submitted for review.`,
      });
      
      onClose();
    } catch (error: any) {
      console.error("Error submitting project:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Project Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="Enter project name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="defi">DeFi</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-white">Description</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 min-h-[100px]"
          placeholder="Describe your project..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="targetAmount" className="text-white">Target Amount (USD)</Label>
          <Input
            id="targetAmount"
            type="number"
            value={formData.targetAmount}
            onChange={(e) => handleChange("targetAmount", e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="100000"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apy" className="text-white">Expected APY (%)</Label>
          <Input
            id="apy"
            type="number"
            step="0.1"
            value={formData.apy}
            onChange={(e) => handleChange("apy", e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="12.5"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="riskLevel" className="text-white">Risk Level</Label>
          <Select value={formData.riskLevel} onValueChange={(value) => handleChange("riskLevel", value)}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-white">Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="30"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minInvestment" className="text-white">Minimum Investment (USD)</Label>
          <Input
            id="minInvestment"
            type="number"
            value={formData.minInvestment}
            onChange={(e) => handleChange("minInvestment", e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="100"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="teamSize" className="text-white">Team Size</Label>
          <Input
            id="teamSize"
            type="number"
            value={formData.teamSize}
            onChange={(e) => handleChange("teamSize", e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="5"
            required
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Storing on IPFS...' : 'Submit Project'}
        </Button>
      </div>
    </form>
  );
};

export default AddProjectForm;
