<template>
  <div class="d-flex justify-content-between">
    <slds-panel
      ref="left-panel"
      small
      left
      class="overflow-hidden"
      style="z-index: 1000; position: absolute; height: calc(100vh - 50px);"
    >
      <template v-slot:header>
        <div class="d-flex w-100 justify-content-between">
          <h1>Toolbox</h1>
          <slds-button-icon icon="utility:back" @click="onCloseLeftPanel" />
        </div>
      </template>
      <slds-tabs
        :active-tab="1"
        :tabs="[{ label: 'Elements' }, { label: 'Manager' }]"
      >
        <template v-slot:1>
          <element-list @selected-element="doSomething"></element-list>
        </template>
        <template v-slot:2></template>
      </slds-tabs>
    </slds-panel>
    <slds-panel
      ref="right-panel"
      large
      right
      class="overflow-hidden"
      style="
        z-index: 1000;
        position: absolute;
        height: calc(100vh - 50px);
        right: 0;
      "
    >
      <template v-slot:header>
        <div class="d-flex w-100 justify-content-between">
          <h1>Selected Element</h1>
          <slds-button-icon icon="utility:close" @click="onCloseRightPanel" />
        </div>
      </template>
      <!--<sobject-view
        v-if="table && viewMode"
        :sobject="table"
        @edit="onEdit"
      ></sobject-view>-->
      <sobject-form
        v-if="elementType === 'Sobject'"
        class="pb-5"
        @sobject="onSobject"
      ></sobject-form>
      <field-form
        v-else-if="elementType"
        v-model="field"
        :field-type="elementType"
        @newfield="onNewField"
      />
    </slds-panel>
    <div class="d-flex flex-column vh-100 vw-100 flex-grow-1">
      <schema-builder
        ref="schema-builder"
        :sobjects="sobjects"
        @clicktable="onSelectTable"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SchemaBuilder from '../components/schema-builder'
import ElementList from '../components/element-list'
/* import FieldForm from '../components/field-form'
import SobjectView from '../components/sobject-view'
import SobjectForm from '../components/sobject-form' */

export default {
  components: {
    SchemaBuilder,
    ElementList,
  },
  data() {
    return {
      elementType: undefined,
      viewMode: false,
      field: {},
      sobjects: [],
      visible: true,
      table: {},
      folder: 'standard',
      iconName: '',
      objects: [
        'account',
        'user',
        'opportunity',
        'territory2',
        'event',
        'product2',
        'a__c',
        'aa__c',
        'aaa__c',
        'Test_1__c',
      ],
      i: 0,
      objectName: '',
    }
  },
  computed: {
    ...mapGetters({
      getSobject: 'salesforce/getSobject',
    }),
    schemaBuilder() {
      return this.$refs['schema-builder']
    },
  },
  mounted() {
    this.$refs['left-panel'].show()
    this.getGlobalDescribe().then((response) => {
      console.log('GLOBAL DESCRIBE')
      console.log(response.sobjects)

      /* const promisses = []
      for (let i = 0; i < 80; i++) {
        const sobject = response.sobjects[i]
        promisses.push(this.getSobjectDescribe(sobject.name))
      }

      promisses.push(this.getSobjectDescribe('Test_7__c'))
      promisses.push(this.getSobjectDescribe('account'))

      console.log(promisses)

      Promise.all(promisses).then((responses) => {
        responses.forEach((sobject) => {
          console.log('NAME: ' + sobject.name)
          console.log(sobject)
          const newSobject = {
            name: sobject.name,
            fields: sobject.fields,
          }
          this.$refs['schema-builder'].addTable(newSobject)
        })
      }) */

      /*
      Promise.all([
        this.getSobjectDescribe('account'),
        this.getSobjectDescribe('contract'),
        this.getSobjectDescribe('order'),
        this.getSobjectDescribe('orderitem'),
        this.getSobjectDescribe('quote'),
        this.getSobjectDescribe('quotelineitem'),
        this.getSobjectDescribe('pricebook2'),
        this.getSobjectDescribe('product2'),
        this.getSobjectDescribe('pricebookentry'),
        this.getSobjectDescribe('opportunity'),
        this.getSobjectDescribe('opportunitylineitem'),
        this.getSobjectDescribe('a__c'),
        this.getSobjectDescribe('asset'),
      ]).then((responses) => {
        responses.forEach((sobject) => {
          console.log('NAME: ' + sobject.name)
          console.log(sobject)
          const newSobject = {
            name: sobject.name,
            fields: sobject.fields,
          }
          this.sobjects.push(newSobject)
        })
      }) */
    })
  },
  methods: {
    doSomething(e) {
      this.elementType = e
      if (this.elementType !== 'Sobject') this.elementType = e

      this.$refs['right-panel'].show()
    },
    onClickTable() {
      this.$refs['left-panel'].show()
    },
    onCloseLeftPanel() {
      this.$refs['left-panel'].hide()
    },
    onCloseRightPanel() {
      this.$refs['right-panel'].hide()
    },
    ...mapActions({
      getGlobalDescribe: 'salesforce/getGlobalDescribe',
      getSobjectDescribe: 'salesforce/getSobjectDescribe',
    }),
    onSelectTable(e) {
      this.table = {
        label: e.detail._label,
        name: e.detail._name,
        fields: e.detail._fields.map((field) => {
          return { label: field._label }
        }),
      }

      this.iconName = e.detail._name.replace(/[0-9]/g, '')

      this.viewMode = true
    },
    newObject() {
      this.schemaBuilder.requestSObject(this.objects[this.i])
      this.i++
    },
    newEmptyObject() {
      this.schemaBuilder.addEmptyTable(this.objectName)
    },
    onSobject(sobject) {
      console.log(sobject)
      this.schemaBuilder.addEmptyTable(sobject.name)
    },
    onNewField(field) {
      this.schemaBuilder.addField(
        { ...field, type: this.elementType.toLowerCase() },
        this.table.name
      )
    },
    onChange(e) {
      console.log(e)
    },
    onEdit() {
      this.viewMode = false
    },
  },
}
</script>

<style>
html {
  background-color: white;
}

.slds-icon-text-default {
  fill: white !important;
  padding: 5px 5px;
}
</style>
