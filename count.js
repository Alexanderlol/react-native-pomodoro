import React from 'react'
import {StyleSheet, Text, Button, View, TouchableHighlight, Vibration} from 'react-native'

const MAX_SECONDS = 1500 //25min
const REST_SECONDS = 300 //5min
const DURATION = 1000

class Count extends React.Component {
  constructor() {
    // constructor stuff only happens once
    super()
    this.state = {
      count: MAX_SECONDS, 
      breakCount: REST_SECONDS,
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
    if(this.state.isCountingDown) { //prevent startcounter from running again while decrementing
      console.log('already decrementing')
    } else {
      this.interval = setInterval(this.decrementCount, 1000) //decrement every second
      this.setState({isCountingDown: true, status: 'working'}) 
    }
    if(this.state.isCountingDown) { //prevent startbreakcounter from running again while decrementing
      console.log('already decrementing')
    } else {
      if(this.state.count <= 0 && this.state.breakCount > 0) { 
        clearInterval(this.interval)
        this.startBreakCounter()
      }
      if(this.state.count <= 0 && this.state.breakCount <= 0) {
        this.resetCounter()
      }
    }
  }

  //stop decrement and reset state seconds
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
      clearInterval(this.interval) //clear active timer interval
      this.setState({isCountingDown: false, status: 'idle'})
    } else {
      console.log('no interval to clear')
    }
  }

  decrementCount () {
    this.setState(prevState => ({count: prevState.count - 1})) //decrement count by 1
    if(this.state.count === 0) {
      this.stopCounter()
      this.startBreakCounter()
      Vibration.vibrate(DURATION) //vibrate
    }
  }

  startBreakCounter() {
    if(this.state.isCountingDown) { 
      console.log('already decrementing')
    } else {
      this.interval = setInterval(this.decrementBreakCount, 1000) //decrement every second
      this.setState({isCountingDown: true, status: 'resting'}) 
    }
    if(this.state.breakCount <= 0) {
      this.resetCounter()
    }
  }

  decrementBreakCount() {
    this.setState(prevState => ({breakCount: prevState.breakCount -1})) //decrement breakcount by 1
    if(this.state.breakCount === 0) { 
      this.stopCounter() 
      Vibration.vibrate(DURATION) //vibrate
    }
  }

  // anything in RENDER happens everytime render is called which is EVERY time setState() is called
  // Math.floor(this.state.count / 60) is a computation that needs to happen every second. 
  render() {
    let minutes = Math.floor(this.state.count / 60)
    let seconds = this.state.count % 60
    let restMinutes = Math.floor(this.state.breakCount / 60)
    let restSeconds = this.state.breakCount % 60

    //switch between work/rest depending on which timer is running
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
        <Text style={styles.headerText}>Pomodoro Timer</Text>
        <Text style={styles.statusText}>
        {
          statusMessage()
        }
        </Text> 
        <TouchableHighlight style={styles.buttonStyle}>
          <Button color="white" onPress={this.startCounter} title="Start"/>
        </TouchableHighlight> 
        <TouchableHighlight style={styles.buttonStyle}>
          <Button color="white" onPress={this.stopCounter} title="Stop"/>
        </TouchableHighlight> 
        <TouchableHighlight style={styles.buttonStyle}>
          <Button color="white" fontWeight="bold" onPress={this.resetCounter} title="Reset"/>
        </TouchableHighlight> 
        <Text style={styles.timerStyle}>{`${minutes < 10 ? ('0' + minutes.toString()) : minutes} : ${seconds < 10 ? ('0' + seconds.toString()) : seconds }`}</Text>
        <Text style={styles.timerStyle}>{`${restMinutes < 10 ? ('0' + restMinutes.toString()) : restMinutes} : ${restSeconds < 10 ? ('0' + restSeconds.toString()) : restSeconds }`}</Text>
      </View>
    )
  }
}

//styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 40,
    width: 160,
    borderRadius: 10,
    backgroundColor: "black",
    marginLeft: 70,
    marginRight: 50,
    marginTop: 20,
  },
  headerText: {
    fontSize: 40,
    marginBottom: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  statusText: {
    fontSize: 20,
    marginBottom: 10,
    marginRight: 10,
    color: "red",
    fontWeight: 'bold',
    textAlign: "center"
  },
  timerStyle: {
    height: 60,
    width: 200,
    borderRadius: 10,
    backgroundColor: "black",
    color: "white",
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30,
    textAlign: "center",
    fontSize: 50
  }
});

export default Count