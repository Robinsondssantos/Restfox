<template>
    <form @submit.prevent="duplicateCollectionItem" v-if="showModalComp">
        <modal :title="title" v-model="showModalComp">
            <label>
                <div style="font-weight: 500; margin-bottom: 0.25rem">Name</div>
                <input type="text" class="full-width-input" v-model="newName" :placeholder="placeholder" required spellcheck="false" v-focus>
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
    collectionItemToDuplicate: Object
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

const title = computed(() => {
    if (props.collectionItemToDuplicate._type === 'request_group') {
        return 'Duplicate Folder'
    }

    if (props.collectionItemToDuplicate._type === 'request') {
        return 'Duplicate Request'
    }

    if (props.collectionItemToDuplicate._type === 'socket') {
        return 'Duplicate Socket'
    }

    return ''
})

const placeholder = computed(() => {
    if (props.collectionItemToDuplicate._type === 'request_group') {
        return 'New Folder Name'
    }

    if (props.collectionItemToDuplicate._type === 'request') {
        return 'New Request Name'
    }

    if (props.collectionItemToDuplicate._type === 'socket') {
        return 'New Socket Name'
    }

    return ''
})

watch(props.collectionItemToDuplicate, (v) => {
    if (v) {
        newName.value = props.collectionItemToDuplicate.name
    }
})

async function duplicateCollectionItem() {
    const newCollectionItem = JSON.parse(JSON.stringify(props.collectionItemToDuplicate))
    newCollectionItem.name = newName.value
    store.dispatch('duplicateCollectionItem', newCollectionItem)
    showModalComp.value = false
}

</script>
