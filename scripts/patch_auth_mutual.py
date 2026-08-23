with open("src/services/authService.ts", "r", encoding="utf-8") as f:
    content = f.read()

mutual_methods = """  isFollowing(currentUserId: string, targetUserId: string): boolean {
    const user = this.getUserById(currentUserId);
    return !!(user && user.following && user.following.includes(targetUserId));
  },

  areMutualFollowers(userIdA: string, userIdB: string): boolean {
    if (!userIdA || !userIdB || userIdA === userIdB) return false;
    const userA = this.getUserById(userIdA);
    const userB = this.getUserById(userIdB);
    if (!userA || !userB) return false;
    const aFollowsB = !!(userA.following && userA.following.includes(userIdB));
    const bFollowsA = !!(userB.following && userB.following.includes(userIdA));
    return aFollowsB && bFollowsA;
  },
"""

if "areMutualFollowers(" not in content:
    content = content.replace("  toggleFollow(targetUserId: string, currentUserId: string):", mutual_methods + "\n  toggleFollow(targetUserId: string, currentUserId: string):")

with open("src/services/authService.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("authService.ts updated with areMutualFollowers and isFollowing!")
