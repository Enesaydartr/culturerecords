with open("src/services/authService.ts", "r", encoding="utf-8") as f:
    content = f.read()

toggle_follow_code = """  toggleFollow(targetUserId: string, currentUserId: string): { isFollowing: boolean; targetFollowersCount: number } {
    this.init();
    const users = this.getAllUsers();
    const targetIdx = users.findIndex((u) => u.id === targetUserId);
    const currentIdx = users.findIndex((u) => u.id === currentUserId);

    if (targetIdx === -1 || currentIdx === -1) {
      return { isFollowing: false, targetFollowersCount: 0 };
    }

    const currentUser = users[currentIdx];
    const targetUser = users[targetIdx];

    currentUser.following = currentUser.following || [];
    targetUser.followers = targetUser.followers || [];

    const isAlreadyFollowing = currentUser.following.includes(targetUserId);

    if (isAlreadyFollowing) {
      currentUser.following = currentUser.following.filter((id) => id !== targetUserId);
      targetUser.followers = targetUser.followers.filter((id) => id !== currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    users[currentIdx] = currentUser;
    users[targetIdx] = targetUser;

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    const session = this.getCurrentUser();
    if (session && session.id === currentUserId) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
    }

    window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: currentUser } }));
    window.dispatchEvent(new CustomEvent("user-profile-updated", { detail: { userId: targetUserId } }));

    return {
      isFollowing: !isAlreadyFollowing,
      targetFollowersCount: targetUser.followers.length
    };
  },
"""

if "toggleFollow(" not in content:
    content = content.replace("  updateProfile(userId: string, updates: Partial<UserProfile>): boolean {", toggle_follow_code + "\n  updateProfile(userId: string, updates: Partial<UserProfile>): boolean {")
    with open("src/services/authService.ts", "w", encoding="utf-8") as f:
        f.write(content)
    print("toggleFollow added to authService.ts")
else:
    print("toggleFollow already exists")
