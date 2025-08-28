import Queue from "bull";
const emailQueue = new Queue("emailQueue", {
  redis: { host: "127.0.0.1", port: 6379 } 
});
emailQueue.process(async (job) => {
  console.log("Processing email job:", job.data);
  console.log(`✅ Email sent to ${job.data.email}`);
});
export const addEmailToQueue = async (email: string) => {
  await emailQueue.add({ email });
  console.log("storeddata:",emailQueue);
};

export default emailQueue;
