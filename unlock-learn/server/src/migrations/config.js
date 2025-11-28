// migrations/config.js
import { config } from 'dotenv';

config();

export const migrationConfig = {
  // Supabase Configuration
  supabase: {
    url: process.env.SUPABASE_URL || 'your-supabase-url',
    key: process.env.SUPABASE_KEY || 'your-supabase-key',
  },

  // MongoDB Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/unlock-learn',
  },

  // Migration Settings
  settings: {
    batchSize: 100, // Number of records to process at once
    delayBetweenBatches: 100, // ms delay between batches to avoid rate limits
  },
};
