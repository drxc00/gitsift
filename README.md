# GitSift - Lighthouse for Better Repositories

GitSift is a GitHub repository evaluation tool that helps developers identify what's missing and improve their Git workflow effortlessly. Built with Next.js, it provides comprehensive insights into repository health, community engagement, and coding standards gathered from the GitHub GraphQL API.

## Features

- **Repository Health Check**: Evaluate your repository's overall health and standards compliance
- **Community Metrics**: Track issues, PRs, contributors, and response times
- **File Analysis**: Identify missing or critical files in your repository
- **Insights & Recommendations**: Get actionable insights to improve your repository

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/drxc00/gitsift.git
cd git-sift
```
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following content:
```env
GITHUB_TOKEN=your_github_token # You can get one from https://github.com/settings/tokens, this prevents rate limiting
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **State Management**: React Query
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom animations

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) before making a pull request.

## Support

If you find this project useful, please consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/git-sift)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Vercel](https://vercel.com) for deployment and hosting
- [GitHub](https://github.com) for their API and inspiration

