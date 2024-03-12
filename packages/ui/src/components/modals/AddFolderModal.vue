<template>
    <form @submit.prevent="createFolder" v-if="showModalComp">
        <modal title="New Folder" v-model="showModalComp">
            <label>
                <div style="font-weight: 500; margin-bottom: 0.25rem">Name</div>
                <input type="text" class="full-width-input" v-model="folderName" placeholder="New Folder" required spellcheck="false" v-focus>
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

const folderName = ref('New Folder')

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
        folderName.value = 'New Folder'
    }
})

async function createFolder() {
    store.dispatch('createCollectionItem', {
        type: 'request_group',
        name: folderName.value,
        parentId: props.parentId
    })
    showModalComp.value = false
}

</script>
