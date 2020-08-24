<template>
  <form
    id="sobject-form"
    ref="sobject-form"
    class="d-flex flex-column slds-form px-2"
    style="max-height: none; height: calc(100vh - 90px); overflow-y: auto;"
  >
    <slds-input
      id="sobject-label"
      v-model="$v.sobject.label.$model"
      label="Label"
      type="text"
      maxlength="40"
      required
      :error="$v.sobject.label.$error"
    >
      <template v-slot:error>
        Label is Required
      </template>
    </slds-input>
    <slds-input
      id="sobject-plural-label"
      v-model="$v.sobject.pluralLabel.$model"
      label="Plural Label"
      type="text"
      maxlength="40"
      required
      :error="$v.sobject.pluralLabel.$error"
    >
      <template v-slot:error>
        Plural Label is Required
      </template>
    </slds-input>
    <slds-combobox
      v-if="hasGender"
      id="sobject-gender"
      v-model="sobject.gender"
      label="Gender"
      placeholder="Select an Option"
      :options="[
        {
          value: 'Feminine',
          label: 'Feminine',
        },
        {
          value: 'Masculine',
          label: 'Masculine',
        },
      ]"
    />
    <slds-text-area
      id="sobject-description"
      v-model="sobject.description"
      label="Description"
      rows="3"
      maxlength="999"
    />
    <slds-input
      id="sobject-object-name"
      v-model="$v.sobject.objectName.$model"
      label="Object Name"
      type="text"
      maxlength="43"
      required
      pattern="^(?!.*__)(?!.*_$)[A-Za-z]\w*$"
      :error="$v.sobject.objectName.$error"
    >
      <template v-if="sobject.objectName" v-slot:help>
        API Name: {{ sobject.objectName + '__c' }}
      </template>
      <template v-slot:error>
        <p v-if="!$v.sobject.objectName.required">
          Object Name is Required
        </p>
        <p v-else-if="!$v.sobject.objectName.objectNameValidation">
          The Object Name field can only contain underscores and alphanumeric
          characters. It must be unique, begin with a letter, not include
          spaces, not end with an underscore, and not contain two consecutive
          underscores.
        </p>
      </template>
    </slds-input>
    <slds-input
      id="sobject-record-name"
      v-model="$v.sobject.recordName.$model"
      label="Record Name"
      type="text"
      required
      maxlength="80"
      :error="$v.sobject.recordName.$error"
    >
      <template v-slot:help>
        It appears in page layouts, key and related lists, lookups, and search
        results.
      </template>
      <template v-slot:error>
        Record Name is Required
      </template>
    </slds-input>
    <slds-combobox
      id="sobject-data-type"
      v-model="sobject.dataType"
      label="Data Type"
      placeholder="Select an Option"
      readonly
      class="mb-2"
      :options="[
        {
          value: 'Text',
          label: 'Text',
        },
        {
          value: 'AutoNumber',
          label: 'Auto Number',
        },
      ]"
    />
    <slds-input
      v-if="sobject.dataType === 'AutoNumber'"
      id="sobject-display-format"
      v-model="$v.sobject.displayFormat.$model"
      label="Display Format"
      type="text"
      required
      maxlength="32"
      pattern=".{0,20}\{[0]{1,10}\}"
      :error="$v.sobject.displayFormat.$error"
    >
      <template v-slot:help>
        Example: A-{0000}
      </template>
      <template v-slot:error>
        <p v-if="!$v.sobject.displayFormat.required">
          Display Format is Required
        </p>
        <p v-else-if="!$v.sobject.displayFormat.displayFormatValidation">
          Must have at least one number between {}, and at most 10 digits.
        </p>
      </template>
    </slds-input>
    <slds-input
      v-if="sobject.dataType === 'AutoNumber'"
      id="sobject-starting-number"
      v-model="$v.sobject.startingNumber.$model"
      class="mb-2"
      label="Starting Number"
      type="number"
      required
      min="0"
      :error="$v.sobject.startingNumber.$error"
    >
      <template v-slot:error>
        <p v-if="!$v.sobject.startingNumber.required">
          Starting Number is Required
        </p>
        <p v-else-if="!$v.sobject.startingNumber.minValue">
          Must be bigger than Zero
        </p>
      </template>
    </slds-input>
    <slds-checkbox
      id="sobject-allow-reports"
      v-model="sobject.enableReports"
      label="Allow Reports"
      variant="inline"
    />
    <slds-checkbox
      id="sobject-allow-activites"
      v-model="sobject.enableActivities"
      label="Allow Activities"
      variant="inline"
    />
    <slds-checkbox
      id="sobject-enable-history"
      v-model="sobject.enableHistory"
      label="Track Field History"
      variant="inline"
    />
    <slds-checkbox
      id="sobject-allow-in-chatter-groups"
      v-model="sobject.allowInChatterGroups"
      label="Allow in Chatter Groups"
      variant="inline"
    />
    <slds-checkbox
      id="sobject-allow-sharing"
      v-model="sobject.enableSharing"
      label="Allow Sharing"
      variant="inline"
    />
    <slds-checkbox
      id="sobject-enable-bulk-api"
      v-model="sobject.enableBulkApi"
      label="Allow Bulk API Access"
      variant="inline"
    />
    <slds-checkbox
      id="sobject-enable-streaming-api"
      v-model="sobject.enableStreamingApi"
      label="Allow Streaming API Access"
      variant="inline"
    />
    <slds-checkbox
      id="sobject-enable-search"
      v-model="sobject.enableSearch"
      label="Allow Search"
      variant="inline"
    />
    <slds-combobox
      id="sobject-deployment-status"
      v-model="sobject.deploymentStatus"
      label="Deployment Status"
      placeholder="Select an Option"
      readonly
      :options="[
        {
          value: 'InDevelopment',
          label: 'In Development',
        },
        {
          value: 'Deployed',
          label: 'Deployed',
        },
      ]"
    />
    <slds-button
      class="mt-3"
      :label="value.name ? 'Update' : 'Create'"
      brand
      stretch
      @click="onSubmit"
    />
  </form>
</template>

<script>
import {
  required,
  maxLength,
  minValue,
  helpers,
} from 'vuelidate/lib/validators'

const objectNameValidation = helpers.regex(
  'objectName',
  /^(?!.*__)(?!.*_$)[A-Za-z]\w*$/
)

const displayFormatValidation = helpers.regex(
  'displayFormat',
  /^.{0,20}\{[0]{1,10}\}$/
)

export default {
  props: {
    value: {
      type: Object,
      required: true,
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
  data() {
    return {
      sobject: {
        name: this.value.name || undefined,
        label: this.value.label || undefined,
        objectName: this.value.objectName || undefined,
        description: this.value.description || undefined,
        pluralLabel: this.value.pluralLabel || undefined,
        gender: this.value.gender || undefined,
        recordName: this.value.recordName || undefined,
        dataType: this.value.dataType || 'Text',
        displayFormat: this.value.displayFormat || undefined,
        startingNumber: this.value.startingNumber || undefined,
        enableReports: this.value.enableReports || false,
        enableActivities: this.value.enableActivities || false,
        enableHistory: this.value.enableHistory || false,
        allowInChatterGroups: this.value.allowInChatterGroups || false,
        enableSharing: this.value.enableSharing || false,
        enableBulkApi: this.value.enableBulkApi || false,
        enableStreamingApi: this.value.enableStreamingApi || false,
        enableSearch: this.value.enableSearch || false,
        deploymentStatus: this.value.deploymentStatus || 'Deployed',
      },
      objectName: undefined,
      languages: ['es', 'pt_BR', 'es_MX'],
    }
  },
  validations() {
    if (this.sobject.dataType === 'AutoNumber') {
      return {
        sobject: {
          label: {
            required,
            maxLength: maxLength(40),
          },
          pluralLabel: {
            required,
            maxLength: maxLength(40),
          },
          description: {
            maxLength: maxLength(999),
          },
          objectName: {
            required,
            objectNameValidation,
            maxLength: maxLength(43),
          },
          recordName: {
            required,
            maxLength: maxLength(80),
          },
          displayFormat: {
            required,
            displayFormatValidation,
            maxLength: maxLength(32),
          },
          startingNumber: {
            required,
            minValue: minValue(0),
          },
        },
      }
    } else {
      return {
        sobject: {
          label: {
            required,
            maxLength: maxLength(40),
          },
          pluralLabel: {
            required,
            maxLength: maxLength(40),
          },
          description: {
            maxLength: maxLength(999),
          },
          objectName: {
            required,
            objectNameValidation,
            maxLength: maxLength(43),
          },
          recordName: {
            required,
            maxLength: maxLength(80),
          },
        },
      }
    }
  },
  computed: {
    sObjecComputedData() {
      return {
        nameField: {
          label: this.sobject.recordName,
          displayFormat: this.sobject.displayFormat,
          startingNumber: this.sobject.startingNumber,
          trackHistory: false,
          type: this.sobject.dataType,
        },
        label: this.sobject.label,
        description: this.sobject.description,
        pluralLabel: this.sobject.pluralLabel,
        gender: this.sobject.gender,
        enableReports: this.sobject.enableReports,
        enableActivities: this.sobject.enableActivities,
        enableHistory: this.sobject.enableHistory,
        allowInChatterGroups: this.sobject.allowInChatterGroups,
        enableSharing: this.sobject.enableSharing,
        enableBulkApi: this.sobject.enableBulkApi,
        enableStreamingApi: this.sobject.enableStreamingApi,
        enableSearch: this.sobject.enableSearch,
        deploymentStatus: this.sobject.deploymentStatus,
        sharingModel: 'ReadWrite',
      }
    },
    hasGender() {
      return (
        this.orgLanguageLocaleKey &&
        this.languages &&
        this.languages.length &&
        this.languages.includes(this.orgLanguageLocaleKey)
      )
    },
    isUpdating() {
      return this.value.name
    },
  },
  watch: {
    'sobject.label'(newValue) {
      this.sobject.name = this.sobject.label
    },
    'sobject.enableSharing'(newValue) {
      this.sobject.enableBulkApi = newValue
      this.sobject.enableStreamingApi = newValue
    },
    'sobject.enableStreamingApi'(newValue) {
      this.sobject.enableSharing = newValue
      this.sobject.enableBulkApi = newValue
    },
    'sobject.enableBulkApi'(newValue) {
      this.sobject.enableSharing = newValue
      this.sobject.enableStreamingApi = newValue
    },
    hasGender(newValue) {
      this.sobject.gender = newValue === false ? undefined : 'Feminine'
    },
    objectName(newValue) {
      this.sobject.objectName = newValue.replace(/\s/g, '_')
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('ERROR')
      } else {
        this.$emit(
          this.isUpdating ? 'updatesobject' : 'newsobject',
          this.sobject
        )
      }
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
}
</style>
