import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "android/**/build/**",
      "android/.gradle/**",
      "android/capacitor-cordova-android-plugins/**/build/**",
    ],
  },
  ...nextVitals,
  ...nextTs,
];

export default eslintConfig;
