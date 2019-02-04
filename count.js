import React from 'react'
import {StyleSheet, Text, Button, View} from 'react-native'
import PropTypes from 'prop-types'

const MAX_SECONDS = 1500

// try putting these in render() and referencing the in the DOM
var minutes = Math.floor(MAX_SECONDS / 60)
var seconds = MAX_SECONDS - minutes * 60 
//

// OUTSIDE THE CLASS DEFINITON, THIS STUFF HAPPENS ONCE

class Count extends React.Component {
  constructor() {
    // constructor stuff only happens once
    super()
    this.state = {
      count: MAX_SECONDS,
      isCountingDown: false,
    }
    this.interval = null

    // bind some stuff
    this.startCounter = this.startCounter.bind(this)
    this.stopCounter = this.stopCounter.bind(this)
    this.resetCounter = this.resetCounter.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
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

  resetCounter () {
    this.stopCounter()
    this.setState({ 
      count: MAX_SECONDS
    })
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

  // anything in RENDER happens everytime render is called which is EVERY time setState() is called
  // Math.floor(this.state.count / 60) is a computation that needs to happen every second. 
  // set state is being called every second for us.
  render() {
    
    return (
      <View>
        <Button onPress={this.startCounter} title="Start"/>
        <Button onPress={this.stopCounter} title="Stop"/>
        <Button onPress={this.resetCounter} title="Reset"/>
        <Text>{`${Math.floor(this.state.count / 60)} : ${this.state.count % 60}`}</Text>
      </View>
    )
  }
}

export default Count