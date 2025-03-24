<script>
  import Button from '$lib/components/Button.svelte';
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Veltify UI Documentation</h1>
  
  <p class="mb-8 text-lg">
    A themeable component library built with Svelte 5 and Tailwind CSS.
  </p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 class="text-xl font-semibold mb-2">Getting Started</h2>
      <p class="text-gray-600 mb-4">Learn how to install and set up Veltify UI in your project.</p>
      <Button variant="ghost" href="/docs/getting-started">View Guide</Button>
    </div>
    
    <div class="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 class="text-xl font-semibold mb-2">Components</h2>
      <p class="text-gray-600 mb-4">Explore the available components and their usage.</p>
      <div class="flex flex-wrap gap-2">
        <Button variant="ghost" href="/docs/Button">Button</Button>
        <Button variant="ghost" href="/docs/Badge">Badge</Button>
        <Button variant="ghost" href="/docs/Input">Input</Button>
      </div>
    </div>
    
    <div class="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 class="text-xl font-semibold mb-2">Theming</h2>
      <p class="text-gray-600 mb-4">Customize the look and feel of your components.</p>
      <Button variant="ghost" href="/docs/theming">View Guide</Button>
    </div>
  </div>
</div>
