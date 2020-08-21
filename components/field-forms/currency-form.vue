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
      id="field-length"
      v-model="fieldInput.length"
      label="Length"
      type="number"
      required
      min="0"
      :max="maxLength"
    ></slds-input>
    <slds-input
      id="field-decimal-places"
      v-model="fieldInput.decimalPlaces"
      label="Decimal Places"
      type="number"
      required
      min="0"
      :max="maxDecimalPlaces"
    ></slds-input>
    <slds-input
      id="field-default-value"
      v-model="fieldInput.defaultValue"
      label="Default Value"
      type="number"
    >
    </slds-input>
    <slds-checkbox
      id="field-required"
      v-model="fieldInput.required"
      label="Required"
      type="number"
    >
    </slds-checkbox>
  </div>
</template>

<script>
import { required, maxLength, helpers } from 'vuelidate/lib/validators'

const nameValidation = helpers.regex(
  'objectName',
  /^(?!.*__)(?!.*_$)[A-Za-z]\w*$/
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
      fieldInput: {
        type: this.field.type,
        name: this.field.name,
        label: this.field.label,
        description: this.field.description,
        helpText: this.field.helpText,
        decimalPlaces: this.field.decimalPlaces,
        length: this.field.length,
        defaultValue: this.field.defaultValue,
        required: this.field.required,
      },
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
    },
  },
  computed: {
    maxLength() {
      return 18 - this.fieldInput.decimalPlaces
    },
    maxDecimalPlaces() {
      return 18 - this.fieldInput.length
    },
  },
  beforeMount() {
    if (this.fieldInput.length === null || this.fieldInput.length === undefined)
      this.fieldInput.length = 18

    if (
      this.fieldInput.decimalPlaces === null ||
      this.fieldInput.decimalPlaces === undefined
    )
      this.fieldInput.decimalPlaces = 0
  },
  methods: {
    onChange() {
      this.$emit('input', this.fieldInput)
    },
  },
}
</script>

<style></style>
