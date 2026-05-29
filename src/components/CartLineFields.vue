<template>
  <div class="space-y-2.5 mt-2">
    <div v-if="line.sizesAvailable?.length">
      <label class="cart-label">Size *</label>
      <select
        :value="line.size"
        class="cart-field cart-field-sm"
        @change="onField('size', $event.target.value)"
      >
        <option disabled value="">Select size</option>
        <option v-for="size in line.sizesAvailable" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
    <div v-else>
      <label class="cart-label">Size *</label>
      <input
        :value="line.size"
        type="text"
        class="cart-field cart-field-sm"
        placeholder="Your size"
        @change="onField('size', $event.target.value)"
      />
    </div>

    <div v-if="line.colorsAvailable?.length">
      <label class="cart-label">Colour *</label>
      <select
        :value="line.color"
        class="cart-field cart-field-sm"
        @change="onField('color', $event.target.value)"
      >
        <option disabled value="">Select colour</option>
        <option v-for="color in line.colorsAvailable" :key="color" :value="color">{{ color }}</option>
      </select>
    </div>
    <div v-else>
      <label class="cart-label">Colour *</label>
      <input
        :value="line.color"
        type="text"
        class="cart-field cart-field-sm"
        placeholder="Your colour"
        @change="onField('color', $event.target.value)"
      />
    </div>

    <div>
      <label class="cart-label">Item note</label>
      <input
        :value="line.itemNote"
        type="text"
        class="cart-field cart-field-sm"
        placeholder="Extra details for this item"
        @change="onField('itemNote', $event.target.value)"
      />
    </div>

    <p v-if="!complete" class="text-xs text-t-accent">
      Please select size and colour before checkout.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isLineComplete } from '../utils/productOptions'

const props = defineProps({
  line: Object,
})

const emit = defineEmits(['update'])

const complete = computed(() => isLineComplete(props.line))

function onField(field, value) {
  emit('update', { [field]: value })
}
</script>
