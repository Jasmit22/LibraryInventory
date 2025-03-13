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
  return await loadMembers();
};

// Add a new member
export const addMember = async (newMember) => {
  const members = await loadMembers();

  // Generate a new ID
  const maxId =
    members.length > 0 ? Math.max(...members.map((member) => member.id)) : 0;
  const memberWithId = {
    ...newMember,
    id: maxId + 1,
  };

  // Add to our in-memory data
  members.push(memberWithId);
  membersData = members;

  // In a real app, this would be an API call to save the member
  console.log("Member added:", memberWithId);

  return memberWithId;
};