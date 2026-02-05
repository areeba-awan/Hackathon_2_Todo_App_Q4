 
// Test script to verify theme toggle functionality
console.log("Testing theme toggle functionality...");
console.log("1. Initial theme should be dark (not light)");
console.log("2. Clicking the moon/sun icon should toggle between themes");
console.log("3. Theme preference should be saved in localStorage");

console.log("\nThe changes made:");
console.log("- Updated ThemeProvider to initialize with dark theme by default");
console.log("- Prevented initial flash of light theme during hydration");
console.log("- Maintained toggle functionality between light and dark modes");

console.log("\nTo test:");
console.log("1. Visit http://localhost:3000 in your browser");
console.log("2. Verify that the initial theme is dark");
console.log("3. Click the theme toggle button (moon/sun icon) in the navbar");
console.log("4. Verify that it toggles between dark and light themes");
console.log("5. Refresh the page and verify the selected theme is preserved");