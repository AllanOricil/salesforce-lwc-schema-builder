<template>
  <div
    id="sobject-view"
    ref="sobject-view"
    class="d-flex flex-column slds-form px-3 pb-1"
    style="max-height: none; height: calc(100vh - 90px); overflow-y: auto;"
  >
    <slds-input
      id="sobject-label"
      :value="sobject.label"
      label="Label"
      type="text"
      readonly
    />
    <slds-input
      id="sobject-plural-label"
      :value="sobject.pluralLabel"
      label="Plural Label"
      type="text"
      readonly
    />
    <slds-input
      v-if="sobject.gender"
      id="sobject-gender"
      :value="sobject.gender"
      label="Gender"
      readonly
    />
    <slds-text-area
      id="sobject-description"
      :value="sobject.description"
      label="Description"
      rows="3"
      readonly
    />
    <slds-input
      id="sobject-object-name"
      :value="apiName"
      label="API Name"
      type="text"
      readonly
    />
    <slds-input
      id="sobject-record-name"
      :value="sobject.recordName"
      label="Record Name"
      type="text"
      readonly
    />
    <slds-input
      id="sobject-data-type"
      :value="sobject.dataType"
      label="Data Type"
      placeholder="Select an Option"
      readonly
    />
    <slds-input
      v-if="sobject.dataType === 'AutoNumber'"
      id="sobject-display-format"
      :value="sobject.displayFormat"
      label="Display Format"
      type="text"
      readonly
    />
    <slds-input
      v-if="sobject.dataType === 'AutoNumber'"
      id="sobject-starting-number"
      :value="sobject.startingNumber"
      class="mb-2"
      label="Starting Number"
      type="number"
      readonly
    />
    <slds-checkbox
      id="sobject-allow-reports"
      :checked="sobject.enableReports"
      label="Allow Reports"
      variant="inline"
      readonly
    />
    <slds-checkbox
      id="sobject-allow-activites"
      :checked="sobject.enableActivities"
      label="Allow Activities"
      variant="inline"
      readonly
    />
    <slds-checkbox
      id="sobject-enable-history"
      :checked="sobject.enableHistory"
      label="Track Field History"
      variant="inline"
      readonly
    />
    <slds-checkbox
      id="sobject-allow-in-chatter-groups"
      :checked="sobject.allowInChatterGroups"
      label="Allow in Chatter Groups"
      variant="inline"
      readonly
    />
    <slds-checkbox
      id="sobject-allow-sharing"
      :checked="sobject.enableSharing"
      label="Allow Sharing"
      variant="inline"
      readonly
    />
    <slds-checkbox
      id="sobject-enable-bulk-api"
      :checked="sobject.enableBulkApi"
      label="Allow Bulk API Access"
      variant="inline"
      readonly
    />
    <slds-checkbox
      id="sobject-enable-streaming-api"
      :checked="sobject.enableStreamingApi"
      label="Allow Streaming API Access"
      variant="inline"
      readonly
    />
    <slds-checkbox
      id="sobject-enable-search"
      :checked="sobject.enableSearch"
      label="Allow Search"
      variant="inline"
      readonly
    />
    <slds-input
      id="sobject-deployment-status"
      :value="sobject.deploymentStatus"
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
      default: () => {
        return {
          name: undefined,
          label: undefined,
          objectName: undefined,
          description: undefined,
          pluralLabel: undefined,
          gender: undefined,
          recordName: undefined,
          dataType: 'Text',
          displayFormat: undefined,
          startingNumber: undefined,
          enableReports: false,
          enableActivities: false,
          enableHistory: false,
          allowInChatterGroups: false,
          enableSharing: false,
          enableBulkApi: false,
          enableStreamingApi: false,
          enableSearch: false,
          deploymentStatus: 'Deployed',
        }
      },
    },
  },
  computed: {
    apiName() {
      return this.sobject.objectName + '__c'
    },
  },
  methods: {
    onEdit() {
      this.$emit('edit', this.sobject)
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
}
</style>
