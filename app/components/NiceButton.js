import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native'

const height = 40
const padding = 10
const margin = 10
const width = 250
const backgroundColor = 'lightgrey'

const NiceButton = ({
  children,
  rounded,
  outlined,
  customStyle,
  ...restProps
}) => {

  let inlineStyle = []

  inlineStyle = inlineStyle.concat(style.defaultStyle)

  if (rounded) {
    inlineStyle = inlineStyle.concat(style.roundBorder)
  }

  if (outlined) {
    inlineStyle = inlineStyle.concat(style.outlined)
  }

  if (customStyle) {
      inlineStyle = inlineStyle.concat(customStyle)
  }

  return (
    <TouchableOpacity {...restProps}>
        <View style={inlineStyle}>
          {children}
        </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    defaultStyle: {
        height,
        padding,
        margin,
        width,
        backgroundColor,
        borderColor: backgroundColor
    },
    roundBorder: {
        borderRadius: 30
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1
    }
})

export default NiceButton;