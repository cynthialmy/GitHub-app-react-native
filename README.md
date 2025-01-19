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
cd GitHubApp
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
   - Create `.env` file in the root directory
   - Add your token:
   ```
   GITHUB_TOKEN=your_github_token_here
   ```

5. Install iOS dependencies (iOS only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### On iOS Simulator
```bash
npm run ios
```

### On Physical iOS Device

1. Open the project in Xcode:
```bash
cd ios
open GitHubApp.xcworkspace
```

2. In Xcode:
   - Connect your iPhone to your Mac via USB
   - Sign in to your Apple ID (Xcode > Preferences > Accounts)
   - Select the "GitHubApp" target
   - Under "Signing & Capabilities":
     - Check "Automatically manage signing"
     - Select your Team (your Apple ID)
     - Update Bundle Identifier to something unique (e.g., "com.yourname.githubapp")

3. Trust the developer profile on your iPhone:
   - Go to Settings > General > Device Management
   - Find your Apple ID
   - Tap "Trust"

4. Run the app:
```bash
# Either through Xcode by clicking the Play button
# Or through the terminal:
npm run ios --device "Your iPhone Name"
```

### On Android
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

2. For iOS device deployment issues:
   - Make sure your iPhone is unlocked
   - Trust the developer certificate on your device
   - Clean the build in Xcode (Product > Clean Build Folder)
   - Delete derived data in Xcode (Window > Projects > Click arrow next to project > Delete derived data)
   - Try rebuilding:
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   npm run ios --device
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
