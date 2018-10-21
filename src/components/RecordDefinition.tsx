import * as React from "react"
import { RecordType, RecordTypePart } from "../parser/TypeDefinitionParser";
import { TypeDesignation } from "./TypeDesignation";

export interface RecordDefinitionProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: RecordType
}

export const RecordDefinition = (props: RecordDefinitionProps) => (
  <span {...allowedProps(props)}>
    { props.value.parts.map(showRecordPart) }
  </span>
)

const allowedProps = (props: RecordDefinitionProps) => {
  const { value, ...allowedProps } = props
  return allowedProps
}

const showRecordPart = (part: RecordTypePart) => (
  <span key={part.name} className="record-part">
    <span className="name">{ part.name }</span>
    <TypeDesignation value={ part.valueType } />
  </span>
)