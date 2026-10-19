# @zenxea/ui

Universal Modern Digital Brutalism + Swiss Modular Grid UI Component Library for Zen Xea Technologies and Business Solutions.

Built with React 19, TypeScript, and Tailwind CSS, consuming `@zenxea/design-tokens` as its single source of truth.

---

## 📦 Component Suite

| Category | Components |
| :--- | :--- |
| **Layout** | `Container`, `Section`, `Grid`, `GridItem`, `Stack`, `Cluster`, `Split`, `Divider` |
| **Typography** | `Display`, `Heading`, `Body`, `Caption`, `Eyebrow`, `Metadata`, `NumericDisplay`, `CodeBlock` |
| **Buttons** | `Button` (primary, secondary, outline, ghost, destructive, link), `IconButton`, `ButtonGroup` |
| **Forms** | `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `FormField`, `FieldLabel`, `HelperText`, `ValidationMessage` |
| **Navigation** | `Navbar`, `NavItem`, `Breadcrumbs`, `Tabs`, `Pagination`, `DropdownMenu`, `Sidebar` |
| **Feedback** | `Alert`, `Toast`, `Dialog` (Modal), `Drawer`, `Tooltip`, `Popover` |
| **Data Display** | `Table`, `Badge`, `Avatar`, `ListRow`, `MetricCard`, `KeyValue` |
| **States** | `Spinner`, `Skeleton`, `Progress`, `EmptyState` |

---

## 🚀 Installation & Usage

```bash
npm install @zenxea/ui @zenxea/design-tokens
```

### Import Styles
In your global stylesheet:

```css
@import "@zenxea/design-tokens/css";
```

### Component Example

```tsx
import { Button, Heading, Container, Grid, Card } from "@zenxea/ui";

export default function MyPage() {
  return (
    <Container size="xl">
      <Heading level={1}>Zen Xea Architecture</Heading>
      <Button variant="primary">Launch Console</Button>
    </Container>
  );
}
```
