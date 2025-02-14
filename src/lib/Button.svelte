<script>
	let { children, ...props } = $props();
</script>

<button {...props}>{@render children?.()}</button>

<style>
	button {
		border: none;
		background-color: var(--dark-accent);
		cursor: pointer;
		color: var(--light);
		padding: 0.4rem 0.75rem;
		border-radius: 0.125rem;
		font-size: 1.1875rem;
	}
	button:disabled {
		cursor: 'not-allowed';
		background-color: var(--mid);
	}
</style>
