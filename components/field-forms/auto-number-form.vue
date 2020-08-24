<template>
  <div>
    <slds-input
      id="field-label"
      v-model="fieldInput.label"
      label="Label"
      :error="$v.fieldInput.label.$error"
      :required="!readonly"
      :readonly="readonly"
    >
      <template v-slot:error>
        <p v-if="!$v.fieldInput.label.required">Label is Required</p>
        <p v-if="!$v.fieldInput.label.maxLength">
          Label can't exceed 80 characters
        </p>
      </template>
    </slds-input>
    <slds-input
      id="field-name"
      v-model="fieldInput.name"
      label="Name"
      max-length="80"
      pattern="^(?!.*__)(?!.*_$)[A-Za-z]\w*$"
      :error="$v.fieldInput.name.$error"
      :required="!readonly"
      :readonly="readonly"
    >
      <template v-slot:error>
        <p v-if="!$v.fieldInput.name.required">Name is Required</p>
        <p v-if="!$v.fieldInput.name.nameValidation">
          The field Name can only contain alphanumeric characters, must begin
          with a letter, cannot end with an underscore or contain two
          consecutive underscore characters, and must be unique across all
          Opportunity fields
        </p>
        <p v-if="!$v.fieldInput.name.maxLength">
          Name can't exceed 80 characters
        </p>
      </template>
    </slds-input>
    <slds-input
      id="field-description"
      v-model="fieldInput.description"
      label="Description"
      :readonly="readonly"
    ></slds-input>
    <slds-input
      id="field-help-text"
      v-model="fieldInput.helpText"
      label="Help Text"
      :readonly="readonly"
    >
      <template v-if="!readonly" v-slot:help>
        This text displays on detail and edit pages when users hover over the
        Info icon next to this field
      </template>
    </slds-input>
    <slds-input
      id="field-auto-number-display-text"
      v-model="fieldInput.displayFormat"
      label="Display Text"
      pattern=".{0,20}\{[0]{1,10}\}"
      :error="$v.fieldInput.displayFormat.$error"
      :readonly="readonly"
    >
      <template v-if="!readonly" v-slot:help>
        Example: A-{000000000}
      </template>
      <template
        v-if="!$v.fieldInput.displayFormat.displayFormatValidation"
        v-slot:error
      >
        Must include sequence number substitution variable and no more than 10
        digits is allowed
      </template>
    </slds-input>
    <slds-input
      id="field-starting-number"
      v-model="fieldInput.startingNumber"
      label="Starting Number"
      type="number"
      :error="$v.fieldInput.startingNumber.$error"
      :required="!readonly"
      :readonly="readonly"
    >
      <template v-slot:error>
        <p v-if="!$v.fieldInput.startingNumber.required">
          Starting Number is Required
        </p>
        <p v-if="!$v.fieldInput.startingNumber.minValue">
          Must be non-negative
        </p>
      </template>
    </slds-input>
    <slds-checkbox
      id="field-generate-auto-numbers"
      v-model="fieldInput.generateAutoNumbers"
      label="Generate Auto Number for existing records"
      class="mt-2"
      :readonly="readonly"
    ></slds-checkbox>
    <slds-checkbox
      id="field-external-id"
      v-model="fieldInput.externalId"
      label="External Id"
      :readonly="readonly"
    ></slds-checkbox>
  </div>
</template>

<script>
import {
  required,
  maxLength,
  minValue,
  helpers,
} from 'vuelidate/lib/validators'

const nameValidation = helpers.regex(
  'objectName',
  /^(?!.*__)(?!.*_$)[A-Za-z]\w*$/
)

const displayFormatValidation = helpers.regex(
  'displayFormat',
  /^.{0,20}\{[0]{1,10}\}$/
)

export default {
  props: {
    field: {
      type: Object,
      default: () => {
        return {
          label: undefined,
          name: undefined,
          description: undefined,
          helpText: undefined,
          displayFormat: undefined,
          startingNumber: undefined,
          generateAutoNumbers: undefined,
          externalId: false,
        }
      },
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fieldInput: {
        label: this.field.label || undefined,
        name: this.field.name || undefined,
        description: this.field.description || undefined,
        helpText: this.field.helpText || undefined,
        displayFormat: this.field.displayFormat || undefined,
        startingNumber: this.field.startingNumber || undefined,
        generateAutoNumbers: this.field.generateAutoNumbers || undefined,
        externalId: this.field.externalId || false,
      },
    }
  },
  watch: {
    field(newValue) {
      this.fieldInput = newValue
    },
    fieldInput: {
      deep: true,
      handler() {
        this.$emit('fieldchange', this.fieldInput)
      },
    },
  },
  validations: {
    fieldInput: {
      label: {
        required,
        maxLength: maxLength(80),
      },
      name: {
        required,
        nameValidation,
        maxLength: maxLength(80),
      },
      displayFormat: {
        displayFormatValidation,
      },
      startingNumber: {
        required,
        minValue: minValue(0),
      },
    },
  },
}
</script>

<style></style>
