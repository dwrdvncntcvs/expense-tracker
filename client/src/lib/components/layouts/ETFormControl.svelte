<script lang="ts">
    export let id = "";
    export let label = "";
</script>

<div class="flex flex-col w-full gap-2">
    <label class="text-sm" for={id}>{label}</label>
    <slot />
</div>
