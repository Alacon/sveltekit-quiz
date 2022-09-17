<script lang="ts">
	import { goto } from '$app/navigation';
	import { addNew, smallQuestions } from '$lib/stores/drinks.store';
	import ShortUniqueId from 'short-unique-id';
	const uid = new ShortUniqueId();

	$: question = '';
	$: answer = '';

	const add = () => {
		fetch('/question', {
			method: 'POST',
			body: JSON.stringify({
				question,
				answer,
				answered: false,
				correct: undefined,
				id: uid()
			})
		}).then(async (x) => {
			const questions = await x.json();
			smallQuestions.set(questions);
		});
		fetch('/question').then(async (x) => {
			const questions = await x.json();
			smallQuestions.set(questions);
		});
		addNew(question, answer);
		question = '';
		answer = '';
	};
</script>

<div class="p-5 flex flex-col gap-y-5">
	<h2>Add new</h2>
	<div class="bg-slate-100 rounded-sm p-3 flex flex-col justify-center gap-y-3 py-10">
		<input type="text" bind:value={question} placeholder="Question" />
		<input type="text" bind:value={answer} placeholder="Answer" />
		<button
			class="bg-green-400 text-black py-3 px-8 text-lg rounded-lg font-semibold shadow-2xl"
			on:click={add}>Add</button
		>
	</div>
	<button
		class="bg-green-400 text-black py-3 px-8 text-xs rounded-lg font-semibold shadow-2xl"
		on:click={() => {
			goto('/');
		}}>Back</button
	>
</div>
