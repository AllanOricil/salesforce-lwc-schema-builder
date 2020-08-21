<template>
  <canvas id="canvas" class="h-100" />
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Schema } from '@allanoricil/schema-builder'
import { mapActions } from 'vuex'
import IconColors from '../assets/backgroundColorsForIcons.json'
export default {
  props: {
    sobjects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      schema: undefined,
      options: {
        background: {
          color: 'white',
        },
        zoom: {
          level: 1,
          max: 1.5,
          min: 0.4,
          speed: 0.1,
        },
        fps: 100,
        drawGrid: true,
        editor: false,
        canMoveEntities: true,
        canDragCanvas: true,
      },
      tableStyles: {
        font: {
          family: 'sans-serif',
          style: 'normal',
          variant: 'normal',
          color: 'black',
          size: 18,
          weight: 'bold',
        },
        dimension: { width: 500, height: 300 },
        padding: {
          left: 10,
          top: 10,
          right: 10,
          bottom: 10,
        },
        border: {
          color: '#dddbda',
          radius: 5,
          lineWidth: 1,
        },
        onSelectedBorder: {
          color: 'rgb(59,112,209)',
          lineWidth: 3,
        },
        header: {
          border: {
            color: '#dddbda',
            lineWidth: 1,
            radius: {
              topLeft: 5,
              bottomLeft: 0,
              topRight: 5,
              bottomRight: 0,
            },
          },
          background: {
            color: 'rgba(255,255,255,0.0)',
          },
        },
        footer: {
          border: {
            color: '#dddbda',
            lineWidth: 1,
            radius: {
              topLeft: 0,
              bottomLeft: 5,
              topRight: 0,
              bottomRight: 5,
            },
          },
          background: {
            color: 'rgba(255,255,255,0.0)',
          },
        },
        background: {
          color: 'rgba(255,255,255,0.9)',
        },
      },
      fieldStyles: {
        font: {
          family: 'Arial',
          style: 'normal',
          variant: 'normal',
          color: '#3e3e3c',
          size: 15,
          weight: 'normal',
        },
        padding: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        background: {
          color: 'rgba(255,255,255,0.0)',
        },
        hoverBackground: {
          color: 'rgb(242,242,242)',
        },
      },
    }
  },
  mounted() {
    this.schema = new Schema({
      options: this.options,
    })

    this.schema.on('clicktable', (e) => {
      console.log(e)
      this.$emit('clicktable', e)
    })

    this.schema.on('field', (e) => {
      console.log('FIELD', JSON.stringify(e))
    })

    this.schema.addTable(
      JSON.parse(
        '{"font":{"family":"sans-serif","style":"normal","variant":"normal","color":"black","size":18,"weight":"bold"},"dimension":{"width":500,"height":300},"padding":{"left":10,"top":10,"right":10,"bottom":10},"border":{"color":"#dddbda","radius":5,"lineWidth":1},"onSelectedBorder":{"color":"rgb(59,112,209)","lineWidth":3},"header":{"border":{"color":"#dddbda","lineWidth":1,"radius":{"topLeft":5,"bottomLeft":0,"topRight":5,"bottomRight":0}},"background":{"color":"rgba(255,255,255,0.0)"}},"footer":{"border":{"color":"#dddbda","lineWidth":1,"radius":{"topLeft":0,"bottomLeft":5,"topRight":0,"bottomRight":5}},"background":{"color":"rgba(255,255,255,0.0)"}},"background":{"color":"rgba(255,255,255,0.9)"},"name":"a","label":"a","fields":[],"isDraggable":true,"icon":{"name":"a","src":"/salesforce-icons/standard/opportunity.svg","background":{},"padding":{"left":10,"top":5,"right":10,"bottom":10},"border":{"radius":5}}}'
      )
    )

    const field = JSON.parse(
      '{"font":{"family":"Arial","style":"normal","variant":"normal","color":"#3e3e3c","size":15,"weight":"normal"},"padding":{"left":0,"top":0,"right":0,"bottom":0},"background":{"color":"rgba(255,255,255,0.0)"},"hoverBackground":{"color":"rgb(242,242,242)"},"name":"ab","label":"ab","type":"autonumber"}'
    )
    this.schema.addFieldToTable(field, 'a')
  },
  methods: {
    ...mapActions({
      getSobjectDescribe: 'salesforce/getSobjectDescribe',
    }),
    requestSObject(table) {
      this.getSobjectDescribe(table).then((sobject) => this.addTable(sobject))
    },
    addTable(sobject) {
      let iconName
      if (sobject.name.toLowerCase() === 'territory2')
        iconName = 'service_territory'
      else iconName = sobject.name.toLowerCase().replace(/\d/g, '')

      const path = `/salesforce-icons/standard/${iconName}.svg`

      const icon = {
        name: iconName,
        src: path,
        background: {
          color: IconColors[iconName],
        },
        padding: {
          left: 10,
          top: 5,
          right: 10,
          bottom: 10,
        },
        border: {
          radius: 5,
        },
      }

      const newTable = {
        ...this.tableStyles,
        name: sobject.name.toLowerCase(),
        label: sobject.name,
        fields: [],
        isDraggable: true,
        icon,
      }

      sobject.fields.forEach((field) => {
        const newField = {
          ...this.fieldStyles,
          name: field.name.toLowerCase(),
          label: field.label,
          type:
            field.type === 'reference' || field.type === 'id'
              ? 'ID'
              : field.type[0].toUpperCase() + field.type.substr(1),
        }

        if (field.type === 'reference') {
          newField.reference =
            field.referenceTo && field.referenceTo[0]
              ? field.referenceTo[0].toLowerCase()
              : null

          newField.connection = {
            connector: {
              color:
                field.relationshipOrder === 0 || field.relationshipOrder === 1
                  ? 'rgba(194, 57, 53, 0.65)'
                  : 'rgba(76, 156, 217, 0.65)',
            },
            line: {
              weight: 3,
              color:
                field.relationshipOrder === 0 || field.relationshipOrder === 1
                  ? 'rgba(194, 57, 53, 0.65)'
                  : 'rgba(76, 156, 217, 0.65)',
              enableBezierCurves: true,
            },
          }
        }
        newTable.fields.push(newField)
      })

      console.log(JSON.stringify(newTable))
      this.schema.addTable(newTable)
    },
    addEmptyTable(tableName) {
      let iconName
      if (tableName.toLowerCase() === 'territory2')
        iconName = 'service_territory'
      else iconName = tableName.toLowerCase().replace(/\d/g, '')

      const path = `/salesforce-icons/standard/${iconName}.svg`

      const icon = {
        name: iconName,
        src: path,
        background: {
          color: IconColors[iconName],
        },
        padding: {
          left: 10,
          top: 5,
          right: 10,
          bottom: 10,
        },
        border: {
          radius: 5,
        },
      }

      const newTable = {
        ...this.tableStyles,
        name: tableName.toLowerCase(),
        label: tableName,
        fields: [],
        isDraggable: true,
        icon,
      }

      console.log(JSON.stringify(newTable))
      this.schema.addTable(newTable)
    },
    addField(field, tableName) {
      console.log(tableName)
      const fieldToInsert = {
        ...this.fieldStyles,
        name: field.name,
        label: field.label,
        type: field.type,
      }
      console.log(JSON.stringify(fieldToInsert))

      this.schema.addFieldToTable(fieldToInsert, tableName)
      console.log(this.schema._canvas._canvasElementsManager)
    },
  },
}
</script>

<style></style>
