# GitHub Repository Manager

A React Native application that allows you to view and manage your GitHub repositories using GitHub's GraphQL API.

## Features

- View your GitHub profile information
- List your repositories
- Edit repository names
- Real-time updates using Apollo Client
- Native iOS and Android support

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (>= 18)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [React Native development environment](https://reactnative.dev/docs/environment-setup)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/cynthialmy/GitHub-app-react-native.git
cd GitHub-app-react-native
```

2. Install dependencies:
```bash
npm install
```

3. Create a GitHub Personal Access Token:
   - Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - Generate a new token with the following permissions:
     - `repo`
     - `read:user`
     - `user:email`

4. Configure your token:
   - Create `src/config/github.ts`
   - Add your token:
   ```typescript
   export const GITHUB_TOKEN = 'your_github_token_here';
   ```

5. Install iOS dependencies (iOS only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Project Structure

```
src/
├── apollo/
│   └── client.ts         # Apollo Client configuration
├── components/
│   ├── GitHubProfile.tsx # Profile and repository list component
│   └── RepoItem.tsx      # Repository item component with edit functionality
└── config/
    └── github.ts         # GitHub configuration (token)
```

## Available Scripts

- `npm start` - Start the Metro bundler
- `npm run ios` - Run the iOS app
- `npm run android` - Run the Android app
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Troubleshooting

If you encounter any issues:

1. Clear Metro bundler cache:
```bash
npm start -- --reset-cache
```

2. For iOS issues:
```bash
cd ios
pod install
cd ..
```

3. For Android issues:
   - Open Android Studio
   - Clean and rebuild the project
   - Sync Gradle files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
