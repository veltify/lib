# Button
## Overview
The Button component is a basic UI element that responds to user interactions.

## Usage
```svelte
<script>
  import { Button } from 'owls-lib';
</script>

<Button onclick={() => console.log('Button clicked')}>Click me</Button>
```

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onclick` | function | - | Handler for button click event |
| `icon` | boolean | false | if content of button is just an icon will make it's size fit?? |

## Variants
The Button component supports the following variants:
* `primary`
* `secondary`
* `destructive`
* `ghost`
