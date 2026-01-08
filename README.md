# n8n-nodes-insforge

This is an n8n community node for [InsForge](https://insforge.dev) - a Backend-as-a-Service platform with PostgreSQL database.

## Installation

### In n8n (Recommended)

1. Go to **Settings > Community Nodes**
2. Click **Install a community node**
3. Enter `n8n-nodes-insforge`
4. Click **Install**

### Manual Installation

```bash
npm install n8n-nodes-insforge
```

## Credentials

You need to configure InsForge API credentials:

| Field | Description |
|-------|-------------|
| **Base URL** | Your InsForge backend URL (e.g., `https://your-app.region.insforge.app`) |
| **API Key** | Your InsForge API key |

## Operations

### Row Resource

| Operation | Description |
|-----------|-------------|
| **Get** | Get a single row by ID |
| **Get Many** | Get multiple rows with optional filters |
| **Create** | Create a new row |
| **Update** | Update an existing row |
| **Delete** | Delete a row |

### Get Many Options

- **Select Columns** - Specify which columns to return (comma-separated)
- **Order By** - Sort results by column (append `.desc` for descending)
- **Filters** - Add conditions to filter results

### Filter Operators

| Operator | Description |
|----------|-------------|
| `eq` | Equals |
| `neq` | Not equals |
| `gt` | Greater than |
| `gte` | Greater than or equal |
| `lt` | Less than |
| `lte` | Less than or equal |
| `like` | Pattern match (case sensitive) |
| `ilike` | Pattern match (case insensitive) |
| `is` | Is null/true/false |
| `in` | In list of values |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## Resources

- [InsForge Documentation](https://docs.insforge.dev/introduction)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
