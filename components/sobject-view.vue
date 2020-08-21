<template>
  <div
    id="sobject-view"
    ref="sobject-view"
    class="d-flex flex-column slds-form px-3"
    style="max-height: none; height: calc(100vh - 120px); overflow-y: auto;"
  >
    <slds-input
      id="sobject-label"
      v-model="sobject.label"
      label="Label"
      type="text"
      readonly
    />
    <slds-input
      id="sobject-plural-label"
      v-model="sobject.pluralLabel"
      label="Plural Label"
      type="text"
      readonly
    />
    <slds-input
      v-if="sobject.gender"
      id="sobject-gender"
      v-model="sobject.gender"
      label="Gender"
      readonly
    />
    <slds-text-area
      id="sobject-description"
      v-model="sobject.description"
      label="Description"
      rows="3"
      readonly
    />
    <slds-input
      id="sobject-object-name"
      v-model="sobject.objectName"
      label="Object Name"
      type="text"
      readonly
    />
    <slds-input
      id="sobject-record-name"
      v-model="sobject.recordName"
      label="Record Name"
      type="text"
      readonly
    />
    <slds-input
      id="sobject-data-type"
      v-model="sobject.dataType"
      label="Data Type"
      placeholder="Select an Option"
      readonly
    />
    <slds-input
      v-if="sobject.dataType === 'AutoNumber'"
      id="sobject-display-format"
      v-model="sobject.displayFormat"
      label="Display Format"
      type="text"
      readonly
    />
    <slds-input
      v-if="sobject.dataType === 'AutoNumber'"
      id="sobject-starting-number"
      v-model="sobject.startingNumber"
      class="mb-2"
      label="Starting Number"
      type="number"
      readonly
    />
    <slds-checkbox
      id="sobject-allow-reports"
      v-model="sobject.enableReports"
      label="Allow Reports"
      variant="inline"
      read-only
    />
    <slds-checkbox
      id="sobject-allow-activites"
      v-model="sobject.enableActivities"
      label="Allow Activities"
      variant="inline"
      read-only
    />
    <slds-checkbox
      id="sobject-enable-history"
      v-model="sobject.enableHistory"
      label="Track Field History"
      variant="inline"
      read-only
    />
    <slds-checkbox
      id="sobject-allow-in-chatter-groups"
      v-model="sobject.allowInChatterGroups"
      label="Allow in Chatter Groups"
      variant="inline"
      read-only
    />
    <slds-checkbox
      id="sobject-allow-sharing"
      v-model="sobject.enableSharing"
      label="Allow Sharing"
      variant="inline"
      read-only
    />
    <slds-checkbox
      id="sobject-enable-bulk-api"
      v-model="sobject.enableBulkApi"
      label="Allow Bulk API Access"
      variant="inline"
      read-only
    />
    <slds-checkbox
      id="sobject-enable-streaming-api"
      v-model="sobject.enableStreamingApi"
      label="Allow Streaming API Access"
      variant="inline"
      read-only
    />
    <slds-checkbox
      id="sobject-enable-search"
      v-model="sobject.enableSearch"
      label="Allow Search"
      variant="inline"
      read-only
    />
    <slds-input
      id="sobject-deployment-status"
      v-model="sobject.deploymentStatus"
      label="Deployment Status"
      placeholder="Select an Option"
      readonly
    />
    <slds-button class="mt-3" label="Edit" brand stretch @click="onEdit" />
  </div>
</template>

<script>
export default {
  props: {
    sobject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onEdit() {
      this.$emit('edit')
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
}
</style>
