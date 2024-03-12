<template>
    <form @submit.prevent="createSocket" v-if="showModalComp">
        <modal title="New Socket" v-model="showModalComp">
            <label>
                <div style="font-weight: 500; margin-bottom: 0.25rem">Name</div>
                <input type="text" class="full-width-input" v-model="socketName" placeholder="New Socket" required spellcheck="false" v-focus>
            </label>

            <template #footer>
                <button class="button">Create</button>
            </template>
        </modal>
    </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Modal from '@/components/Modal.vue'

const vFocus = {
    mounted: (el) => {
        el.focus()
        el.select()
    }
}

const props = defineProps({
    showModal: Boolean,
    parentId: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['update:showModal'])

const socketName = ref('New Socket')

const store = useStore()

const showModalComp = computed({
    get() {
        return props.showModal
    },
    set(value) {
        emit('update:showModal', value)
    }
})

watch(props.showModal, (v) => {
    if (v) {
        socketName.value = 'New Socket'
    }
})

async function createSocket() {
    store.dispatch('createCollectionItem', {
        type: 'socket',
        name: socketName.value,
        parentId: props.parentId
    })
    showModalComp.value = false
}

</script>
