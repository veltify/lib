---
title: 'Button component'
---
# Button
## Overview
The Button component is a basic UI element that responds to user interactions.

## Usage

### Import

```js
import { Button } from 'veltify';
```

### Simple usage
```svelte example
<script>
  import { Button } from '$lib';
</script>

<Button onclick={() => console.log('Button clicked')}>Click me</Button>
```

### Variants
```svelte example
<script>
  import { Button } from '$lib';
</script>

<div class="flex flex-wrap gap-2">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
```

### Link
```svelte example
<script>
  import { Button } from '$lib';
</script>

<Button href="/" variant="link">This is link</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' | 'ghost' | 'secondary' | 'link' | 'destructive'` | `'primary'` | Button style variant |
| `size` | `'default' | 'sm' | 'icon'` | `'default'` | Size of the button |
| `href` | `string` | `undefined` | When provided, renders as an anchor element |
| `type` | `'button' | 'submit'` | `'button'` | HTML button type attribute |
| `icon` | `boolean` | `false` | Whether the button is an icon button |
| `children` | `Snippet` | - | Button content |
