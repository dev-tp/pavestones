<script>
	/** @type {import('./$types').PageProps} */
	const { form } = $props();
</script>

<div class="m-auto my-8 grid w-full gap-2 px-4 md:w-1/3 md:px-0">
	<h1 class="text-3xl">Recover</h1>
	{#if form?.sent !== undefined}
		{#if form.sent}
			<p>Please check your email and follow the link to recover your account.</p>
		{:else}
			<p>There was an error sending the email. Please try again later.</p>
		{/if}
	{:else}
		<p>
			Please enter your registered email to help you recover your account. A link valid for 10
			minutes will be sent to the email you submit.
		</p>
		<form method="POST">
			<label class="mb-4 grid gap-1">
				<span>Email <span class="text-red-500">*</span></span>
				<input class="border p-1" name="email" type="email" required />
			</label>
			<div class="flex items-center gap-1">
				<button class="cursor-pointer bg-black px-2 py-1 text-white" type="submit">Submit</button>
				<a class="cursor-pointer px-2 py-1 hover:underline" href="/login">Cancel</a>
			</div>
		</form>
	{/if}
</div>
