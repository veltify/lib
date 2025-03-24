<script lang="ts">
	import { createIndexedDb } from '$lib/db/indexeddb';
	import { onMount } from 'svelte';

	type User = {
		id?: string;
		name: string;
		email: string;
		role: string;
	};

	let db: any = $state(null);
	let users = $state([]);
	let loading = $state(true);
	let showModal = $state(false);
	let modalMode: 'add' | 'edit' = $state('add');
	let currentUser = $state({ name: '', email: '', role: '' });
	let userStore: any = $state(null);

	onMount(async () => {
		db = await createIndexedDb({ name: 'test-db', version: 1 });
		userStore = db('users');

		await loadUsers();
	});

	async function loadUsers() {
		loading = true;
		if (db) {
			const result = await userStore.query().all();
			users = result;
		}
		loading = false;
	}

	async function saveUser() {
		console.log('saveUser', currentUser, modalMode);

		if (modalMode === 'add') {
			await userStore.insert({
				name: currentUser.name,
				active: true,
				email: currentUser.email,
				role: currentUser.role
			});
		} else {
			await userStore.update({
				id: currentUser.id,
				name: currentUser.name,
				active: true,
				email: currentUser.email,
				role: currentUser.role
			});
		}

		closeModal();
		await loadUsers();
	}

	async function deleteUser(id: string) {
		if (confirm('Are you sure you want to delete this user?')) {
			await userStore.remove(id);
			await loadUsers();
		}
	}

	function openAddModal() {
		modalMode = 'add';
		currentUser = { name: '', email: '', role: '' };
		showModal = true;
	}

	function openEditModal(user: User) {
		modalMode = 'edit';
		currentUser = { ...user };
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	$effect(() => {
		if (db) {
			loadUsers();
		}
	});
</script>

<div class="container mx-auto p-4">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold">User Management</h1>
		<button
			class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			onclick={openAddModal}
		>
			Add User
		</button>
	</div>

	{#if loading}
		<div class="my-8 flex justify-center">
			<div class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500"></div>
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="min-w-full border border-gray-200 bg-white">
				<thead>
					<tr>
						<th
							class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Name
						</th>
						<th
							class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Email
						</th>
						<th
							class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Role
						</th>
						<th
							class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							CreatedAt
						</th>
						<th
							class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							UpdatedAt
						</th>
						<th
							class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{#if users.length === 0}
						<tr>
							<td colspan="6" class="px-6 py-4 text-center text-gray-500">
								No users found. Add a new user to get started.
							</td>
						</tr>
					{:else}
						{#each users as user}
							<tr>
								<td class="border-b border-gray-200 px-6 py-4 whitespace-nowrap">{user.name}</td>
								<td class="border-b border-gray-200 px-6 py-4 whitespace-nowrap">{user.email}</td>
								<td class="border-b border-gray-200 px-6 py-4 whitespace-nowrap">{user.role}</td>
								<td class="border-b border-gray-200 px-6 py-4 whitespace-nowrap">{user.createdAt}</td>
								<td class="border-b border-gray-200 px-6 py-4 whitespace-nowrap">{user.updatedAt}</td>
                                
								<td class="flex gap-2 border-b border-gray-200 px-6 py-4 whitespace-nowrap">
									<button
										class="rounded bg-yellow-500 px-2 py-1 text-sm font-bold text-white hover:bg-yellow-700"
										onclick={() => openEditModal(user)}
									>
										Edit
									</button>
									<button
										class="rounded bg-red-500 px-2 py-1 text-sm font-bold text-white hover:bg-red-700"
										onclick={() => deleteUser(user.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	{/if}

	{#if showModal}
		<div class="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black p-4">
			<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
				<h2 class="mb-4 text-xl font-bold">{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h2>

				<div class="mb-4">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="name">Name</label>
					<input
						id="name"
						type="text"
						bind:value={currentUser.name}
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					/>
				</div>

				<div class="mb-4">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="email">Email</label>
					<input
						id="email"
						type="email"
						bind:value={currentUser.email}
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					/>
				</div>

				<div class="mb-6">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="role">Role</label>
					<select
						id="role"
						bind:value={currentUser.role}
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					>
						<option value="">Select a role</option>
						<option value="admin">Admin</option>
						<option value="editor">Editor</option>
						<option value="user">User</option>
					</select>
				</div>

				<div class="flex justify-end gap-2">
					<button
						class="rounded bg-gray-300 px-4 py-2 font-bold text-black hover:bg-gray-400"
						onclick={closeModal}
					>
						Cancel
					</button>
					<button
						class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
						onclick={saveUser}
					>
						{modalMode === 'add' ? 'Add User' : 'Update User'}
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
