<template>
    <form @submit.prevent="duplicateWorkspace" v-if="showModalComp">
        <modal title="Duplicate Workspace" v-model="showModalComp">
            <label>
                <div style="font-weight: 500; margin-bottom: 0.25rem">Name</div>
                <input type="text" class="full-width-input" v-model="newName" placeholder="Workspace Name" required spellcheck="false" v-focus>
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
    workspaceToDuplicate: Object
})

const emit = defineEmits(['update:showModal'])

const newName = ref('')

const store = useStore()

const showModalComp = computed({
    get() {
        return props.showModal
    },
    set(value) {
        emit('update:showModal', value)
    }
})

watch(props.workspaceToDuplicate, (v) => {
    if (v) {
        newName.value = props.workspaceToDuplicate.name
    }
})

async function duplicateWorkspace() {
    store.dispatch('duplicateWorkspace', {
        sourceWorkspaceId: props.workspaceToDuplicate._id,
        name: newName.value
    })
    showModalComp.value = false
}

</script>
