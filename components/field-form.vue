<template>
  <form
    id="field-form"
    ref="field-form"
    class="d-flex flex-column slds-form px-3"
  >
    <!--style="max-height: none; height: calc(100vh - 120px); overflow-y: auto;"-->
    <slds-combobox
      id="sobject-field-type"
      v-model="fieldTypeInput"
      :options="[
        { value: 'AutoNumber', label: 'Auto Number' },
        { value: 'Formula', label: 'Formula' },
        { value: 'Lookup', label: 'Lookup' },
        { value: 'MasterDetail', label: 'Master Detail' },
        { value: 'Checkbox', label: 'Checkbox' },
        { value: 'Currency', label: 'Currency' },
        { value: 'Date', label: 'Date' },
        { value: 'DateTime', label: 'Date/Time' },
        { value: 'Email', label: 'Email' },
        { value: 'Location', label: 'Geolocation' },
        { value: 'Number', label: 'Number' },
        { value: 'Percent', label: 'Percent' },
        { value: 'Phone', label: 'Phone' },
        { value: 'Picklist', label: 'Picklist' },
        { value: 'MultiselectPicklist', label: 'Picklist (Multi-Select)' },
        { value: 'Text', label: 'Text' },
        { value: 'TextArea', label: 'Text Area' },
        { value: 'LongTextArea', label: 'Text Area (Long)' },
        { value: 'Html', label: 'Text Area (Rich)' },
        { value: 'EncryptedText', label: 'Text (Encrypted)' },
        { value: 'Time', label: 'Time' },
        { value: 'Url', label: 'URL' },
      ]"
      label="Field Type"
      readonly
      placeholder="Select an Option"
    />
    <auto-number-form
      v-if="fieldTypeInput === 'AutoNumber'"
      ref="form"
      v-model="fieldInput"
    />
    <checkbox-form
      v-else-if="fieldTypeInput === 'Checkbox'"
      ref="form"
      v-model="fieldInput"
    />
    <currency-form
      v-else-if="fieldTypeInput === 'Currency'"
      ref="form"
      v-model="fieldInput"
    />
    <date-form
      v-else-if="fieldTypeInput === 'Date'"
      ref="form"
      v-model="fieldInput"
    />
    <date-time-form
      v-else-if="fieldTypeInput === 'DateTime'"
      ref="form"
      v-model="fieldInput"
    />
    <email-form
      v-else-if="fieldTypeInput === 'Email'"
      ref="form"
      v-model="fieldInput"
    />
    <formula-form
      v-else-if="fieldTypeInput === 'Formula'"
      ref="form"
      v-model="fieldInput"
    />
    <geolocation-form
      v-else-if="fieldTypeInput === 'Location'"
      ref="form"
      v-model="fieldInput"
    />
    <hierarchy-form
      v-else-if="fieldTypeInput === 'Hierarchy'"
      ref="form"
      v-model="fieldInput"
    />
    <long-text-area-form
      v-else-if="fieldTypeInput === 'LongTextArea'"
      ref="form"
      v-model="fieldInput"
    />
    <lookup-form
      v-else-if="fieldTypeInput === 'Lookup'"
      ref="form"
      v-model="fieldInput"
    />
    <master-detail-form
      v-else-if="fieldTypeInput === 'MasterDetail'"
      ref="form"
      v-model="fieldInput"
    />
    <number-form
      v-else-if="fieldTypeInput === 'Number'"
      ref="form"
      v-model="fieldInput"
    />
    <percent-form
      v-else-if="fieldTypeInput === 'Percent'"
      ref="form"
      v-model="fieldInput"
    />
    <phone-form
      v-else-if="fieldTypeInput === 'Phone'"
      ref="form"
      v-model="fieldInput"
    />
    <picklist-form
      v-else-if="fieldTypeInput === 'Picklist'"
      ref="form"
      v-model="fieldInput"
    />
    <multi-select-picklist-form
      v-else-if="fieldTypeInput === 'MultiselectPicklist'"
      ref="form"
      v-model="fieldInput"
    />
    <rich-text-area-form
      v-else-if="fieldTypeInput === 'Html'"
      ref="form"
      v-model="fieldInput"
    />
    <rollup-summary-form
      v-else-if="fieldTypeInput === 'RollupSummary'"
      ref="form"
      v-model="fieldInput"
    />
    <text-area-form
      v-else-if="fieldTypeInput === 'TextArea'"
      ref="form"
      v-model="fieldInput"
    />
    <text-encrypted-form
      v-else-if="fieldTypeInput === 'EncryptedText'"
      ref="form"
      v-model="fieldInput"
    />
    <text-form
      v-else-if="fieldTypeInput === 'Text'"
      ref="form"
      v-model="fieldInput"
    />
    <time-form
      v-else-if="fieldTypeInput === 'Time'"
      ref="form"
      v-model="fieldInput"
    />
    <url-form
      v-else-if="fieldTypeInput === 'Url'"
      ref="form"
      v-model="fieldInput"
    />

    <slds-button
      brand
      label="Save"
      class="mt-3"
      @click="onClickSave"
    ></slds-button>
  </form>
</template>

<script>
import AutoNumberForm from './field-forms/auto-number-form'
import CheckboxForm from './field-forms/checkbox-form'
import CurrencyForm from './field-forms/currency-form'
import DateForm from './field-forms/date-form'
import DateTimeForm from './field-forms/date-time-form'
import EmailForm from './field-forms/email-form'
import FormulaForm from './field-forms/formula-form'
import GeolocationForm from './field-forms/geolocation-form'
import HierarchyForm from './field-forms/hierarchy-form'
import LongTextAreaForm from './field-forms/long-text-area-form'
import LookupForm from './field-forms/lookup-form'
import MasterDetailForm from './field-forms/master-detail-form'
import NumberForm from './field-forms/number-form'
import PercentForm from './field-forms/percent-form'
import PhoneForm from './field-forms/phone-form'
import PicklistForm from './field-forms/picklist-form'
import MultiSelectPicklistForm from './field-forms/multi-select-picklist-form'
import RichTextAreaForm from './field-forms/rich-text-area-form'
import RollupSummaryForm from './field-forms/rollup-summary-form'
import TextAreaForm from './field-forms/text-area-form'
import TextEncryptedForm from './field-forms/text-encrypted-form'
import TextForm from './field-forms/text-form'
import TimeForm from './field-forms/time-form'
import UrlForm from './field-forms/url-form'

export default {
  components: {
    AutoNumberForm,
    CheckboxForm,
    CurrencyForm,
    DateForm,
    DateTimeForm,
    EmailForm,
    FormulaForm,
    GeolocationForm,
    HierarchyForm,
    LongTextAreaForm,
    LookupForm,
    MasterDetailForm,
    NumberForm,
    PercentForm,
    PhoneForm,
    PicklistForm,
    MultiSelectPicklistForm,
    RichTextAreaForm,
    RollupSummaryForm,
    TextAreaForm,
    TextEncryptedForm,
    TextForm,
    TimeForm,
    UrlForm,
  },
  model: {
    prop: 'field',
  },
  props: {
    field: {
      type: Object,
      default: () => {},
    },
    fieldType: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      fieldTypeInput: this.fieldType,
      fieldInput: this.field,
    }
  },
  watch: {
    fieldType(newValue) {
      this.fieldTypeInput = newValue
    },
  },
  methods: {
    onClickSave() {
      this.$refs.form.$v.$touch()
      if (this.$refs.form.$v.$invalid) {
        console.log('ERROR')
      } else {
        this.$emit('newfield', this.fieldInput)
      }
    },
  },
}
</script>

<style></style>
