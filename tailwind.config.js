/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  corePlugins: {
    preflight: false // Disable Tailwind's base reset to avoid Bootstrap conflicts
  },
  prefix: 'tw-', // Prefix all Tailwind classes with "tw-" (e.g., tw-bg-blue-500)
  theme: {
    extend: {}
  },
  plugins: []
}
