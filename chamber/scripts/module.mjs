export const fetchMembers = async () => {
  const response = await fetch("./scripts/members.json");
  return await response.json();
};