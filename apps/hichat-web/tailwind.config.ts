// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@hichat/tailwind-config/tailwind.config.ts";

const config: Pick<Config, "presets" | "theme"> = {
  presets: [sharedConfig],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        },
      },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          dark: 'hsl(var(--color-primary-dark))',
          darker: 'hsl(var(--color-primary-darker))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))',
          dark: 'hsl(var(--color-secondary-dark))',
          darker: 'hsl(var(--color-secondary-darker))',
        },
        success: {
          DEFAULT: 'hsl(var(--color-success))',
          dark: 'hsl(var(--color-success-dark))',
          darker: 'hsl(var(--color-success-darker))',
        },
        error: {
          DEFAULT: 'hsl(var(--color-error))',
          dark: 'hsl(var(--color-error-dark))',
          darker: 'hsl(var(--color-error-darker))',
        },
        warning: {
          DEFAULT: 'hsl(var(--color-warning))',
          dark: 'hsl(var(--color-warning-dark))',
          darker: 'hsl(var(--color-warning-darker))',
        },
        muted: 'hsl(var(--color-muted))',
        light: 'hsl(var(--color-light))',
        typography: {
          DEFAULT: 'hsl(var(--color-text))',
        },
      },
    },
  },
};

export default config;
