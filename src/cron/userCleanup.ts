import cron from "node-cron";
import User from "../models/User";

cron.schedule("* * * * *", async () => {
  console.log("Running cron job: Checking inactive users...");

  const inactiveUsers = await User.find({
    lastLogin: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    active: true
  });

  if (inactiveUsers.length > 0) {
    console.log(`Found ${inactiveUsers.length} inactive users`);

    for (const user of inactiveUsers) {
      user.active = false;   
      await user.save();
    }
  } else {
    console.log("No inactive users found");
  }
});

