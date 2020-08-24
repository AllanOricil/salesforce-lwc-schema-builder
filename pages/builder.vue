<template>
  <div class="d-flex justify-content-between">
    <slds-button-icon
      icon="utility:component_customization"
      large
      bordered
      style="
        position: absolute;
        top: 60px;
        left: 15px;
        width: 40px;
        height: 40px;
        background-color: white;
      "
      @click="onClickShowToolbox"
    ></slds-button-icon>
    <slds-panel
      id="left-menu"
      ref="left-panel"
      :small="leftPanelSize === 'small'"
      :medium="leftPanelSize === 'medium'"
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
        :tabs="[
          { label: 'Elements' },
          { label: 'Sobjects' },
          { label: 'Manager' },
        ]"
        @click="onSelectTab"
      >
        <template v-slot:1>
          <element-list
            :disable-field-elements="!sobject"
            @selected-element="onSelectElementType"
          ></element-list>
        </template>
        <template v-slot:2>
          <div
            style="
              max-height: none;
              height: calc(100vh - 130px);
              overflow-y: auto;
            "
          >
            <slds-tree
              :tree="sobjectsTreeList"
              @node="onSelectAvailableSobject"
            ></slds-tree>
          </div>
        </template>
        <template v-slot:3>
          <slds-tree
            :tree="sobjectsTree"
            style="
              max-height: none;
              height: calc(100vh - 130px);
              overflow-y: auto;
            "
          ></slds-tree>
        </template>
      </slds-tabs>
    </slds-panel>
    <slds-panel
      id="right-menu"
      ref="right-panel"
      x-large
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
          <h1>{{ rightPanelTitle }}</h1>
          <slds-button-icon icon="utility:close" @click="onCloseRightPanel" />
        </div>
      </template>
      <sobject-view
        v-if="viewModeSobject"
        :sobject="sobject"
        @edit="onEdit"
      ></sobject-view>
      <sobject-form
        v-else-if="!viewModeSobject && elementType === 'Sobject'"
        v-model="sobject"
        class="pb-5"
        @newsobject="onNewSobject"
        @updatesobject="onUpdateSobject"
      ></sobject-form>
      <field-form
        v-else
        :field="field"
        :field-type="elementType"
        :view="viewModeField"
        @newField="onNewField"
        @editField="onEditField"
        @updateField="onUpdateField"
      />
    </slds-panel>
    <div class="d-flex flex-column vh-100 vw-100 flex-grow-1">
      <schema-builder
        ref="schema-builder"
        @selecttable="onSelectTable"
        @selectfield="onSelectField"
        @deselecttable="onDeselectTable"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import SchemaBuilder from '../components/schema-builder'
import ElementList from '../components/element-list'
import FieldForm from '../components/field-form'
import SobjectView from '../components/sobject-view'
import SobjectForm from '../components/sobject-form'

export default {
  components: {
    SchemaBuilder,
    ElementList,
    FieldForm,
    SobjectView,
    SobjectForm,
  },
  data() {
    return {
      elementType: undefined,
      viewModeSobject: false,
      field: undefined,
      viewModeField: false,
      sobjects: {},
      sobjectsTree: {
        children: [],
      },
      visible: true,
      table: {},
      sobject: undefined,
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
      rightPanelTitle: undefined,
      leftPanelSize: 'small',
      sobjectsTreeList: {
        children: [],
      },
    }
  },
  computed: {
    ...mapState('salesforce', {
      sobjectsList: (state) => state.sobjects.sobjects,
    }),
    ...mapGetters({
      getSobject: 'salesforce/getSobject',
    }),
    schemaBuilder() {
      return this.$refs['schema-builder']
    },
    leftPanel() {
      return this.$refs['left-panel']
    },
    rightPanel() {
      return this.$refs['right-panel']
    },
  },
  watch: {
    sobjectsList(newList) {
      if (newList)
        newList.forEach((sobject) => {
          this.sobjectsTreeList.children.push({
            label: sobject.name,
          })
        })
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
    onSelectElementType(e) {
      this.elementType = e
      this.viewModeSobject = false
      this.field = undefined
      if (this.elementType === 'Sobject') {
        this.rightPanelTitle = 'New Sobject'
        this.sobject = undefined
        this.schemaBuilder.deselectAllTables()
      } else {
        this.rightPanelTitle = 'New Field'
        this.viewModeField = false
      }
      this.rightPanel.show()
    },
    onCloseLeftPanel() {
      this.leftPanel.hide()
      this.rightPanel.hide()
    },
    onCloseRightPanel() {
      this.rightPanel.hide()
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

      this.sobject = this.sobjects[this.table.name]
      this.iconName = e.detail._name.replace(/[0-9]/g, '')
      this.viewModeSobject = true
      this.viewModeField = false
      this.field = undefined
      this.elementType = 'Sobject'
      this.rightPanel.show()
      this.rightPanelTitle = 'Sobject'
    },
    onDeselectTable(e) {
      this.sobject = undefined
      this.viewModeSobject = false
      this.rightPanel.hide()
    },
    onSelectField(e) {
      this.field = this.sobjects[e.detail._parent._name].fields[e.detail._name]
      this.viewModeField = true
      this.viewModeSobject = false
      this.elementType = this.field.type
    },
    newObject() {
      this.schemaBuilder.requestSObject(this.objects[this.i])
      this.i++
    },
    newEmptyObject() {
      this.schemaBuilder.addEmptyTable(this.objectName)
    },
    onNewSobject(sobject) {
      console.log(sobject)
      this.schemaBuilder.addEmptyTable(sobject.name)
      this.table = {
        name: sobject.objectName,
        label: sobject.label,
      }
      this.sobjectsTree.children.push(this.table)
      this.sobject = sobject
      this.sobjects[sobject.objectName] = { ...sobject, fields: [] }
      this.rightPanelTitle = 'Sobject'
      this.viewModeSobject = true
    },
    onNewField(field) {
      console.log(field)

      this.schemaBuilder.addField(
        { ...field, type: this.elementType.toLowerCase() },
        this.table.name
      )

      this.field = field
      const newField = { ...field, type: this.elementType }
      this.sobjects[this.sobject.objectName].fields[newField.name] = newField

      this.viewModeField = true

      console.log('ON NEW FIELD')
      console.log(this.sobjectsTree.children)
      const sobjectTreeTable = this.sobjectsTree.children.find(
        (table) => table.name === this.table.name
      )

      if (sobjectTreeTable) {
        const newTreeField = {
          label: field.name,
        }
        if (!sobjectTreeTable.children) {
          sobjectTreeTable.children = []
        }

        sobjectTreeTable.children.push(newTreeField)

        console.log('ON NEW FIELD')
        console.log(sobjectTreeTable)
        console.log(this.sobjectsTree)

        this.sobjectsTree = JSON.parse(JSON.stringify(this.sobjectsTree))
      }
    },
    onUpdateField(field) {
      this.sobjects[this.sobject.objectName].fields[field.name] = field
      this.viewModeField = true
    },
    onChange(e) {
      console.log(e)
    },
    onEdit(e) {
      this.viewModeSobject = false
      this.sobject = Object.values(this.sobjects).find(
        (sobject) => sobject.objectName === e.objectName
      )
    },
    onClickShowToolbox() {
      this.leftPanel.show()
    },
    onUpdateSobject(newSobjectData) {
      console.log('update sobject')
      console.log(newSobjectData)
      this.schemaBuilder.setTableTitleAndName(
        newSobjectData.label,
        newSobjectData.objectName,
        this.sobject.objectName
      )
      const sobjectTreeToUpdate = this.sobjectsTree.children.find(
        (sobjectTree) => sobjectTree.name === this.sobject.objectName
      )
      sobjectTreeToUpdate.label = newSobjectData.label
      this.sobject = newSobjectData

      const target = this.sobjects[newSobjectData.objectName]
      Object.assign(target, newSobjectData)
      this.rightPanelTitle = 'Sobject'
      this.viewModeSobject = true
    },
    onSelectTab(tabIndex) {
      if (tabIndex === 1) {
        this.leftPanelSize = 'medium'
      } else {
        this.leftPanelSize = 'small'
      }
    },
    onSelectAvailableSobject(e) {
      console.log(e)
      if (e.level === 1) {
        this.getSobjectDescribe(e.label).then((sobject) => {
          console.log('NAME: ' + sobject.name)
          console.log(sobject)
          const sobjectTreeItem = this.sobjectsTreeList.children.find(
            (sobjectTreeItem) => sobjectTreeItem.label === sobject.name
          )

          if (!sobjectTreeItem.children) sobjectTreeItem.children = []

          sobject.fields.forEach((field) => {
            sobjectTreeItem.children.push({
              label: field.name,
            })
          })

          this.sobjectsTreeList = JSON.parse(
            JSON.stringify(this.sobjectsTreeList)
          )
        })
      }
    },
    onEditField(field) {
      this.rightPanelTitle = 'Update Field'
      this.field = this.sobjects[this.sobject.objectName].fields[field.name]
      this.viewModeSobject = false
      this.viewModeField = true
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
