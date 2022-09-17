<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentQuestion, smallQuestions } from '$lib/stores/drinks.store';
	import { onMount } from 'svelte';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';

	enum State {
		Idle,
		Wrong,
		Corerct
	}
	$: state = State.Idle;
	const valueChanged = () => {
		if ($currentQuestion?.answer.toString().toLowerCase() != answer.toLowerCase()) {
			state = State.Wrong;
			return;
		}
		state = State.Corerct;
		answer = '';
		fetch('/question', {
			method: 'POST',
			body: JSON.stringify({ ...$currentQuestion, answered: true, correct: true })
		}).then(async (x) => {
			const questions = await x.json();
			smallQuestions.set(questions);
		});
		setTimeout(() => {
			state = State.Idle;
		}, 2000);
	};

	$: answer = '';
	$: happy = true;

	onMount(() => {
		fetch('/question').then(async (x) => {
			const questions = await x.json();
			smallQuestions.set(questions);
		});
		setTimeout(() => {
			happy = false;
		}, 3500);
	});
</script>

{#if happy}
	<div
		class="w-full h-full flex flex-col justify-center items-center gap-y-10 transition-colors duration-1000 ease-in-out"
		class:bg-red-500={state == State.Wrong}
	>
		<ConfettiExplosion />
		<h1 class="text-4xl font-bold px-5 text-center">Happy 🍻-day Johan</h1>
	</div>
{:else}
	<!-- else content here -->
	<div
		class="w-full h-full flex flex-col justify-center items-center gap-y-10 transition-colors duration-1000 ease-in-out"
		class:bg-red-500={state == State.Wrong}
	>
		{#if state == State.Corerct}
			<ConfettiExplosion />
		{/if}
		<h1 class="text-3xl px-5 text-center">
			{$currentQuestion?.question}
			{$currentQuestion?.answered}
		</h1>

		<input
			class="bg-slate-100 p-5 border border-gray-200"
			type="text"
			bind:value={answer}
			name="answer"
			id="answer"
			on:focus={() => {
				state = State.Idle;
			}}
		/>
		<button
			class="bg-green-400 text-black py-3 px-8 text-lg rounded-lg font-semibold shadow-2xl"
			on:click={valueChanged}>Answer</button
		>
		<button
			class="bg-green-400 text-black py-3 px-8 text-xs rounded-lg font-semibold shadow-2xl"
			on:click={() => {
				goto('/add');
			}}>Add</button
		>
	</div>
{/if}
