<script>
  import Button from './Button.svelte';
  
  // Props
  let { code, title, children } = $props();
  
  // State
  let codeVisible = $state(false);
  
  // Toggle code visibility
  function toggleCode() {
    codeVisible = !codeVisible;
  }
</script>

<div class="code-example border rounded-md overflow-hidden mb-8">
  {#if title}
    <div class="bg-gray-100 dark:bg-gray-800 px-4 py-2 font-medium border-b">
      {title}
    </div>
  {/if}
  
  <div class="p-6 flex items-center justify-center bg-white dark:bg-gray-900">
    {@render children?.()}
  </div>
  
  <div class="border-t flex justify-end px-4 py-2 bg-gray-50 dark:bg-gray-800">
    <Button 
      variant="ghost" 
      size="sm" 
      on:click={toggleCode}
    >
      {codeVisible ? 'Hide Code' : 'Show Code'}
    </Button>
  </div>
  
  {#if codeVisible}
    <div class="bg-gray-900 p-4 text-white overflow-x-auto">
      <pre class="language-svelte"><code>{code}</code></pre>
    </div>
  {/if}
</div>

<style>
  .code-example {
    --border-color: var(--color-border, #e2e8f0);
    border-color: var(--border-color);
  }
  
  pre {
    margin: 0;
    font-family: monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
</style>
