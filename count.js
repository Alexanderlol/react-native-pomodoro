import React from 'react'
import {StyleSheet, Text, Button, View, Vibration} from 'react-native'
import PropTypes from 'prop-types'

const MAX_SECONDS = 3
const REST_SECONDS = 5
const DURATION = 1000

class Count extends React.Component {
  constructor() {
    // constructor stuff only happens once
    super()
    this.state = {
      count: MAX_SECONDS, // probly could find better name then count
      breakCount: REST_SECONDS, // probly could find better name then breakCount
      isCountingDown: false,
    }
    this.interval = null

    // bind this to function calls
    this.startCounter = this.startCounter.bind(this)
    this.stopCounter = this.stopCounter.bind(this)
    this.resetCounter = this.resetCounter.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
    this.startBreakCounter = this.startBreakCounter.bind(this)
    this.decrementBreakCount = this.decrementBreakCount.bind(this)
  }

  startCounter () {
    if(this.state.isCountingDown) { 
      console.log('already decrementing')
    } else {
      this.interval = setInterval(this.decrementCount, 1000)
      this.setState({isCountingDown: true, status: 'working'}) 
    }
    if(this.state.count <= 0 && this.state.breakCount > 0) {
      clearInterval(this.interval)
      this.startBreakCounter()
    }
    if(this.state.count <= 0 && this.state.breakCount <= 0) {
      this.resetCounter()
    }
  }

  resetCounter () {
    this.stopCounter()
    this.setState({ 
      count: MAX_SECONDS,
      breakCount: REST_SECONDS,
      status: 'idle'
    })
  }

  stopCounter () {
    if(this.interval){
      clearInterval(this.interval)
      this.setState({isCountingDown: false, status: 'idle'})
    } else {
      console.log('no interval to clear')
    }
  }

  decrementCount () {
    this.setState(prevState => ({count: prevState.count - 1}))
    if(this.state.count === 0) {
      //Vibration.vibrate(DURATION)
      this.stopCounter()
      this.startBreakCounter()
    }
  }

  startBreakCounter() {
    if(this.state.isCountingDown) { 
      console.log('already decrementing')
    } else {
      this.interval = setInterval(this.decrementBreakCount, 1000)
      this.setState({isCountingDown: true, status: 'resting'}) 
    }
    if(this.state.breakCount <= 0) {
      this.resetCounter()
    }
  }

  decrementBreakCount() {
    this.setState(prevState => ({breakCount: prevState.breakCount -1}))
    if(this.state.breakCount === 0) {
      //Vibration.vibrate(DURATION)
      this.stopCounter()
    }
  }

  // anything in RENDER happens everytime render is called which is EVERY time setState() is called
  // Math.floor(this.state.count / 60) is a computation that needs to happen every second. 
  // set state is being called every second for us.
  render() {
    let minutes = Math.floor(this.state.count / 60)
    let seconds = this.state.count % 60
    let restMinutes = Math.floor(this.state.breakCount / 60)
    let restSeconds = this.state.breakCount % 60

    const statusMessage = () => { 
      if(this.state.status === 'working') { 
        return 'Working time!' 
      } else if(this.state.status === 'resting') { 
        return 'Resting time!' 
      } else {
        return ''
      }
    }

    return (
      <View>
        <Text>Pomodoro Timer</Text>
        <Text>
        {
          statusMessage()
        }
        </Text> 
        <Button onPress={this.startCounter} title="Start"/>
        <Button onPress={this.stopCounter} title="Stop"/>
        <Button onPress={this.resetCounter} title="Reset"/>
        <Text>{`${minutes < 10 ? ('0' + minutes.toString()) : minutes} : ${seconds < 10 ? ('0' + seconds.toString()) : seconds }`}</Text>
        <Text>{`${restMinutes < 10 ? ('0' + restMinutes.toString()) : restMinutes} : ${restSeconds < 10 ? ('0' + restSeconds.toString()) : restSeconds }`}</Text>
      </View>
    )
  }
}

export default Count