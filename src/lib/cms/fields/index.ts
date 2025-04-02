import FormInput from './FormInput.svelte';
import FormTextarea from './FormTextarea.svelte';
import FormSelect from './FormSelect.svelte';
import FormRichText from './FormRichText.svelte';
import FormPassword from './FormPassword.svelte';
import FormNumber from './FormNumber.svelte';
import FormRelation from './FormRelation.svelte';

import TableText from './TableText.svelte';
import TableBadge from './TableBadge.svelte';
import TableImg from './TableImg.svelte';
import TableIcon from './TableIcon.svelte';
import TableRichText from './TableRichText.svelte';
import TableHidden from './TableHidden.svelte';
import TableDate from './TableDate.svelte';
import TableRelation from './TableRelation.svelte';

export default {
	input: {
		form: FormInput,
		table: TableText
	},
	relation: {
		form: FormRelation,
		table: TableRelation
	},
	number: {
		form: FormNumber,
		table: TableText
	},
	date: {
		form: FormInput,
		table: TableDate
	},
	password: {
		form: FormPassword,
		table: TableHidden
	},
	textarea: {
		form: FormTextarea,
		table: TableText
	},
	select: {
		form: FormSelect,
		table: TableBadge
	},
	icon: {
		form: FormTextarea,
		table: TableIcon
	},
	richtext: {
		form: FormRichText,
		table: TableRichText,
	}
} as any;
