<template>
    <form @submit.prevent="createRequest" v-if="showModalComp">
        <modal title="New Request" v-model="showModalComp">
            <label>
                <div style="font-weight: 500; margin-bottom: 0.25rem">Name</div>
                <input type="text" class="full-width-input" v-model="requestName" placeholder="My Request" required spellcheck="false" v-focus>
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

const requestName = ref('New Request')
const requestMethod = ref('GET')

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
        requestName.value = 'New Request'
    }
})

async function createRequest() {
    store.dispatch('createCollectionItem', {
        type: 'request',
        name: requestName.value,
        method: requestMethod.value,
        mimeType: 'No Body',
        parentId: props.parentId
    })
    showModalComp.value = false
}

</script>
