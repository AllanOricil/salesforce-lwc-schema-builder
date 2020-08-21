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
    <slds-combobox
      id="field-default-value"
      v-model="fieldInput.defaultValue"
      label="Default Value"
      placeholder="Select an Option"
      readonly
      class="mb-2"
      :options="[
        {
          value: true,
          label: 'Checked',
        },
        {
          value: false,
          label: 'Unchecked',
        },
      ]"
    />
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
    },
  },
  beforeMount() {
    // this.fieldInput.defaultValue = this.fieldInput.defaultValue || true
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style></style>
