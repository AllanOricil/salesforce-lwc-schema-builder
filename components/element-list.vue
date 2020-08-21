<template>
  <div
    class="d-flex flex-column"
    style="max-height: none; height: calc(100vh - 130px); overflow-y: auto;"
  >
    <div class="menu-button" @click="onClickMenuButton('Sobject', $event)">
      <slds-icon icon="standard:canvas" />
      SObject
    </div>
    <div class="menu-button" @click="onClickMenuButton('AutoNumber', $event)">
      <slds-icon icon="standard:topic2" />
      Auto Number
    </div>
    <div class="menu-button" @click="onClickMenuButton('Formula', $event)">
      <slds-icon icon="standard:formula" />
      Formula
    </div>
    <div
      class="menu-button"
      @click="onClickMenuButton('RollupSummary', $event)"
    >
      <slds-icon icon="utility:advanced_function" />
      Roll-Up Summary
    </div>
    <div class="menu-button" @click="onClickMenuButton('Lookup', $event)">
      <slds-icon icon="standard:record_lookup" />
      Lookup
    </div>
    <div class="menu-button" @click="onClickMenuButton('Hierarchy', $event)">
      <slds-icon icon="standard:hierarchy" />
      Hierarchy
    </div>
    <div class="menu-button" @click="onClickMenuButton('MasterDetail', $event)">
      <slds-icon icon="standard:record_lookup" />
      Master-Detail
    </div>
    <div class="menu-button" @click="onClickMenuButton('Checkbox', $event)">
      <slds-icon icon="standard:multi_select_checkbox" />
      Checkbox
    </div>
    <div class="menu-button" @click="onClickMenuButton('Currency', $event)">
      <slds-icon icon="standard:currency" />
      Currency
    </div>
    <div class="menu-button" @click="onClickMenuButton('Date', $event)">
      <slds-icon icon="standard:date_input" />
      Date
    </div>
    <div class="menu-button" @click="onClickMenuButton('DateTime', $event)">
      <slds-icon icon="standard:date_time" />
      Date/Time
    </div>
    <div class="menu-button" @click="onClickMenuButton('Time', $event)">
      <slds-icon icon="standard:today" />
      Time
    </div>
    <div class="menu-button" @click="onClickMenuButton('Email', $event)">
      <slds-icon icon="standard:email" />
      Email
    </div>
    <div class="menu-button" @click="onClickMenuButton('Number', $event)">
      <slds-icon icon="standard:number_input" />
      Number
    </div>
    <div class="menu-button" @click="onClickMenuButton('Percent', $event)">
      <slds-icon icon="standard:number_input" />
      Percent
    </div>
    <div class="menu-button" @click="onClickMenuButton('Phone', $event)">
      <slds-icon icon="standard:voice_call" />
      Phone
    </div>
    <div class="menu-button" @click="onClickMenuButton('Picklist', $event)">
      <slds-icon icon="standard:picklist_type" />
      Picklist
    </div>
    <div
      class="menu-button"
      @click="onClickMenuButton('MultiselectPicklist', $event)"
    >
      <slds-icon icon="standard:multi_picklist" />
      Picklist (Multi-select)
    </div>
    <div class="menu-button" @click="onClickMenuButton('Text', $event)">
      <slds-icon icon="standard:text" />
      Text
    </div>
    <div
      class="menu-button"
      @click="onClickMenuButton('EncryptedText', $event)"
    >
      <slds-icon icon="standard:display_text" />
      Text (Encrypted)
    </div>
    <div class="menu-button" @click="onClickMenuButton('TextArea', $event)">
      <slds-icon icon="standard:textarea" />
      Text Area
    </div>
    <div class="menu-button" @click="onClickMenuButton('LongTextArea', $event)">
      <slds-icon icon="standard:textarea" />
      Long Text Area
    </div>
    <div class="menu-button" @click="onClickMenuButton('Html', $event)">
      <slds-icon icon="standard:display_rich_text" />
      Rich Text Area
    </div>
    <div class="menu-button" @click="onClickMenuButton('Url', $event)">
      <slds-icon icon="standard:link" />
      URL
    </div>
    <div class="menu-button" @click="onClickMenuButton('Location', $event)">
      <slds-icon icon="action:map" x-small />
      Geolocation
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedElement: undefined,
    }
  },
  methods: {
    onClickMenuButton(elementType, e) {
      const menuButtons = document.querySelectorAll('.menu-button')
      menuButtons.forEach((menuButton) => {
        menuButton.classList.remove('selected')
      })
      e.target.classList.add('selected')
      this.selectedElement = elementType
      this.$emit('selected-element', elementType)
    },
  },
}
</script>

<style scoped>
.menu-button {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  cursor: pointer;
}

.menu-button:hover {
  background: #f3f2f2;
}

.menu-button.selected {
  background: rgba(21, 137, 238, 0.1);
  box-shadow: inset 4px 0 0 #1589ee;
}

.menu-button > * {
  margin-right: 5px;
}

[class*='slds-icon'] {
  background-color: #ef9a3d !important;
  border-radius: 0.25rem;
}

.slds-icon {
  fill: white !important;
}
</style>
