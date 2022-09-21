<script setup lang="ts">
import type { Data } from "./data.js";
import type { Badge } from "@nordhealth/components";

const statusMap: Record<Data["status"], Badge["type"]> = {
  success: "success",
  alert: "danger",
  warning: "warning",
} as const;

const props = defineProps<{ params: { value: Data["status"] } }>();
const status = props.params.value;
</script>

<template>
  <nord-badge class="n-payout-badge" :type="statusMap[status]">
    {{ status }}
  </nord-badge>
</template>

<style>
.n-payout-badge {
  text-transform: capitalize;
}
</style>
