import React from 'react'
import {StyleSheet, Text, Button, View} from 'react-native'
import PropTypes from 'prop-types'

const MAX_SECONDS = 10;
class Count extends React.Component {
  constructor() {
    super()
    this.state = {
      count: MAX_SECONDS,
      isCountingDown: false
    }
    this.interval = null

    // bind some stuff
    this.startCounter = this.startCounter.bind(this)
    this.stopCounter = this.stopCounter.bind(this)
    this.resetCounter = this.resetCounter.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
  }
    
  componentDidMount () {
    this.resetCounter()
    this.startCounter()
  }

  resetCounter () {
    this.stopCounter()
    this.setState({ 
      count: MAX_SECONDS
    })
  }

  startCounter () {
    if(this.state.isCountingDown === true) {
      console.log('already decrementing')
    } else {
      this.interval = setInterval(this.decrementCount, 1000)
      this.setState({isCountingDown: true})
    }
    if(this.state.count <= 0) {
      this.resetCounter()
    }
  }

  stopCounter () {
    if(this.interval){
      clearInterval(this.interval)
      this.setState({isCountingDown: false})
    } else {
      console.log('no interval to clear')
    }
  }

  decrementCount () {
    this.setState(prevState => ({count: prevState.count - 1}))
    if(this.state.count === 0) {
      this.stopCounter()
    }
  }
    
  render() {
    return (
      <View>
        <Button onPress={this.startCounter} title="Start"/>
        <Button onPress={this.stopCounter} title="Stop"/>
        <Button onPress={this.resetCounter} title="Reset"/>
        <Text>{this.state.count}</Text>
      </View>
    )
  }
}

export default Count