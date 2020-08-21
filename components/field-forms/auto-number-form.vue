<template>
  <div>
    <slds-input
      id="field-label"
      v-model="fieldInput.label"
      label="Label"
      required
      :error="$v.fieldInput.label.$error"
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
      required
      max-length="80"
      pattern="^(?!.*__)(?!.*_$)[A-Za-z]\w*$"
      :error="$v.fieldInput.name.$error"
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
    ></slds-input>
    <slds-input
      id="field-help-text"
      v-model="fieldInput.helpText"
      label="Help Text"
    >
      <template v-slot:help>
        This text displays on detail and edit pages when users hover over the
        Info icon next to this field
      </template>
    </slds-input>
    <slds-input
      id="field-auto-number-display-text"
      v-model="fieldInput.displayFormat"
      label="Auto Number Display Text"
      pattern=".{0,20}\{[0]{1,10}\}"
      :error="$v.fieldInput.displayFormat.$error"
    >
      <template v-slot:help>
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
      required
      :error="$v.fieldInput.startingNumber.$error"
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
    ></slds-checkbox>
    <slds-checkbox
      id="field-external-id"
      v-model="fieldInput.externalId"
      label="External Id"
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
  model: {
    prop: 'field',
  },
  props: {
    field: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fieldInput: this.field,
    }
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
