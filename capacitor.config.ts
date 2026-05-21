import type { CapacitorConfig } from "@capacitor/cli";

const androidServerUrl =
  process.env.EXPRESSJOBS_ANDROID_SERVER_URL ?? "http://10.0.2.2:3000";

const config: CapacitorConfig = {
  appId: "com.expressjobs.preview",
  appName: "ExpressJobs",
  webDir: "capacitor-web",
  server: {
    url: androidServerUrl,
    cleartext: androidServerUrl.startsWith("http://"),
  },
};

export default config;
