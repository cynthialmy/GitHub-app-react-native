import {GITHUB_TOKEN as ENV_GITHUB_TOKEN} from '@env';

if (!ENV_GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is not defined in .env file');
}

export const GITHUB_TOKEN = ENV_GITHUB_TOKEN;
