// This service simulates API calls to a backend
// In a real app, these would be actual API calls

let membersData = null;

// Load members from JSON file
const loadMembers = async () => {
    if (membersData) return membersData;

    try {
        const response = await fetch("/data/members.json");
        if (!response.ok) {
            throw new Error("Failed to fetch members");
        }
        membersData = await response.json();
        return membersData;
    } catch (error) {
        console.error("Error loading members:", error);
        return [];
    }
}

// Get all members
export const getAllMembers = async () => {
  return await loadMembers();}
